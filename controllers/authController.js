const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require("../utils/createError");
const { updateOne } = require("../models/User");

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
        newuser.save((err,data)=>{
            if(err){
                next(createError(401,err.message))
            }else{
                res.status(200).json({
                    status: 200,
                    success : true,
                    data : data
                })
            }
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
        
        //TOKEN FOR SECRET
        const token = await jwt.sign({id : user._id},process.env.JWT_SECRET)

        const isvalid = await bcrypt.compare(req.body.password,user.password)
        if (!isvalid) return createError(401, 'credentials are incorrect')

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