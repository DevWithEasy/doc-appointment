export function selectedDay(selected,doctor,setChamber,toast){
    if(new Date(selected).getTime() < Date.now()){
        return toast.error('আপনি আজকের থেকে পরবর্তী তারিখ বাছাই করুন')
    }
    const date = new Date(selected);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[date.getDay()];
    const days = doctor?.chambers.map(chamber=> chamber.day)
    const day = days.find(day => day === dayName)
    const chamber = doctor?.chambers.find(chamber=>chamber.day === day)
    if(day === undefined){
        setChamber({})
        toast.error(`চেম্বার লিস্টে যে বার গুলো দেওয়া আছে,সেই বার অনুযায়ী তারিখ বাছাই করে আপনার অ্যাপয়েন্টম্যান্ট নিশ্চিত করুন`)
    }else{
        setChamber({...chamber,date : date.toLocaleDateString()}) 
    }
}