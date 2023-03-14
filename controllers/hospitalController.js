const Hospital = require("../models/Hospital")

exports.addHospital=async(req,res,next)=>{
    try {
        const newHospital = new Hospital({
            ...req.body,
            image : `/image/hospitals/${req.file.filename}`
        })
        newHospital.save(err=>{
            if(err){
                res.status(400).json({
                    status : 500,
                    success : false,
                    message : err.message
                })
            }else{
                res.status(200).json({
                    status : 200,
                    success : true,
                    message : 'Hospital added successfully'
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

exports.getAllHospital=async(req,res,next)=>{
    try {
        const hospitals = await Hospital.find({})
        res.status(200).json({
            status : 200,
            success : true,
            data : hospitals
        })

    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}

exports.updateHospital=async(req,res,next)=>{
    try {
        

    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}

exports.deleteHospital=async(req,res,next)=>{
    try {
        await Hospital.deleteOne({_id:req.params.id})
        res.status(200).json({
            status : 200,
            success : true,
            message : 'Hospital delete successfully'
        })

    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}