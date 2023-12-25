import { useDisclosure } from '@chakra-ui/react';
import { toBengaliNumber } from 'bengali-number';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import {AppoinmentChamberList,NoBalanceAlert} from '../../components/Index';
import useUserStore from '../../features/userStore';
import { addAppointment } from '../../utils/appoimtments_utils';
import dateGenerator from '../../utils/dateGenerator';
import dayNameBangla from '../../utils/dayNameBangla';
import handleChange from '../../utils/handleChange';
import { selectedDay } from '../../utils/selectedDay';
import api_url from '../../utils/apiUrl';

export default function AppointmentSubmit(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const {user,doctors} =useUserStore()
    const {id} = useParams()
    const [doctor] = useState(doctors.find(doctor=> doctor._id === id))
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

    useEffect(()=>{
        if (doctor?.chambers) selectedDay(selected,doctor,setChamber,toast)
    },[selected,doctor])

    const data = {...value,chamberId : chamber._id,appointmentDay : chamber?.day,appointmentDate : dateGenerator(selected)}
    
    return(
        <div
            className='w-full md:w-10/12 md:mx-auto px-2 pb-5'
        >
            <h1 className="py-2 text-2xl font-bold text-center uppercase">Submit appointment</h1>
            <hr/>
            <div className='md:flex justify-between pb-10 md:gap-x-4'>
                <div className='w-full md:w-7/12 pt-4 space-y-2'>
                    <div className='flex space-x-2 p-4 pt-2 bg-white rounded'>
                        <img src={`${api_url}/${doctor?.user?.image?.url}`} alt="" className='h-20 w-20 mt-2 rounded-md'/>
                        <div>
                            <p className='font-bold'>{doctor?.name}</p>
                            <p>{doctor?.education},{doctor?.specialization}</p>
                            <p>{doctor?.experienceArea}</p>
                            <p>সার্ভিস চার্জ - {doctor?.feesPerConsultation}</p> 
                        </div>
                    </div>
                    {doctor?.chambers && <AppoinmentChamberList chambers={doctor.chambers}/>}
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
                    <div className='bg-blue-200 w-11/12 md:w-1/2 text-center rounded-md -mt-5 py-2'>
                        <p className='text-2xl font-bold'>{chamber?.vanue}</p>
                        <p className=''>{chamber?.location}</p>
                        <p className=''>{dayNameBangla(chamber?.day)} {toBengaliNumber(chamber?.date)}</p>
                    </div>
            </div>}

            <div className='p-2 bg-white space-y-2 rounded-md'>
                <div className='mb-2 grid md:grid-cols-2 md:gap-2 space-y-2 md:space-y-0'>
                <div className="space-y-1">
                    <label>রোগীর নামঃ  </label>
                    <input type='text' name='patientName' value={value?.patientName} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                </div>
                <div className=" space-y-1">
                    <label>রোগীর বয়সঃ  </label>
                    <input type='text' name='age' value={value?.age} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                </div>
                <div>
                    <label className='block'>রোগীর লিঙ্গঃ  </label>
                    <select name='gender' value={value?.gender} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'>
                        <option value="Male">পুরুষ</option>
                        <option value="Female">মহিলা</option>
                        <option value="Others">অন্যান্য</option>
                    </select>
                </div>
                <div className=" space-y-1">
                    <label>রোগীর মোবাইল নাম্বারঃ </label>
                    <input type='text' name='patientPhone' value={value?.patientPhone} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                </div>
                <div className=" space-y-1">
                    <label>রোগীর ঠিকানাঃ </label>
                    <input type='text' name='address' value={value?.address} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                </div>
                </div>
                <button onClick={()=>addAppointment(data,toast,navigate,onOpen)} className='px-4 py-1 bg-green-500 text-white rounded-md'>অ্যাপয়েন্টম্যান্ট নিশ্চিত করুন </button>
            
            </div>
            <NoBalanceAlert {...{isOpen, onOpen, onClose,navigate}}/>
        </div>
    )
}