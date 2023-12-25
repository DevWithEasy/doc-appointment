const mongoose = require('mongoose');
const chamberSchema = mongoose.Schema({
    doctor: {
        type: mongoose.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    vanue: {
        type: mongoose.Types.ObjectId,
        ref: 'Vanue',
        required: true
    },
    day: {
        type: String,
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Chamber = mongoose.model('Chamber', chamberSchema)
module.exports = Chamber