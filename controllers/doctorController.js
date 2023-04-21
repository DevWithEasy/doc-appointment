const {randomUUID} = require('crypto')
const mongoose = require('mongoose')
const User = require("../models/User")
const Doctor = require("../models/Doctor")
const createError = require("../utils/createError")
const Chamber = require("../models/Chamber")

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
           newDoctor.save()
           .then(data=>{
                User.updateOne({isAdmin : true},{$push : {notifications : {
                    id : Date.now(),
                    doctorId : req.body.userId,
                    name : `${req.body.firstName} ${req.body.lastName}`,
                    message : `${req.body.firstName} ${req.body.lastName} has been applied to a doctor.`,
                    onClickPath : '/admin/doctors/',
                    status : 'unread'
                }}})
                .then(()=>{
                    res.status(200).json({
                        status : 200,
                        success : true,
                        message : 'Doctor has been applied'
                    })
                })
                .catch(error=>{
                    res.status(500).json({
                        status: 500,
                        success : false,
                        message : error.message
                    })
                })
           })
           .catch(error => {
                res.status(500).json({
                    status: 500,
                    success : false,
                    message : error.message
                })
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
                onClickPath : `/doctor/dashboard/`,
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

exports.updateDoctor=async(req,res,next)=>{
    try {
        await Doctor.updateOne({_id : req.params.id},{$set : {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            phone : req.body.phone,
            email : req.body.email,
            website : req.body.website,
            workedAt : req.body.workedAt,
            designation : req.body.designation,
            education : req.body.education,
            specialization : req.body.specialization,
            experience : req.body.experience,
            experienceArea : req.body.experienceArea,
            feesPerConsultation : req.body.feesPerConsultation
        }})
        
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

exports.deleteDoctor=async(req,res,next)=>{
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
        const doctor = await Doctor.findOne({user : req.params.id})

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
exports.allApprovedDoctors=async(req,res,next)=>{
    try {
        const doctors = await Doctor.find({status : 'Approved'}).populate('user','image -_id')

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

exports.allApprovedDoctorsSpecialization=async(req,res,next)=>{
    try {
        const doctors = await Doctor.find({status : 'Approved'})
        const specialization = doctors.map(doctor=>{
            return doctor.specialization
        })
        res.status(200).json({
            status: 200,
            success : true,
            data : specialization
        })
        
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.allApprovedSpecialistDoctors=async(req,res,next)=>{
    try {
        const {specialist} = req.query
        const doctors = await Doctor.find({status : 'Approved',specialization : specialist})
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
        const {userId,...data} = req.body
        const chamber = await Doctor.findByIdAndUpdate(req.params.doctorId,{$push : {
            chambers : {
                id : randomUUID(),
                ...data
            }
        }})
        res.status(200).json({
            status: 200,
            success : true,
            message : 'Chamber added successfully',
            data : chamber
        })
        
    } catch (error) {
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.updateChamber=async(req,res,next)=>{
    const {userId,...data} = req.body
    try {
        const doctor = await Doctor.findOneAndUpdate({_id : req.params.doctorId , "chambers.id" : data.id},{$set:{
            'chambers.$.vanue' : data.vanue,
            'chambers.$.location' : data.location,
            'chambers.$.day' : data.day,
            'chambers.$.from' : data.from,
            'chambers.$.to' : data.to
        }},{new : true})
        
        res.status(200).json({
            status: 200,
            success : true,
            message : 'Chamber update successfully',
            data : doctor
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 500,
            success : false,
            message : error.message
        })
    }
}

exports.removeChamber=async(req,res,next)=>{
    const {dId,cId} = req.query
    try {
        const doctor = await Doctor.findOneAndUpdate({_id : dId},{$pull : {'chambers' : {'id' : cId}}},{new : true})

        res.status(200).json({
            status: 200,
            success : true,
            message : 'Chamber deleted successfully',
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