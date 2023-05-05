const mongoose = require('mongoose');

const verifySchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    expired:{
        type : Date,
        default : Date.now() + 21600000
    }
},{
    timestamps:true
})

const Verification = mongoose.model('Verification',verifySchema)
module.exports = Verification