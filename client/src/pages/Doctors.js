import axios from "axios";
import { useEffect, useState } from "react";
import Doctor from "../components/Doctor";

export default function Doctors(){
    const [specialization,setSpecilaization] = useState('')
    const [doctors,setDoctors] = useState([])
    async function getAllActiveDoctors(){
        const res = await axios('http://localhost:8080/api/doctor/allActiveDoctor')
        setDoctors(res.data.data)
    }
    useEffect(()=>{
        getAllActiveDoctors()
    },[])
    console.log(doctors)
    return(
        <div className="">
            <h1 className="p-2 text-2xl font-bold text-center uppercase">Doctors</h1>
            <div className="flex justify-end py-2">
                <select onChange={(e)=>setSpecilaization(e.target.value)} className='p-2 border rounded shadow focus:outline-none focus:ring-2'>
                    <option value="">Select specialization</option>
                    <option value="">Gyconogist</option>
                    <option value="">Gyconogist</option>
                    <option value="">Gyconogist</option>
                    <option value="">Gyconogist</option>
                    <option value="">Gyconogist</option>
                    <option value="">Gyconogist</option>
                </select>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                {
                    doctors.map(doctor=><Doctor key={doctor._id} doctor={doctor}/>)
                }
            </div>
        </div>
    )
}