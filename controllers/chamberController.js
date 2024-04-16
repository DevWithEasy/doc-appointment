const Chamber = require("../models/Chamber")
const Doctor = require("../models/Doctor")

exports.findAllChambers = async (req, res, next) => {
    try {
        const doctor = await Doctor.findOne({ user: req.params.id })
        const chambers = await Chamber.find({ doctor: doctor._id })
            .populate('vanue')

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

exports.addChamber = async (req, res, next) => {
    try {
        const { userId, ...data } = req.body

        const doctor = await Doctor.findOne({ user: userId })

        if (doctor) {
            const newChamber = new Chamber({
                ...data,
                doctor: doctor._id
            })

            const chamber = await newChamber.save()

            await Doctor.findByIdAndUpdate(req.params.doctorId, {
                $push: {
                    chambers: chamber._id
                }
            })
            res.status(200).json({
                status: 200,
                success: true,
                message: 'Chamber added successfully',
                data: chamber
            })
        } else {
            res.status(404).json({
                status: 404,
                success: false,
                message: "Doctor not Found in this ID."
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

exports.updateChamber = async (req, res, next) => {

    try {
        const doctor = await Chamber.findByIdAndUpdate(
            req.params.id,
            {
                'limit': req.body.limit,
                'day': req.body.day,
                'from': req.body.from,
                'to': req.body.to
            },
            { new: true }
        )

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Chamber update successfully',
            data: doctor
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

exports.removeChamber = async (req, res, next) => {
    
    try {
        const chamber = await Chamber.findById(req.params.id)

        const doctor = await Doctor.findByIdAndUpdate(chamber.doctor,{
            $pull : {
                chambers : req.params.id
            }
        })

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Chamber deleted successfully',
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