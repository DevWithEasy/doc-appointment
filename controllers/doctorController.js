const User = require("../models/User")
const Doctor = require("../models/Doctor")
const createError = require("../utils/createError")
const Specialist = require('../models/Specialist')

exports.applyDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.findOne({ user: req.body.userId })

        if (doctor) return res.status(403).json({
            status: 405,
            success: false,
            message: 'Already sent a request'
        })

        const admin = await User.findOne({ isAdmin: true })
        admin.notifications.push({
            id: Date.now(),
            doctorId: req.body.userId,
            name: `${req.body.firstName} ${req.body.lastName}`,
            message: `${req.body.firstName} ${req.body.lastName} has been applied to a doctor.`,
            onClickPath: '/admin/doctors/',
            status: 'unread'
        })
        const newDoctor = new Doctor({
            user: req.body.userId,
            ...req.body
        })
        newDoctor.save()
            .then(data => {
                User.updateOne({ isAdmin: true }, {
                    $push: {
                        notifications: {
                            id: Date.now(),
                            doctorId: req.body.userId,
                            name: `${req.body.firstName} ${req.body.lastName}`,
                            message: `${req.body.firstName} ${req.body.lastName} has been applied to a doctor.`,
                            onClickPath: '/admin/doctors/',
                            status: 'unread'
                        }
                    }
                })
                    .then(() => {
                        res.status(200).json({
                            status: 200,
                            success: true,
                            message: 'Doctor has been applied'
                        })
                    })
                    .catch(error => {
                        res.status(500).json({
                            status: 500,
                            success: false,
                            message: error.message
                        })
                    })
            })
            .catch(error => {
                res.status(500).json({
                    status: 500,
                    success: false,
                    message: error.message
                })
            })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.approvedDoctor = async (req, res, next) => {
    try {
        const admin = await User.findOne({ _id: req.body.userId })
        if (!admin.isAdmin) return createError(403, 'Sorry, you are not admin')

        const doctor = await Doctor.findByIdAndUpdate(req.params.id, { $set: { status: 'Approved' } }, { new: true })

        const user = await User.findByIdAndUpdate(doctor.user, { $set: { isDoctor: true } }, { new: true })

        user.notifications.push({
            id: Date.now(),
            doctorId: doctor._id,
            name: `${doctor.firstName} ${doctor.lastName}`,
            message: `${doctor.firstName} ${doctor.lastName} has been approved your doctor request.`,
            onClickPath: `/doctor/dashboard/`,
            status: 'unread'
        })
        user.save()

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Doctor approved successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.cancelDoctor = async (req, res, next) => {
    try {
        const admin = await User.findOne({ _id: req.body.userId })
        if (!admin.isAdmin) return createError(403, 'Sorry, you are not admin')

        const doctor = await Doctor.findOne({ _id: req.params.id })

        const user = await User.findOne({ _id: doctor.user })

        user.notifications.push({
            id: Date.now(),
            doctorId: doctor._id,
            name: `${doctor.firstName} ${doctor.lastName}`,
            message: `${doctor.firstName} ${doctor.lastName} has been cancel request.`,
            onClickPath: `/apply-doctor`,
            status: 'unread'
        })
        user.save()

        await Doctor.deleteOne({ _id: req.params.id })

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Doctor cancel successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.updateDoctor = async (req, res, next) => {
    try {
        const { q } = req.query
        if (q === 'info') {
            const doctor = await Doctor.findByIdAndUpdate(req.params.id, {
                $set: {
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    website: req.body.website,
                    workedAt: req.body.workedAt,
                    designation: req.body.designation,
                    education: req.body.education,
                    specialization: req.body.specialization,
                    experience: req.body.experience,
                    experienceArea: req.body.experienceArea,
                    feesPerConsultation: req.body.feesPerConsultation
                }
            }, { new: true })
            return res.status(200).json({
                status: 200,
                success: true,
                data: doctor
            })
        } else if (q === 'bio') {
            const doctor = await Doctor.findByIdAndUpdate(req.params.id, {
                $set: {
                    bio: req.body.bio,
                }
            }, { new: true })

            return res.status(200).json({
                status: 200,
                success: true,
                data: doctor
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

exports.deleteDoctor = async (req, res, next) => {
    try {
        const admin = await User.findOne({ _id: req.body.userId })
        if (!admin.isAdmin) return createError(403, 'Sorry, you are not admin')

        const doctor = await Doctor.findOne({ _id: req.params.id })

        const user = await User.findByIdAndUpdate(doctor.user, { $set: { isDoctor: false } }, { new: true })

        user.notifications.push({
            id: Date.now(),
            doctorId: doctor._id,
            name: `${doctor.firstName} ${doctor.lastName}`,
            message: `${doctor.firstName} ${doctor.lastName} has been delete doctor profile.`,
            onClickPath: `/`,
            status: 'unread'
        })
        user.save()

        await Doctor.deleteOne({ _id: req.params.id })

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Doctor delete successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.getHomeData = async (req, res, next) => {
    try {
        const totalDoctors = await Doctor.count({ status: 'Approved' })
        const doctors = await Doctor.find({ status: 'Approved' }).populate('user', 'image gender -_id').populate('specialization')
        const specializations = await Specialist.find({})

        res.status(200).json({
            status: 200,
            success: true,
            data: {
                total: totalDoctors,
                doctors,
                specializations
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

exports.findDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.findOne({ user: req.params.id })

        const doctors = await Doctor.find({ specialization: doctor.specialization }).limit(6)

        res.status(200).json({
            status: 200,
            success: true,
            data: {
                doctor,
                doctors,
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

exports.findDoctorBySpecialist = async (req, res, next) => {
    try {

        const specializations = await Specialist.find({})

        const doctors = await Doctor.find(
            {
                status: 'Approved',
                specialization: req.params.id
            }
        )
            .populate('user', 'image gender -_id')
            .populate('specialization')

        res.status(200).json({
            status: 200,
            success: true,
            data: {
                doctors,
                specializations
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

exports.findDoctorByPagination = async (req, res, next) => {
    try {
        const skip = Number(req.params.no * 10)
        const totalDoctors = await Doctor.count({ status: 'Approved' })
        const doctors = await Doctor.find({ status: 'Approved' })
            .populate('user', 'image -_id')
            .populate('specialization')
            .skip(skip)
            .limit(10)

        res.status(200).json({
            status: 200,
            success: true,
            total: totalDoctors,
            data: doctors,
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.findDoctorByDayAndSpecialist = async (req, res, next) => {
    try {
        const { specialization, day } = req.query
        const doctors = await Doctor.find({ status: 'Approved', specialization: specialization })
            .populate('user', 'image')



        res.status(200).json({
            status: 200,
            success: true,
            data: doctors
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
        const doctor = await Doctor.findById(req.params.id)
            .populate('user')
            .populate('specialization')
            .populate({
                path: 'chambers',
                populate: {
                    path: 'vanue',
                    model: 'Vanue'
                }
            })

        const doctors = await Doctor.find({
            specialization: doctor.specialization,
            _id: {
                $ne: req.params.id
            }
        })
            .limit(6)
            .populate('user')
            .populate('specialization')

        res.status(200).json({
            status: 200,
            success: true,
            data: {
                doctor,
                doctors
            }
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

exports.findForAppointmentSubmit = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
            .populate('user')
            .populate('specialization')
            .populate({
                path: 'chambers',
                populate: {
                    path: 'vanue',
                    model: 'Vanue'
                }
            })

        res.status(200).json({
            status: 200,
            success: true,
            data: doctor
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.findDoctorProfile = async (req, res, next) => {
    try {
        const doctor = await Doctor.findOne({ user: req.params.id })
            .populate('specialization')

        const specialists = await Specialist.find({})

        res.status(200).json({
            status: 200,
            success: true,
            data: { doctor, specialists }
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}