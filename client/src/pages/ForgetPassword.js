import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const ForgetPassword = () => {
    const [loading,setLoading] = useState(false)
    const [email,setEmail] = useState({})
    const [user,setUser] = useState({})
    async function handlefind(){
        if(!email){
            return toast.error('Please enter email address')
        }
        try {
            setLoading(true)
            const res = await axios.get(`/api/auth/find?email=${email}`)
            if(res.data.status === 200){
                setUser(res.data.data)
                setEmail('')
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            toast.error('Verification Failed')
        }
    
    }
    async function handleSendForget(){
        if(!email){
            return toast.error('Please enter email address')
        }
        try {
            setLoading(true)
            const res = await axios.post('/api/auth/verify',{email},{
                headers: {
                    authorization : 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if(res.data.status === 200){
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            toast.error('Verification Failed')
        }
    
    }

    console.log(user)
    return (
        <div>
            <div className="w-full md:w-1/2 mx-auto  border shadow rounded bg-white">
                <h1 className="p-2 bg-gray-100 text-2xl font-bold uppercase">Find account</h1>
                <div className="p-2 flex space-x-1">
                    <input type='email' name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email address' className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                    <button
                        onClick={()=>handlefind()} 
                        className="px-6 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300">
                            {loading ? 'Finding...' : 'Find'}
                    </button>
                </div>
                <div className="flex px-2 pb-2">
                    <img src={user?.image?.url}  alt="user" className='h-16 w-16 rounded-full'/>
                    <div>
                        <p>{user?.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;