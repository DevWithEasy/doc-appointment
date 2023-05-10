import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const code = searchParams.get('code')
    const token = searchParams.get('token')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [loading,setLoading] = useState('')
    const [nomatch,setNomatch] = useState('')

    async function handleSendForget(){
        if(password !== confirmPassword){
           return setNomatch('Confirm password not match')
        }else{
            setNomatch('')
        }
        try {
            setLoading(true)
            const res = await axios.post(`/api/auth/reset-password`,{
                    code,password
                },
                {
                    headers : {
                        authorization : 'Bearer ' + token
                    }
                }
            )
            if(res.data.status === 200){
                navigate('/signin')
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
        }
    
    }
    
    return (
        <div>
            <div className="mt-20 w-full md:w-1/2 mx-auto  border shadow rounded-md bg-white">
                <h1 className="p-2 text-2xl font-bold uppercase">Reset Password</h1>
                <hr/>
                <div className="px-4 py-6 space-y-2">
                    <input type='text' value={password} name='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                    <input type='text' value={confirmPassword} name='password' onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                    {nomatch}
                </div>
                <hr/>
                <div className='flex justify-end space-x-2 px-4 py-2 '>
                    <button
                        onClick={()=>{}} 
                        className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 hover:transition-all hover:duration-300">
                            Cancel
                    </button>
                    <button
                        onClick={()=>handleSendForget()} 
                        className="px-10 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300">
                            {loading ? 'Please wait...' : 'Submit'}
                    </button>
                </div>
                </div>
        </div>
    );
};

export default ResetPassword;