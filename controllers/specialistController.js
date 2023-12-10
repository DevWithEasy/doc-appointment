const Specialist = require("../models/Specialist")

exports.createSpecialist=async(req,res,next)=>{

    try {
        const newSpecialist = new Specialist({
            ...req.body
        })

        const specialist = await newSpecialist.save()

        return res.status(200).json({
            status : 200,
            success : true,
            message : 'Create successfully.',
            data : specialist
        })

    } catch (error) {
        return res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}

exports.updateSpecialist=async(req,res,next)=>{

    try {
        const specialist = await Specialist.findByIdAndUpdate(req.params.id,{
            $set : {
                name : req.body.name
            }
        })
        return res.status(200).json({
            status : 200,
            success : true,
            message : 'Updated Successfully.',
            data : specialist
        })

    } catch (error) {
        return res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}

exports.deleteSpecialist=async(req,res,next)=>{

    try {
        await Specialist.FindByIdAndDelete(req.params.id)

        return res.status(200).json({
            status : 200,
            success : true,
            message : 'Deleted Successfully.'
        })

    } catch (error) {
        return res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}

exports.getAllSpecialist=async(req,res,next)=>{

    try {
        const specialists = await Specialist.find()

        return res.status(200).json({
            status : 200,
            success : true,
            message : 'Successfully find.',
            data : specialists
        })

    } catch (error) {
        return res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}