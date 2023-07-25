import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllActiveDoctors } from "../utils/doctors_utils"
import {BsSearch} from 'react-icons/bs'

export default function Home(){
    const navigate = useNavigate()
    const [doctors,setDoctors] = useState([])
    const [query,setQuery] = useState('')
    const [specialization,setSpecialization] = useState('')
    const [day,setDay] = useState('')

    const daysOfWeek = ["Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    useEffect(()=>{
        getAllActiveDoctors(setDoctors)
    },[])

    console.log(doctors)
    return(
        <div>
            <div className="text-center space-y-2 mb-5">
                <h1 className="text-3xl font-semibold">
                    Search Doctors,Make an appointment
                </h1>
                <p className="text-gray-500">
                    Discover the best doctors,hospitals and ambulances
                </p>
                <div
                    className="pt-5 space-x-2"
                >
                    <input
                        type="Email address"
                        onChange={()=>{}}
                        placeholder="Email address"
                        className="p-1 placeholder:text-sm border border-gray-400 bg-[#f8f8f8] focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="Email address"
                        onChange={()=>{}}
                        placeholder="Email address"
                        className="p-1 placeholder:text-sm border border-gray-400 bg-[#f8f8f8] focus:outline-none focus:border-blue-500"
                    />
                    <button
                        className="px-6 py-1 bg-red-500 text-white border border-red-500"
                    >
                        Login
                    </button>
                </div>
            </div>
            <hr/>
            <div
                className="w-10/12 mx-auto"
            >
                <div
                    className="w-full flex justify-between"
                >
                    <div
                        className="w-4/12"
                    >
                        <div
                            className="w-8/12 space-y-3 pt-5"
                        >
                        <div
                            className="space-y-2"
                        >
                            <label className="font-semibold"> Search </label>
                            <div
                                className="flex items-center"
                            >
                                <input
                                    type="Email address"
                                    onChange={(e)=>setQuery(e.target.value)}
                                    placeholder="search by name"
                                    className="w-full p-1 border border-gray-400 placeholder:text-sm bg-[#f8f8f8] focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    className="px-4 py-2 bg-black text-white border border-black"
                                >
                                    <BsSearch/>
                                </button>
                            </div>
                        </div>
                        <div
                            className="space-y-2"
                        >
                            <label className="font-semibold">Find appointment </label>
                            <select
                                    onChange={(e)=>setSpecialization(e.target.value)}
                                    className="w-full py-1.5 text-sm  border border-gray-400  bg-[#f8f8f8] focus:bg-[#f8f8f8] focus:outline-none focus:border-blue-500"
                                    
                            >
                                <option>
                                    Select specialization
                                </option>
                                {
                                    doctors && 
                                    doctors.map(doctor=> doctor?.specialization)
                                    .map((specialization,i)=><option
                                        key={i}
                                        value={specialization}
                                    >
                                        {specialization}
                                    </option>)
                                }
                            </select>
                            <select
                                    onChange={(e)=>setDay(e.target.value)}
                                    className="w-full py-1.5 text-sm  border border-gray-400  bg-[#f8f8f8] focus:bg-[#f8f8f8] focus:outline-none focus:border-blue-500"
                                    
                            >
                                <option>
                                    Select day
                                </option>
                                {
                                    daysOfWeek && 
                                    daysOfWeek.map(day=> day)
                                    .map((day,i)=><option
                                        key={i}
                                        value={day}
                                    >
                                        {day}
                                    </option>)
                                }
                            </select>
                            <button
                                onClick={()=>navigate(`/appointment/find?specialization=${specialization}&day=${day}`)}
                                className="px-6 py-1 bg-black text-white border border-black"
                            >
                                Find
                            </button>
                        </div>
                        </div>
                    </div>
                    <div
                        className="w-8/12 border-l overflow-y"
                    >
                        <div
                            className="w-full grid grid-cols-3"
                        >
                            {
                                doctors && 
                                doctors.filter(doctor=> doctor.firstName.toLowerCase().includes(query)).map(doctor=><div
                                    key={doctor?._id}
                                    className="w-full p-4 text-center border-r border-b space-y-5 hover:shadow-md group hover:bg-black hover:rounded-md transition-all duration-500"
                                >
                                    <div className='w-[82px] h-[82px] mx-auto flex justify-center items-center rounded-full bg-blue-500 group-hover:bg-white'>
                                        <img src={doctor?.user?.image?.url} alt="" className='w-20 h-20 rounded-full border-4'/>
                                    </div>
                                    <div
                                        className="space-y-1 text-sm group-hover:text-white"
                                    >
                                        <p className='text-lg font-semibold'>{doctor?.firstName} {doctor?.lastName}</p>
                                        <p>{doctor?.education}</p>
                                        <p>{doctor?.specialization}</p>
                                        <p>{doctor?.experienceArea}</p>
                                        {
                                            doctor?.designation && doctor?.workedAt && <p>{doctor?.designation} of {doctor?.workedAt}</p>
                                        }
                                        <p>Fee - {doctor?.feesPerConsultation}</p>
                                        <button
                                            onClick={()=>navigate(`/appointment-submit/${doctor?._id}`)}
                                            className="bg-black text-white px-4 py-1 rounded group-hover:bg-white group-hover:text-black"
                                        >
                                            Appointment
                                        </button>
                                        
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}