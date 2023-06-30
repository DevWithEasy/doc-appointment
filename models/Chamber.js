const mongoose = require('mongoose');
const chamberSchema = mongoose.Schema({
  doctorId : {
    type: mongoose.Types.ObjectId,
    required: 'Doctor'
  },
  location :{
    type : String,
    required : true
  },
  vanue :{
    type : String,
    required : true
  },
  day :{
    type : String,
    required : true
  },
  from :{
    type : String,
    required : true
  },
  to :{
    type : String,
    required : true
  }
  },{timestamps : true})

const Chamber = mongoose.model('Chamber',chamberSchema)
module.exports = Chamber
