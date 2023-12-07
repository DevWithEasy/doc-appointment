import { useNavigate } from 'react-router-dom'
import api_url from '../../utils/apiUrl'
export default function Hospital({ hospital }) {
    const navigate = useNavigate()
    console.log(hospital)
    return (
        <div
            onClick={() => navigate(`/hospital/${hospital?._id}`)}
            className="space-y-2 bg-white shadow border rounded cursor-pointer"
        >
            <img src={`${api_url}/${hospital?.image}`} alt="" className='w-full' />
            <div
                className='p-2 space-y-2'
            >
                <p className='text-xl font-bold text-blue-500'>
                    {hospital?.name}
                </p>
                <p>{hospital?.location}</p>
                <p
                    className='inline-block px-4 py-1 bg-green-500 text-white text-sm rounded-full'
                >
                    {
                        hospital?.type === 'Hospital' ? 'হাসপাতাল' :
                            hospital?.type === 'Dainogostic Center' ? 'ডায়নোগষ্টিক সেন্টার ' :
                                hospital?.type === 'Clinic' ? 'ক্লিনিক ' : 'নিজস্ব চেম্বার'
                    }
                </p>
            </div>
        </div>
    )
}