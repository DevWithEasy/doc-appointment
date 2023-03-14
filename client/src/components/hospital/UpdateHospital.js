import axios from "axios"
import { useState } from "react"
import { RxCrossCircled } from "react-icons/rx"
import useUserStore from "../../features/userStore"
import handleChange from "../../utils/handleChange"
import Input from "../Input"

export default function AddHospital(props){
    const {add,setAdd} = props
    const {reload} = useUserStore()
    const [file,setFile] = useState()
    const [image,setImage] = useState()
    const [value,setValue] = useState({
        name : '',
        location : '',
        image : '',
        open : '',
        close : '',
        lat : '',
        long : ''
    })
    const handleFile = (e)=>{
        setFile(e.target.files[0])
        const fileReader = new FileReader()
        fileReader.onload =(e)=>{
            setImage(e.target.result)
        }
        fileReader.readAsDataURL(e.target.files[0])
    }
    async function addChamber(){
        const res = await axios.post(`/api/doctor/addChamber/`,value,{
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
        <div className="absolute -top-2 left-0 w-full h-screen bg-gray-500/50 flex justify-center items-center z-10">
            <div className="relative w-1/2 bg-white shadow-md rounded">
                <RxCrossCircled onClick={()=>setAdd(!add)} size={25} className="absolute bg-white text-red-400 rounded-full -top-4 -right-4"/>
                <h1 className="text-xl text-center font-bold p-2 border-b">Add Hospital With Details :</h1>
                <div className="p-2 space-y-2">
                    <Input label='Hospital / Clinic /Diagnostic Name' type='text' name='vanue' value={value} setValue={setValue}/>
                    <Input label='Location' type='text' name='location' value={value} setValue={setValue}/>
                    <div className="w-full space-y-1">
                            <label className="block">Organisation Type : </label>
                            <select name='day' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'>
                                <option value="">Select type</option>
                                <option value="Saturday">Hospital</option>
                                <option value="Sunday">Dainogostic Center</option>
                                <option value="Monday">Clinic</option>
                                <option value="Tuesday">Personal Chember</option>
                            </select>
                        </div>
                    
                    <div className="flex items-center space-x-2">
                        <div className="w-9/12 space-y-2">
                            <label>Hospital Image :</label>
                            <input type='file' onChange={(e)=>handleFile(e)} className="w-full border p-1 rounded-md"/>
                            <div className="w-full flex items-center space-x-2">
                                <div className=" space-y-1">
                                    <label>Start Time :</label>
                                    <input type="number" name='lat' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                                <div className=" space-y-1">
                                    <label>End Time :</label>
                                    <input type="number" name='long' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                            </div>
                            <div className="w-full flex items-center space-x-2">
                                <div className=" space-y-1">
                                    <label>Start Time :</label>
                                    <input type="time" name='open' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                                <div className=" space-y-1">
                                    <label>End Time :</label>
                                    <input type="time" name='close' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                            </div>
                            
                        </div>
                        <div className="w-3/12 flex justify-center items-center">
                            {image && <img src={image} alt='user_image' className="h-[180px] mx-auto rounded-md"/>}
                        </div>
                    </div>
                    <button onClick={()=>addChamber()} className='py-2 px-6 bg-green-400 text-white rounded-md'>Submit</button>
                </div>
            </div>
        </div>
    )
}