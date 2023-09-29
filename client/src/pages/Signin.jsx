import { useState } from "react"
import { toast } from "react-hot-toast"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import useUserStore from "../features/userStore"
import handleChange from "../utils/handleChange"
import passwordView from "../utils/passwordView"
import { handleSignIn } from "../utils/users_utils"
import { io } from 'socket.io-client'

const socket = io(process.env.NODE_ENV === 'production' ? 'https://amaderdoctor.vercel.app' : 'http://localhost:8080')

export default function Signin(){
    const addUser = useUserStore(state=>state.addUser)
    const location = useLocation()
    const  navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [type,setType] = useState('password')
    const [value,setValue] = useState({
        email : '',
        password : '',
    })


    return(
        <div className="w-10/12 md:w-5/12 mx-auto px-4 py-2 border rounded space-y-2 bg-white/50">
            <h1 className="text-2xl font-bold text-center uppercase border-b py-2">প্রবেশ করুন</h1>
            <div className=" space-y-1">
                <label>আপনার ই-মেইল অথবা নাম্বার লিখুন : </label>
                <input 
                    type='email' 
                    name='email' 
                    onChange={(e)=>handleChange(e,value,setValue)} 
                    className='w-full p-2 rounded placeholder:text-sm border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:border-blue-500'
                />
            </div>

            <div className="relative space-y-1">
                <label>আপনার পাসওয়ার্ড লিখুন : </label>
                <input 
                    type={type} 
                    name='password' 
                    onChange={(e)=>handleChange(e,value,setValue)} 
                    className='w-full p-2 rounded placeholder:text-sm border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:border-blue-500'
                />
                <button onClick={()=>passwordView(type,setType)} className='absolute right-2 bottom-3 text-gray-600'>
                    {type === 'password' ? <BsEyeSlash size={20}/> : <BsEye size={20}/>}
                </button>
            </div>

            <button 
                onClick={()=>handleSignIn(value,addUser,setLoading,navigate,location,toast,socket)} 
                className="w-full p-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300"
            >
                {loading ? 'অপেক্ষা করুন...' : 'প্রবেশ করুন'}
            </button>

            <div className="p-2 flex justify-between text-blue-500">
                <NavLink to='/forget_password' className=''>পাসওয়ার্ড ভুলে গেছেন?</NavLink>
                <NavLink to='/signup' className=''>নতুন একাউন্ট করুন</NavLink>
            </div>
        </div>
    )
}