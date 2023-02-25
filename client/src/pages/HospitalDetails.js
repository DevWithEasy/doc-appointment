import Doctor from '../components/Doctor'
import hospital from '../images/hospital2.png'

export default function HospitalDetails(){
    return(
        <div className='space-y-2'>
            <div style={{backgroundImage : `url(${hospital})`}} className='relative h-[350px] w-full flex justify-center items-center bg-no-repeat bg-cover rounded-md z-0'>
                <div className='absolute w-full h-full bg-blue-200/25 rounded-md'></div>
                <h1 className='px-10 py-5 text-4xl font-bold bg-gray-500 text-white z-10 rounded-md'>Amader hospital</h1>
            </div>

            <div className='border border-blue-200 rounded-md'>
                <h3 className='p-2 bg-blue-200 text-center text-2xl font-bold rounded-t-md'>Doctors list</h3>
                <div className='p-2 grid grid-cols-2 md:grid-cols-3 gap-4'>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                    <Doctor/>
                </div>
            </div>
        </div>
    )
}