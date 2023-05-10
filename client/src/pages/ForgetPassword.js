import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle
} from '@chakra-ui/react';
import hiddenEmail from '../utils/hiddenEmail';

const ForgetPassword = () => {
    const [finding,setFinding] = useState(false)
    const [sending,setSending] = useState(false)
    const [loading,setLoading] = useState(false)
    const [email,setEmail] = useState('')
    const [user,setUser] = useState({

    })
    async function handlefind(){
        if(!email){
            return toast.error('Please enter email address')
        }
        setLoading(true)
        try {
            const res = await axios.get(`/api/auth/find?email=${email}`)
            if(res.data.status === 200){
                setUser(res.data)
                setEmail('')
                setFinding(res.data.find)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            toast.error('Something went wrong')
        }
    
    }
    async function handleSendForget(){
        try {
            setLoading(true)
            const res = await axios.post(`/api/auth/forget-password?email=${user.data.email}`)
            if(res.data.status === 200){
                setLoading(false)
                setSending(true)
            }
        } catch (error) {
            setLoading(false)
            setSending(false)
        }
    
    }

    return (
        <div>
            {!finding ? <div className="mt-20 w-full md:w-1/2 mx-auto  border shadow rounded-md bg-white">
                <h1 className="p-2 text-2xl font-bold uppercase">Find Account</h1>
                <hr/>
                <div className="p-4 space-y-2">
                    <p>Please enter your email address and find your account.</p>
                    <input type='email' value={email} name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email address' className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>

                    {
                        user?.find === false && 
                        <Alert status='error'>
                            <AlertIcon />
                            No account found in this email.
                        </Alert> 
                    }
                </div>
                <hr/>
                <div className='flex justify-end space-x-2 px-4 py-2 '>
                    <button
                        onClick={()=>setEmail('')} 
                        className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 hover:transition-all hover:duration-300">
                            Cancel
                    </button>
                    <button
                        onClick={()=>handlefind()} 
                        className="px-10 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300">
                            {loading ? 'Findind...' : 'Find'}
                    </button>
                </div>
            </div>
            :
            <div className={`mt-20 w-full md:w-1/2 mx-auto ${sending ? '' : 'border shadow p-10'} rounded-md bg-white`}>
                {!sending ? 
                    <div className='p-2 flex space-x-3 rounded-md'>
                        <img src={user?.data?.image?.url}  alt="user" className='h-20 w-20 rounded-full'/>
                        <div className='space-y-2'>
                            <p className='font-semibold'>{user?.data?.name}</p>
                            <p className='text-sm text-gray-300'>{hiddenEmail(user?.data?.email)}</p>
                            <p className='space-x-4 pt-4'>
                                <button
                                    onClick={()=>setFinding(false)} 
                                    className='px-2 py-1 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300'
                                >
                                    Not my acconut ?
                                </button>
                                <button
                                onClick={()=>handleSendForget()} 
                                className='px-2 py-1 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300'
                                >
                                    {loading ? 'Loading...' : 'Reset password'}
                                </button>
                            </p>
                        </div>
                    </div>
                :
                    <Alert
                        status='success'
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='200px'
                        borderRadius='5px'
                        >
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            Successfully send!
                        </AlertTitle>
                        <AlertDescription maxWidth='sm'>
                            We are a a password reset link to you email.Please check your email inbox or spam box.
                        </AlertDescription>
                    </Alert>    
                }

            </div>}
        </div>
    );
};

export default ForgetPassword;