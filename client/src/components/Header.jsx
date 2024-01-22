import {Menu,MenuButton,MenuDivider,MenuGroup,MenuItem,MenuList,} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../features/userStore";
import api_url from "../utils/apiUrl";
import { useEffect } from "react";
import socket from "../utils/socket";

export default function Header() {
  const {isAuth,user,removeUser , notifications} = useUserStore();

  const navigate = useNavigate();

  function handleLogout() {
    removeUser();
    localStorage.removeItem("accessToken");
  }

  useEffect(()=>{
    isAuth && socket.emit('join_chat',{id : user._id})
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
    }, 1000);
    return () => clearTimeout(timeoutId);
  },[])
  
  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-gray-500">
      <div className="md:w-10/12 md:mx-auto flex justify-between items-center p-2">
        <div className="w-6/12 md:w-3/12 text-white">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-xl font-bold">আমাদের ডাক্তার</span>
          </Link>
        </div>

        <div className="w-6/12 md:flex justify-center md:space-x-4 text-white hidden">
          <NavLink
            to="/doctors"
            className="px-4 py-2 hover:bg-white hover:text-black trasition-all duration-300 rounded"
          >
            ডাক্তার
          </NavLink>
          <NavLink
            to="/hospitals"
            className="px-4 py-2 hover:bg-white hover:text-black trasition-all duration-300 rounded"
          >
            হাসপাতাল
          </NavLink>
          <NavLink
            to="/ambulences"
            className="px-4 py-2 hover:bg-white hover:text-black trasition-all duration-300 rounded"
          >
            এম্বুল্যান্স
          </NavLink>
          <NavLink
            to="/blood_bank"
            className="px-4 py-2 hover:bg-white hover:text-black trasition-all duration-300 rounded"
          >
            ব্লাড ব্যাংক
          </NavLink>
        </div>

        <div className="w-6/12 md:w-3/12 flex justify-end items-center space-x-3">
          {isAuth && 
            <div className="flex justify-end items-center space-x-2">
            <NavLink
              to="/notification"
              className="relative p-2 text-white hover:text-black hover:bg-white trasition-all duration-300 rounded"
            >
              <MdNotificationsNone size={20} className="" />
              {notifications?.length > 0 && (
                <div className="absolute -right-1 -top-0 w-5 h-5 flex justify-center items-center bg-red-500 text-white text-xs rounded-full">
                  <span>
                    {
                      notifications.filter(
                        (notification) => notification.status === "unread"
                      ).length
                    }
                  </span>
                </div>
              )}
            </NavLink>
            <Menu>
              <MenuButton>
                <img
                  src={api_url +user?.image?.url}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
              </MenuButton>
              <MenuList className="text-black px-2">
                <MenuGroup title="প্রোফাইল">
                  <MenuItem onClick={() => navigate(`/profile/${user._id}`)}>
                    আমার প্রোফাইল
                  </MenuItem>
                  {user?.isAdmin && (
                    <MenuItem
                      onClick={() => navigate("/admin/dashboard")}
                      className="text-black"
                    >
                      এডমিন ড্যাশবোর্ড
                    </MenuItem>
                  )}
                  {user?.isDoctor ? (
                    <MenuItem
                      onClick={() => navigate("/doctor")}
                      className="text-black"
                    >
                      ডাক্তার ড্যাশবোর্ড
                    </MenuItem>
                  ) : (
                    <MenuItem
                      onClick={() => navigate("/apply_doctor")}
                      className="text-black"
                    >
                      ডাক্তার প্রোফাইলের আবেদন
                    </MenuItem>
                  )}
                  {user?.isDoctor &&
                    <MenuItem
                      onClick={() => navigate("/doctor/allAppointments")}
                      className="text-black"
                    >
                      অ্যাপয়েন্টমেন্ট সমুহ
                    </MenuItem>
                  }
                  <MenuItem
                    onClick={() => navigate("/appointments")}
                    className="text-black"
                  >
                    আপনার অ্যাপয়েন্টমেন্ট সমুহ
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/payment/add")}>
                    ব্যালেন্স যোগ করুন
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/payments")}>
                    পেমেন্টস সমুহ
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleLogout()}
                    className="hover:bg-red-500 hover:text-white"
                  >
                    বাহির হন
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </div>
          }
          {!isAuth && 
            <div className="hidden md:block text-white space-x-3">
            <NavLink
              to="/signup"
              className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white trasition-all duration-300 rounded"
            >
              একাউন্ট করুন
            </NavLink>
            <NavLink
              to="/signin"
              className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white trasition-all duration-300 rounded"
            >
              প্রবেশ করুন
            </NavLink>
          </div>
          }
          <Menu>
            <MenuButton>
              <AiOutlineMenu size={25} className="md:hidden text-white" />
            </MenuButton>
            <MenuList className="text-black px-2">
              <MenuGroup title="সেবা">
                <MenuItem onClick={() => navigate(`/doctors`)}>
                  সকল ডাক্তারগণ
                </MenuItem>
                <MenuItem
                  onClick={() => navigate("/hospitals")}
                  className="text-black"
                >
                  সকল হাস্পাতাল / ক্লিনিক
                </MenuItem>
                <MenuItem onClick={() => navigate("/amblulances")}>
                  এম্বুল্যান্স ভাড়া
                </MenuItem>
                <MenuItem onClick={() => navigate("/blood_bank")}>
                  রক্ত ব্যাংক
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              {!isAuth && 
                <MenuGroup title="আমার তথ্য ">
                <MenuItem onClick={() => navigate("/signin")}>প্রবেশ করুন</MenuItem>
                <MenuItem onClick={() => navigate("/signup")}>নতুন একাউন্ট করুন</MenuItem>
              </MenuGroup>
              }
              <MenuGroup title="সাহায্য">
                <MenuItem>আমাদের সম্পর্কে</MenuItem>
                <MenuItem>আপনার জিজ্ঞাসা</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
}
