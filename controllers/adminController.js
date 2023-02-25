const Doctor = require("../models/Doctor")
const User = require("../models/User")

exports.getAlldoctors=async(req,res,next)=>{
    try {
        const doctors = await Doctor.find({}).sort({createdAt: -1})
        res.status(200).json({
            status : 200,
            success : true,
            data : doctors
        })
    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}
exports.getAllusers=async(req,res,next)=>{
    try {
        const users = await User.find({}).sort({createdAt: -1})
        res.status(200).json({
            status : 200,
            success : true,
            data : users
        })
    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}

exports.getAllhospitals=async(req,res,next)=>{
    try {
        const users = await User.find({})
        res.status(200).json({
            status : 200,
            success : true,
            data : users
        })
    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}

// exports.seenNotification=async(req,res,next)=>{
//     try {
        
//         res.status(200).json({
//             status : 200,
//             success : true,
//             data : user
//         })
//     } catch (error) {
//         res.status(500).json({
//             status : 500,
//             success : false,
//             message : error.message
//         })
//     }
// }