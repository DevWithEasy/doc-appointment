const mongoose = require('mongoose');
const notificationSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Notification = mongoose.model('Notification', notificationSchema)
module.exports = Notification