import axios from "axios"
import { useEffect, useState } from "react"
import { RxCrossCircled } from "react-icons/rx"
import useUserStore from "../../features/userStore"
import handleChange from "../../utils/handleChange"

export default function UpdateChamber(props){
    const {reload} = useUserStore()
    const {updateId,update,setUpdate} = props
    const [value,setValue] = useState({})
    async function getChamber(id){
        const res = await axios.get(`http://localhost:8080/api/doctor/findChamber/${id}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setValue(res.data.data)
    }

    async function updateChamber(){
        const res = await axios.put(`/api/doctor/updateChamber/${value._id}`,value,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            reload()
            setUpdate(!update)
        }
    }

    useEffect(()=>{
        getChamber(updateId)
    },[updateId])
    console.log(value)
    return(
        <div className="absolute top-0 left-0 w-full h-screen bg-gray-500/50 flex justify-center items-center">
            <div className="relative w-1/2 bg-white shadow-md rounded">
                <RxCrossCircled onClick={()=>setUpdate(!update)} size={25} className="absolute bg-white text-red-400 rounded-full -top-4 -right-4"/>
                <h1 className="text-xl text-center font-bold p-2 border-b">Update Chamber With Details :</h1>
                <div className="p-2 space-y-2">
                    <label>Hospital / Clinic /Diagnostic Name</label>
                    <input type='text' name='vanue' value={value?.vanue} onChange={(e)=>handleChange(e,value,setValue)}/>
                    <label>Location</label>
                    <input type='text' name='location' value={value?.location} onChange={(e)=>handleChange(e,value,setValue)}/>
                    <div className="md:flex md:space-x-2 space-y-2">
                        <div className="w-full md:w-1/2 space-y-1">
                            <label className="block">Service Day and Time : </label>
                            <select name='day' value={value?.day} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'>
                                <option value="">Select Day</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="WednesDay">WednesDay</option>
                                <option value="Thusday">Thusday</option>
                                <option value="Friday">Friday</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/2 flex items-center space-x-2">
                            <div className=" space-y-1">
                                <label>Start Time :</label>
                                <input value={value?.from} type="time" name='from' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                            </div>
                            <div className=" space-y-1">
                                <label>End Time :</label>
                                <input value={value?.to} type="time" name='to' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                            </div>
                        </div>
                    </div>
                    <button onClick={()=>updateChamber()} className='py-2 px-6 bg-green-400 text-white rounded-md'>Submit</button>
                </div>
            </div>
        </div>
    )
}