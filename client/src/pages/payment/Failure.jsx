import React from 'react';
import {useNavigate} from 'react-router-dom'
import image from '../../assets/images/payment_failed.png'
import {RxCross2} from 'react-icons/rx'

const Failure = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full m-4 md:w-1/2 md:mx-auto pt-6 pb-16 flex justify-center items-center bg-white rounded'>
            <div className='text-center space-x-2'>
                <div className='flex justify-center'>
                    <RxCross2 size={30} className='bg-red-500 text-white rounded-full'/>
                </div>
                <h1
                    className='text-2xl text-red-500'
                >
                    Payment failed
                </h1>
                
                <img 
                    src={image} 
                    alt='payment_success' 
                    className='h-48 my-10'
                />
                <div className='space-x-2'>
                    <button
                        onClick={() => navigate('/payment/add')}
                        className='mt-6 px-4 py-2 bg-red-500 text-white rounded shadow'
                    >
                        Try again
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className='mt-6 px-4 py-2 bg-blue-500 text-white rounded shadow'
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Failure;