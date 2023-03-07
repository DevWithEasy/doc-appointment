export default function Appointment(){
    return(
        <div className="space-y-2">
            <h1 className="text-2xl font-bold text-center uppercase">Get your appointment</h1>
            <hr/>

            <div className="relative flex justify-center space-x-2">
                <select name='day' className='p-2 border rounded focus:outline-none focus:ring-2'>
                    <option value="">Select Specialist category</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="WednesDay">WednesDay</option>
                    <option value="Thusday">Thusday</option>
                    <option value="Friday">Friday</option>
                </select>
                <select name='day' className='p-2 border rounded focus:outline-none focus:ring-2'>
                    <option value="">Select Day</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="WednesDay">WednesDay</option>
                    <option value="Thusday">Thusday</option>
                    <option value="Friday">Friday</option>
                </select>
                
                <button  className="px-6 bg-blue-400 text-white rounded-md">Find Appointment</button>
            </div>
            
        </div>
    )
}