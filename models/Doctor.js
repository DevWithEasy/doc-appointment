const mongoose = require('mongoose');
const doctorSchema = mongoose.Schema({
    user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    },
    name:{
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
    chambers:[
      {
        vanue : {
          type : String,
          required : true
        },
        location : {
          type : String,
          required : true
        },
        day : {
          type : String,
          required : true
        },
        appointment_limit : {
          type : Number,
          required : true
        },
        from : {
          type : String,
          required : true
        },
        to : {
          type : String,
          required : true
        }
      }
    ],
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
      enum : ['Pending','Approved','Rejected'],
      default : 'Pending'
    }
  },{timestamps : true})

const Doctor = mongoose.model('Doctor',doctorSchema)
module.exports = Doctor
