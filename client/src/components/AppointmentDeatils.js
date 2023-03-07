import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { AiOutlinePrinter } from "react-icons/ai"
import { RxCrossCircled } from "react-icons/rx"
import {useReactToPrint} from "react-to-print"
import PrintHeader from "./PrintHeader"

export default function AppointmentDetails(props){
    const printRef = useRef()
    const {id,view,setView} = props
    const [appointment,setAppointment] = useState({})
    async function getAppointmentDetails(id){
        const res = await axios.get(`/api/appointment/details/${id}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setAppointment(res.data.data)
    }

    function selectedDay(appoinmentDate){
        const date = new Date(appoinmentDate);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = daysOfWeek[date.getDay()];
        let day
        let month

        if(date.getDate() <10){
            day = `0${date.getDate()}`
        }else{
            day = date.getDate()
        }

        if(date.getMonth() <10){
            month = `0${date.getMonth()+1}`
        }else{
            month = date.getMonth()+1
        }
        return `${day}-${month}-${date.getFullYear()} (${dayName})` 
    }

    const handlePrint = useReactToPrint({
        content : ()=> printRef.current,
        documentTitle : appointment?.appointmentId + '-' + appointment?.patientName + '-'  + selectedDay(appointment?.appointmentDate)
    })

    useEffect(()=>{
        getAppointmentDetails(id)
    },[id])
    console.log(appointment);
    return(
        <div className="absolute -top-2 left-0 w-full h-screen bg-gray-500/50 flex justify-center items-center">
            <div ref={printRef} className="relative mx-4 p-4 bg-white border shadow rounded space-y-4 z-20 print:w-11/12 print:mx-auto print:border-none print:shadow-none">
                <RxCrossCircled onClick={()=>setView(!view)} size={25} className="absolute bg-white text-red-400 rounded-full -top-4 -right-4 cursor-pointer print:hidden"/>
                <div className="flex justify-end print:hidden">
                    <AiOutlinePrinter onClick={()=>handlePrint()} size={30} className='cursor-pointer'/>
                </div>
                <PrintHeader/>
                <div>
                    <div className="">
                        <p className="p-2 space-x-2">
                            <span>Appointment ID :</span>
                            <span className="font-mono">{appointment?.appointmentId}</span>
                        </p>
                        <p className="p-2">
                            <p className="space-x-2">
                                <span>Appointment Date :</span>
                                <span className="font-mono">
                                    {selectedDay(appointment?.appointmentDate)}
                                </span>
                            </p>
                        </p>
                    </div>
                    <div className="grid grid-cols-2">
                        <p className="p-2 space-x-2">
                            <span>Patient Name :</span>
                            <span className="font-mono">{appointment?.patientName}</span>
                        </p>
                        <p className="p-2 space-x-2">
                            <span>Mobile :</span>
                            <span className="font-mono">{appointment?.patientPhone}</span>
                        </p>
                        <p className="p-2 space-x-2">
                            <span>Gender : </span>
                            <span className="font-mono">{appointment?.gender}</span>
                        </p>
                        <p className="p-2 space-x-2">
                            <span>Age : </span>
                            <span className="font-mono">{appointment?.age} Years</span>
                        </p>
                    </div>
                </div>
                <hr/>
                <div className="">
                    <table className="w-full border text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="px-4 py-3">
                                    Appointment info
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Consultation Fee
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white">
                                <td className="px-4 py-5 font-mono space-y-2">
                                    <span className="font-bold">Dr . {appointment?.firstName} {appointment?.lastName}</span>
                                    <br/>
                                    <br/>
                                    <span>{appointment?.vanue}</span>
                                    <br/>
                                    <span>{appointment?.location}</span>
                                </td>
                                <td className="px-6 py-10 font-mono">
                                <span>= {appointment?.feesPerConsultation}/- Tk</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="py-4">
                        <p>Submited by : <span className="font-mono">{appointment?.submitedBy}</span></p>
                        <p>Submited on : <span className="font-mono">{new Date(appointment?.createdAt).toDateString()}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}