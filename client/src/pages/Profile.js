import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import handleChange from "../utils/handleChange"
import {toast} from 'react-hot-toast'
import {BiImageAdd} from 'react-icons/bi'
import Upload from "../components/Upload"
import useUserStore from "../features/userStore"
import getdateFormate from "../utils/getDateFormate"
export default function Profile(){
    const {random} = useUserStore()
    const {id}  = useParams()
    const [user,setUser] = useState({})
    const [address,setAddress] = useState({})
    const [upload,setUpload] = useState(false)
    async function getUser(){
        const res = await axios.get(`/api/auth/user/${id}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setUser(res.data.data)
        setAddress(res.data.data.address)
    }

    async function updateUser(){
        const res = await axios.put(`/api/auth/user/update/${id}`,
        {...user,address},
        {
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            setUser(res.data.data)
            toast.success('User updated successfully')
        }
    }

    useEffect(()=>{
        getUser()
    },[random])

    return(
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-4">
                <div className="bg-white p-4 rounded-2xl shadow">
                    <img src={user?.image?.url}  alt="user" className='h-64 mx-auto rounded-md'/>
                    <div className="flex justify-center items-center py-2">
                        <button onClick={()=>setUpload(!upload)} className="flex items-center px-6 py-2 space-x-2 bg-green-400 text-white rounded-full hover:bg-green-500">
                            <BiImageAdd size={20}/>
                            <span>UPLOAD</span>
                        </button>
                    </div>
                    <div className="p-4 flex justify-between">
                        <p className="text-2xl font-bold">{user?.name}</p>
                        <div>
                            <p>Member from 21/02/12 (2year)</p>
                            <p>Account status : General User</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <input type='text' name='name' value={user?.name} onChange={(e)=>handleChange(e,user,setUser)} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Name"/>
                        
                        <div className="flex items-center space-x-2">
                            <input type='email' name='email' value={user?.email} onChange={(e)=>handleChange(e,user,setUser)}  className='w-full p-2 bg-gray-200 rounded-md' placeholder="Email" disabled/>
                            <input type='text' name='phone' value={user?.phone} onChange={(e)=>handleChange(e,user,setUser)}  className='w-full p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Phone number"/>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type='text' name='gender' value={user?.gender} onChange={(e)=>handleChange(e,user,setUser)}  className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Gender"/>
                            <input type='date' name='dob' value={getdateFormate(user?.dob)} onChange={(e)=>handleChange(e,user,setUser)}  className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder=""/>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type='text' name='location' value={address?.location} onChange={(e)=>handleChange(e,address,setAddress)} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Area location (village)"/>
                            <input type='text' name='post_office' value={address?.post_office} onChange={(e)=>handleChange(e,address,setAddress)} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Post office (code)"/>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type='text' name='upazilla' value={address?.upazilla} onChange={(e)=>handleChange(e,address,setAddress)} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Upazilla"/>
                            <input type='text' name='district' value={address?.district} onChange={(e)=>handleChange(e,address,setAddress)} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="District"/>
                        </div>

                        <div className="flex justify-center items-center pt-4">
                            <button onClick={()=>updateUser()} className="px-6 py-2 bg-green-400 text-white rounded-full hover:bg-green-500">Save</button>
                        </div>

                    </div>
                </div>
                <div className="">
                    <div className="bg-white p-4 rounded-2xl shadow space-y-2">
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
            </div>
            {upload && <Upload {...{upload,setUpload}}/>}
        </div>
    )
}