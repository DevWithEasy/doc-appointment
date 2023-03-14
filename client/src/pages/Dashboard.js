import axios from "axios"
import { useEffect, useState } from "react"
import { IoMdAddCircleOutline } from "react-icons/io"
import ChamberList from "../components/chamber/ChamberList"
import AddChamber from "../components/chamber/AddChamber"
import UpdateChamber from "../components/chamber/UpdateChamber"
import useUserStore from "../features/userStore"
import DeleteChamber from "../components/chamber/DeleteChamber"
import handleChange from "../utils/handleChange"
import {toast} from 'react-hot-toast'

export default function Dashboard(){
    const {random,user} = useUserStore()
    const [doctor,setDoctor] = useState({})
    const [chambers,setChambers] = useState([])
    const [add,setAdd] = useState(false)
    const [id,setId] = useState()
    const [update,setUpdate] = useState(false)
    const [updateId,setUpdateId] = useState()
    const [chamberDelete,setChamberDelete] = useState()
    const [deleteId,setDeleteId] = useState()
    async function getDoctor(){
        const res = await axios.get(`/api/doctor/find/${user?._id}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setDoctor(res.data.data)
    }

    async function updateDoctor(){
        const res = await axios.put(`/api/doctor/update/${doctor?._id}`,{...doctor},{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            setDoctor(res.data.data)
            toast.success('Update successful')
        }
    }

    async function getChambers(doctorId){
        const res = await axios.get(`/api/doctor/findChambers/${doctorId}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setChambers(res.data.data)
    }

    useEffect(()=>{
        getDoctor()
    },[])
    useEffect(()=>{
        if(doctor?._id) getChambers(doctor?._id)
    },[doctor?._id,random])
    return(
        <div className="space-y-2">
            <h1 className="text-2xl">Doctor Dashboard</h1>
            <hr/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-4">
                <div className="bg-white p-2 shadow rounded-md">
                    <div className="flex items-center space-x-2">
                        <input type='text' name='firstName' value={doctor?.firstName} onChange={(e)=>handleChange(e,doctor,setDoctor)} className='w-full p-2 border-b focus:outline-none focus:border-blue-300' placeholder="First Name"/>
                        <input type='text' name='lastName' value={doctor?.lastName} onChange={(e)=>handleChange(e,doctor,setDoctor)} className='w-full p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Last Name"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type='email' name='email' value={doctor?.email} onChange={(e)=>handleChange(e,doctor,setDoctor)} className='w-full p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Email"/>
                        <input type='text' name='phone' value={doctor?.phone} onChange={(e)=>handleChange(e,doctor,setDoctor)} className='w-full p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Phone number"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type='text' name='education' value={doctor?.education} onChange={(e)=>handleChange(e,doctor,setDoctor)} className='w-full p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Email"/>
                        <input type='text' name='specialization' value={doctor?.specialization} onChange={(e)=>handleChange(e,doctor,setDoctor)} className='w-full p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Phone number"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type='text' name='experienceArea' value={doctor?.experienceArea} onChange={(e)=>handleChange(e,doctor,setDoctor)} className='w-full p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Experience areas"/>
                        <input type='text' name='experience' value={doctor?.experience} onChange={(e)=>handleChange(e,doctor,setDoctor)} className='w-full p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Total experience year"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type='text' name='designation' value={doctor?.designation} onChange={(e)=>handleChange(e,doctor,setDoctor)} className='w-full p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Now working as a"/>
                        <input type='text' name='workedAt' value={doctor?.workedAt} onChange={(e)=>handleChange(e,doctor,setDoctor)} className='w-full p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Now working at"/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type='text' name='feesPerConsultation' value={doctor?.feesPerConsultation} onChange={(e)=>handleChange(e,doctor,setDoctor)} className='md:w-1/2 w-full p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Now working as a"/>
                    </div>
                    <div className="flex justify-center items-center pt-4">
                        <button onClick={()=>updateDoctor()} className="px-6 py-2 bg-green-400 text-white rounded-full hover:bg-green-500">Save</button>
                    </div>
                </div>
                <div className="bg-white p-2 rounded-md shadow space-y-2">
                    <p className="flex justify-between">
                        <span className="font-bold">Total Appointment</span>
                        <span>20</span>
                    </p>
                    <hr/>
                    <div className="space-y-1">
                        <p className="flex justify-between">
                            <span>Success Appointment</span>
                            <span>20</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Reject Appointment</span>
                            <span>20</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Cancel Appointment</span>
                            <span>20</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="space-y-2 border p-2 shadow rounded-md overflow-x-auto pb-6">
                    <p className="flex justify-between">
                        <span className="text-xl">Chamber Lists :</span>
                        <button onClick={()=>{setAdd(!add);setId(doctor._id)}} className="p-2 flex items-center space-x-1 bg-green-400 text-white rounded-md">
                            <IoMdAddCircleOutline size={22}/>
                            <span>Add Chamber</span>
                        </button>
                    </p>
                    <ChamberList {...{chambers,setUpdateId,update,setUpdate,setDeleteId,chamberDelete,setChamberDelete}}/>
            </div>

            {/* display add update chamber  UI */}
            {add && <AddChamber {...{id,add,setAdd}}/>}
            {update && <UpdateChamber {...{updateId,update,setUpdate}}/>}
            {chamberDelete && <DeleteChamber {...{deleteId,chamberDelete,setChamberDelete}}/>}
        </div>
    )
}