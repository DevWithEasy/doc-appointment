function createAppointmentSerial(allApointments){
    if(allApointments.length === 0){
        const serial = `1`
        return serial
    }else if(allApointments.length === 1){
        const serial = `${allApointments.length+1}`
        return serial
    }
    // }else if(allApointments.length > 1 && allApointments.length < 10){
    //     const serial = `00${allApointments.length}`
    //     return serial
    // }else if(allApointments.length > 10 && allApointments.length <100){
    //     const serial = `0${allApointments.length}`
    //     return serial
    // }else if(allApointments.length > 99){
    //     const serial = allApointments.length
    //     return serial
    // }
}
module.exports = createAppointmentSerial