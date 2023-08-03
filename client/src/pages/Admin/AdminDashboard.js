import { toBengaliNumber } from 'bengali-number';
import React from 'react';

const AdminDashboard = () => {
    return (
        <div
            className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-3'
        >
            <div
                className='p-2 bg-green-100 text-green-500 rounded'
            >
                <p className='text-center'>
                মোট ব্যবহার কারী
                </p>
                <p className='text-center text-xl'>
                {toBengaliNumber(1)}
                </p>
            </div>
            <div
                className='p-2 bg-blue-100 text-blue-500 rounded'
            >
                <p className='text-center'>
                মোট ডাক্তার
                </p>
                <p className='text-center text-xl'>
                {toBengaliNumber(1)}
                </p>
            </div>
            <div
                className='p-2 bg-yellow-100 text-yellow-500 rounded'
            >
                <p className='text-center'>
                মোট হাসপাতাল
                </p>
                <p className='text-center text-xl'>
                {toBengaliNumber(1)}
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;