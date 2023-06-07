import { useState } from "react";
import { AiOutlineLogout,AiOutlineMenu } from "react-icons/ai";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { MdNotificationsNone } from 'react-icons/md';
import { Link } from "react-router-dom";
import Menu from "./Menu";
import useUserStore from "../features/userStore";

export default function Header(){
    const [menu,setMenu] = useState(false)
    const isAuth = useUserStore(state=>state.isAuth)
    const user = useUserStore(state=>state.user)
    const removeUser = useUserStore(state=>state.removeUser)
    function handleLogout() {
        removeUser()
        localStorage.removeItem('accessToken')
    }
    return(
        <div className="w-full md:w-10/12 fixed top-0 right-0 md:pl-2 z-10">
            <div className="flex justify-between md:justify-end items-center p-2 md:py-2 md:px-6 md:rounded-b bg-blue-200/95 z-10">
                <div className="md:hidden flex items-center space-x-3">
                    <AiOutlineMenu size={25} onClick={()=>setMenu(!menu)}/>
                    <span className="textxl">DOCAPP</span>
                </div>

                {menu && <Menu menu={menu} setMenu={setMenu}/>}

                <div>
                    {!isAuth && <div className="relative flex items-center space-x-4">
                        <Link to="/signup" className="p-2 hover:bg-white trasition-all duration-300 rounded">Signup</Link>
                        <Link to="/signin" className="p-2 hover:bg-white trasition-all duration-300 rounded">Signin</Link>
                    </div>}

                    {isAuth && <div className="flex justify-end items-center space-x-4 px-4 rounded bg-blue-200/95">
                        <Link to="/notification" className="relative p-2 hover:bg-white trasition-all duration-300 rounded">
                            <MdNotificationsNone size={25} className="md:hidden"/>
                            <span className="hidden md:block">Notifications</span>
                            {user.notifications.length > 0 && <div className="absolute -right-1 -top-0 w-5 h-5 flex justify-center items-center bg-red-500 text-white text-sm rounded-full">
                                <span>{user?.notifications.filter(notification=>notification.status === 'unread').length}</span>
                            </div>}
                        </Link>
                        <Link to="/appointments" className="p-2 hover:bg-white trasition-all duration-300 rounded">
                            <BsFillJournalBookmarkFill size={20} className="md:hidden"/>
                            <span className="hidden md:block">Appointments</span>
                        </Link>
                        <Link to={`/profile/${user._id}`} className="p-2 hover:bg-white trasition-all duration-300 rounded">
                            <img src={user?.image?.url} alt="" className="w-6 h-6 md:hidden rounded-full border"/>
                            <span className="hidden md:flex md:space-x-2">
                                <img src={user?.image?.url} alt="" className="w-6 h-6  rounded-full border"/>
                                <b>{user?.name}</b>
                            </span>
                        </Link>
                        <Link onClick={()=>handleLogout()} to="" className="p-2 hover:bg-white trasition-all duration-300 rounded">
                            <AiOutlineLogout size={20} className="md:hidden"/>
                            <span className="hidden md:block">Logout</span>
                        </Link>
                    </div>}
                </div>
            </div>
        </div>
    )
}