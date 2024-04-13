const mongoose = require('mongoose')

const vanueSchema = mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  location :{
    type : String,
    required : true
  },
  type : {
    type : String,
    enum : ['hospital','diagnostic','clinic','p_chamber']
  },
  open :{
    type : String,
    required : true
  },
  close :{
    type : String,
    required : true
  },
  lat : {
    type : String,
    required : true
  },
  long : {
    type : String,
    required : true
  },
  isVerified : {
    type : Boolean,
    default : false
  }
  },{timestamps : true})

const Vanue = mongoose.model('Vanue',vanueSchema)
module.exports = Vanue
