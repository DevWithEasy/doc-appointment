import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from'react-router-dom'
export default function Doctor({doctor}){
    const [user,setUser] = useState({})
    async function findUser(){
        const res = await axios.get(`http://localhost:8080/api/auth/findUser/${doctor?.userId}`)
        setUser(res.data.data)
    }
    useEffect(()=>{
        findUser()
    },[])
    console.log(doctor);
    return(
        <div className="shadow border-2 border-blue-200 rounded p-2 flex flex-col items-center space-y-2">
            <img src={user?.image?.url} alt="" className='w-[150px] rounded-lg ring-2'/>
            <p className='text-xl font-bold'>{doctor?.firstName} {doctor?.lastName}</p>
            <p>{doctor?.education}</p>
            <p>{doctor?.specialization}</p>
            <p>{doctor?.experienceArea}</p>
            {
                doctor?.designation && doctor?.workedAt && <p>{doctor?.designation} of {doctor?.workedAt}</p>
            }
            <p>Rating - </p>
            <Link to={`/appointment-submit/${doctor?._id}`} className='bg-green-400 p-2 text-white rounded shadow shadow-green-400 hover:bg-green-500'>Appointment</Link>
        </div>
    )
}