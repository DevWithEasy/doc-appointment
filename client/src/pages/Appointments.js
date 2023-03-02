import axios from "axios";
import { useEffect, useState } from "react";
import useUserStore from "../features/userStore";
import {Link} from 'react-router-dom'

export default function Appointments(){
    const {user} = useUserStore()
    const [appointments,setAppointments] = useState([])
    async function getAllAppointments(id){
        const res = await axios.get(`/api/appointment/all/${id}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
        setAppointments(res.data.data);
    }

    useEffect(()=>{
        getAllAppointments(user?._id)
    },[user?._id])

    console.log(appointments);
    return(
        <div className="space-y-2">
            <h1 className="text-2xl font-bold text-center uppercase">Your appointments</h1>
            <hr/>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            Sl
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            address
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                            Appointment Day
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Details
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {appointments && appointments.map((appointment,i)=> <tr key={appointment._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-4 py-4">
                            {appointment?.appointmentId}
                        </td>
                        <td className="px-6 py-4">
                            {appointment?.patientName}
                        </td>
                        <td className="px-6 py-4">
                            {appointment?.address}
                        </td>
                        <td className="px-6 py-4">
                            {appointment?.appointmentDay}
                        </td>
                        <td className="px-6 py-4">
                            {appointment?.status}
                        </td>
                        <td className="flex space-x-2 justify-center px-6 py-4">
                            <Link to={`/appointment/${appointment?._id}`} className="p-2 bg-green-400 text-white rounded hover:bg-green-500">Details</Link>
                            <button className="p-2 bg-red-400 text-white rounded hover:bg-red-500">Delete</button>
                        </td>
                        
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}