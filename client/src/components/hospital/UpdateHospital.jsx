import axios from "axios"
import { useState } from "react"
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import useServiceStore from "../../features/serviceStore"
import useUserStore from "../../features/userStore"
import api_url from '../../utils/apiUrl'
import handleChange from "../../utils/handleChange"
import Heading from '../Heading'
import Input from "../Input"
import Loading from "../Loading"

export default function UpdateHospital() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { reload } = useUserStore()
    const { hospitals, process, processing } = useServiceStore()
    const [value, setValue] = useState(hospitals.find(hospital => hospital._id === id))

    async function updateHospital() {
        processing(true)
        try {
            const res = await axios.put(`${api_url}/api/vanue/update/${value._id}`, value, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if (res.data.success) {
                reload()
                navigate('/admin/hospitals')
                processing(false)
            }
        } catch (error) {
            console.log(error)
            processing(false)
        }
    }
    return (
        <div
            className="h-full overflow-y-auto"
        >
            <Heading>
                ভেন্যু আপডেট
            </Heading>

            <div className="p-2 space-y-2 font-bangla">
                <Input {...{
                    label: 'প্রতিষ্ঠানের নাম',
                    name: 'name',
                    c_value: value?.name,
                    value, setValue
                }} />

                <Input {...{
                    label: 'ঠিকানা',
                    name: 'location',
                    c_value: value?.location,
                    value, setValue
                }} />

                <div className="w-full space-y-1">
                    <label className="block">প্রতিষ্ঠানের ধরণ : </label>
                    <select name='type' value={value?.type} onChange={(e) => handleChange(e, value, setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'>
                        <option value="">বাছাই করুন </option>
                        <option value="hospital">হাসপাতাল </option>
                        <option value="diagnostic">ডায়নোগষ্টিক সেন্টার </option>
                        <option value="clinic">ক্লিনিক</option>
                        <option value="p_chamber">পার্সোনাল চেম্বার</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Input {...{
                        label: 'Lantitude',
                        name: 'lat',
                        c_value: value?.lat,
                        value, setValue
                    }} />

                    <Input {...{
                        label: 'Longtitude',
                        name: 'long',
                        c_value: value?.long,
                        value, setValue
                    }} />

                    <Input {...{
                        label: 'খোলার সময়',
                        name: 'open',
                        type: 'time',
                        c_value: value?.open,
                        value, setValue
                    }} />

                    <Input {...{
                        label: 'বন্ধের সময়',
                        name: 'close',
                        type: 'time',
                        c_value: value?.close,
                        value, setValue
                    }} />
                </div>
                <button onClick={() => updateHospital()} className='py-2 px-6 bg-green-400 text-white rounded-md'>
                    আপডেট
                </button>
            </div>
            {process && <Loading />}
        </div>
    )
}