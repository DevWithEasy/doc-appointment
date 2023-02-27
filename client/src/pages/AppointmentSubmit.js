import axios from 'axios';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useParams } from 'react-router-dom';
import ChamberList from '../components/ChamberList';

export default function AppointmentSubmit(){
    const {id} = useParams()
    const [doctor,setDoctor] = useState({})
    const [chambers,setChambers] = useState([])
    const [selected, setSelected] = useState()

    async function getDoctor(){
        const res = await axios.get(`/api/doctor/${id}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setDoctor(res.data.data)
    }
    

    async function getChambers(doctorId){
        const res = await axios.get(`/api/doctor/findChambers/${doctorId}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setChambers(res.data.data)
    }

    useEffect(()=>{
        getDoctor()
    },[])

    useEffect(()=>{
        getChambers(id)
    },[id])

    const date = new Date(selected);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[date.getDay()];
    
    function selectedDay(){
        const days = chambers.map(chamber=> chamber.day)
        const d = days.find(day => day === dayName)
        if(d === undefined){
            return 'Sorry select date by chamber day name.'
        }else{
            return `You selected ${dayName} on ${date.toLocaleDateString()}`
        }
    }
    console.log(doctor)
    return(
        <div>
            <h1 className="py-2 text-2xl font-bold text-center uppercase">Submit appointment</h1>
            <hr/>
            <div className='md:flex justify-between'>
                <div className='w-full md:w-7/12 pt-5'>
                    <div className='pb-2'>
                        <p className='text-xl font-bold'>{doctor?.firstName} {doctor?.lastName}</p>
                        <p>{doctor?.education},{doctor?.specialization}</p>
                        <p>{doctor?.experienceArea}</p>
                    </div>
                    {chambers && <ChamberList chambers={chambers}/>}
                </div>
                <div className='w-full md:w-5/12 flex flex-col items-center justify-center'>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                    />
                    <div>
                        {selectedDay()}
                    </div>
                </div>
            </div>
        </div>
    )
}