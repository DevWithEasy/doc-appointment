  import axios from "axios"
import { useEffect, useState } from "react"
import UserDetails from "../../components/details/UserDetails"
import {toBengaliNumber} from 'bengali-number'

export default function Users(){
    const [users,setUsers] = useState([])
    async function getAllUsers(){
        try {
            const res = await axios.get('/api/admin/getAllUsers',{
                headers : {
                    authorization : 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if(res.data.status === 200){
                setUsers(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllUsers()
    },[])
    
    return(
        <div>
            <div
                className="flex justify-end mb-2"
            >
                <input
                    onChange={()=>{}}
                    className="w-full md:w-4/12 p-1 border rounded focus:outline-none focus:border-blue-500"
                    placeholder="সার্চ করুন - নাম /ইমেইল /মোবাইল /ধরন"
                />
            </div>
            <table className="w-full">
                <thead className="bg-gray-300">
                    <tr className="text-center">
                        <td className="p-1">নং</td>
                        <td className="p-1">নাম </td>
                        <td className="p-1">ই-মেইল </td>
                        <td className="p-1">মোবাইল </td>
                        <td className="p-1">ধরণ </td>
                        <td className="p-1">পদক্ষেপ</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map((user,i)=>
                            <tr key={i} className='border-b'>
                                <td className="p-1 text-center">{toBengaliNumber(i+1)}</td>
                                <td className="p-1 ">{user?.name}</td>
                                <td className="p-1 text-center">{user?.email}</td>
                                <td className="p-1 text-center">{toBengaliNumber(user?.phone)}</td>
                                <td className="p-1 text-center">
                                    {user?.isAdmin ? 'এডমিন' : user?.isDoctor ? 'ডাক্তার' : user?.isHospital ? 'হাসপাতাল' : 'ব্যবহারকারী'}
                                </td>
                                <td className="p-1 text-center space-x-2">
                                    <UserDetails {...{user}}/>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}