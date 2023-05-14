const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
      type : String,
      required : true,
    },
    email:{
      type : String,
      required : true,
      unique : true,
      trim : true,
      lowercase : true
    },
    phone:{
      type : String,
      required : true,
      unique : true,
      trim : true
    },
    password:{
      type : String,
      trim : true,
    },
    gender:{
      type : String,
      enum : ['Male','Female','Others'],
    },
    dob:{
      type : Date
    },
    balance : {
      type : Number,
      required : true,
      default : 50
    },
    isVerified : {
      type : Boolean,
      default : false
    },
    isAdmin : {
      type : Boolean,
      default : false
    },
    isDoctor : {
      type : Boolean,
      default : false
    },
    isHospital : {
      type : Boolean,
      default : false
    },
    image: {
      public_id : {
        type : String,
        default : ''
      },
      url: {
        type : String,
        default : '/image/users/default_profile.jpg'
      }
    },
    address : {
      district : {
        type : String,
        default : ''
      },
      upazilla : {
        type : String,
        default : ''
      },
      post_office : {
        type : String,
        default : ''
      },
      location : {
        type : String,
        default : ''
      },
    },
    appointments:[
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Appointment"
      }
    ],
    notifications : {
      type : Array,
      default : []
    }
  },{timestamps : true})

const User = mongoose.model('User',userSchema)
module.exports = User
