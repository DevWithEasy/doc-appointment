import React, { useState } from 'react';
import handleChange from '../utils/handleChange';
import HowtoAddBalance from '../components/HowtoAddBalance';
import  toast from 'react-hot-toast'
import axios from 'axios';

const AddBalance = () => {
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState({
        amount :'',
    })

    async function addBalance() {

        if(!value.amount){
            return toast.error('Please filled all fields')
        }
        setLoading(true)
        try {
            const res = await axios.post('/api/transection/init',value,{
                headers: {
                    authorization : 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if(res.data.status === 200){
                setLoading(false)
                toast.success(res.data.message)
            }
        } catch (error) {
            setLoading(false)
        }
    } 
    return (
        <div className="w-full md:w-5/12 mx-auto px-4 py-2 border rounded space-y-2 bg-white">
            <h1 className="text-2xl font-bold text-center uppercase border-b py-2">Add balance in account</h1>
            <div className=" space-y-1">
                <label>Amount : </label>
                <input type='text' name='amount' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
            </div>

            <button 
                onClick={()=>addBalance()} 
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