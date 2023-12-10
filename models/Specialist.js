const mongoose = require('mongoose');

const specialistSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Specialist = mongoose.model('Specialist',specialistSchema)
module.exports = Specialist