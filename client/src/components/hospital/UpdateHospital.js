import axios from "axios"
import { useEffect, useState } from "react"
import { RxCrossCircled } from "react-icons/rx"
import useUserStore from "../../features/userStore"
import handleChange from "../../utils/handleChange"
import {toast} from 'react-hot-toast'

export default function UpdateHospital(props){
    const {updateId,update,setUpdate} = props
    const {reload} = useUserStore()
    const [file,setFile] = useState()
    const [image,setImage] = useState()
    const [value,setValue] = useState({})
    const handleFile = (e)=>{
        setFile(e.target.files[0])
        const fileReader = new FileReader()
        fileReader.onload =(e)=>{
            setImage(e.target.result)
        }
        fileReader.readAsDataURL(e.target.files[0])
    }
    async function getHospital(){
        const res = await axios.get(`/api/hospital/${updateId}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            setValue(res.data.data)
        }
    }

    async function updateHospital(){
        const formData = new FormData()
        formData.append('file',file)
        formData.append('name',value.name)
        formData.append('location',value.location)
        formData.append('image',value.image)
        formData.append('type',value.type)
        formData.append('open',value.open)
        formData.append('close',value.close)
        formData.append('lat',value.lat)
        formData.append('long',value.long)
        const res = await axios.put(`/api/hospital/update/${updateId}`,formData,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        console.log(res.data);
        if(res.data.status === 200){
            reload()
            setUpdate(!update)
            toast.success('Updated added')
        }
    }

    useEffect(()=>{
        getHospital()
    },[])
    console.log(value);
    return(
        <div className="absolute -top-2 left-0 w-full h-screen bg-gray-500/50 flex justify-center items-center z-10">
            <div className="relative w-1/2 bg-white shadow-md rounded">
                <RxCrossCircled onClick={()=>setUpdate(!update)} size={25} className="absolute bg-white text-red-400 rounded-full -top-4 -right-4"/>
                <h1 className="text-xl text-center font-bold p-2 border-b">Update Hospital With Details :</h1>
                <div className="p-2 space-y-2">
                    <label>Hospital / Clinic /Diagnostic Name :</label>
                    <input type='text' name='name' value={value?.name} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                    
                    <label>Location :</label>
                    <input type='text' name='location' value={value?.location} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>

                    <div className="w-full space-y-1">
                            <label className="block">Organisation Type : </label>
                            <select name='type' value={value?.type} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'>
                                <option value="">Select type</option>
                                <option value="Hospital">Hospital</option>
                                <option value="Dainogostic Center">Dainogostic Center</option>
                                <option value="Clinic">Clinic</option>
                                <option value="Personal Chember">Personal Chember</option>
                            </select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <div className="w-9/12 space-y-2">
                            <label>Hospital Image :</label>
                            <input type='file' onChange={(e)=>handleFile(e)} className="w-full border p-1 rounded-md"/>
                            <div className="w-full flex items-center space-x-2">
                                <div className=" space-y-1">
                                    <label>Lantitude :</label>
                                    <input type="number" name='lat' value={Number(value?.lat)} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                                <div className=" space-y-1">
                                    <label>Longtitude :</label>
                                    <input type="number" name='long' value={Number(value?.long)} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                            </div>
                            <div className="w-full flex items-center space-x-2">
                                <div className=" space-y-1">
                                    <label>Start Time :</label>
                                    <input type="time" name='open' value={value?.open} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                                <div className=" space-y-1">
                                    <label>End Time :</label>
                                    <input type="time" name='close' value={value?.close} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                            </div>
                            
                        </div>
                        <div className="w-3/12 flex justify-center items-center">
                            {image && <img src={image} alt='user_image' className="h-[180px] mx-auto rounded-md"/>}
                        </div>
                    </div>
                    <button onClick={()=>updateHospital()} className='py-2 px-6 bg-green-400 text-white rounded-md'>Update</button>
                </div>
            </div>
        </div>
    )
}