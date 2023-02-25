import { useState } from "react";

export default function VerifyAccount(){
    const [value,setValue] = useState('')
    return(
        <div className="w-full md:w-1/2 mx-auto  border shadow rounded">
            <h1 className="p-2 bg-gray-100 text-2xl font-bold uppercase">Verify account</h1>
            <div className="p-2 space-y-2">
                <span className="text-gray-500">We sent a verification code to your email address.Please check your email inbox or spam folder and verify your account.</span> 
                <input type='email' name='email' onChange={(e)=>setValue(e.target.value)} placeholder='Verification code' className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
            </div>
            <div className="flex justify-end px-2 pb-2">
                <button className="p-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300">Confirm</button>
            </div>
        </div>
    )
}