const mongoose = require('mongoose');

const TransectionSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref : 'User',
        required:true
    },
    number:{
        type:String,
        required:true
    },
    payment:{
        type:String,
        required:true
    },
    tnxID:{
        type:String,
        required:true
    },
    
},{
    timestamps:true
})

const Transection = mongoose.model('Transection',TransectionSchema)
module.exports = Transection