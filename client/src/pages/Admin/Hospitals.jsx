import axios from "axios"
import { useEffect, useState } from "react"
import AddHospital from "../../components/hospital/AddHospital"
import DeleteHospital from "../../components/hospital/DeleteHospital"
import UpdateHospital from "../../components/hospital/UpdateHospital"
import useUserStore from "../../features/userStore"
import { toBengaliNumber } from "bengali-number"
import api_url from "../../utils/apiUrl"
import Heading from "../../components/Heading"

export default function AppliedHospital() {
    const [hospitals, setHospitals] = useState([])
    const { random } = useUserStore()
    async function getAllHospitals() {
        const res = await axios.get(`${api_url}/api/hospital/all`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setHospitals(res.data.data)
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
                    <AddHospital />
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
                                            hospital?.type === 'Hospital' ? 'হাসপাতাল' :
                                                hospital?.type === 'Dainogostic Center' ? 'ডায়নোগষ্টিক সেন্টার ' :
                                                    hospital?.type === 'Clinic' ? 'ক্লিনিক ' : 'নিজস্ব চেম্বার'
                                        }
                                    </td>
                                    <td className="flex items-center justify-center p-1 text-center space-x-2">
                                        <UpdateHospital {...{ hospital }} />
                                        <DeleteHospital {...{ hospital }} />
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}