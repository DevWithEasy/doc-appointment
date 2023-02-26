import { useState } from "react"
import handleChange from "../utils/handleChange"
import passwordView from "../utils/passwordView"
import {BsEye,BsEyeSlash} from "react-icons/bs"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function Signup(){
    const navigate = useNavigate()
    const [type,setType] = useState('password')
    const [value,setValue] = useState({
        name : '',
        email : '',
        phone : '',
        password : '',
    })

    async function handleSignUp(){
        try {
            await axios.post('/api/auth/signup',value)
            toast.success('Account created successfully')
            navigate('/signin')
        } catch (error) {
            toast.error('Account created Failed')
        }
    }

    return(
        <div className="w-full md:w-1/2 mx-auto p-2 border shadow rounded space-y-2">
            <h1 className="text-2xl font-bold text-center uppercase">Create new account</h1>

            <div className=" space-y-1">
                <label>Name : </label>
                <input type='text' name='name' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
            </div>

            <div className=" space-y-1">
                <label>Email : </label>
                <input type='email' name='email' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
            </div>

            <div className=" space-y-1">
                <label>Mobile No : (Must 11 digit) </label>
                <input type='text' name='phone' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
            </div>

            <div className="relative space-y-1">
                <label>Password : </label>
                <input type={type} name='password' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                <button onClick={()=>passwordView(type,setType)} className='absolute right-2 bottom-2 text-gray-600'>
                    {type === 'password' ? <BsEyeSlash size={25}/> : <BsEye size={25}/>}
                </button>
            </div>

            <button onClick={()=>handleSignUp()} className="w-full p-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300">Sign up</button>

            <div className="p-2">
                Already have an account ? <NavLink to='/signin' className='text-blue-500 font-bold'>Login</NavLink>
            </div>
        </div>
    )
}