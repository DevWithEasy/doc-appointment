import React from 'react';
import { Spinner } from '@chakra-ui/react';

const Loading = ({msg}) => {
    return (
        <div
            className='fixed h-screen w-full top-0 left-0 flex justify-center items-center bg-slate-500/50'
        >
            <div
                className='w-1/4 p-2 flex flex-col justify-center items-center bg-white rounded-md shadow-lg'
            >
                <Spinner size='md'/>
                <p>{msg}</p>
                <p className='animate-pulse'>Please wait...</p>
            </div>
        </div>
    );
};

export default Loading;