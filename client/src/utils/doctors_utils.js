import axios from "axios"
import { toBengaliNumber } from "bengali-number"
import api_url from "./apiUrl"

export async function handleApplyDoctor(value,toast){
    try {
        const res = await axios.post(`${api_url}/api/doctor/apply`,value,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            toast.success('Applied Doctor successfully.')
        }
    } catch (error) {
        if(error){
            toast.error(error.message)
        }
    }
}

export async function getAllActiveDoctors(addDoctors){
    try {
        const res = await axios.get(`${api_url}/api/doctor/allApprovedDoctors`)
        addDoctors(res.data.data)
    } catch (error) {
        console.log(error)
    }
}

export async function getSpecialist(setSpecialist){
    const res = await axios.get(`${api_url}/api/doctor/specialist`,{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    });
    setSpecialist(res.data.data);
}

export async function getFindDoctors(specialization,day,setDoctors,setLoading,setMsg){
    setLoading(true)
    try {
        const res = await axios.get(`${api_url}/api/doctor/find/specialist?specialist=${specialization}&day=${day}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
        if(res.status === 200){
            setDoctors(res.data.data);
            setLoading(false)
            if(res.data.data.length > 0){
                setMsg(`${toBengaliNumber(res.data.data.length)} জন ডাক্তার খুজে পাওয়া গেছে`)
            }else{
                setMsg(`কোন ডাক্তার খুজে পাওয়া যায়নি। বার পরিবর্তন করে আবার খুজুন।`)
            }
        }
    } catch (error) {
        setLoading(false)
    }
}


//-----------------single doctor----------------------

export async function getDoctor(id,setDoctor){
    const res = await axios.get(`${api_url}/api/doctor/find/${id}`,{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    setDoctor(res.data.data)
}

export async function updateDoctor(doctor,setDoctor,toast){
    const res = await axios.put(`${api_url}/api/doctor/update/${doctor?._id}`,{...doctor},{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    if(res.data.status === 200){
        setDoctor(res.data.data)
        toast.success('Update successful')
    }
}

export async function deleteDoctor(id,reload){
    try {
        const res = await axios.post(`${api_url}/api/doctor/delete/${id}`,{},{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            reload()
        }
    } catch (error) {
        console.log(error)
    }
}

//----------------chamber----------------------

export async function addChamber(id,value,reload,onClose){
    try {
        const res = await axios.post(`${api_url}/api/doctor/addChamber/${id}`,value,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
    
        if(res.data.status === 200){
            reload()
            onClose()
            console.log(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateChamber(id,data,reload,onClose){
    const res = await axios.put(`${api_url}/api/doctor/updateChamber/${id}`,data,{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    if(res.data.status === 200){
        reload()
        onClose()
    }
}

export async function deleteChamber(dId,cId,reload,onClose){
    const res = await axios.put(`${api_url}/api/doctor/deleteChamber/?dId=${dId}&cId=${cId}`,{},{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    if(res.data.status === 200){
        reload()
        onClose()
    }
}