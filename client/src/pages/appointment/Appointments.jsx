import { useEffect, useState } from "react";
import AppointmentDetails from "../../components/AppointmentDeatils";
import AppointmentsCardView from "../../components/appointments/AppointmentsCardView";
import AppointmentsTableView from "../../components/appointments/AppointmentsTableView";
import useUserStore from "../../features/userStore";
import { getAllAppointments } from "../../utils/appoimtments_utils";

export default function Appointments(){
    const [view,setView]= useState(false)
    const {user} = useUserStore()
    const [id,setId] = useState('')
    const [appointments,setAppointments] = useState([])

    useEffect(()=>{
        getAllAppointments(user?._id,setAppointments)
    },[user?._id])

    return(
        <div className="w-full space-y-2">
            <h1 className="text-2xl font-bold text-center uppercase">আপনার অ্যাপয়েন্টমেন্ট গুলো</h1>
            <hr/>
            <AppointmentsTableView {...{
                appointments,
                setAppointments,
                setId,
                setView
            }}/>

            <AppointmentsCardView {...{
                appointments,
                setAppointments,
                setId,
                setView
            }}/>

            {view &&
                <AppointmentDetails {...{
                    id,
                    view, 
                    setView
                }}/>
            }
        </div>
    )
}