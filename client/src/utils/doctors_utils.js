import axios from "axios"

export async function handleApplyDoctor(value,toast){
    try {
        const res = await axios.post('/api/doctor/apply',value,{
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

export async function getAllActiveDoctors(setDoctors){
    const res = await axios.get('/api/doctor/allApprovedDoctors')
    setDoctors(res.data.data)
}

export async function getSpecialist(setSpecialist){
    const res = await axios.get(`/api/doctor/specialist`,{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    });
    setSpecialist(res.data.data);
}

export async function getFindDoctors(value,setDoctors){
    const res = await axios.get(`/api/doctor/find/specialist?specialist=${value}`,{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    });
    setDoctors(res.data.data);
}


//-----------------single doctor----------------------

export async function getDoctor(id,setDoctor){
    const res = await axios.get(`/api/doctor/find/${id}`,{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    console.log(res.data);
    setDoctor(res.data.data)
}

export async function updateDoctor(doctor,setDoctor,toast){
    const res = await axios.put(`/api/doctor/update/${doctor?._id}`,{...doctor},{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    if(res.data.status === 200){
        setDoctor(res.data.data)
        toast.success('Update successful')
    }
}