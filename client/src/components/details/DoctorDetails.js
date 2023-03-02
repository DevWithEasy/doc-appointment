import axios from "axios"
import { useEffect, useState } from "react"
import { RxCrossCircled } from "react-icons/rx"

export default function DoctorDetails({id,details,setDetails}){
    const [doctor,setDoctor] = useState({})
    async function getDoctor(id){
        const res = await axios.get(`/api/doctor/find/${id}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setDoctor(res.data.data)
    }
    useEffect(()=>{
        getDoctor(id)
    },[id])
    return(
        <div className="absolute top-0 left-0 w-full h-screen bg-gray-500/50 flex justify-center items-center">
            <div className="relative w-1/2 bg-white shadow-md rounded">
                <RxCrossCircled onClick={()=>setDetails(!details)} size={25} className="absolute bg-white text-red-400 rounded-full -top-4 -right-4"/>
                <h1 className="text-xl text-center font-bold p-2 border-b">Doctor Details</h1>
                <div className="p-2">
                    <p className="">Name : {doctor?.firstName} {doctor.lastName}</p>
                    <p className="">Email : {doctor?.email} </p>
                    <p className="">Phone : {doctor?.phone} </p>
                    <p className="">Specialization : {doctor.specialization}</p>
                    <p className="">Experience Area : {doctor.experienceArea}</p>  
                    <p className="">Education : {doctor?.education}</p>
                    <p className="">Works At : {doctor?.workedAt}</p>
                    <p className="">Fees Per Consultation : {doctor?.feesPerConsultation}</p>
                </div>
            </div>
        </div>
    )
}