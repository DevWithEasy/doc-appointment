import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from'react-router-dom'
import {FaBookMedical} from 'react-icons/fa'
export default function Doctor({doctor}){
    const [user,setUser] = useState({})
    async function findUser(){
        const res = await axios.get(`/api/auth/findUser/${doctor?.userId}`)
        setUser(res.data.data)
    }
    useEffect(()=>{
        findUser()
    },[])
    return(
        <div className="flex shadow border-2 border-blue-200 rounded p-6 md:p-3">
            <div className='flex justify-center '>
                <img src={user?.image?.url} alt="" className='w-20 h-20 rounded-full'/>
            </div>
            <div className='pl-4 space-y-2'>
                <p className='text-xl font-bold'>{doctor?.firstName} {doctor?.lastName}</p>
                <p>{doctor?.education}</p>
                <p>{doctor?.specialization}</p>
                <p>{doctor?.experienceArea}</p>
                {
                    doctor?.designation && doctor?.workedAt && <p>{doctor?.designation} of {doctor?.workedAt}</p>
                }
                <p>Rating - </p>
                <p className='flex justify-center'>
                    <Link to={`/appointment-submit/${doctor?._id}`} className='flex items-center space-x-2 text-green-500 px-4 py-2 rounded-full border border-green-500 hover:bg-green-500 hover:text-white transition-all duration-300'>
                        <FaBookMedical/>
                        <span>Book Appointment</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}