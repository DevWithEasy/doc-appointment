const mongoose = require('mongoose');
const hostipalSchema = mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  location :{
    type : String,
    required : true
  },
  image :{
    type : String,
    required : true
  },
  type : {
    type : String,
    required : true
  },
  open :{
    type : String,
    required : true
  },
  close :{
    type : String,
    required : true
  },
  lat :{
    type : String,
    default : ''
  },
  long :{
    type : String,
    default : ''
  },
  },{timestamps : true})

const Hospital = mongoose.model('Hospital',hostipalSchema)
module.exports = Hospital
