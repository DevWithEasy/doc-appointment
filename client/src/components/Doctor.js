import { useNavigate } from 'react-router-dom'
export default function Doctor({doctor}){
    const navigate = useNavigate()
    return(
        <div
            className="w-full p-4 flex flex-col items-center text-center border-r border-b space-y-5 hover:shadow-md group hover:bg-black hover:rounded-md transition-all duration-500"
        >
            <div className='w-[82px] h-[82px] mx-auto flex justify-center items-center rounded-full bg-blue-500 group-hover:bg-white'>
                <img src={doctor?.user?.image?.url} alt="" className='w-20 h-20 rounded-full border-4'/>
            </div>
            <div
                className="space-y-1 text-sm group-hover:text-white flex-1"
            >
                <p className='text-lg font-semibold'>{doctor?.firstName} {doctor?.lastName}</p>
                <p>{doctor?.education}</p>
                <p>{doctor?.specialization}</p>
                <p>{doctor?.experienceArea}</p>
                {
                    doctor?.designation && doctor?.workedAt && <p>{doctor?.designation} of {doctor?.workedAt}</p>
                }
                <p>Fee - {doctor?.feesPerConsultation}</p>                  
            </div>
            <button
                onClick={()=>navigate(`/appointment-submit/${doctor?._id}`)}
                className="w-32 py-1 bg-black text-white rounded group-hover:bg-white group-hover:text-black"
            >
                Appointment
            </button>
        </div>
    )
}