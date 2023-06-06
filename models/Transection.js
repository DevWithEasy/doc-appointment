const mongoose = require('mongoose');

const TransectionSchema = mongoose.Schema({
    tnxID:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref : 'User',
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    payment:{
        type:String,
        default : false,
        required:true
    }
},{
    timestamps:true
})

const Transection = mongoose.model('Transection',TransectionSchema)
module.exports = Transection