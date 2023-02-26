import axios from "axios"
import { useEffect, useState } from "react"
import UserDetails from "../../components/details/UserDetails"

export default function Users(){
    const [users,setUsers] = useState([])
    const [details,setDetails] = useState(false)
    const [id,setId] = useState()
    async function getAllUsers(){
        const res = await axios.get('/api/admin/getAllUsers',{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setUsers(res.data.data)
    }
    useEffect(()=>{
        getAllUsers()
    },[])
    console.log(users)
    return(
        <div>
            <h1 className="text-2xl text-center">All Users</h1>
            <table className="w-full">
                <thead className="bg-gray-300">
                    <tr className="text-center font-bold font-xl">
                        <td className="p-2">Sl</td>
                        <td className="p-2">Name</td>
                        <td className="p-2">Email</td>
                        <td className="p-2">Phone</td>
                        <td className="p-2">Status</td>
                        <td className="p-2">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map((user,i)=>
                            <tr key={i} className='border-b'>
                                <td className="p-2 text-center">{i+1}</td>
                                <td className="p-2 ">{user?.name}</td>
                                <td className="p-2 text-center">{user?.email}</td>
                                <td className="p-2 text-center">{user?.phone}</td>
                                <td className="p-2 text-center">
                                    {user?.isAdmin ? 'Admin' : user?.isDoctor ? 'Doctor' : user?.isHospital ? 'Hospital' : 'User'}
                                </td>
                                <td className="p-2 text-center space-x-2">
                                    {/* <button className="p-2 bg-green-400 text-white rounded hover:bg-green-500">Approved</button> */}
                                    <button onClick={()=>{setDetails(!details);setId(user._id)}} className="p-2 bg-blue-400 text-white rounded hover:bg-blue-500">Details</button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
            {details && <UserDetails id={id} details={details} setDetails={setDetails}/>}
        </div>
    )
}