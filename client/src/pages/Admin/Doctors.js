import axios from "axios"
import { useEffect, useState } from "react"
import DoctorDetails from "../../components/details/DoctorDetails"
import useUserStore from "../../features/userStore"
import DeleteDoctor from "../../components/details/DeleteDoctor"

export default function AppliedDoctors(){
    const {random,reload} = useUserStore()
    const [doctors,setDoctors] = useState([])
    async function getAppliedDoctors(){
        const res = await axios.get('/api/admin/getAlldoctors',{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setDoctors(res.data.data)
    }

    async function approvedDoctor(id){
        try {
            const res = await axios.post(`/api/doctor/approve/${id}`,{},{
                headers : {
                    authorization : 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if(res.data.status === 200){
                console.log(res.data)
                reload()
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function cancelDoctor(id){
        try {
            const res = await axios.post(`/api/doctor/cancel/${id}`,{},{
                headers : {
                    authorization : 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if(res.data.status === 200){
                console.log(res.data)
                reload()
            }
        } catch (error) {
            console.log(error)
        }
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
                                    {doctor?.status === 'Pending' && <button onClick={()=>approvedDoctor(doctor._id)} className="p-2 bg-green-400 text-white rounded hover:bg-green-500">Approved</button>}
                                    {doctor?.status === 'Pending' && <DeleteDoctor
                                        {...{
                                            id : doctor._id,
                                            deleteHandler : cancelDoctor
                                        }}
                                    >
                                            Rejected
                                        </DeleteDoctor>}
                                    <DoctorDetails {...{doctor}}/>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}