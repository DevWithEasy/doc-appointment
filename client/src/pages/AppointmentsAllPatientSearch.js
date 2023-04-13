import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppointmentDetails from '../components/AppointmentDeatils';
import useUserStore from '../features/userStore';
import dateGenerator from '../utils/dateGenerator';
export default function AppointmentsAllPatientSearch(){
    const {random} = useUserStore()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const day = searchParams.get('day');
    const date = searchParams.get('date');
    const [appointments,setAppointments] = useState([])
    const [view,setView] = useState(false)
    const [id,setId] = useState()
    async function getAppointments(day,date){
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
        getAppointments(day,date)
    },[day,date,random])
    console.log(date);
    return(
        <div className='space-y-2'>
            <h1 className="text-2xl font-bold text-center uppercase">All appointments of {day} {dateGenerator(date)}</h1>
            <hr/>

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