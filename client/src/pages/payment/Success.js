import React from 'react';
import {useNavigate} from 'react-router-dom'
import image from '../../assets/images/payment_success.png'
import {TiTickOutline} from 'react-icons/ti'

const Success = () => {
    const navigate = useNavigate()
    return (
        <div className='w-1/2 mx-auto pt-6 pb-16 flex justify-center items-center bg-white rounded'>
            <div className='text-center space-x-2'>
                <div className='flex justify-center'>
                    <TiTickOutline size={30} className='bg-green-500 text-white rounded-full'/>
                </div>
                <h1
                    className='text-2xl text-green-500'
                >
                    Payment successfull
                </h1>
                
                <img 
                    src={image} 
                    alt='payment_success' 
                    className='h-48 my-10'
                />
                <button
                    onClick={() => navigate('/')}
                    className='mt-6 px-4 py-2 bg-blue-500 text-white rounded shadow'
                >
                    Go Home
                </button>
            </div>
        </div>
    );
};

export default Success;