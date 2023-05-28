import React, { useState } from 'react';
import handleChange from '../utils/handleChange';
import HowtoAddBalance from '../components/HowtoAddBalance';

const AddBalance = () => {
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState({

    })
    return (
        <div className="w-full md:w-5/12 mx-auto px-4 py-2 border rounded space-y-2 bg-white">
            <h1 className="text-2xl font-bold text-center uppercase border-b py-2">Add balance in account</h1>
            <div className=" space-y-1">
                <label>Number : </label>
                <input type='text' name='number' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
            </div>
            <div className=" space-y-1">
                <label>Payment option  : </label>
                <select type='text' name='payment' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'>
                    <option value='BKash'>BKash</option>
                    <option value='BKash'>Nagad</option>
                </select>
            </div>
            <div className=" space-y-1">
                <label>Transection ID : </label>
                <input type='text' name='tnxID' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
            </div>
            


            <button 
                onClick={()=>{}} 
                className="w-full p-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300"
            >
                {loading ? 'Please wait...' : 'Submit'}
            </button>

            <div className="p-2 flex justify-between text-blue-500">
                <HowtoAddBalance/>
            </div>
        </div>
    );
};

export default AddBalance;