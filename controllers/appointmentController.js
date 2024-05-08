const Appointment = require('../models/Appointment')
const Doctor = require('../models/Doctor')
const Notification = require('../models/Notification')
const User = require('../models/User')

exports.findAppointment = async (req, res, next) => {
    try {
        console.log(req.params.id)
        // const doctor = await Doctor.findById(req.params.id)
        // .populate('user', 'image -_id')
        // .populate('specialization')
        // .populate({
        //     path : 'chambers',
        //     populate : {
        //         path : 'vanue',
        //         model : 'Vanue'
        //     }
        // })
        // res.status(200).json({
        //     status : 200,
        //     success : true,
        //     message : 'Successfully applied',
        //     data : doctor
        // })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.addAppointment = async (req, res, next) => {
    try {

        const user = await User.findById(req.body.userId)
        const doctor  = await Doctor.findById(req.body.doctor)

        if (user.balance < 10) {
            return res.status(405).json({
                status: 405,
                success: false,
                message: 'আপনার ব্যালেন্স শেষ হয়ে গেছে।'
            })
        }

        const appointments = await Appointment.find(
            {
                appointmentDate: req.body.chamber.date,
                appointmentDay: req.body.chamber.day,
                chamber: req.body.chamber._id
            }
        ).countDocuments()
        

        if(appointments >= req.body.chamber.limit){
            return res.status(406).json({
                status : 406,
                success : false,
                message : 'আপয়েন্টমেন্ট নেওয়া শেষ। অন্য তারিখে বা চেম্বারে চেষ্টা করুন।'
            })
        }

        const newAppointment = new Appointment({
            order : appointments == 0 ? 1 : appointments+1,
            doctor : req.body.doctor,
            chamber : req.body.chamber._id,
            user : req.body.userId,
            name : req.body.name,
            age : req.body.age,
            gender : req.body.gender,
            phone : req.body.phone,
            address : req.body.address,
            appointmentDay : req.body.chamber.day,
            appointmentDate : req.body.chamber.date
        })

        const newNotification = new Notification({
            user : doctor.user,
            message : `${user.name} take a new appointment ${req.body.chamber.date}`,
            path : `/user/doctor/${doctor.user}/appointments?date=${req.body.chamber.date}`
        })

        await newAppointment.save()

        const notification = await newNotification.save()

        await User.findByIdAndUpdate(req.body.userId,{
            $inc : {
                balance : -10
            }
        })

        res.status(200).json({
            status : 200,
            success : true,
            message : 'আপনার আপয়েন্টমেন্ট সফলভাবে গ্রহন হয়েছে।',
            data : notification
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.confirmAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findOne({ _id: req.params.id })
        const doctor = await Doctor.findOne({ _id: appointment.doctor })
        const user = await User.findOne({ _id: appointment.user })
        await Appointment.updateOne({ _id: req.params.id }, {
            $set: {
                status: 'Confirmed'
            }
        })
        const notification = {
            id: Date.now(),
            name: user?.name,
            message: `${doctor?.name} has been confirmed your appointments.`,
            onClickPath: `/appointments`,
            status: 'unread'
        }

        user.notifications.push(notification)
        user.save()

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Appointment has been confirmed',
            data: {
                user: user._id,
                notification
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

exports.rejectAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findOne({ _id: req.params.id })
        const doctor = await Doctor.findOne({ _id: appointment.doctor })
        const user = await User.findOne({ _id: appointment.user })
        await Appointment.updateOne({ _id: req.params.id }, {
            $set: {
                status: 'Rejected'
            }
        })
        const notification = {
            id: Date.now(),
            name: user?.name,
            message: `${doctor?.name} has been reject your appointments.`,
            onClickPath: `/appointments`,
            status: 'unread'
        }
        user.notifications.push(notification)
        user.save()
        res.status(200).json({
            status: 200,
            success: true,
            message: 'Appointment has been Rejected',
            data: {
                user: user._id,
                notification
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

exports.cancelAppointment = async (req, res, next) => {
    try {

        const appointment = await Appointment.findOne({ _id: req.params.id })

        if (appointment.status == 'Confirmed') {
            return res.status(403).json({
                status: 403,
                success: false,
                message: 'Already Confirmed.You can not cancel.'
            })
        }

        await Appointment.findByIdAndRemove(req.params.id)

        await User.findByIdAndUpdate(appointment.user, {
            $inc: {
                balance: 5
            }
        })

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Appointment has been Canceled'
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.completeAppointment = async (req, res, next) => {
    try {
        await Appointment.updateOne({ _id: req.params.id }, {
            $set: {
                status: 'Completed'
            }
        })

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Appointment has been Completed'
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.deleteAppointment = async (req, res, next) => {
    try {
        await Appointment.findOne({ _id: req.params.id })

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Appointment has been Deleted'
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.searchAppointment = async (req, res, next) => {
    const { date } = req.query
    try {
        const doctor = await Doctor.findOne({ user: req.body.userId })
        const data = await Appointment.find({
            doctor: doctor._id,
            appointmentDate: date
        })
        res.status(200).json({
            status: 200,
            success: true,
            data: data
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.getAllAppointment = async (req, res, next) => {

    try {
        const data = await Appointment
        .find({ user: req.params.id })
        .populate('doctor')
        .populate({
            path : 'chamber',
            populate : {
                path : 'vanue',
                model : 'Vanue'
            }
        })
        res.status(200).json({
            status: 200,
            success: true,
            data: data
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.getAppointmentDetails = async (req, res, next) => {

    try {
        const appointment = await Appointment.findById(req.params.id).populate('doctor', 'name feesPerConsultation chambers').populate('user', '-_id name')

        res.status(200).json({
            status: 200,
            success: true,
            data: appointment
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.getAppointmentStatus = async (req, res, next) => {

    try {
        const appointment = await Appointment.findById(req.query.aId)

        if (appointment.status === 'Completed') {
            return res.status(200).json({
                status: 200,
                success: true,
                position: 0,
                message: `Appointment has been completed successfully`
            })
        }

        const appointments = await Appointment.find({
            doctor: req.query.dId,
            appointmentDate: req.query.date,
            status: {
                $nin: ['Rejected', 'Canceled', 'Completed']
            }
        })

        const status = appointments.findIndex(appointment => appointment._id == req.query.aId)

        res.status(200).json({
            status: 200,
            success: true,
            position: status === -1 ? -1 : status + 1,
            message: status === -1 ? `Appointment has been cancel or rejected` : `You are currently : ${status + 1 < 10 ? `0${status + 1}` : status + 1}`
        })


    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}