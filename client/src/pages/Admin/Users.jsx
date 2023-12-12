import axios from "axios"
import { toBengaliNumber } from 'bengali-number'
import { useEffect, useState } from "react"
import api_url from "../../utils/apiUrl"
import { Heading, UserDetails } from "../../components/Index"
import useServiceStore from "../../features/serviceStore"


export default function Users() {
    const {users,addUsers} = useServiceStore()
    const [view, setView] = useState(false)
    const [id,setId] = useState('')
    async function getAllUsers() {
        try {
            const res = await axios.get(`${api_url}/api/admin/getAllUsers`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if (res.data.status === 200) {
                addUsers(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div>
            <Heading>
                ব্যবহারকারী
            </Heading>
            <div
                className="p-2"
            >
                <div
                    className="flex justify-end mb-2"
                >
                    <input
                        onChange={() => { }}
                        className="w-full md:w-4/12 p-1 border rounded focus:outline-none focus:ring-2"
                        placeholder="সার্চ করুন - নাম /ইমেইল /মোবাইল /ধরন"
                    />
                </div>
                <div
                    className="overflow-x-2"
                >
                    <table className="w-full">
                        <thead className="bg-gray-300">
                            <tr className="text-center">
                                <td className="p-1">নং</td>
                                <td className="p-1">নাম </td>
                                <td className="p-1">ই-মেইল </td>
                                <td className="p-1">মোবাইল </td>
                                <td className="p-1 hidden md:inline-block">ধরণ </td>
                                <td className="p-1">পদক্ষেপ</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users && users.map((user, i) =>
                                    <tr key={i} className='border-b'>
                                        <td className="p-1 text-center">{toBengaliNumber(i + 1)}</td>
                                        <td className="p-1 ">{user?.name}</td>
                                        <td className="p-1 text-center">{user?.email}</td>
                                        <td className="p-1 text-center">{toBengaliNumber(user?.phone)}</td>
                                        <td className="p-1 text-center hidden md:inline-block">
                                            {user?.isAdmin ? 'এডমিন' : user?.isDoctor ? 'ডাক্তার' : user?.isHospital ? 'হাসপাতাল' : 'ব্যবহারকারী'}
                                        </td>
                                        <td className="p-1 text-center space-x-2">
                                            <button onClick={() => {
                                                setView(!view),
                                                setId(user._id)
                                            }}
                                                className="px-2 py-1 bg-green-500 text-white rounded-md"
                                            >
                                                বিস্তারিত
                                            </button>
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {view &&
                <UserDetails {...{id,view,setView}}/>
            }
        </div>
    )
}