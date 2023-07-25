import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdNotificationsNone } from 'react-icons/md';
import { Link, NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../features/userStore";
// import Menu from "./Menu";
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList
} from '@chakra-ui/react';

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
        <div className="w-full fixed top-0 left-0 z-10">
            <div className="w-10/12 mx-auto flex justify-between items-center p-2">
                <div className="w-3/12">
                    <Link className="flex items-center space-x-3">
                        <AiOutlineMenu
                            size={25} 
                            onClick={()=>setMenu(!menu)}
                            className="md:hidden"
                        />
                        <span className="text-lg font-bold">AmaderDoctor</span>
                    </Link>
                </div>

                <div className="w-6/12 flex justify-center">
                    <NavLink to="/doctors" className="p-2 hover:bg-white trasition-all duration-300 rounded">
                        Doctors
                    </NavLink>
                    <NavLink to="/hospitals" className="p-2 hover:bg-white trasition-all duration-300 rounded">
                        Hospitals
                    </NavLink>
                    <NavLink to="/ambulences" className="p-2 hover:bg-white trasition-all duration-300 rounded">
                        Ambulances
                    </NavLink>
                </div>

                <div className="w-3/12 flex justify-end">
                    {
                        !isAuth ?
                        <div>
                            <NavLink to="/signup" className="p-2 hover:bg-white trasition-all duration-300 rounded">
                                Create an account
                            </NavLink>
                            <NavLink to="/signin" className="p-2 hover:bg-white trasition-all duration-300 rounded">
                                Login
                            </NavLink>
                        </div>
                        :
                        <div
                            className="flex justify-end items-center space-x-2"
                        >
                            <NavLink to="/notification" className="relative p-2 hover:bg-white trasition-all duration-300 rounded">
                                <MdNotificationsNone size={25} className=""/>
                                {user?.notifications?.length > 0 && <div className="absolute -right-1 -top-0 w-5 h-5 flex justify-center items-center bg-red-500 text-white text-xs rounded-full">
                                    <span>{user?.notifications.filter(notification=>notification.status === 'unread').length}</span>
                                </div>}
                            </NavLink>
                            <Menu>
                                <MenuButton>
                                    <img src={user?.image?.url} alt="" className="w-6 h-6  rounded-full border"/>
                                </MenuButton>
                                <MenuList>
                                <MenuGroup title='Profile'>
                                    <MenuItem
                                        onClick={()=>navigate(`/profile/${user._id}`)}
                                    >
                                        My Account
                                    </MenuItem>
                                    <MenuItem
                                        onClick={()=>navigate('/appointments')}
                                    >
                                        Appointments
                                    </MenuItem>
                                    <MenuItem
                                        onClick={()=>navigate('/payments')}
                                    >
                                        Payments
                                    </MenuItem>
                                </MenuGroup>
                                <MenuDivider />
                                <MenuGroup title='Help'>
                                    <MenuItem>
                                        Docs
                                    </MenuItem>
                                    <MenuItem>
                                        FAQ
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