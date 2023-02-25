import axios from "axios"
import { useEffect, useState } from "react"
import DoctorDetails from "../../components/details/DoctorDetails"
import useUserStore from "../../features/userStore"

export default function AppliedDoctors(){
    const {random,reload} = useUserStore()
    const [doctors,setDoctors] = useState([])
    const [details,setDetails] = useState(false)
    const [id,setId] = useState()
    async function getAppliedDoctors(){
        const res = await axios.get('http://localhost:8080/api/admin/getAlldoctors',{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setDoctors(res.data.data)
    }

    async function approvedDoctor(id){
        await axios.post(`http://localhost:8080/api/doctor/approve/${id}`,{},{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        reload()
    }

    useEffect(()=>{
        getAppliedDoctors()
    },[random])
    return(
        <div>
            <h1 className="text-3xl text-center">All Doctors</h1>
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
                                    {doctor?.status === 'Pending' && <button onClick={()=>approvedDoctor(doctor.userId)} className="p-2 bg-green-400 text-white rounded hover:bg-green-500">Approved</button>}
                                    {doctor?.status === 'Pending' && <button className="p-2 bg-red-400 text-white rounded hover:bg-red-500">Rejected</button>}
                                    {doctor?.status === 'Approved' &&<button className="p-2 bg-red-400 text-white rounded hover:bg-red-500">Block</button>}
                                    <button onClick={()=>{setDetails(!details);setId(doctor._id)}} className="p-2 bg-blue-400 text-white rounded hover:bg-blue-500">Details</button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
            {details && <DoctorDetails id={id} details={details} setDetails={setDetails}/>}
        </div>
    )
}