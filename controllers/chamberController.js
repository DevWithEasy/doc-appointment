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

        const doctor = await Doctor.findOne({user : userId})

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
        }else{
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
    const { userId, ...data } = req.body
    try {
        // const doctor = await Doctor.findOneAndUpdate({ _id: req.params.id, }{
        //     $set: {
        //         'limit': data.limit,
        //         'day': data.day,
        //         'from': data.from,
        //         'to': data.to
        //     }
        // }, { new: true })

        // res.status(200).json({
        //     status: 200,
        //     success: true,
        //     message: 'Chamber update successfully',
        //     data: doctor
        // })

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
    const { dId, cId } = req.query
    try {
        const doctor = await Doctor.findOneAndUpdate({ _id: dId }, { $pull: { 'chambers': { '_id': cId } } }, { new: true })

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