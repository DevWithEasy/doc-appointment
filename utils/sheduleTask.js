const cron = require('node-cron');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const getTimeValue = require('./getTimeValue');

function sheduleTask(){
    cron.schedule('1 0 * * *',async()=>{
        const appointments = await Appointment.find({status : 'Rejected'})

        appointments.forEach(async appointment=>{

            if(getTimeValue(appointment.appointmentDate) < Date.now()){

                await User.findByIdAndUpdate(appointment.user,{
                    $inc : {
                        balance : 10
                    }
                })

                await Appointment.findByIdAndDelete(appointment._id)
            }

        })
    })
}

module.exports = sheduleTask;