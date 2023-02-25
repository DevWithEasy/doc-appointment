import { useState } from "react";
import Hospital from "../components/Hospital";

export default function Hospitals(){
    const [hospital,setHospital] = useState('')
    return(
        <div>
            <h1 className="p-2 text-2xl font-bold text-center uppercase">Hospitals</h1>
            <div className="flex justify-end py-2">
                <select onChange={(e)=>setHospital(e.target.value)} className='p-2 border rounded shadow focus:outline-none focus:ring-2'>
                    <option value="">Select Sevirce type</option>
                    <option value="">Clinic</option>
                    <option value="">Diabetic </option>
                    <option value="">hospital</option>
                </select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Hospital/>
                <Hospital/>
                <Hospital/>
                <Hospital/>
                <Hospital/>
                <Hospital/>
            </div>
        </div>
    )
}