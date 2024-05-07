const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema({
  order : {
    type: String,
    required: true
  },
  doctor : {
    type: mongoose.Types.ObjectId,
    ref: 'Doctor'
  },
  chamber : {
    type: mongoose.Types.ObjectId,
    ref: 'Chamber',
    required : true
  },
  user : {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  name :{
    type : String,
    required : true
  },
  age :{
    type : String,
    required : true
  },
  gender :{
    type : String,
    required : true
  },
  phone :{
    type : String,
    required : true
  },
  address :{
    type : String,
    required : true
  },
  appointmentDay :{
    type : String,
    required : true
  },
  appointmentDate :{
    type : String,
    required : true
  },
  status : {
    type : String,
    enum : ['Confirmed','Pending','Canceled','Completed'],
    default : 'Pending'
  }
  },{timestamps : true})

const Appointment = mongoose.model('Appointment',appointmentSchema)
module.exports = Appointment
