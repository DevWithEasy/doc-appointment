import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getFindDoctors, getSpecialist } from '../utils/doctors_utils';
import Doctor from '../components/Doctor';

const AppointmentFind = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [specialist, setSpecialist] = useState([])
    const [doctors, setDoctors] = useState([])
    const [specialization, setSpecialization] = useState(searchParams.get('specialization'));
    const [day, setDay] = useState(searchParams.get('day'));
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')

    useEffect(() => {
        getSpecialist(setSpecialist)
        getFindDoctors(specialization, day, setDoctors, setLoading, setMsg)
    }, [specialization, day])

    return (
        <div className="mx-2 md:w-10/12 md:mx-auto space-y-2 pb-5">
            <h1 className="text-2xl font-bold text-center uppercase">অ্যাপয়েন্টমেন্ট খুজুন</h1>
            <hr />

            <div className="flex flex-col space-y-1 md:flex-row md:justify-center md:space-x-3 bg-white/50 md:bg-transparent p-2 md:p-0 rounded-md">
                <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className='p-2 border rounded focus:outline-none focus:ring-2'>
                    <option value="">অভিজ্ঞতা বাছাই করুন</option>
                    {specialist && specialist.map((specialist, i) => <option key={i} value={specialist}>{specialist}</option>)}
                </select>

                <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="p-2 border rounded focus:outline-none focus:ring-2"
                >
                    <option value="">দিন বাছাই করুন</option>
                    <option value="Saturday">শনিবার</option>
                    <option value="Sunday">রবিবার</option>
                    <option value="Monday">সোমবার</option>
                    <option value="Tuesday">মঙ্গলবার</option>
                    <option value="Wednesday">বুধবার</option>
                    <option value="Thursday">বৃহস্পতিবার</option>
                    <option value="Friday">শুক্রবার</option>
                </select>

                <button onClick={() => getFindDoctors(specialization, day, setDoctors, setLoading, setMsg)} className="px-6 py-1 md:py-0 bg-blue-400 text-white rounded-md">খুজুন</button>
            </div>
            {
                loading && <div>
                    <p className='text-center text-2xl animate-pulse'>অপেক্ষা করুন ডাক্তার খোঁজা হচ্ছে... </p>
                </div>
            }
            {
                msg.length > 0 && <p>{msg} </p>
            }
            {
                doctors.length > 0 &&
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {
                        doctors.map(doctor => <Doctor key={doctor._id} doctor={doctor} />)
                    }
                </div>
            }

        </div>
    );
};

export default AppointmentFind;