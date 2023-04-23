import axios from "axios"
import { useEffect, useState } from "react"
import AddHospital from "../../components/hospital/AddHospital"
import DeleteHospital from "../../components/hospital/DeleteHospital"
import UpdateHospital from "../../components/hospital/UpdateHospital"
import useUserStore from "../../features/userStore"

export default function AppliedHospital(){
    const [hospitals,setHospitals] = useState([])
    const {random} = useUserStore()
    async function getAllHospitals(){
        const res = await axios.get('/api/hospital/all',{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setHospitals(res.data.data)
    }
    useEffect(()=>{
        getAllHospitals()
    },[random])
    
    return(
        <div className="space-y-2">
            <h1 className="text-3xl text-center">All Hospitals</h1>
            <hr/>
            <div className="flex justify-end">
                <AddHospital/>
            </div>
            <table className="w-full">
                <thead className="bg-gray-300">
                    <tr className="text-center font-bold font-xl">
                        <td className="p-2">Sl</td>
                        <td className="p-2">Name</td>
                        <td className="p-2">Location</td>
                        <td className="p-2">Type</td>
                        <td className="p-2">Actions</td>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {
                        hospitals && hospitals.map((hospital,i)=>
                            <tr key={i} className='border-b'>
                                <td className="p-2 text-center">{i+1}</td>
                                <td className="p-2 ">{hospital?.name}</td>
                                <td className="p-2 text-center">{hospital?.location}</td>
                                <td className="p-2 text-center">{hospital?.type}</td>
                                <td className="flex items-center justify-center p-2 text-center space-x-2">
                                    <UpdateHospital {...{hospital}}/>
                                    <DeleteHospital {...{hospital}}/>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}