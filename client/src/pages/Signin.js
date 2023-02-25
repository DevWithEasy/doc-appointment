import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import useUserStore from "../features/userStore"
import handleChange from "../utils/handleChange"
import passwordView from "../utils/passwordView"

export default function Signin(){
    const addUser = useUserStore(state=>state.addUser)
    const location = useLocation()
    const  navigate = useNavigate()
    const [type,setType] = useState('password')
    const [value,setValue] = useState({
        email : '',
        password : '',
    })

    async function handleSignIn(){
        try {
            const res = await axios.post('api/auth/signin',value)
            toast.success('Successfully signed in')
            localStorage.setItem('accessToken', res.data.data.token)
            addUser((res.data.data))
            if(location.state?.from){
                navigate(location.state.from)
            }else{
                navigate('/')
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    return(
        <div className="w-full md:w-1/2 mx-auto p-2 border shadow rounded space-y-2">
            <h1 className="text-2xl font-bold text-center uppercase">Login account</h1>
            <div className=" space-y-1">
                <label>Email : </label>
                <input type='email' name='email' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
            </div>

            <div className="relative space-y-1">
                <label>Password : </label>
                <input type={type} name='password' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                <button onClick={()=>passwordView(type,setType)} className='absolute right-2 bottom-2 text-gray-600'>
                    {type === 'password' ? <BsEyeSlash size={25}/> : <BsEye size={25}/>}
                </button>
            </div>

            <button onClick={()=>handleSignIn()} className="w-full p-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300">Sign in</button>

            <div className="p-2">
                You are not an account ? <NavLink to='/signup' className='text-blue-500 font-bold'>Create an account</NavLink>
            </div>
        </div>
    )
}