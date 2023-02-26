import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
export default function Profile(){
    const {id}  = useParams()
    const [user,setUser] = useState({})
    async function getUser(){
        const user = await axios.get(`/api/auth/user/${id}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        setUser(user.data.data)
    }
    useEffect(()=>{
        getUser()
    },[])
    console.log(user)
    return(
        <div>
            Profile
        </div>
    )
}