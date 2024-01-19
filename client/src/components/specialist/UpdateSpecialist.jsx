import axios from "axios"
import { useState } from "react"
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import useServiceStore from '../../features/serviceStore'
import useUserStore from '../../features/userStore'
import api_url from '../../utils/apiUrl'
import Heading from '../Heading'
import Input from '../Input'

export default function UpdateSpecialist() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { specialists, process, processing } = useServiceStore()
    const { reload } = useUserStore()
    const [value, setValue] = useState(specialists.find(s => s._id === id))

    async function updateSpecialist() {
        processing(true)
        try {
            const res = await axios.put(`${api_url}/api/specialist/${value._id}`, value, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if (res.data.status === 200) {
                processing(false)
                reload()
                navigate('/admin/specialists')
            }
        } catch {
            processing(false)
            toast.success('Something went wrong.')
        }
    }
    return (
        <div
            className="h-full overflow-y-auto"
        >
            <Heading>
                বিশেষজ্ঞ বিষয় আপডেট
            </Heading>
            <div
                className='p-2 space-y-2'
            >
                <Input {...{
                    label: 'বিশেষজ্ঞ বিষয়',
                    name: 'name',
                    c_value: value?.name,
                    value, setValue
                }} />
                <button
                    onClick={() => updateSpecialist()}
                    className='py-2 px-6 font-bangla bg-green-400 text-white rounded-md'
                >
                    {process ? 'কাজ হচ্ছে...' : 'নিশ্চিত'}
                </button>
            </div>

        </div>
    )
}