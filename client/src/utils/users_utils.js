import axios from "axios"
import api_url from "./apiUrl"

export async function handleSignUp(value, navigate, toast) {
    try {
        const res = await axios.post(`${api_url}/api/auth/signup`, value)
        toast.success('আপনার একাউন্টটি সফল ভাবে তৈরি হয়েছে')
        localStorage.setItem('accessToken', res.data.token)
        navigate('/verify')
    } catch (error) {
        console.log(error)
        toast.error('আপনার একাউন্ট তৈরিতে ব্যর্থ হয়েছে')
    }
}

export async function handleSignIn(value, addUser, setLoading, navigate, location, toast, socket) {
    try {
        setLoading(true)
        const res = await axios.post(`${api_url}/api/auth/signin`, value)
        if (res.data.status === 200) {
            setLoading(false)
            if (!res.data.data.isVerified) {
                localStorage.setItem('accessToken', res.data.data.token)
                navigate('/verify')
            } else {
                localStorage.setItem('accessToken', res.data.data.token)
                addUser((res.data.data))
                socket.emit('join_chat', { id: res.data.data._id })
                if (location.state?.from) {
                    navigate(location.state.from)
                } else {
                    navigate('/')
                }
            }
        }
    } catch (error) {
        setLoading(false)
        if (error.response.data.message) {
            toast.error(error.response.data.message)
        } else {
            toast.error('প্রবেশ করতে সমস্যা হচ্ছে')
        }
    }
}

export async function getUser(id, setUser, setAddress) {
    const res = await axios.get(`${api_url}/api/auth/user/${id}`, {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    setUser(res.data.data)
    setAddress(res.data.data.address)
}

export async function updateUser(id, user, address, setUser, addUser, toast) {
    const res = await axios.put(`${api_url}/api/auth/user/update/${id}`,
        { ...user, address },
        {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
    if (res.data.status === 200) {
        setUser(res.data.data)
        addUser((res.data.data))
        toast.success('User updated successfully')
    }
}

export async function uploadPhoto(user, file, reload, setLoading, toast) {
    setLoading(true)
    try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('filename', file?.name)
        const res = await axios.post(`${api_url}/api/auth/upload/${user?._id}`, formData, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if (res.data.success === true) {
            reload()
            toast.success('Profile Photo uploaded successfully')
            setLoading(false)
        }
    } catch (error) {
        console.log(error)
        toast.error('Profile Photo uploaded failed')
        setLoading(false)
    }
}

export async function handleVerify(code, navigate, setLoading, setVerified, toast) {
    if (!code) {
        return toast.error('অনুগ্রহ পূর্বক যাচাইকরন কোড টি লিখুন')
    }
    try {
        setLoading(true)
        const res = await axios.post(`${api_url}/api/auth/verify`, { code }, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if (res.data.status === 200) {
            setLoading(false)
            setVerified(true)
            setTimeout(() => {
                navigate('/signin')
            }, 2000)
        }
    } catch (error) {
        setLoading(false)
        toast.error('Verification Failed')
    }

}

export async function handleSendCodeAgain(toast) {
    if (!localStorage.getItem('accessToken')) {
        return toast.error('Please signin first time')
    }
    try {
        const res = await axios.post(`${api_url}/api/auth/sent-code-again`, {}, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if (res.data.status === 200) {
            toast.success('Code send successfully.')
        }
    } catch (error) {
        toast.error('Verification Failed')
    }

}

export async function handlefind(email, setUser, setEmail, setFinding, setLoading, toast) {
    if (!email) {
        return toast.error('অনুগ্রহ পূর্বক ই-মেইল অথবা মোবাইল নাম্বার টি লিখুন')
    }
    setLoading(true)
    try {
        const res = await axios.get(`${api_url}/api/auth/find?email=${email}`)
        if (res.data.status === 200) {
            setUser(res.data)
            setEmail('')
            setFinding(res.data.find)
            setLoading(false)
        }
    } catch (error) {
        setLoading(false)
        toast.error('Something went wrong')
    }

}

export async function handleSendForget(user, setLoading, setSending) {
    try {
        setLoading(true)
        const res = await axios.post(`${api_url}/api/auth/forget-password?email=${user.data.email}`)
        if (res.data.status === 200) {
            setLoading(false)
            setSending(true)
        }
    } catch (error) {
        setLoading(false)
        setSending(false)
    }

}



//---------------notifications--------------------

export async function seenNotification(data, addUser ,readSingleNotification) {
    const res = await axios.post(`${api_url}/api/auth/user/seenNotification`, data, {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    if (res.data.status === 200) {
        addUser(res.data.data)
        readSingleNotification(data.id)
    }
}
export async function seenAllNotification(addUser,readAllNotifications) {
    const res = await axios.post(`${api_url}/api/auth/user/seenAllNotification`, {}, {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    if (res.data.status === 200) {
        addUser(res.data.data)
        readAllNotifications()
    }
}

export async function deleteAllNotification(addUser,deleteAllNotifications) {
    const res = await axios.post(`${api_url}/api/auth/user/deleteAllNotification`, {}, {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    if (res.data.status === 200) {
        addUser(res.data.data)
        deleteAllNotifications()
    }
}