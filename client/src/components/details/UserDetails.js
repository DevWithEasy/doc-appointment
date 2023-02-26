import axios from "axios"
import { useEffect, useState } from "react"
import { RxCrossCircled } from "react-icons/rx"

export default function UserDetails({id,details,setDetails}){
    const [user,setUser] = useState({})
    async function getDoctor(){
        const res = await axios.get(`/api/auth/user/${id}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setUser(res.data.data)
    }
    useEffect(()=>{
        getDoctor()
    },[])
    console.log(user)
    return(
        <div className="absolute top-0 left-0 w-full h-screen bg-gray-500/50 flex justify-center items-center">
            <div className="relative w-1/2 bg-white shadow-md rounded">
                <RxCrossCircled onClick={()=>setDetails(!details)} size={25} className="absolute bg-white text-red-400 rounded-full -top-4 -right-4 cursor-pointer"/>
                <h1 className="text-xl text-center font-bold p-2 border-b">Doctor Details</h1>
                <div className="p-2">
                    <img src={user?.image?.url} alt={user?.name} className='w-[150px] mx-auto rounded-lg'/>
                    <p className="text-xl font-bold">{user?.name}</p>
                    <p className="">Email : {user?.email} </p>
                    <p className="">Phone : {user?.phone} </p>
                    <p className="">Address : {user?.address?.location},{user?.address?.post_office},{user?.address?.upazilla},{user?.address?.district} </p>
                </div>
            </div>
        </div>
    )
}