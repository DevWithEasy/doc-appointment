import axios from 'axios';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import ChamberList from '../components/ChamberList';
import useUserStore from '../features/userStore';
import dateGenerator from '../utils/dateGenerator';
import handleChange from '../utils/handleChange';

export default function AppointmentSubmit(){
    const navigate = useNavigate()
    const {user} =useUserStore()
    const {id} = useParams()
    const [doctor,setDoctor] = useState({})
    const [chamber,setChamber] = useState({})
    const [selected, setSelected] = useState()
    const [value, setValue] = useState({
        patientName: user?.name,
        age : '',
        gender : user?.gender,
        patientPhone : user?.phone,
        address: user?.address?.location && user?.address?.post_office && user?.address?.upazilla && user?.address?.district ? `${user.address.location}, ${user.address.post_office}, ${user.address.upazilla}, ${user.address.district}.` : '',
        doctor : id,
        chamberId : '',
        appointmentDay : '',
        appointmentDate : '',
    })

    async function getDoctor(id){
        const res = await axios.get(`/api/doctor/${id}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setDoctor(res.data.data)
    }

    function selectedDay(selected){
            if(new Date(selected).getTime() < Date.now()){
                return toast.error('Please select a date upper date than now')
            }
            const date = new Date(selected);
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayName = daysOfWeek[date.getDay()];
            const days = doctor?.chambers.map(chamber=> chamber.day)
            const day = days.find(day => day === dayName)
            const chamber = doctor?.chambers.find(chamber=>chamber.day === day)
            if(day === undefined){
                setChamber({})
                toast.error(`Please select a date from calender chamber list day name available`)
            }else{
                setChamber({...chamber,date : date.toLocaleDateString()}) 
            }
    }
    useEffect(()=>{
        getDoctor(id)
    },[id])

    useEffect(()=>{
        if (doctor.chambers) selectedDay(selected)
    },[selected])

    const data = {...value,chamberId : chamber.id,appointmentDay : chamber?.day,appointmentDate : dateGenerator(selected)}


    async function addAppointment(){
        try {
            const res = await axios.post('/api/appointment/add',data,{
                headers : {
                    authorization : 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if(res.data.status === 200){
                toast.success('Appointment added successfully')
                navigate('/appointments')
            }
        } catch (error) {
            if(error){
                toast.error(error.response.data.message)
            }
        }
    }
    

    return(
        <div>
            <h1 className="py-2 text-2xl font-bold text-center uppercase">Submit appointment</h1>
            <hr/>
            <div className='md:flex justify-between pb-10 md:gap-x-4'>
                <div className='w-full md:w-7/12 pt-4 space-y-2'>
                    <div className='p-4 pt-2 bg-white rounded'>
                        <p className='text-xl font-bold'>{doctor?.firstName} {doctor?.lastName}</p>
                        <p>{doctor?.education},{doctor?.specialization}</p>
                        <p>{doctor?.experienceArea}</p>
                    </div>
                    {doctor.chambers && <ChamberList chambers={doctor.chambers}/>}
                </div>
                <div className='w-full md:w-5/12 mt-4 flex flex-col items-center justify-center bg-white rounded-md'>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                    />
                </div>
            </div>

            {chamber.vanue && <div className='flex justify-center bg-gray-100 pb-5 rounded'>
                    <div className='bg-blue-100 w-11/12 md:w-1/2 text-center rounded-md -mt-5 py-2'>
                        <p className='text-2xl font-bold'>{chamber?.vanue}</p>
                        <p className=''>{chamber?.location}</p>
                        <p className=''>{chamber?.day} {chamber?.date}</p>
                    </div>
            </div>}

            <div className='mb-2 grid md:grid-cols-2 md:gap-2'>
                <div className="space-y-1">
                    <label>Patient Name : </label>
                    <input type='text' name='patientName' value={value?.patientName} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                </div>
                <div className=" space-y-1">
                    <label>Patient Age : </label>
                    <input type='number' name='age' value={value?.age} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                </div>
                <div>
                    <label className='block'>Patient Gender:</label>
                    <select name='gender' value={value?.gender} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className=" space-y-1">
                    <label>Patient Mobile No : </label>
                    <input type='text' name='patientPhone' value={value?.patientPhone} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                </div>
                <div className=" space-y-1">
                    <label>Patient Address : </label>
                    <input type='text' name='address' value={value?.address} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                </div>
            </div>
            <button onClick={()=>addAppointment()} className='p-2 bg-green-500 text-white rounded-md'>Booking Confirm</button>
        </div>
    )
}