import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AppointmentDetails from "../components/AppointmentDeatils";
import useUserStore from "../features/userStore";
import { cancelAppointment, getAllAppointments } from "../utils/appoimtments_utils";
import statusColor from "../utils/statusColor";

export default function Appointments(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {user} = useUserStore()
    const [id,setId] = useState('')
    const [appointments,setAppointments] = useState([])

    useEffect(()=>{
        getAllAppointments(user?._id,setAppointments)
    },[user?._id])

    return(
        <div className="space-y-2">
            <h1 className="text-2xl font-bold text-center uppercase">Your appointments</h1>
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
                        <td className={`px-6 py-4 ${statusColor(appointment?.status)}`}>
                            {appointment?.status}
                        </td>
                        <td className="flex space-x-2 justify-center px-6 py-4">
                            <button 
                                onClick={()=>{setId(appointment?._id);onOpen()}}
                                className="p-2 bg-green-400 text-white rounded hover:bg-green-500"
                            >
                                Details
                            </button>
                            <button onClick={()=>cancelAppointment(appointment._id,user,toast)} className="p-2 bg-red-400 text-white rounded hover:bg-red-500">Cancel</button>
                        </td> 
                    </tr>)}
                </tbody>
            </table>
            <AppointmentDetails {...{id,isOpen, onOpen, onClose}}/>
        </div>
    )
}