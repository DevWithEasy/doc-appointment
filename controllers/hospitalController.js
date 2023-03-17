const Hospital = require("../models/Hospital")
const path = require('path')
const fs = require('fs')

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

exports.getHospital=async(req,res,next)=>{
    try {
        const hospital = await Hospital.findOne({_id : req.params.id})
        res.status(200).json({
            status : 200,
            success : true,
            data : hospital
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
            message : error
        })
    }
}

exports.updateHospital=async(req,res,next)=>{
    try {
        const hospital = await Hospital.findOne({_id : req.params.id})
        if(req.file){
            await Hospital.updateOne({_id : req.params.id},{$set : {
                name : req.body.name,
                location : req.body.location,
                image : `/image/hospitals/${req.file.filename}`,
                type : req.body.type,
                open : req.body.open,
                close : req.body.close,
                lat : req.body.lat,
                long : req.body.long,
            }})
            const filepath = path.join(path.dirname(__dirname),'public',hospital.image)
            fs.unlinkSync(filepath,(err)=>{
                if(err){
                    res.status(400).json({
                        status : 400,
                        success : false,
                        message : err.message
                    })
                }
            })
            res.status(200).json({
                status : 200,
                success : true,
                message : 'Successfully updated'
            })
            
            
        }else {

            await Hospital.updateOne({_id : req.params.id},{$set : {
                name : req.body.name,
                location : req.body.location,
                type : req.body.type,
                open : req.body.open,
                close : req.body.close,
                lat : req.body.lat,
                long : req.body.long,
            }})

            res.status(200).json({
                status : 200,
                success : true,
                message : 'Successfully updated'
            })
        }

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
        const hospital = await Hospital.findOne({_id : req.params.id})

        await Hospital.deleteOne({_id:req.params.id})

        const filepath = path.join(path.dirname(__dirname),'public',hospital.image)
        fs.unlinkSync(filepath,(err)=>{
            if(err){
                res.status(400).json({
                    status : 400,
                    success : false,
                    message : err.message
                })
            }
        })
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