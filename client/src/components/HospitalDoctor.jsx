import api_url from '../utils/apiUrl'
import dayNameBangla from '../utils/dayNameBangla'
import formatTime from '../utils/formatTime'
import {useNavigate} from 'react-router-dom'

export default function HospitalDoctor({ chamber }) {
    const { doctor } = chamber
    const navigate = useNavigate()
    return (
        <div
            className="relative w-full p-4 pt-20 flex justify-between bg-white border hover:shadow-md group hover:bg-gray-600 transition-all duration-500 rounded-md"
        >
            <div
                className='absolute right-0 top-0 w-full p-2 text-center  border-b bg-gray-50 rounded-t-md'
            >
                <p
                    className='font-semibold'
                >
                    {dayNameBangla(chamber?.day)}
                </p>
                <p
                    className='space-x-2 text-sm'
                >
                    <span>
                        {formatTime(chamber?.from)}
                    </span>
                    <span>থেকে</span>
                    <span>
                        {formatTime(chamber?.to)}
                    </span>
                </p>
            </div>
            <div className='w-[100px] h-[100px] mx-auto flex justify-center items-center rounded-full group-hover:bg-white'>
                <img src={api_url + doctor?.user?.image?.url} alt="" className='w-[100px] h-[100px] rounded-full border-4' />

            </div>

            <div
                className="w-full pl-4 space-y-1 text-sm group-hover:text-white flex-1"
            >
                <p className='text-lg font-semibold'>{doctor?.name}</p>
                <p>{doctor?.education}</p>
                <p>{doctor?.specialization}</p>
                <p>{doctor?.experienceArea}</p>
                {
                    doctor?.designation && doctor?.workedAt && <p>{doctor?.designation} , {doctor?.workedAt}</p>
                }
                <p>সার্ভিস চার্জ - {doctor?.feesPerConsultation}</p>
                <button
                    onClick={() => navigate(`/appointment_submit/${doctor?._id}`)}
                    className="w-32 py-1 bg-black text-white text-sm rounded group-hover:bg-white group-hover:text-black"
                >
                    অ্যাপয়েন্টমেন্ট নিন
                </button>
            </div>
        </div>
    )
}