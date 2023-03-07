import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
export default function Profile(){
    const {id}  = useParams()
    const [user,setUser] = useState({})
    async function getUser(){
        const user = await axios.get(`/api/auth/user/${id}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setUser(user.data.data)
    }
    useEffect(()=>{
        getUser()
    },[])
    console.log(user)
    return(
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow">
                    <img src={user?.image?.url}  alt="user" className='h-64 mx-auto rounded-md'/>
                    <div className="p-4 flex justify-between">
                        <p className="text-2xl font-bold">{user?.name}</p>
                        <div>
                            <p>Member from 21/02/12 (2year)</p>
                            <p>Account status : General User</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <input type='text' value={user?.name} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Name"/>
                        
                        <div className="flex items-center space-x-2">
                            <input type='email' value={user?.email} className='w-full p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Email"/>
                            <input type='text' value={user?.phone} className='w-full p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Phone number"/>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type='text' value={user?.gender} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Gender"/>
                            <input type='date' value={user?.dob} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder=""/>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type='text' value={user?.address?.location} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Area location (village)"/>
                            <input type='text' value={user?.address?.post_office} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Post office (code)"/>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type='text' value={user?.address?.upazilla} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="Upazilla"/>
                            <input type='text' value={user?.address?.district} className='w-1/2 p-2 border-b focus:outline-none focus:border-blue-300' placeholder="District"/>
                        </div>

                        <div className="flex justify-center items-center pt-4">
                            <button className="px-6 py-2 bg-green-400 text-white rounded-full hover:bg-green-500">Save</button>
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
        </div>
    )
}