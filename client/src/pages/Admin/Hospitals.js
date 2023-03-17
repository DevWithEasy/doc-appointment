import axios from "axios"
import { useEffect, useState } from "react"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import { IoMdAddCircleOutline } from "react-icons/io"
import AddHospital from "../../components/hospital/AddHospital"
import DeleteHospital from "../../components/hospital/DeleteHospital"
import UpdateHospital from "../../components/hospital/UpdateHospital"
import useUserStore from "../../features/userStore"

export default function AppliedHospital(){
    const [hospitals,setHospitals] = useState([])
    const {random} = useUserStore()
    const [add,setAdd] = useState(false)
    const [update,setUpdate] = useState(false)
    const [updateId,setUpdateId] = useState()
    const [hospitalDelete,setHospitalDelete] = useState()
    const [deleteId,setDeleteId] = useState()
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
    console.log(hospitals)
    return(
        <div className="space-y-2">
            <h1 className="text-3xl text-center">All Hospitals</h1>
            <hr/>
            <div className="flex justify-end">
                <button onClick={()=>setAdd(!add)} className="p-2 flex items-center space-x-1 bg-green-400 text-white rounded-md">
                    <IoMdAddCircleOutline size={22}/>
                    <span>Add Hospitals</span>
                </button>
            </div>
            <table className="w-full">
                <thead className="bg-gray-300">
                    <tr className="text-center font-bold font-xl">
                        <td className="p-2">Sl</td>
                        <td className="p-2">Name</td>
                        <td className="p-2">Location</td>
                        <td className="p-2">Type</td>
                        {/* <td className="p-2">Open</td>
                        <td className="p-2">Close</td> */}
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
                                {/* <td className="p-2 text-center">{hospital?.open}</td>
                                <td className="p-2 text-center">{hospital?.close}</td> */}
                                <td className="flex items-center justify-center p-2 text-center space-x-2">
                                    <button className="p-2 bg-blue-400 text-white rounded hover:bg-blue-500">Details</button>
                                    <button onClick={()=>{setUpdate(!update);setUpdateId(hospital?._id)}} className="flex items-center space-x-2 p-2 bg-blue-400 text-white rounded hover:bg-blue-500">
                                        <AiFillEdit/>
                                        <span>Update</span>
                                    </button>
                                    <button onClick={()=>{setHospitalDelete(!hospitalDelete);setDeleteId(hospital?._id)}}  className="flex items-center space-x-2 p-2 bg-red-400 text-white rounded hover:bg-red-500">
                                        <AiFillDelete/>
                                        <span>Delete</span>
                                    </button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>

            {add && <AddHospital {...{add,setAdd}}/>}
            {update && <UpdateHospital {...{updateId,update,setUpdate}}/>}
            {hospitalDelete && <DeleteHospital {...{deleteId,hospitalDelete,setHospitalDelete}}/>}
        </div>
    )
}