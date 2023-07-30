import icon from '../assets/images/icon.png'
export default function PrintHeader(){
    return(
        <div className='print:flex justify-center hidden mt-10'>
            <div className='flex flex-col items-center space-x-2 pb-2'>
                <img src={icon} alt='app_icon' className='w-16 h-16 mx-auto rounded-full'/>
                <h1 className='text-4xl font-bold'>আমাদের ডাক্তার</h1>
                <p className='italic text-gray-500'>ডাক্তারের অ্যাপয়েন্টম্যান্ট নেওয়ার সহজ সমাধান</p>
            </div>
        </div>
    )
}