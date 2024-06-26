const User = require("../models/User");
const Verification = require("../models/Verification");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path');
const { sendVerificaion, sendSuccessful, sendForgetPassword } = require("../utils/verification");
const { passwordChangeSuccessfull } = require("../utils/verification");
const Appointment = require("../models/Appointment");
const Notification = require("../models/Notification");

exports.signup = async (req, res, next) => {
    const { password } = req.body
    try {
        
        const findUser = await User.findOne({ $or : [
            {email: req.body.email},
            {phone: req.body.phone}
        ] })

        if(findUser){
            return res.status(501).json({
                status: 501,
                success: false,
                message: 'Already have an account'
            })
        }

        
        const hashed = await bcrypt.hash(password, 10)

        
        const newuser = new User({
            ...req.body,
            password: hashed
        })
        const user = await newuser.save()

        
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        
        const randomNumber = Math.ceil(Math.random() * 999999)
        const code = await bcrypt.hash((randomNumber).toString(), 10)

        const verify = new Verification({
            user: user._id,
            code: code
        })

        await verify.save()

        sendVerificaion(user.email, user.name, randomNumber)

        res.status(200).json({
            status: 200,
            success: true,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.signin = async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'User not found.'
            })
        }

        const isvalid = await bcrypt.compare(req.body.password, user.password)

        if (!isvalid) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Credentials do not match.'
            })
        }

        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        const notifications = await Notification.find({user : user._id})

        res.status(200).json({
            status: 200,
            success: true,
            data: { ...user._doc, token,notifications }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.verifyAccount = async (req, res, next) => {
    try {

        const code = await Verification.findOne({ "user": req.body.userId })

        if (!code) return res.status(404).json({
            success: false,
            status: 404,
            message: "Code not found."
        })

        if (code.expired < Date.now()) return res.status(402).json({
            success: false,
            status: 402,
            message: "Code expired"
        })

        const isvalid = await bcrypt.compare(req.body.code, code.code)
        if (!isvalid) return res.status(403).json({
            success: false,
            status: 403,
            message: "Invalid or Wrong Code"
        })

        const user = await User.findByIdAndUpdate(req.body.userId, {
            $set: {
                isVerified: true
            }
        }, { new: true })

        await Verification.deleteOne({ "_id": code._id })

        sendSuccessful(user.email, user.name)


        res.status(200).json({
            status: 200,
            success: true,
            message: 'Account successfully verified'
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.query
        const user = await User.findOne({ email })

        //generate random number
        const randomNumber = Math.ceil(Math.random() * 999999)
        const code = await bcrypt.hash((randomNumber).toString(), 10)

        //TOKEN FOR SECRET
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        const findCode = await Verification.findOne({ "user": user._id })

        if (!findCode) {
            const verify = new Verification({
                user: user._id,
                code: code
            })
            await verify.save()
            sendForgetPassword(user.email, user.name, randomNumber, token)
        } else {
            await Verification.updateOne({ "user": user._id }, {
                $set: {
                    code: code,
                    expired: Date.now() + 21600000
                }
            })
            sendForgetPassword(user.email, user.name, randomNumber, token)
        }
        res.status(200).json({
            success: true,
            status: 200,
            message: "Verification code sent successfully",
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.resetPassword = async (req, res, next) => {
    try {

        const { userId, code, password } = req.body
        const user = await User.findOne({ "_id": userId })

        const findCode = await Verification.findOne({ "user": user._id })
        if (!findCode) return res.status(404).json({
            success: false,
            status: 404,
            message: "Code not found.Sent again"
        })

        if (findCode.expired < Date.now()) return res.status(201).json({
            success: false,
            status: 201,
            message: "Code expired.Sent again"
        })

        const isvalid = await bcrypt.compare(code, findCode.code)
        if (!isvalid) return res.status(403).json({
            success: false,
            status: 403,
            message: "Invalid or Wrong Code"
        })

        const hashed = await bcrypt.hash(password, 10)

        await User.updateOne({ "_id": user._id }, {
            $set: {
                password: hashed
            }
        })

        await Verification.deleteOne({ "_id": findCode._id })

        passwordChangeSuccessfull(user.email, user.name)

        res.status(200).json({
            success: true,
            status: 200,
            message: "Password Changed successfully"
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.sentCodeAgain = async (req, res, next) => {
    try {
        //generate random number
        const randomNumber = Math.ceil(Math.random() * 999999)
        const code = await bcrypt.hash((randomNumber).toString(), 10)

        const user = await User.findOne({ _id: req.body.userId })
        const findCode = await Verification.findOne({ "user": req.body.userId })

        if (!findCode) {
            const verify = new Verification({
                user: user._id,
                code: code
            })
            await verify.save()
            sendVerificaion(user.email, user.name, randomNumber)
        } else {
            await Verification.updateOne({ "user": req.body.userId }, {
                $set: {
                    code: code,
                    expired: Date.now() + 21600000
                }
            })
            sendVerificaion(user.email, user.name, randomNumber)
        }

        res.status(200).json({
            success: true,
            status: 200,
            message: "Verification code sent again"
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.getNotifications = async (req, res, next) => {
    try {
        const { userId } = req.body
        const notofications = await Notification.find({ user: userId})
        res.status(200).json({
            status: 200,
            success: true,
            data: notofications
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.seenNotification = async (req, res, next) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id,{
            $set : {
                status : true
            }
        })
        res.status(200).json({
            status: 200,
            success: true,
            data: {}
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.seenAllNotification = async (req, res, next) => {
    try {
        const { userId } = req.body
        await User.updateOne(
            { _id: userId },
            { $set: { 'notifications.$[elem].status': 'read' } },
            { arrayFilters: [{ 'elem.status': 'unread' }], multi: true }
        )
        const updateUser = await User.findOne({ _id: userId })
        res.status(200).json({
            status: 200,
            success: true,
            data: updateUser
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.deleteAllNotification = async (req, res, next) => {
    try {
        const { userId } = req.body
        const user = await User.findOne({ _id: userId })
        user.notifications = []
        await user.save()
        const updateUser = await User.findOne({ _id: userId })
        res.status(200).json({
            status: 200,
            success: true,
            message: 'All notifications deleted.',
            data: updateUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        const appointments = await Appointment.find({ user: req.params.id }).countDocuments()
        res.status(200).json({
            status: 200,
            success: true,
            data: {
                ...user._doc,
                appointments
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.find = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.query.email })
        if (user) {
            res.status(200).json({
                status: 200,
                success: true,
                find: true,
                data: user
            })
        } else {
            res.status(200).json({
                status: 200,
                success: true,
                find: false,
                data: {}
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.findUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.status(200).json({
            status: 200,
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.updateProfile = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{
            $set: {
                name: req.body.name,
                gender: req.body.gender,
                phone: req.body.phone,
                dob: req.body.dob,
                donar: req.body.donar,
                bloodGroup: req.body.bloodGroup,
                donateDate: req.body.donateDate,
                'address.location': req.body.address.location,
                'address.post_office': req.body.address.post_office,
                'address.post_code': req.body.address.post_code,
                'address.upazilla': req.body.address.upazilla,
                'address.district': req.body.address.district,
            }
        },{
            new  : true
        })
        res.status(200).json({
            status: 200,
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.uploadProfilePhoto = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id })

        User.updateOne({ _id: req.params.id }, {
            $set: {
                'image.url': `/image/users/${req.file.filename}`
            }
        })
            .exec()
            .then(() => {
                if (user.image.url !== '/image/users/default_profile.jpg') {
                    const filepath = path.dirname(__dirname) + '/public' + user.image.url
                    fs.unlinkSync(filepath, (err) => {
                        res.status(400).json({
                            status: 400,
                            success: false,
                            message: err.message
                        })
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 500,
                    success: false,
                    message: err.message
                })
                // if (err){
                //     res.status(400).json({
                //         status : 500,
                //         success : false,
                //         message : err.message
                //     })
                // }else{
                //     if(user.image.url !== '/image/users/default_profile.jpg'){
                //         const filepath = path.dirname(__dirname)+ '/public' + user.image.url
                //         fs.unlinkSync(filepath,(err)=>{
                //             res.status(400).json({
                //                 status : 400,
                //                 success : false,
                //                 message : err.message
                //             })
                //         })
                //     }
                // }
            })

        const updateUser = await User.findOne({ _id: req.params.id })
        res.status(200).json({
            status: 200,
            success: true,
            data: updateUser
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.addField = async (req, res, next) => {
    try {

        await User.updateMany({
            $set: {
                isDonar: false,
                donate_date: '',
                bloodGroup: ''
            }
        })
        res.status(200).json({
            status: 200,
            success: true,
            message: 'update all successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}