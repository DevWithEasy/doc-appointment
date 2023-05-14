const User = require("../models/User");
const Verification = require("../models/Verification");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require("../utils/createError");
const fs = require('fs')
const path = require('path');
const { sendVerificaion, sendSuccessful, sendForgetPassword } = require("../utils/verification");
const { passwordChangeSuccessfull } = require("../utils/verification");

exports.signup=async(req,res,next)=>{
    const {password} = req.body
    try {
        
        //HASHED PASSWORD FOR SECRET
        const hashed = await bcrypt.hash(password,10)

        //SAVE NEW USER IN DATABASE
        const newuser = new User({
            ...req.body,
            password : hashed
        })
        const user = await newuser.save()
        
        //TOKEN FOR SECRET
        const token = await jwt.sign({id : user._id},process.env.JWT_SECRET)

        //GENERATE RANDOM NUMBER AND HASHED
        const randomNumber = Math.ceil(Math.random()*999999)
        const code = await bcrypt.hash((randomNumber).toString(),10)

        const verify = new Verification({
            user : user._id,
            code : code
        })

        await verify.save()

        sendVerificaion(user.email,user.name,randomNumber)
        
        res.status(200).json({
            status: 200,
            success : true,
            token : token
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.signin=async(req,res,next)=>{
    try {
        //FIND USER IN DATABASE
        const user = await User.findOne({email : req.body.email})

        if (!user) {
            return res.status(404).json({
                status: 404,
                success : false,
                message : 'User not found.'
            })
        }

        const isvalid = await bcrypt.compare(req.body.password,user.password)

        if (!isvalid) {
            return res.status(404).json({
                status: 404,
                success : false,
                message : 'Credentials do not match.'
            })
        }

        //TOKEN FOR SECRET
        const token = await jwt.sign({id : user._id},process.env.JWT_SECRET)

        res.status(200).json({
            status: 200,
            success : true,
            data : {...user._doc,token}
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.verifyAccount = async(req,res,next)=>{
    try {

        const code = await Verification.findOne({"user": req.body.userId})

        if(!code) return res.status(404).json({
            success : false,
            status : 404,
            message : "Code not found."
        })

        if(code.expired < Date.now()) return res.status(402).json({
            success : false,
            status : 402,
            message : "Code expired"
        })

        const isvalid = await bcrypt.compare(req.body.code,code.code)
        if(!isvalid) return res.status(403).json({
            success : false,
            status : 403,
            message : "Invalid or Wrong Code"
        })

        const user = await User.findByIdAndUpdate(req.body.userId,{$set:{
            isVerified : true
        }},{new : true})

        await Verification.deleteOne({"_id" : code._id})

        sendSuccessful(user.email,user.name)
        

        res.status(200).json({
            status: 200,
            success : true,
            message : 'Account successfully verified'
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.forgetPassword = async(req,res,next)=>{
    try {
        const {email} = req.query
        const user = await User.findOne({email})

        //generate random number
        const randomNumber = Math.ceil(Math.random()*999999)
        const code = await bcrypt.hash((randomNumber).toString(),10)

        //TOKEN FOR SECRET
        const token = await jwt.sign({id : user._id},process.env.JWT_SECRET)

        const findCode = await Verification.findOne({"user": user._id})

        if(!findCode){
            const verify = new Verification({
                user : user._id,
                code : code
            })
            await verify.save()
            sendForgetPassword(user.email,user.name,randomNumber,token)
        }else{
            await Verification.updateOne({"user": user._id},{$set:{
                code : code,
                expired : Date.now() + 21600000
            }})
            sendForgetPassword(user.email,user.name,randomNumber,token)
        }
        res.status(200).json({
            success : true,
            status : 200,
            message : "Verification code sent successfully",
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.resetPassword = async(req,res,next)=>{
    try {
        
        const {userId,code,password} = req.body
        const user = await User.findOne({"_id" : userId})

        const findCode = await Verification.findOne({"user": user._id})
        if(!findCode) return res.status(404).json({
            success : false,
            status : 404,
            message : "Code not found.Sent again"
        })

        if(findCode.expired < Date.now()) return res.status(201).json({
            success : false,
            status : 201,
            message : "Code expired.Sent again"
        })

        const isvalid = await bcrypt.compare(code,findCode.code)
        if(!isvalid) return res.status(403).json({
            success : false,
            status : 403,
            message : "Invalid or Wrong Code"
        })

        const hashed = await bcrypt.hash(password,10)

        await User.updateOne({"_id": user._id},{$set:{
            password : hashed
        }})

        await Verification.deleteOne({"_id" : findCode._id})

        passwordChangeSuccessfull(user.email,user.name)
        
        res.status(200).json({
            success : true,
            status : 200,
            message : "Password Changed successfully"
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.sentCodeAgain = async(req,res,next)=>{
    try {
         //generate random number
         const randomNumber = Math.ceil(Math.random()*999999)
         const code = await bcrypt.hash((randomNumber).toString(),10)
        
         const user = await User.findOne({_id: req.body.userId})
         const findCode = await Verification.findOne({"user": req.body.userId})
 
         if(!findCode){
             const verify = new Verification({
                 user : user._id,
                 code : code
             })
             await verify.save()
             sendVerificaion(user.email,user.name,randomNumber)
         }else{
             await Verification.updateOne({"user": req.body.userId},{$set:{
                 code : code,
                 expired : Date.now() + 21600000
             }})
             sendVerificaion(user.email,user.name,randomNumber)
         }
 
         res.status(200).json({
             success : true,
             status : 200,
             message : "Verification code sent again"
         })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.seenNotification=async(req,res,next)=>{
    try {
        const {userId,...notification} = req.body
        await User.updateOne({_id : userId,'notifications.id' : notification.id},{$set : {'notifications.$.status' : 'read'}})
        const user = await User.findOne({_id : userId})
        res.status(200).json({
            status : 200,
            success : true,
            data : user
        })
    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}

exports.seenAllNotification=async(req,res,next)=>{
    try {
        const {userId} = req.body
        await User.updateOne(
            {_id : userId},
            {$set : {'notifications.$[elem].status' : 'read'}},
            {arrayFilters : [{'elem.status' : 'unread'}],multi : true}
        )
        const updateUser = await User.findOne({_id : userId})
        res.status(200).json({
            status : 200,
            success : true,
            data : updateUser
        })
    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}

exports.deleteAllNotification=async(req,res,next)=>{
    try {
        const {userId} = req.body
        const user = await User.findOne({_id : userId})
        user.notifications = []
        await user.save()
        const updateUser = await User.findOne({_id : userId})
        res.status(200).json({
            status : 200,
            success : true,
            message : 'All notifications deleted.',
            data : updateUser
        })
    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}

exports.getProfile=async(req,res,next)=>{
    try {
        const user = await User.findOne({_id : req.params.id})
        res.status(200).json({
            status : 200,
            success : true,
            data : user
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.find=async(req,res,next)=>{
    try {
        const user = await User.findOne({email : req.query.email})
        if(user){
            res.status(200).json({
                status : 200,
                success : true,
                find : true,
                data : user
            })
        }else{
            res.status(200).json({
                status : 200,
                success : true,
                find : false,
                data : {}
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.findUser=async(req,res,next)=>{
    try {
        const user = await User.findOne({_id : req.params.id})
        res.status(200).json({
            status : 200,
            success : true,
            data : user
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.updateProfile=async(req,res,next)=>{
    try {
        await User.updateOne({_id : req.params.id},{$set : {
            name : req.body.name,
            gender : req.body.gender,
            phone : req.body.phone,
            dob : req.body.dob,
            'address.location' : req.body.address.location,
            'address.post_office' : req.body.address.post_office,
            'address.upazilla' : req.body.address.upazilla,
            'address.district' : req.body.address.district,
        }})
        const user = await User.findOne({_id : req.params.id})
        res.status(200).json({
            status : 200,
            success : true,
            data : user
        })
    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}

exports.uploadProfilePhoto=async(req,res,next)=>{
    try {
        const user = await User.findOne({_id : req.params.id})

        User.updateOne({_id : req.params.id},{$set : {
           'image.url' : `/image/users/${req.file.filename}`
        }},(err)=>{
            if (err){
                res.status(400).json({
                    status : 500,
                    success : false,
                    message : err.message
                })
            }else{
                if(user.image.url !== '/image/users/default_profile.jpg'){
                    const filepath = path.dirname(__dirname)+ '/public' + user.image.url
                    fs.unlinkSync(filepath,(err)=>{
                        res.status(400).json({
                            status : 400,
                            success : false,
                            message : err.message
                        })
                    })
                }
            }
        })
        const updateUser = await User.findOne({_id : req.params.id})
        res.status(200).json({
            status : 200,
            success : true,
            data : updateUser
        })
    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}