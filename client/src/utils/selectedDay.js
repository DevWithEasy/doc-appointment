export function selectedDay(selected,doctor,setChamber,toast){
    if(new Date(selected).getTime() < Date.now()){
        return toast.error('Please select a date upper date than now')
    }
    const date = new Date(selected);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[date.getDay()];
    const days = doctor?.chambers.map(chamber=> chamber.day)
    const day = days.find(day => day === dayName)
    const chamber = doctor?.chambers.find(chamber=>chamber.day === day)
    if(day === undefined){
        setChamber({})
        toast.error(`Please select a date from calender chamber list day name available`)
    }else{
        setChamber({...chamber,date : date.toLocaleDateString()}) 
    }
}