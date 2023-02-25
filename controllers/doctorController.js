const User = require("../models/User")
const Doctor = require("../models/Doctor")
const createError = require("../utils/createError")

exports.applyDoctor=async(req,res,next)=>{
        try {
            const find = await Doctor.find({userId : req.body.userId})
            if (find.length > 0) return res.status(401).json({
                status: 405,
                success : false,
                message : 'Already sent a request'
            })
    
            const admin = await User.findOne({isAdmin : true})
            admin.notifications.push({
                id : Date.now(),
                doctorId : req.body.userId,
                name : `${req.body.firstName} ${req.body.lastName}`,
                message : `${req.body.firstName} ${req.body.lastName} has been applied to a doctor.`,
                onClickPath : '/admin/doctors/',
                status : 'unread'
            })
           const newDoctor = new Doctor({
            ...req.body
           })
           newDoctor.save((err,data)=>{
            if (err){
                res.status(500).json({
                    status: 500,
                    success : false,
                    message : err.message
                })
            }else{
                admin.save()
                res.status(200).json({
                status : 200,
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

exports.approvedDoctor=async(req,res,next)=>{
    try {
        const admin = await User.findOne({_id : req.body.userId})
        if(!admin.isAdmin) return createError(403,'Sorry, you are not admin')
        await User.updateOne({_id : req.params.id},{$set : {isDoctor : true}})

        const doctor = await Doctor.updateOne({userId : req.params.id},{$set : {status : 'Approved'}})
        const findDoctor = await Doctor.findOne({userId : req.params.id})
        const user = await User.findOne({_id : req.params.id})
            user.notifications.push({
                id : Date.now(),
                doctorId : doctor._id,
                name : `${findDoctor.firstName} ${findDoctor.lastName}`,
                message : `${findDoctor.firstName} ${findDoctor.lastName} has been approved your doctor request.`,
                onClickPath : `/doctor/dashboard/${findDoctor._id}`,
                status : 'unread'
            })
        user.save()

        res.status(200).json({
            status: 200,
            success : true,
            message : 'Doctor approved successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.cancelDoctor=async(req,res,next)=>{
    try {
        const admin = await User.findOne({_id : req.body.userId})
        if(!admin.isAdmin) return createError(403,'Sorry, you are not admin')

        const doctor = await Doctor.findOne({_id : req.query.id})
        const user = await User.findOne({_id : doctor.userId})
            user.notifications.push({
                subject : 'Apply Request cancel for a doctor',
            })
        user.save()

        await Doctor.deleteOne({_id : req.query.id})

        res.status(200).json({
            status: 200,
            success : true,
            message : 'Doctor cancel successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.findDoctor=async(req,res,next)=>{
    try {
        const doctor = await Doctor.findOne({userId : req.params.id})

        res.status(200).json({
            status: 200,
            success : true,
            data : doctor
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
        const doctor = await Doctor.findOne({_id : req.params.id})

        res.status(200).json({
            status: 200,
            success : true,
            data : doctor
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}
exports.findAllActiveDoctor=async(req,res,next)=>{
    try {
        const doctors = await Doctor.find({status : 'Approved'})

        res.status(200).json({
            status: 200,
            success : true,
            data : doctors
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.addChamber=async(req,res,next)=>{
    try {
        await Doctor.updateOne({_id : req.params.id},{$push : {chambers : req.body}})

        const doctor = await Doctor.findOne({_id : req.params.id})

        res.status(200).json({
            status: 200,
            success : true,
            message : 'Chamber added successfully',
            data : doctor
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}
exports.removeChamber=async(req,res,next)=>{
    try {
        const doctors = await Doctor.find({status : 'Approved'})

        res.status(200).json({
            status: 200,
            success : true,
            data : doctors
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}