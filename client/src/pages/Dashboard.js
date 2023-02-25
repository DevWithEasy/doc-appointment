import axios from "axios"
import { useEffect, useState } from "react"
import { IoMdAddCircleOutline } from "react-icons/io"
import AddChamber from "../components/AddChamber"
import ChamberList from "../components/ChamberList"
import useUserStore from "../features/userStore"

export default function Dashboard(){
    const {user,doctor,addDoctor} = useUserStore()
    const [add,setAdd] = useState(false)
    const [id,setId] = useState()
    async function getDoctor(){
        const res = await axios.get(`http://localhost:8080/api/doctor/find/${user?._id}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        addDoctor(res.data.data)
    }
    useEffect(()=>{
        getDoctor()
    },[])
    return(
        <div>
            <h1 className="text-2xl">Doctor Dashboard</h1>
            <hr/>
            <div className="flex justify-between border mt-2 rounded-md">
                <div className="w-1/2 border-r p-4">
                    <p className="text-xl">Doctor Information : </p>
                    <p className=''>Name : {doctor?.firstName} {doctor?.lastName}</p>
                    <p>Edduction Qualification : {doctor?.education}</p>
                    <p>Specialization : {doctor?.specialization}</p>
                    <p>Experience Area : {doctor?.experienceArea}</p>
                    {
                        doctor?.designation && doctor?.workedAt && <p>I am Working as a {doctor?.designation} of {doctor?.workedAt}</p>
                    }
                </div>
                <div className="w-1/2 p-4 space-y-2">
                    <p className="flex justify-between">
                        <span className="text-xl">Chamber Lists :</span>
                        <button onClick={()=>{setAdd(!add);setId(doctor._id)}} className="p-2 flex items-center space-x-1 bg-green-400 text-white rounded-md">
                            <IoMdAddCircleOutline size={22}/>
                            <span>Add Chamber</span>
                        </button>
                    </p>
                    <ChamberList chambers={doctor?.chambers}/>
                </div>
            </div>
            {add && <AddChamber id ={id} add={add} setAdd={setAdd}/>}
        </div>
    )
}