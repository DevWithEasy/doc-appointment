import Doctor from '../components/Doctor'
import { useParams } from 'react-router-dom'
import useServiceStore from '../features/serviceStore'
import api_url from '../utils/apiUrl'
import { toBengaliNumber } from 'bengali-number'
import MapViewDirection from '../components/MapViewDirection'
import { useState } from 'react'

export default function HospitalDetails() {
    const [view, setView] = useState(false)
    const { hospitals } = useServiceStore()
    const { id } = useParams()
    const hospital = hospitals.find(hospital => hospital._id === id)
    console.log(hospital)
    return (
        <div className='w-10/12 mx-auto space-y-2 '>
            <div
                className='relative h-[350px] w-full flex justify-center items-center bg-white rounded-md'>
                <div
                    className='flex flex-col items-center space-y-2'
                >
                    <h1 className='text-4xl font-extrabold text-blue-500 rounded-md'>
                        {hospital?.name}
                    </h1>
                    <p>{hospital?.location}</p>
                    <p
                        className='px-4 py-1 bg-green-500 text-white text-sm rounded-full'
                    >
                        {hospital?.type}
                    </p>
                    <div
                        className='flex items-center space-x-4 py-2'
                    >
                        <p>
                            <span>খোলার সময়ঃ </span>
                            <span
                                className='font-semibold'
                            >
                                {toBengaliNumber(hospital?.open)}
                            </span>
                        </p>
                        <p>
                            <span>বন্ধের সময়ঃ </span>
                            <span
                                className='font-semibold'
                            >
                                {toBengaliNumber(hospital?.close)}
                            </span>
                        </p>
                    </div>
                    <button
                        onClick={()=>setView(!view)}
                        className='px-4 py-2 border rounded'
                    >
                        আপনার দুরত্ব দেখুন
                    </button>
                </div>

            </div>

            <div className=''>
                <h3 className='p-2 bg-gray-500 text-white text-center text-xl rounded-md'>
                    ডাক্তারের তালিকা
                </h3>
                <div className='grid grid-cols-3 md:grid-cols-3 gap-4'>
                    <Doctor />
                    <Doctor />
                    <Doctor />
                    <Doctor />
                    <Doctor />
                    <Doctor />
                    <Doctor />
                    <Doctor />
                </div>
            </div>

            {view &&
                <MapViewDirection {...{
                    view, setView,
                    location: [Number(hospital?.lat), Number(hospital?.long)]
                }} />
            }
        </div>
    )
}