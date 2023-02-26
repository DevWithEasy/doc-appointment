import axios from "axios"
import { useState } from "react"
import { RxCrossCircled } from "react-icons/rx"
import useUserStore from "../../features/userStore"
import handleChange from "../../utils/handleChange"
import Input from "../Input"

export default function AddChamber(props){
    const {id,add,setAdd} = props
    const {reload} = useUserStore()
    const [value,setValue] = useState({
        vanue : '',
        location : '',
        day : '',
        from : '',
        to : ''
    })
    async function addChamber(){
        const res = await axios.post(`/api/doctor/addChamber/${id}`,value,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            reload()
            setAdd(!add)
        }
    }
    return(
        <div className="absolute top-0 left-0 w-full h-screen bg-gray-500/50 flex justify-center items-center">
            <div className="relative w-1/2 bg-white shadow-md rounded">
                <RxCrossCircled onClick={()=>setAdd(!add)} size={25} className="absolute bg-white text-red-400 rounded-full -top-4 -right-4"/>
                <h1 className="text-xl text-center font-bold p-2 border-b">Add Chamber With Details :</h1>
                <div className="p-2 space-y-2">
                    <Input label='Hospital / Clinic /Diagnostic Name' type='text' name='vanue' value={value} setValue={setValue}/>
                    <Input label='Location' type='text' name='location' value={value} setValue={setValue}/>
                    <div className="md:flex md:space-x-2 space-y-2">
                        <div className="w-full md:w-1/2 space-y-1">
                            <label className="block">Service Day and Time : </label>
                            <select name='day' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'>
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
                                <input type="time" name='from' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                            </div>
                            <div className=" space-y-1">
                                <label>End Time :</label>
                                <input type="time" name='to' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                            </div>
                        </div>
                    </div>
                    <button onClick={()=>addChamber()} className='py-2 px-6 bg-green-400 text-white rounded-md'>Submit</button>
                </div>
            </div>
        </div>
    )
}