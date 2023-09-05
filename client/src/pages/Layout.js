import { Toaster } from 'react-hot-toast';
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from 'react';
import socket from '../utils/socket';
import useUserStore from '../features/userStore';

export default function Layout() {
    const { isAuth, user,addNewNotification} = useUserStore()
    socket.on('create_appointment_notifiaction', data => {
        addNewNotification(data)
    })

    socket.on('action_appointment_recieved',data=>{
        addNewNotification(data)
    })


    useEffect(() => {
        isAuth && socket.emit('join_chat', { id: user._id })
    },[socket])

    return (
        <div className="h-screen pt-16 pb-5  bg-[#F8F8F8] overflow-y-auto font-bangla">
            <Header />
            <Outlet />
            <Toaster />
        </div>
    )
}