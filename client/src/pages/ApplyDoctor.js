import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"
import Input from "../components/Input"

export default function ApplyDoctor(){
    const [value,setValue] = useState({
        firstName : '',
        lastName : '',
        phone : '',
        email : '',
        website : '',
        workedAt : '',
        designation : '',
        education : '',
        specialization : '',
        experience : '',
        experienceArea : '',
        feesPerConsultation : '',
        chambers : []
    })
    async function handleApplyDoctor(){
        const res = await axios.post('/api/doctor/apply',value,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            toast.success('Applied Doctor successfully.')
        }
    }
    return(
        <div className="space-y-2">
            <h1 className="text-2xl font-bold text-center uppercase">Apply as a Doctor</h1>
            <div className="grid md:grid-cols-2 gap-2">
                <Input label='First name' type='text' name='firstName' value={value} setValue={setValue} />
                <Input label='Last Name' type='text' name='lastName' value={value} setValue={setValue} />
                <Input label='Phone' type='text' name='phone' value={value} setValue={setValue} />
                <Input label='Email' type='email' name='email' value={value} setValue={setValue} />
                <Input label='Website' type='text' name='website' value={value} setValue={setValue} />
                <Input label='Worked At (Organiazation)' type='text' name='workedAt' value={value} setValue={setValue} />
                <Input label='Designation (Organiazation)' type='text' name='designation' value={value} setValue={setValue} />
                <Input label='Education (All degrees)' type='text' name='education' value={value} setValue={setValue} />
                <Input label='Specialization' type='text' name='specialization' value={value} setValue={setValue} />
                <Input label='Experience Year' type='text' name='experience' value={value} setValue={setValue} />
                <Input label='Experience Area' type='text' name='experienceArea' value={value} setValue={setValue} />
                <Input label='Fee Per Consultation' type='text' name='feesPerConsultation' value={value} setValue={setValue} />
            </div>
            <button onClick={()=>handleApplyDoctor()} className="w-full p-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300">Send Apply</button>
        </div>
    )
}