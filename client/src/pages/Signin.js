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
    const [loading,setLoading] = useState(false)
    const [type,setType] = useState('password')
    const [value,setValue] = useState({
        email : '',
        password : '',
    })

    async function handleSignIn(){
        try {
            setLoading(true)
            const res = await axios.post('/api/auth/signin',value)
            if(res.data.status === 200){
                setLoading(false)
                toast.success('Successfully signed in')
                localStorage.setItem('accessToken', res.data.data.token)
                addUser((res.data.data))
                if(location.state?.from){
                    navigate(location.state.from)
                }else{
                    navigate('/')
                }
            }
        } catch (error) {
            setLoading(false)
            if(error.response.data.message){
                toast.error(error.response.data.message)
            }else{
                toast.error('Something went wrong')
            }
        }
    }

    return(
        <div className="w-full md:w-5/12 mx-auto px-4 py-2 border rounded space-y-2 bg-white">
            <h1 className="text-2xl font-bold text-center uppercase border-b py-2">Log in</h1>
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

            <button 
                onClick={()=>handleSignIn()} 
                className="w-full p-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300"
            >
                {loading ? 'Please wait...' : 'Sign in'}
            </button>

            <div className="p-2 flex justify-between text-blue-500">
                <NavLink to='/forget-password' className=''>Forget password?</NavLink>
                <NavLink to='/signup' className=''>Create an account</NavLink>
            </div>
        </div>
    )
}