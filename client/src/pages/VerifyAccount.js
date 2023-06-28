import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import img from "../assets/images/verified.png";
import { handleSendCodeAgain, handleVerify } from "../utils/users_utils";

export default function VerifyAccount(){
    const navigate = useNavigate()
    const [code,setCode] = useState('')
    const [loading,setLoading] = useState(false)
    const [verified,setVerified] = useState(false)

    return(
        <div className="pt-20">
            {!verified ? <div className="w-full md:w-1/2 mx-auto  border shadow rounded bg-white">
                <h1 className="p-2 bg-gray-100 text-2xl font-bold uppercase">Verify account</h1>
                <div className="p-2 space-y-2">
                    <span className="text-gray-500">We sent a verification code to your email address.Please check your email inbox or spam folder and verify your account.</span> 
                    <input type='email' name='email' onChange={(e)=>setCode(e.target.value)} placeholder='Verification code' className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                    
                </div>
                <div className="flex justify-end px-2 pb-2 space-x-2">
                    <button
                        onClick={()=>handleSendCodeAgain(toast)} 
                        className="text-blue-500"
                    >
                        Sent code again
                    </button>
                    <button
                        onClick={()=>handleVerify(code,navigate,setLoading,setVerified,toast)} 
                        className="px-6 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300">
                            {loading ? 'Please wait...' : 'Confirm'}
                    </button>
                </div>
            </div> :
            <div className="flex flex-col items-center space-y-3 p-4 w-full md:w-1/2 mx-auto  border shadow rounded bg-white">
            <img src={img} alt="verify_image" className="w-16 mx-auto"/>
            <p>Account successfully verified.</p>
            <p className="text-gray-400 animate-bounce">Ridecting to signin page...</p>
            </div>}
        </div>
    )
}