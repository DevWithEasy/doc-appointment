import axios from "axios"
import { useEffect, useState } from "react"
import DoctorDetails from "../../components/details/DoctorDetails"
import useUserStore from "../../features/userStore"
import DeleteDoctor from "../../components/details/DeleteDoctor"
import { toBengaliNumber } from "bengali-number"

export default function AppliedDoctors(){
    const {random,reload} = useUserStore()
    const [doctors,setDoctors] = useState([])
    async function getAppliedDoctors(){
        const res = await axios.get('/api/admin/getAlldoctors',{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setDoctors(res.data.data)
    }

    async function approvedDoctor(id){
        try {
            const res = await axios.post(`/api/doctor/approve/${id}`,{},{
                headers : {
                    authorization : 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if(res.data.status === 200){
                console.log(res.data)
                reload()
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function cancelDoctor(id){
        try {
            const res = await axios.post(`/api/doctor/cancel/${id}`,{},{
                headers : {
                    authorization : 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if(res.data.status === 200){
                console.log(res.data)
                reload()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getAppliedDoctors()
    },[random])
    return(
        <div>
            <div
                className="flex justify-end mb-2"
            >
                <input
                    onChange={()=>{}}
                    className="w-full md:w-4/12 p-1 border rounded focus:outline-none focus:border-blue-500"
                    placeholder="সার্চ করুন - নাম /অভিজ্ঞতা"
                />
            </div>
            <table className="w-full">
                <thead className="bg-gray-300">
                    <tr className="text-center">
                        <td className="p-1">নং </td>
                        <td className="p-1">নাম </td>
                        <td className="p-1">অভিজ্ঞতা</td>
                        <td className="p-1">সার্ভিস চার্জ</td>
                        <td className="p-1">অবস্থা</td>
                        <td className="p-1">পদক্ষেপ</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        doctors && doctors.map((doctor,i)=>
                            <tr key={i} className='border-b'>
                                <td className="p-1 text-center">{toBengaliNumber(i+1)}</td>
                                <td className="p-1 ">{doctor?.name}</td>
                                <td className="p-1 text-center">{doctor?.specialization}</td>
                                <td className="p-1 text-center">{doctor?.feesPerConsultation}</td>
                                <td className="p-1 text-center">
                                {
                                    doctor?.status ==='Pending' ? 'অপেক্ষমাণ ' :
                                    doctor?.status === 'Approved' ? 'অনুমোদিত' : 'বাতিল'
                                }
                                </td>
                                <td className="p-1 text-center space-x-2">
                                    {doctor?.status === 'Pending' && <button onClick={()=>approvedDoctor(doctor._id)} className="p-2 bg-green-400 text-white rounded hover:bg-green-500">অনুমোদন</button>}
                                    {doctor?.status === 'Pending' && <DeleteDoctor
                                        {...{
                                            id : doctor._id,
                                            deleteHandler : cancelDoctor
                                        }}
                                    >
                                            বাতিল
                                        </DeleteDoctor>}
                                    <DoctorDetails {...{doctor}}/>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}