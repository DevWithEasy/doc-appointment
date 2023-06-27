import axios from "axios";

export async function getAllAppointments(id,setAppointments){
    const res = await axios.get(`/api/appointment/all/${id}`,{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    });
    setAppointments(res.data.data);
}

export async function cancelAppointment(id,user,toast){
    try {
        const res = await axios.put(`/api/appointment/cancel/${id}`,{},{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
        if(res.data.status === 200){
            getAllAppointments(user?._id)
        }
    } catch (error) {
        if(error){
            toast.error(error.response.data.message)
        }
    }
    
}

export async function addAppointment(data,toast,navigate,onOpen){
    try {
        const res = await axios.post('/api/appointment/add',data,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            toast.success('Appointment added successfully')
            navigate('/appointments')
        }
    } catch (error) {
        if(error.response.data.status === 405){
            return onOpen()
        }
        toast.error(error.response.data.message)
    }
}

export async function getAppointments(day,date,setAppointments){
    const res = await axios.get(`/api/appointment/all/search?day=${day}&date=${date}`,{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    });
    setAppointments(res.data.data);
}

export async function confirmAppointment(id,day,date){
    const res = await axios.put(`/api/appointment/confirm/${id}`,{},{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    });
    if(res.data.status === 200){
        getAppointments(day,date)
    };
}

export async function completeAppointment(id,day,date){
    const res = await axios.put(`/api/appointment/complete/${id}`,{},{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    });
    if(res.data.status === 200){
        getAppointments(day,date)
    };
}

export async function rejectAppointment(id,day,date){
    const res = await axios.put(`/api/appointment/reject/${id}`,{},{
        headers : {
            authorization : 'Bearer ' + localStorage.getItem('accessToken')
        }
    });
    if(res.data.status === 200){
        getAppointments(day,date)
    };
}
