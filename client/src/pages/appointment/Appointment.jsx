import { useEffect, useState } from "react";
import Doctor from "../../components/Doctor";
import { getFindDoctors, getSpecialist } from "../../utils/doctors_utils";

export default function Appointment() {
    const [specialist, setSpecialist] = useState([])
    const [doctors, setDoctors] = useState([])
    const [specialization, setSpecialization] = useState("");
    const [day, setDay] = useState("");

    useEffect(() => {
        getSpecialist(setSpecialist)
    }, [])

    console.log(doctors)
    return (
        <div className="mx-2 md:w-10/12 md:mx-auto space-y-2 pb-5">
            <h1 className="text-2xl font-bold text-center uppercase">অ্যাপয়েন্টমেন্ট খুজুন</h1>
            <hr />

            <div className="flex flex-col space-y-1 md:flex-row md:justify-center md:space-x-3 bg-white/50 md:bg-transparent p-2 md:p-0 rounded-md">
                <select onChange={(e) => setSpecialization(e.target.value)} className='p-2 border rounded focus:outline-none focus:ring-2'>
                    <option value="">অভিজ্ঞতা বাছাই করুন</option>
                    {specialist && specialist.map((specialist, i) => <option key={i} value={specialist}>{specialist}</option>)}
                </select>

                <select
                    name="day"
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

                <button onClick={() => getFindDoctors(specialization, day, setDoctors)} className="px-6 py-1 md:py-0 bg-blue-400 text-white rounded-md">খুজুন</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    doctors && doctors.map(doctor => <Doctor key={doctor._id} doctor={doctor} />)
                }
            </div>
        </div>
    )
}