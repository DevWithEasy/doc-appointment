import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import Input from "../../components/Input"
import { handleApplyDoctor } from "../../utils/doctors_utils"
import useServiceStore from "../../features/serviceStore"
import axios from 'axios'
import api_url from "../../utils/apiUrl"
import handleChange from "../../utils/handleChange"

export default function ApplyDoctor() {
    const { addSpecialists, specialists, process, processing } = useServiceStore()
    const [value, setValue] = useState({
        name: '',
        phone: '',
        email: '',
        website: '',
        workedAt: '',
        designation: '',
        education: '',
        specialization: '',
        experience: '',
        experienceArea: '',
        feesPerConsultation: '',
        chambers: []
    })
    async function getAllSpecialist() {
        processing(true)
        try {
            const res = await axios.get(`${api_url}/api/specialist/`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if (res.data.status === 200) {
                processing(false)
                addSpecialists(res.data.data)
            }
        } catch (error) {
            processing(false)
            console.log(error)
        }
    }
    useEffect(() => {
        getAllSpecialist()
    }, [])

    return (
        <div className="w-10/12 mx-auto space-y-2 pb-5">
            <h1 className="text-2xl font-bold text-center uppercase">ডাক্তার প্রোফাইলের আবেদন</h1>
            <div className="grid md:grid-cols-2 gap-2 bg-white p-2 px-4 rounded-md">
                <Input
                    label='নাম '
                    type='text'
                    name='name'
                    c_value={value.name}
                    value={value}
                    setValue={setValue}
                />
                <Input
                    label='মোবাইল নম্বর '
                    type='text'
                    name='phone'
                    c_value={value.phone}
                    value={value}
                    setValue={setValue}
                />
                <Input
                    label='ই-মেইল '
                    type='email'
                    name='email'
                    c_value={value.email}
                    value={value}
                    setValue={setValue}
                />
                <Input
                    label='ওয়েবসাইট '
                    type='text'
                    name='website'
                    c_value={value.website}
                    value={value}
                    setValue={setValue}
                />
                <Input
                    label='কর্মরত আছেন (প্রতিষ্ঠানের নাম)'
                    type='text'
                    name='workedAt'
                    c_value={value.workedAt}
                    value={value}
                    setValue={setValue}
                />
                <Input
                    label='পদবী '
                    type='text'
                    name='designation'
                    c_value={value.designation}
                    value={value}
                    setValue={setValue}
                />
                <Input
                    label='শিক্ষাগত যোগ্যতা (সকল ডিগ্রী)'
                    type='text'
                    name='education'
                    c_value={value.education}
                    value={value}
                    setValue={setValue}
                />
                <div>
                    <label className="block">অভিজ্ঞতার বিষয়: </label>
                    <select
                        name="specialization"
                        onChange={(e) => handleChange(e, value, setValue)}
                        className="w-full p-2 border rounded focus:outline-blue-500"
                    >
                        <option>বাছাই করুন</option>
                        {specialists.map((s) => (
                            <option key={s._id} value={s._id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Input
                    label='মোট অভিজ্ঞতার বয়স'
                    type='text'
                    name='experience'
                    c_value={value.experience}
                    value={value}
                    setValue={setValue}
                />
                <Input
                    label='অভিজ্ঞতার ক্ষেত্রসমূহ '
                    type='text'
                    name='experienceArea'
                    c_value={value.experienceArea}
                    value={value}
                    setValue={setValue}
                />
                <Input
                    label='সার্ভিস চার্জ '
                    type='text'
                    name='feesPerConsultation'
                    c_value={value.feesPerConsultation}
                    value={value}
                    setValue={setValue}
                />
            </div>
            <button onClick={() => handleApplyDoctor(value, toast)} className="w-full p-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300">
                আবেদন জমা দিন
            </button>
        </div>
    )
}