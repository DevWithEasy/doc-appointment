import background from '../images/homepage_hero.jpg'
import {Link} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
export default function Home(){
    return(
        <div>
            <div className='relative h-[500px] w-full box-border'>
                <img src={background} alt='' className='hidden md:block absolute top-0 left-0 w-full h-full'/>
                <div className='absolute top-0 left-0 w-full h-full bg-blue-400/25 flex justify-end md:p-6 p-2'>
                    <div className='w-full md:w-1/2 bg-white/90 rounded-md'>
                        <h1 className='text-4xl text-center font-bold p-2 bg-blue-500 text-white rounded-t-md'>Online Appointment</h1>
                        <p className='p-4'>Find your doctor and get a doctor appointment from your home.No need go to hospital get an appointment.Find your hospital or Find your needed doctor and get appointment your needed doctor just one click.
                        </p>
                        <div className='flex justify-center'>
                            <Link to='/doctors' className='p-2 bg-green-500 text-white rounded flex items-center space-x-2'>
                                <AiOutlineSearch size={20}/>
                                <span>Find Doctor</span>
                            </Link>
                        </div>
                        <div className='text-center py-10'>
                            <p>يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُواْ ٱسۡتَعِينُواْ بِٱلصَّبۡرِ وَٱلصَّلَوٰةِ ۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّٰبِرِينَ</p>
                            <p>“O believers! Seek comfort in patience and prayer. Allah is truly with those who are patient.”</p>
                            <p>(Surah Al-Baqarah, 2:153)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}