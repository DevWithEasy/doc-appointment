const mongoose = require('mongoose');
const doctorSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  workedAt: {
    type: String,
    default: '',
  },
  designation: {
    type: String,
    default: '',
  },
  education: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  experienceArea: {
    type: String,
    default: '',
  },
  feesPerConsultation: {
    type: String,
    required: true,
  },
  chambers: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Chamber',
        required: true
      }
    ],
    required: true,
    default: []
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true })

const Doctor = mongoose.model('Doctor', doctorSchema)
module.exports = Doctor
