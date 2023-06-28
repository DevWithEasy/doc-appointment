import { useState } from "react"
import { toast } from "react-hot-toast"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { NavLink, useNavigate } from "react-router-dom"
import handleChange from "../utils/handleChange"
import passwordView from "../utils/passwordView"
import { handleSignUp } from "../utils/users_utils"

export default function Signup(){
    const navigate = useNavigate()
    const [type,setType] = useState('password')
    const [value,setValue] = useState({
        name : '',
        email : '',
        phone : '',
        password : '',
    })

    return(
        <div className="w-full md:w-5/12 mx-auto px-4 py-2 border rounded space-y-2 bg-white">
            <h1 className="text-2xl font-bold text-center uppercase border-b py-2">Create new account</h1>
            <p className="text-gray-400 pb-5">Create your account with easily.Please provide your correct information and verify your account.</p>
            <div className=" space-y-1">
                <label>Name : </label>
                <input type='text' name='name' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none border-blue-200 '/>
            </div>

            <div className=" space-y-1">
                <label>Email : </label>
                <input type='email' name='email' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none border-blue-200'/>
            </div>

            <div className=" space-y-1">
                <label>Mobile No : (Must 11 digit) </label>
                <input type='text' name='phone' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none border-blue-200'/>
            </div>

            <div className="relative space-y-1">
                <label>Password : </label>
                <input type={type} name='password' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none border-blue-200'/>
                <button onClick={()=>passwordView(type,setType)} className='absolute right-2 bottom-2 text-gray-600'>
                    {type === 'password' ? <BsEyeSlash size={25}/> : <BsEye size={25}/>}
                </button>
            </div>

            <button onClick={()=>handleSignUp(value,navigate,toast)} className="w-full p-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300">Sign up</button>

            <div className="p-2 text-center">
                Already have an account ? <NavLink to='/signin' className='text-blue-500 font-bold'>Login</NavLink>
            </div>
        </div>
    )
}