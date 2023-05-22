import icon from '../images/icon.png'
export default function PrintHeader(){
    return(
        <div className='print:flex justify-center hidden mt-10'>
            <div className='flex flex-col items-center space-x-2 pb-2'>
                <img src={icon} alt='app_icon' className='w-16 h-16 mx-auto rounded-full'/>
                <h1 className='text-4xl font-bold'>Amader Doctor</h1>
                <p className='italic text-gray-500'>Best solution of doctor appointment in Thakurgaon District.</p>
            </div>
        </div>
    )
}