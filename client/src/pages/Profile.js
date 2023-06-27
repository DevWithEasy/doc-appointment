import moment from 'moment'
import { useEffect, useState } from "react"
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import Upload from "../components/Upload"
import useUserStore from "../features/userStore"
import dateGenerator from "../utils/dateGenerator"
import handleChange from "../utils/handleChange"
import { getUser, updateUser } from "../utils/users_utils"
export default function Profile(){
    const {random,addUser} = useUserStore()
    const {id}  = useParams()
    const [user,setUser] = useState({})
    const [address,setAddress] = useState({})

    useEffect(()=>{
        getUser(id,setUser,setAddress)
    },[id,random])

    return(
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-4">
                <div className="bg-white p-4 rounded-2xl shadow">
                    <img src={user?.image?.url}  alt="user" className='h-64 mx-auto rounded-md'/>
                    <div className="flex justify-center items-center py-2">
                        <Upload/>
                    </div>
                    <div className="p-4 flex justify-between">
                        <p className="text-2xl font-bold">{user?.name}</p>
                        <div>
                            <p>
                                Member from 
                                 - {moment(user?.createdAt).fromNow()}
                            </p>
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
                            <input type='date' name='dob' value={dateGenerator(user?.dob)} onChange={(e)=>handleChange(e,user,setUser)}  className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder=""/>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type='text' name='location' value={address?.location} onChange={(e)=>handleChange(e,address,setAddress)} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Area location (village)"/>
                            <input type='text' name='post_office' value={address?.post_office} onChange={(e)=>handleChange(e,address,setAddress)} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Post office (code)"/>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type='text' name='post_code' value={address?.post_code} onChange={(e)=>handleChange(e,address,setAddress)} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Post Code"/>

                            <input type='text' name='upazilla' value={address?.upazilla} onChange={(e)=>handleChange(e,address,setAddress)} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Upazilla"/>

                        </div>
                        <div className="flex items-center space-x-2">
                            <input type='text' name='district' value={address?.district} onChange={(e)=>handleChange(e,address,setAddress)} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="District"/>
                        </div>

                        <div className="flex justify-center items-center pt-4">
                            <button onClick={()=>updateUser(id,user,address,setUser,addUser,toast)} className="px-6 py-2 bg-green-400 text-white rounded-full hover:bg-green-500">Save</button>
                        </div>

                    </div>
                </div>
                <div className="">
                    <div className="bg-white p-4 rounded-2xl shadow space-y-2">
                        <p className="flex justify-between">
                            <span className="">Balance</span>
                            <span>{user?.balance} -Tk</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="">Total Appointment</span>
                            <span>{user?.appointments}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}