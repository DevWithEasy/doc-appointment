const mongoose = require('mongoose');
const ambulanceSchema = mongoose.Schema({
  user : {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  isVerified :{
    type : Boolean,
    default: false
  },
  phone : {
    type : String,
    required : true
  },
  vehicle : {
    type : String,
    required : true
  },
  driving_licence : {
    type : String,
    required : true
  },
  nid_front : {
    type : String,
    required : true
  },
  nid_back : {
    type : String,
    required : true
  }
  },{timestamps : true})

const Ambulance = mongoose.model('Ambulance',ambulanceSchema)
module.exports = Ambulance
