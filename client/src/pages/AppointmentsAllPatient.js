import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import AppointmentDetails from "../components/AppointmentDeatils";
import { completeAppointment, confirmAppointment, getAppointments, rejectAppointment } from '../utils/appoimtments_utils';
import dateGenerator from "../utils/dateGenerator";
import statusColor from '../utils/statusColor';

export default function AppointmentsAllPatient(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [id,setId] = useState('')
    const [day,setDay] = useState('')
    const [date,setDate] = useState('');
    const [selected, setSelected] = useState()
    const [view,setView] = useState(false)
    const [appointments,setAppointments] = useState([])

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
                <button onClick={()=>getAppointments(day,date,setAppointments)} className="px-6 bg-blue-400 text-white rounded-md">Search</button>
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
                                    onClick={()=>confirmAppointment(appointment?._id,day,date)} className="p-2 rounded hover:bg-green-500 hover:text-white transition-all duration-300"
                                >
                                        Confirmed
                                </MenuItem>
                                <MenuItem 
                                    onClick={()=>completeAppointment(appointment?._id,day,date)} className="p-2 rounded hover:bg-blue-500 hover:text-white transition-all duration-300"
                                >
                                        Completed
                                </MenuItem>
                                <MenuItem 
                                    onClick={()=>rejectAppointment(appointment?._id,day,date)} className="p-2 rounded hover:bg-red-500 hover:text-white transition-all duration-300"
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