const Appointment = require('../models/Appointment')
const Doctor = require('../models/Doctor')
const User = require('../models/User')
const getObjectId = require('../utils/getObjectId')

exports.addAppointment=async(req,res,next)=>{
    try {
        const user = await User.findById(req.body.userId)

        if(user.balance < 10) {
            return res.status(405).json({
                status : 405,
                success : false,
                message : 'Unsufficient balance.'
            })
        }
        const doctor = await Doctor.findOne({_id : req.body.doctor})

        const chamber = doctor.chambers.find(chamber=> getObjectId(chamber._id) === req.body.chamberId)
        
        const appointments = await Appointment.find(
            {
                appointmentDate : req.body.appointmentDate,
                appointmentDay : req.body.appointmentDay,
                chamberId : req.body.chamberId
            }
        ).countDocuments()

        if(appointments >= chamber.appointment_limit){
            return res.status(406).json({
                status : 406,
                success : false,
                message : 'Appointment Completed. Please try another chamber or day'
            })
        }

        const newAppointment = new Appointment({
            ...req.body,
            user : req.body.userId,
            appointmentId : appointments == 0 ? 1 : appointments+1
        })

        const notification = {
            id : Date.now(),
            name : req.body.patientName,
            message : `${req.body.patientName} has been applied for appointments.`,
            day : req.body.appointmentDay,
            date : req.body.appointmentDate,
            onClickPath : `/doctor/allAppointments/search?day=${req.body.appointmentDay}&date=${req.body.appointmentDate}`,
            status : 'unread'
        }

        const doctorUserProfile = await User.findByIdAndUpdate(doctor.user,{
            $push : {
                notifications : notification
            }
        },{new : true})

        await User.findByIdAndUpdate(req.body.userId,{
            $inc : {
                balance : -10
            }
        })
        
        newAppointment.save()
        res.status(200).json({
            status : 200,
            success : true,
            message : 'Successfully applied',
            data : {
                doctor : doctorUserProfile._id,
                notification
            }
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
        const notification = {
            id : Date.now(),
            name : user?.name,
            message : `${doctor?.name} has been confirmed your appointments.`,
            onClickPath : `/appointments`,
            status : 'unread'
        }
        
        user.notifications.push(notification)
        user.save()

        res.status(200).json({
            status : 200,
            success : true,
            message : 'Appointment has been confirmed',
            data : {
                user : user._id,
                notification
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
exports.rejectAppointment=async(req,res,next)=>{
    try {
        const appointment = await Appointment.findOne({_id : req.params.id})
        const doctor = await Doctor.findOne({_id : appointment.doctor})
        const user = await User.findOne({_id : appointment.user})
        await Appointment.updateOne({_id:req.params.id}, {$set:{
            status : 'Rejected'
        }})
        const notification = {
            id : Date.now(),
            name : user?.name,
            message : `${doctor?.name} has been reject your appointments.`,
            onClickPath : `/appointments`,
            status : 'unread'
        }
        user.notifications.push(notification)
        user.save()
        res.status(200).json({
            status : 200,
            success : true,
            message : 'Appointment has been Rejected',
            data : {
                user : user._id,
                notification
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
        const appointment = await Appointment.findById(req.params.id).populate('doctor','name feesPerConsultation chambers').populate('user','-_id name')
        
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