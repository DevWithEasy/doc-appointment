import { useEffect, useState } from "react";
import Doctor from "../components/Doctor";
import { getFindDoctors, getSpecialist } from "../utils/doctors_utils";

export default function Appointment(){
    const [specialist,setSpecialist] = useState([])
    const [doctors,setDoctors] = useState([])
    const [value,setValue] = useState('')

    useEffect(()=>{
        getSpecialist(setSpecialist)
    },[])

    return(
        <div className="space-y-2">
            <h1 className="text-2xl font-bold text-center uppercase">Get your appointment</h1>
            <hr/>

            <div className="relative flex justify-center space-x-3">
                <select onChange={(e)=>setValue(e.target.value)} className='p-2 border rounded focus:outline-none focus:ring-2'>
                    <option value="">Select Specialist</option>
                    {specialist && specialist.map((specialist,i) =><option key={i} value={specialist}>{specialist}</option>)}
                </select>
                
                <button onClick={()=>getFindDoctors(value,setDoctors)}  className="px-6 bg-blue-400 text-white rounded-md">Find Appointment</button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                {
                  doctors &&  doctors.map(doctor=><Doctor key={doctor._id} doctor={doctor}/>)
                }
            </div>
        </div>
    )
}