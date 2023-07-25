import { useEffect, useState } from "react"
import { getAllActiveDoctors } from "../utils/doctors_utils"
import { Link, useNavigate } from "react-router-dom"
import { FaBookMedical } from "react-icons/fa"

export default function Home(){
    const navigate = useNavigate()
    const [doctors,setDoctors] = useState([])

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
                        <label>Search</label>
                        <input
                            type="Email address"
                            onChange={()=>{}}
                            placeholder="search by name"
                            className="p-1 placeholder:text-sm border border-gray-400 bg-[#f8f8f8] focus:outline-none focus:border-blue-500"
                        />
                        <div>
                            <label>Find appointment </label>
                            <select
                                onChange={()=>{}}
                                className="p-1 text-sm border border-gray-400 bg-[#f8f8f8] focus:bg-[#f8f8f8] focus:outline-none focus:border-blue-500"
                                
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
                            <button
                                className="px-4 py-1 bg-red-500 text-white"
                            >
                                Find
                            </button>
                        </div>
                    </div>
                    <div
                        className="w-8/12 border-l overflow-y"
                    >
                        <div
                            className="w-full p-2 grid grid-cols-3 gap-2"
                        >
                            {
                                doctors && 
                                doctors.map(doctor=><div
                                    key={doctor?._id}
                                    className="w-full p-2 text-center bg-white border rounded space-y-5"
                                >
                                    <div className='w-20 h-20 mx-auto flex justify-center rounded-full border'>
                                        <img src={doctor?.user?.image?.url} alt="" className='w-20 h-20 rounded-full'/>
                                    </div>
                                    <div
                                        className="space-y-1 text-sm"
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
                                            className="bg-red-500 text-white px-4 py-1 rounded-md"
                                        >
                                            Appointment
                                        </button>
                                        {/* <Link to={`/appointment-submit/${doctor?._id}`} className='flex justify-center items-center space-x-2 text-blue-500 px-4 py-1 rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300'>
                                            <FaBookMedical size={15}/>
                                            <span>Appointment</span>
                                        </Link> */}
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