import axios from 'axios';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useParams } from 'react-router-dom';
import ChamberList from '../components/ChamberList';

export default function AppointmentSubmit(){
    const {id} = useParams()
    const [doctor,setDoctor] =useState({});
    const [selected, setSelected] = useState()

    async function getDoctor(){
        const res = await axios.get(`http://localhost:8080/api/doctor/${id}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setDoctor(res.data.data)
    }
    useEffect(()=>{
        getDoctor()
    },[])

    const date = new Date(selected);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[date.getDay()];
    console.log(dayName,id,doctor.chambers)
    return(
        <div>
            <h1 className="text-2xl font-bold text-center uppercase">Submit appointment</h1>
            <div className='flex justify-between'>
                <div className='w-4/12 flex justify-center'>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                    />
                </div>
                <div className='w-8/12 pt-5'>
                    {doctor.chambers && <ChamberList chambers={doctor?.chambers}/>}
                </div>
            </div>
        </div>
    )
}