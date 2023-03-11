const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema({
  appointmentId : {
    type: String,
    required: true
  },
  doctorId : {
    type: mongoose.Types.ObjectId,
    required: true
  },
  chamberId : {
    type: mongoose.Types.ObjectId,
    required: true
  },
  patientName :{
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
  patientPhone :{
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
    type : Date,
    required : true
  },
  userId : {
    type: mongoose.Types.ObjectId,
    required: true
  },
  status : {
    type : String,
    enum : ['Confirmed','Pending','Rejected','Canceled','Completed'],
    default : 'Pending'
  }
  },{timestamps : true})

const Appointment = mongoose.model('Appointment',appointmentSchema)
module.exports = Appointment
