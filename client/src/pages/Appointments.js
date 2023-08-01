import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AppointmentDetails from "../components/AppointmentDeatils";
import useUserStore from "../features/userStore";
import { cancelAppointment, getAllAppointments } from "../utils/appoimtments_utils";
import statusColor from "../utils/statusColor";
import dayNameBangla from "../utils/dayNameBangla";

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
            <h1 className="text-2xl font-bold text-center uppercase">আপনার অ্যাপয়েন্টমেন্ট গুলো</h1>
            <hr/>
            <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-white bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <td  className="px-4 py-2">
                            নং 
                        </td>
                        <td  className="px-6 py-1">
                            নাম 
                        </td>
                        <td  className="px-6 py-1">
                            ঠিকানা
                        </td>
                        <td  className="px-6 py-1 ">
                            অ্যাপয়েন্টমেন্ট দিন
                        </td>
                        <td  className="px-6 py-1 ">
                            অবস্থা 
                        </td>
                        <td  className="px-6 py-1 text-center">
                            বিস্তারিত
                        </td>

                    </tr>
                </thead>
                <tbody>
                    {appointments && appointments.map((appointment,i)=> <tr key={appointment._id} className="text-sm bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-4 py-2">
                            {appointment?.appointmentId}
                        </td>
                        <td className="px-6 py-2">
                            {appointment?.patientName}
                        </td>
                        <td className="px-6 py-2">
                            {appointment?.address}
                        </td>
                        <td className="px-6 py-2">
                            {dayNameBangla(appointment?.appointmentDay)}
                        </td>
                        <td className={`px-6 py-2 ${statusColor(appointment?.status)}`}>
                            {appointment?.status}
                        </td>
                        <td className="flex space-x-2 justify-center px-6 py-2">
                            <button 
                                onClick={()=>{setId(appointment?._id);onOpen()}}
                                className="px-2 py-1 bg-green-400 text-white rounded hover:bg-green-500"
                            >
                                বিস্তারিত
                            </button>
                            <button onClick={()=>cancelAppointment(appointment._id,user,toast)} className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500">বাতিল</button>
                        </td> 
                    </tr>)}
                </tbody>
            </table>
            <AppointmentDetails {...{id,isOpen, onOpen, onClose}}/>
        </div>
    )
}