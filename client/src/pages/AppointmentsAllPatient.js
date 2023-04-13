import axios from 'axios';
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import AppointmentDetails from "../components/AppointmentDeatils";
import dateGenerator from "../utils/dateGenerator";

export default function AppointmentsAllPatient(){
    const [day,setDay] = useState('')
    const [date,setDate] = useState('');
    const [selected, setSelected] = useState()
    const [view,setView] = useState(false)
    const [id,setId] = useState()
    const [appointments,setAppointments] = useState([])
    async function getAppointments(){
        const res = await axios.get(`/api/appointment/all/search?day=${day}&date=${date}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
        setAppointments(res.data.data);
    }
    async function confirmAppointment(id){
        const res = await axios.put(`/api/appointment/confirm/${id}`,{},{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
        if(res.data.status === 200){
            getAppointments()
        };
    }
    async function rejectAppointment(id){
        const res = await axios.put(`/api/appointment/reject/${id}`,{},{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
        if(res.data.status === 200){
            getAppointments()
        };
    }

    useEffect(()=>{
        const date = dateGenerator(selected);
        setDate(date)
    },[selected])

    return(
        <div className="space-y-2">
            <h1 className="text-2xl font-bold text-center uppercase">All appointments</h1>
            <hr/>
            <div className="relative flex justify-center space-x-2">
                <select name='day' value={day} onChange={(e)=>{setDay(e.target.value);setSelected()}} className='p-2 border rounded focus:outline-none focus:ring-2'>
                    <option value="">Select Day</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="WednesDay">WednesDay</option>
                    <option value="Thusday">Thusday</option>
                    <option value="Friday">Friday</option>
                </select>
                <button onClick={()=>setView(!view)} className='p-2 bg-white border rounded focus:outline-none focus:ring-2'>{date}</button>
                <button onClick={()=>getAppointments()} className="px-6 bg-blue-400 text-white rounded-md">Search</button>
                {day && !selected && <div className="absolute top-12 bg-gray-50 rounded-md shadow-md">
                    <DayPicker
                            mode="single"
                            selected={selected}
                            onSelect={setSelected}
                    />
                </div>}
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            Sl
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Gender
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                            address
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Action
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {appointments && appointments.filter(appointment=>appointment?.status !== 'Canceled').map((appointment,i)=> <tr key={appointment._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-4 py-4">
                            {appointment?.appointmentId}
                        </td>
                        <td className="px-6 py-4">
                            {appointment?.patientName}
                        </td>
                        <td className="px-6 py-4">
                            {appointment?.gender}
                        </td>
                        <td className="px-6 py-4">
                            {appointment?.address}
                        </td>
                        <td className="px-6 py-4">
                            {appointment?.status}
                        </td>
                        <td className="flex space-x-2 justify-center px-6 py-4">
                            <button onClick={()=>{setView(!view);setId(appointment._id)}} className="p-2 bg-blue-400 text-white rounded hover:bg-blue-500">Details</button>
                            <button onClick={()=>confirmAppointment(appointment?._id)} className="p-2 bg-green-400 text-white rounded hover:bg-green-500">Confirmed</button>
                            <button onClick={()=>rejectAppointment(appointment?._id)} className="p-2 bg-red-400 text-white rounded hover:bg-red-500">Rejected</button>
                        </td>  
                    </tr>)}
                </tbody>
            </table>
            {view && <AppointmentDetails {...{id,view,setView}}/>}
        </div>
    )
}