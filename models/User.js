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
        default : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
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
