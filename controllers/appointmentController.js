const Appointment = require('../models/Appointment')
const Doctor = require('../models/Doctor')
const User = require('../models/User')
exports.addAppointment=async(req,res,next)=>{
    try {
        const user = await User.findOne({_id : req.body.userId})

        if(user.balance < 10) {
            return res.status(500).json({
                status : 500,
                success : false,
                message : 'Unsufficient balance.'
            })
        }

        const all = await Appointment.find({appointmentDate : req.body.appointmentDate})

        const newAppointment = new Appointment({
            ...req.body,
            user : req.body.userId,
            appointmentId : all.length == 0 ? 1 : all.length+1
        })

        const doctor = await Doctor.findOne({_id : req.body.doctor})

        await User.findByIdAndUpdate(doctor.user,{
            $push : {
                notifications : {
                    id : Date.now(),
                    name : req.body.patientName,
                    message : `${req.body.patientName} has been applied for appointments.`,
                    day : req.body.appointmentDay,
                    date : req.body.appointmentDate,
                    onClickPath : `/doctor/allAppointments/search?day=${req.body.appointmentDay}&date=${req.body.appointmentDate}`,
                    status : 'unread'
                }
            }
        })

        await User.findByIdAndUpdate(req.body.userId,{
            $inc : {
                balance : -10
            }
        })
        
        newAppointment.save()
        res.status(200).json({
            status : 200,
            success : true,
            message : 'Successfully applied'
        })

    } catch (error) {
        console.log(error)
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
        const doctor = await Doctor.findOne({_id : appointment.doctor})
        const user = await User.findOne({_id : appointment.user})
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
        const doctor = await Doctor.findOne({_id : appointment.doctor})
        const user = await User.findOne({_id : appointment.user})
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

        const appointment = await Appointment.findOne({_id:req.params.id})

        if(appointment.status == 'Confirmed'){
            return res.status(403).json({
                status : 403,
                success : false,
                message : 'Already Confirmed.You can not cancel.'
            })
        }

        await Appointment.findByIdAndRemove(req.params.id)

        await User.findByIdAndUpdate(appointment.user,{
            $inc : {
                balance : 5
            }
        })
        
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
exports.completeAppointment=async(req,res,next)=>{
    try {
        await Appointment.updateOne({_id:req.params.id}, {$set:{
            status : 'Completed'
        }})
        
        res.status(200).json({
            status : 200,
            success : true,
            message : 'Appointment has been Completed'
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
        const doctor = await Doctor.findOne({user : req.body.userId})
        const data = await Appointment.find({
            doctor : doctor._id, 
            appointmentDay : day, 
            appointmentDate : date,
            status : {
                $ne : 'Canceled'
            }
        })
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
        const data = await Appointment.find({user : req.params.id})
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
        const appointment = await Appointment.findById(req.params.id).populate('doctor').populate('user','name')
        
        res.status(200).json({
            status : 200,
            success : true,
            data : appointment
        })

    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}
exports.getAppointmentStatus=async(req,res,next)=>{
    
    try {
        const appointment = await Appointment.findById(req.query.aId)

        if (appointment.status=== 'Completed'){
            return  res.status(200).json({
                status : 200,
                success : true,
                position : 0,
                message : `Appointment has been completed successfully`
            })
        }

        const appointments = await Appointment.find({
            doctor : req.query.dId,
            appointmentDate : req.query.date,
            status : {
                $nin : ['Rejected','Canceled','Completed']
            }
        })
        
        const status = appointments.findIndex(appointment=>appointment._id == req.query.aId)

        res.status(200).json({
            status : 200,
            success : true,
            position : status === -1 ? -1 : status+1,
            message : status === -1 ? `Appointment has been cancel or rejected` : `You are currently : ${status+1 <10 ? `0${status+1}` : status+1}`
        })


    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}