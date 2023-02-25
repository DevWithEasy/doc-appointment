const mongoose = require('mongoose');
const doctorSchema = mongoose.Schema({
    userId : {
      type : mongoose.Schema.Types.ObjectId
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
      type : Number,
      required : true,
    },
    experienceArea:{
      type : String,
      default : '',
    },
    feesPerConsultation:{
      type : Number,
      required : true,
    },
    chambers:[
      {
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
      }
    ],
    rating:[
      {
        userId : {
          type : mongoose.Schema.Types.ObjectId,
          required : true
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
