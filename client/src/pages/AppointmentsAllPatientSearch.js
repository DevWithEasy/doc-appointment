import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppointmentDetails from '../components/AppointmentDeatils';
import useUserStore from '../features/userStore';
import dateGenerator from '../utils/dateGenerator';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    Button
  } from '@chakra-ui/react'
import statusColor from '../utils/statusColor';
export default function AppointmentsAllPatientSearch(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [id,setId] = useState('')
    const {random} = useUserStore()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const day = searchParams.get('day');
    const date = searchParams.get('date');
    const [appointments,setAppointments] = useState([])
    const [view,setView] = useState(false)
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
            getAppointments(day,date)
        };
    }

    async function completeAppointment(id){
        const res = await axios.put(`/api/appointment/complete/${id}`,{},{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
        if(res.data.status === 200){
            getAppointments(day,date)
        };
    }

    async function rejectAppointment(id){
        const res = await axios.put(`/api/appointment/reject/${id}`,{},{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
        if(res.data.status === 200){
            getAppointments(day,date)
        };
    }

    useEffect(()=>{
        getAppointments(day,date)
    },[day,date,random])
    
    return(
        <div className='space-y-2'>
            <h1 className="text-2xl font-bold text-center uppercase">All appointments of {day} {date}</h1>
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
                        <td className={`px-6 py-4 ${statusColor(appointment?.status)}`}>
                            {appointment?.status}
                        </td>
                        <td className="flex space-x-2 justify-center px-6 py-4">
                        <Menu>
                            <MenuButton as={Button}>
                                Actions
                            </MenuButton>
                            <MenuList className='p-2'>
                                <MenuItem 
                                    onClick={()=>{setId(appointment?._id);onOpen();setView(true)}}
                                    className="p-2 rounded"
                                >
                                        Details
                                </MenuItem>
                                <MenuItem 
                                    onClick={()=>confirmAppointment(appointment?._id)} className="p-2 rounded hover:bg-green-500 hover:text-white transition-all duration-300"
                                >
                                        Confirmed
                                </MenuItem>
                                <MenuItem 
                                    onClick={()=>completeAppointment(appointment?._id)} className="p-2 rounded hover:bg-blue-500 hover:text-white transition-all duration-300"
                                >
                                        Completed
                                </MenuItem>
                                <MenuItem 
                                    onClick={()=>rejectAppointment(appointment?._id)} className="p-2 rounded hover:bg-red-500 hover:text-white transition-all duration-300"
                                >
                                        Rejected
                                </MenuItem>
                            </MenuList>
                            </Menu>
                        </td>
                        
                    </tr>)}
                </tbody>
            </table>
            {view && <AppointmentDetails {...{id,isOpen, onOpen, onClose}}/>}
        </div>
    )
}