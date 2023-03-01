function createAppointmentSerial(allApointments,date){
    if(allApointments.length === 0){
        const serial = `${new Date(date).getDate()}${new Date(date).getMonth()+1}001`
        return serial
    }else if(allApointments.length > 0 && allApointments.length < 10){
        const serial = `${new Date(date).getDate()}${new Date(date).getMonth()+1}00${allApointments.length}`
        return serial
    }else if(allApointments.length > 10 && allApointments.length <100){
        const serial = `${new Date(date).getDate()}${new Date(date).getMonth()+1}0${allApointments.length}`
        return serial
    }else if(allApointments.length > 99){
        const serial = `${new Date(date).getDate()}${new Date(date).getMonth()+1}${allApointments.length}`
        return serial
    }
}
module.exports = createAppointmentSerial