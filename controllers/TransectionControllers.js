const Transection = require("../models/Transection")

exports.AddBalance=async(req,res,next)=>{
    try {
        const newTransection = new Transection({
            ...req.body,
            user : req.body.userId
        })

        await newTransection.save()

        res.status(200).json({
            status : 200,
            success : true,
            message : 'Request sent successfully'
        })
    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}