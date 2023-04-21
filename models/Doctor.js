const mongoose = require('mongoose');
const doctorSchema = mongoose.Schema({
    user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    },
    firstName:{
      type : String,
      required : true,
    },
    lastName:{
        type : String,
        required : true,
      },
    phone:{
      type : String,
      required : true,
    },
    email:{
      type : String,
      required : true,
    },
    website:{
      type : String,
    },
    workedAt : {
      type : String,
      default : '',
    },
    designation : {
      type : String,
      default : '',
    },
    education:{
      type : String,
      required : true,
    },
    specialization:{
      type : String,
      required : true,
    },
    experience:{
      type : String,
      required : true,
    },
    experienceArea:{
      type : String,
      default : '',
    },
    feesPerConsultation:{
      type : String,
      required : true,
    },
    chambers:[],
    rating:[
      {
        user : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'User'
        },
        comment : {
          type : String,
          required : true
        },
        rate : {
          type : Number,
          required : true
        }
      }
    ],
    status : {
      type : String,
      enum : ['Pending','Approved','Rejected','Block'],
      default : 'Pending'
    }
  },{timestamps : true})

const Doctor = mongoose.model('Doctor',doctorSchema)
module.exports = Doctor
