import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList
} from '@chakra-ui/react';
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdNotificationsNone } from 'react-icons/md';
import { Link, NavLink, useNavigate } from "react-router-dom";
import icon from '../assets/images/cardiogram.png';
import useUserStore from "../features/userStore";

export default function Header(){
    const [menu,setMenu] = useState(false)
    const isAuth = useUserStore(state=>state.isAuth)
    const user = useUserStore(state=>state.user)
    const removeUser = useUserStore(state=>state.removeUser)

    const navigate = useNavigate()

    function handleLogout() {
        removeUser()
        localStorage.removeItem('accessToken')
    }
    return(
        <div className="w-full fixed top-0 left-0 z-10 bg-gray-500">
            <div className="w-10/12 mx-auto flex justify-between items-center p-2">
                <div className="w-3/12 text-white">
                    <Link 
                        to='/'
                        className="flex items-center space-x-3"
                    >
                        <AiOutlineMenu
                            size={25} 
                            onClick={()=>setMenu(!menu)}
                            className="md:hidden"
                        />
                        <span className="text-lg font-bold">
                            আমাদের ডাক্তার
                        </span>
                    </Link>
                </div>

                <div className="w-6/12 flex justify-center space-x-4 text-white">
                    <NavLink to="/doctors" className="px-4 py-2 hover:bg-white hover:text-black trasition-all duration-300 rounded">
                        ডাক্তার
                    </NavLink>
                    <NavLink to="/hospitals" className="px-4 py-2 hover:bg-white hover:text-black trasition-all duration-300 rounded">
                        হাসপাতাল
                    </NavLink>
                    <NavLink to="/ambulences" className="px-4 py-2 hover:bg-white hover:text-black trasition-all duration-300 rounded">
                        এম্বুল্যান্স
                    </NavLink>
                </div>

                <div className="w-3/12 flex justify-end">
                    {
                        !isAuth ?
                        <div
                            className="text-white space-x-3"
                        >
                            <NavLink to="/signup" className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white trasition-all duration-300 rounded">
                               একাউন্ট করুন
                            </NavLink>
                            <NavLink to="/signin" className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white trasition-all duration-300 rounded">
                                প্রবেশ করুন
                            </NavLink>
                        </div>
                        :
                        <div
                            className="flex justify-end items-center space-x-2"
                        >
                            <NavLink to="/notification" className="relative p-2 text-white hover:text-black hover:bg-white trasition-all duration-300 rounded">
                                <MdNotificationsNone size={25} className=""/>
                                {user?.notifications?.length > 0 && <div className="absolute -right-1 -top-0 w-5 h-5 flex justify-center items-center bg-red-500 text-white text-xs rounded-full">
                                    <span>{user?.notifications.filter(notification=>notification.status === 'unread').length}</span>
                                </div>}
                            </NavLink>
                            <Menu
                                className='z-10'
                            >
                                <MenuButton>
                                    <img src={user?.image?.url} alt="" className="w-7 h-7 rounded-full"/>
                                </MenuButton>
                                <MenuList
                                    className="text-black"
                                >
                                <MenuGroup title='Profile'>
                                    <MenuItem
                                        onClick={()=>navigate(`/profile/${user._id}`)}
                                    >
                                        আমার প্রোফাইল
                                    </MenuItem>
                                    <MenuItem
                                        onClick={()=>navigate('/appointments')}
                                        className="text-black"
                                    >
                                        অ্যাপয়েন্টমেন্ট সমুহ
                                    </MenuItem>
                                    <MenuItem
                                        onClick={()=>navigate('/payments')}
                                    >
                                        পেমেন্টস সমুহ
                                    </MenuItem>
                                </MenuGroup>
                                <MenuDivider />
                                <MenuGroup title='Help'>
                                    <MenuItem>
                                        আমাদের সম্পর্কে
                                    </MenuItem>
                                    <MenuItem>
                                        আপনার
                                    </MenuItem>
                                    <MenuItem
                                        onClick={()=>handleLogout()}
                                    >
                                        Logout
                                    </MenuItem>
                                </MenuGroup>
                                </MenuList>
                            </Menu>
                        </div>
                    }
                </div>

                {/* {menu && <Menu menu={menu} setMenu={setMenu}/>} */}

            </div>
        </div>
    )
}