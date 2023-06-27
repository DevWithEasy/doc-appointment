import axios from "axios"

export async function getUser(id,setUser,setAddress){
    const res = await axios.get(`/api/auth/user/${id}`,{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    setUser(res.data.data)
    setAddress(res.data.data.address)
}

export async function updateUser(id,user,address,setUser,addUser,toast){
    const res = await axios.put(`/api/auth/user/update/${id}`,
    {...user,address},
    {
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    if(res.data.status === 200){
        setUser(res.data.data)
        addUser((res.data.data))
        toast.success('User updated successfully')
    }
}

export async function seenNotification(data,addUser){
    const res = await axios.post('/api/auth/user/seenNotification',data,{
        headers :{
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    if(res.data.status === 200){
        addUser(res.data.data)
    }
}
export async function seenAllNotification(addUser){
    const res = await axios.post('/api/auth/user/seenAllNotification',{},{
        headers :{
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    if(res.data.status === 200){
        addUser(res.data.data)
    }
}

export async function deleteAllNotification(addUser){
    const res = await axios.post('/api/auth/user/deleteAllNotification',{},{
        headers :{
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    if(res.data.status === 200){
        addUser(res.data.data)
    }
}