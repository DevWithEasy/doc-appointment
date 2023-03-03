const Appointment = require('../models/Appointment')
const Chamber = require('../models/Chamber')
const Doctor = require('../models/Doctor')
const User = require('../models/User')
const createAppointmentSerial = require('../utils/createAppointmentSerial')
exports.addAppointment=async(req,res,next)=>{
    try {
        const all = await Appointment.find({})
        const newAppointment = new Appointment({
            ...req.body,
            appointmentId : createAppointmentSerial(all,req.body.appointmentDate)
        })

        const doctor = await Doctor.findOne({_id : req.body.doctorId})
        const user = await User.findOne({_id : doctor.userId})
        user.notifications.push({
            id : Date.now(),
            name : req.body.patientName,
            message : `${req.body.patientName} has been applied for appointments.`,
            onClickPath : `/doctor/allAppointments/search?day=${req.body.appointmentDay}&date=${req.body.appointmentDate}`,
            status : 'unread'
        })
        
        newAppointment.save((err,data)=>{
            if (err){
                res.status(400).json({
                    status : 400,
                    success : false,
                    meaasage : err.message
                })
            }else{
                user.save()
                res.status(200).json({
                    status : 200,
                    success : true,
                    data : data
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}
exports.confirmAppointment=async(req,res,next)=>{
    try {
        const appointment = await Appointment.findOne({_id : req.params.id})
        const doctor = await Doctor.findOne({_id : appointment.doctorId})
        const user = await User.findOne({_id : appointment.userId})
        await Appointment.updateOne({_id:req.params.id}, {$set:{
            status : 'Confirmed'
        }})
        user.notifications.push({
            id : Date.now(),
            name : user?.name,
            message : `${doctor?.firstName} ${doctor?.lastName} has been confirmed your appointments.`,
            onClickPath : `/appointments`,
            status : 'unread'
        })
        user.save()
        res.status(200).json({
            status : 200,
            success : true,
            message : 'Appointment has been confirmed'
        })
        
    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}
exports.rejectAppointment=async(req,res,next)=>{
    try {
        const appointment = await Appointment.findOne({_id : req.params.id})
        const doctor = await Doctor.findOne({_id : appointment.doctorId})
        const user = await User.findOne({_id : appointment.userId})
        await Appointment.updateOne({_id:req.params.id}, {$set:{
            status : 'Rejected'
        }})
        user.notifications.push({
            id : Date.now(),
            name : user?.name,
            message : `${doctor?.firstName} ${doctor?.lastName} has been reject your appointments.`,
            onClickPath : `/appointments`,
            status : 'unread'
        })
        user.save()
        res.status(200).json({
            status : 200,
            success : true,
            message : 'Appointment has been Rejected'
        })

    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}
exports.cancelAppointment=async(req,res,next)=>{
    try {
        await Appointment.updateOne({_id:req.params.id}, {$set:{
            status : 'Canceled'
        }})
        
        res.status(200).json({
            status : 200,
            success : true,
            message : 'Appointment has been Canceled'
        })

    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}
exports.deleteAppointment=async(req,res,next)=>{
    try {
        await Appointment.findOne({_id : req.params.id})
        
        res.status(200).json({
            status : 200,
            success : true,
            message : 'Appointment has been Deleted'
        })

    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}
exports.searchAppointment=async(req,res,next)=>{
    const {day,date}= req.query
    try {
        const data = await Appointment.find({appointmentDay : day,appointmentDate : date})
        res.status(200).json({
            status : 200,
            success : true,
            data : data
        })

    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}
exports.getAllAppointment=async(req,res,next)=>{
    
    try {
        const data = await Appointment.find({userId : req.params.id})
        res.status(200).json({
            status : 200,
            success : true,
            data : data
        })

    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}
exports.getAppointmentDetails=async(req,res,next)=>{
    
    try {
        const appointment = await Appointment.findOne({_id : req.params.id})
        const doctor = await Doctor.findOne({_id : appointment?.doctorId})
        const chamber = await Chamber.findOne({_id : appointment?.chamberId})
        const user = await User.findOne({_id : appointment?.userId})
        const data ={
            ...appointment._doc,
            ...chamber._doc,
            ...doctor._doc,
            submitedBy : user?.name
        }
        res.status(200).json({
            status : 200,
            success : true,
            data : data
        })

    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}