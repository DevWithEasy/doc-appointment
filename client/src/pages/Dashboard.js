import axios from "axios"
import { useEffect, useState } from "react"
import { IoMdAddCircleOutline } from "react-icons/io"
import ChamberList from "../components/chamber/ChamberList"
import AddChamber from "../components/chamber/AddChamber"
import UpdateChamber from "../components/chamber/UpdateChamber"
import useUserStore from "../features/userStore"
import DeleteChamber from "../components/chamber/DeleteChamber"

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
            <div className="bg-white border p-2 shadow rounded-md">
                    <p className="text-xl">Doctor Information : </p>
                    <p className=''>Name : {doctor?.firstName} {doctor?.lastName}</p>
                    <p>Edduction Qualification : {doctor?.education}</p>
                    <p>Specialization : {doctor?.specialization}</p>
                    <p>Experience Area : {doctor?.experienceArea}</p>
                    {
                        doctor?.designation && doctor?.workedAt && <p>I am Working as a {doctor?.designation} of {doctor?.workedAt}</p>
                    }
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