import axios from "axios"
import { useEffect, useState } from "react"

export default function AppliedHospital(){
    const [doctors,setDoctors] = useState([])
    async function getAppliedDoctors(){
        const res = await axios.get('/api/admin/getAlldoctors',{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setDoctors(res.data.data)
    }
    useEffect(()=>{
        getAppliedDoctors()
    },[])
    console.log(doctors)
    return(
        <div>
            <h1 className="text-3xl text-center">All Hospitals</h1>
            <table className="w-full">
                <thead className="bg-gray-300">
                    <tr className="text-center font-bold font-xl">
                        <td className="p-2">Sl</td>
                        <td className="p-2">Name</td>
                        <td className="p-2">Specialist</td>
                        <td className="p-2">Fees</td>
                        <td className="p-2">Status</td>
                        <td className="p-2">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        doctors && doctors.map((doctor,i)=>
                            <tr key={i} className='border-b'>
                                <td className="p-2 text-center">{i+1}</td>
                                <td className="p-2 ">{doctor?.firstName} {doctor?.lastName}</td>
                                <td className="p-2 text-center">{doctor?.specialization}</td>
                                <td className="p-2 text-center">{doctor?.feesPerConsultation}</td>
                                <td className="p-2 text-center">{doctor?.status}</td>
                                <td className="p-2 text-center space-x-2">
                                    <button className="p-2 bg-green-400 text-white rounded hover:bg-green-500">Approved</button>
                                    <button className="p-2 bg-red-400 text-white rounded hover:bg-red-500">Rejected</button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}