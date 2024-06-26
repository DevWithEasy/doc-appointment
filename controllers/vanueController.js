const { populate } = require("dotenv")
const Chamber = require("../models/Chamber")
const Doctor = require("../models/Doctor")
const Vanue = require("../models/Vanue")

exports.addHospital = async (req, res, next) => {
    try {
        const newVanue = new Vanue({
            ...req.body
        })

        const hospital = await newVanue.save()

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Vanue added successfully',
            data: hospital
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.getHospital = async (req, res, next) => {
    try {
        const hospital = await Vanue.findOne({ _id: req.params.id })
        res.status(200).json({
            status: 200,
            success: true,
            data: hospital
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.getAllHospital = async (req, res, next) => {
    try {
        const hospitals = await Vanue.find({})

        res.status(200).json({
            status: 200,
            success: true,
            data: hospitals
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error
        })
    }
}

exports.updateHospital = async (req, res, next) => {
    try {
        await Vanue.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                location: req.body.location,
                type: req.body.type,
                open: req.body.open,
                close: req.body.close,
                lat: req.body.lat,
                long: req.body.long,
            }
        }
        )

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Successfully updated'
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.deleteHospital = async (req, res, next) => {
    try {

        await Vanue.findByIdAndDelete({ _id: req.params.id })

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Vanue delete successfully'
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.getHospitalDoctors = async (req, res, next) => {
    try {
        const chambers = await Chamber.find({ vanue: req.params.id })
        .populate('doctor')
        .populate({
            path : 'doctor',
            populate : {
                path : 'user',
                model : 'User'
            }
        })
        .populate({
            path : 'doctor',
            populate : {
                path : 'specialization',
                model : 'Specialist'
            }
        })
        res.status(200).json({
            status: 200,
            success: true,
            data: chambers
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}