import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

export default function AppointmentDetails(){
    const {id} = useParams()
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




    useEffect(()=>{
        getAppointmentDetails(id)
    },[id])
    
    return(
        <div className="p-4 border shadow rounded space-y-4">
            <div>
                <div className="md:flex justify-between md:space-y-2">
                    <p className="md:w-1/2 p-2 space-x-2">
                        <span>Appointment ID :</span>
                        <span className="">{appointment?.appointmentId}</span>
                    </p>
                    <p className="md:w-1/2 p-2">
                        <p className="md:flex justify-end space-x-2">
                            <span>Appointment Date :</span>
                            <span className="">
                                {selectedDay(appointment?.appointmentDate)}
                            </span>
                        </p>
                    </p>
                </div>
                <div className="flex">
                    <p className="w-4/12 p-2 space-x-2">
                        <span>Patient Name :</span>
                        <span className="">{appointment?.patientName}</span>
                    </p>
                    <p className="w-4/12 p-2 space-x-2">
                        <span>Gender : </span>
                        <span className="">{appointment?.gender}</span>
                    </p>
                    <p className="w-4/12 p-2 space-x-2">
                        <span>Age : </span>
                        <span className="">{appointment?.age} Years</span>
                    </p>
                </div>
            </div>
            <hr/>
            <div className="">
                <table className="w-full border text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                        <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-4 py-10 ">
                                <span>{appointment?.vanue}</span>
                                <br/>
                                <span>{appointment?.location}</span>
                            </td>
                            <td className="px-6 py-10">
                            <span>= {appointment?.feesPerConsultation}/- Tk</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="py-4">
                    <p>
                        <span>Submitted by</span>
                        <br/>
                        <span>{appointment?.submitedBy}</span>
                    </p>
                </div>
            </div>
            <div className="flex justify-end text-gray-300">
                <span>{window.location.href}</span>
            </div>
        </div>
    )
}