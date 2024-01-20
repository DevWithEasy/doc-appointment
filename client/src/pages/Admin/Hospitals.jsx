import axios from "axios"
import { useEffect, useState } from "react"
import useUserStore from "../../features/userStore"
import { toBengaliNumber } from "bengali-number"
import api_url from "../../utils/apiUrl"
import { AddHospital, Heading, Loading, UpdateHospital } from '../../components/Index'
import useServiceStore from "../../features/serviceStore"
import { AiFillEdit } from "react-icons/ai"
import { Link } from "react-router-dom"
import { IoMdAddCircleOutline } from "react-icons/io"

export default function AppliedHospital() {
    const { random } = useUserStore()
    const { hospitals, addHospitals, process, processing } = useServiceStore()
    const [view, setView] = useState(false)

    async function getAllHospitals() {
        processing(true)
        try {
            const res = await axios.get(`${api_url}/api/vanue/all`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if (res.data.success) {
                addHospitals(res.data.data)
                processing(false)
            }
        } catch (error) {
            processing(false)
        }

    }
    useEffect(() => {
        getAllHospitals()
    }, [random])

    return (
        <div className="">
            <Heading>
                হাসপাতাল
            </Heading>
            <div
                className="p-2"
            >
                <div className="pb-2 flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-2">
                    <input
                        onChange={() => { }}
                        className="w-full md:w-4/12 p-1 border rounded focus:outline-none focus:ring-2"
                        placeholder="সার্চ করুন - নাম /ঠিকানা /ধরণ "
                    />

                    <button 
                        onClick={()=>setView(!view)} 
                        className="px-2 py-1 flex items-center space-x-1 bg-green-400 text-white rounded-md"
                    >
                        <IoMdAddCircleOutline size={22} />
                        <span>যোগ করুন </span>
                    </button>

                </div>
                <table className="w-full">
                    <thead className="bg-gray-300">
                        <tr className="text-center">
                            <td className="p-1">নং </td>
                            <td className="p-1">নাম</td>
                            <td className="p-1">ঠিকানা</td>
                            <td className="p-1">ধরণ </td>
                            <td className="p-1">পদক্ষেপ</td>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                            hospitals && hospitals.map((hospital, i) =>
                                <tr key={i} className='border-b'>
                                    <td className="p-1 text-center">{toBengaliNumber(i + 1)}</td>
                                    <td className="p-1 text-center">{hospital?.name}</td>
                                    <td className="p-1 text-center">{hospital?.location}</td>
                                    <td className="p-1 text-center">
                                        {
                                            hospital?.type === 'hospital' ? 'হাসপাতাল' :
                                                hospital?.type === 'diagnostic' ? 'ডায়নোগষ্টিক সেন্টার ' :
                                                    hospital?.type === 'clinic' ? 'ক্লিনিক ' : 'নিজস্ব চেম্বার'
                                        }
                                    </td>
                                    <td className="flex items-center justify-center p-1 text-center space-x-2">
                                        <Link
                                            to={`/admin/hospitals/update/${hospital?._id}`}
                                        >
                                            <AiFillEdit />
                                        </Link>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {view && <AddHospital {...{view,setView}}/>}
            {process && <Loading />}
        </div>
    )
}