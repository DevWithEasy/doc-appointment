import { NavLink } from "react-router-dom";
import {FaUsers,FaRegHospital,FaHome} from 'react-icons/fa'
import {FcGraduationCap} from 'react-icons/fc'
import {MdPayment} from 'react-icons/md'

export default function Admin({ children }) {
  return (
    <div className="mx-2">
      <h1 className="text-center text-xl py-2">এডমিন ড্যাশবোর্ড</h1>
      <div className="flex justify-between space-x-2">
        <div className="md:w-2/12 flex flex-col space-y-2">
        <NavLink 
            to="/admin"
            className='flex items-center space-x-2 p-1 rounded'
          >
            <FaHome/>
            <span className="hidden md:inline-block">
            ড্যাশবোর্ড
            </span>
          </NavLink>
          <NavLink 
            to="/admin/users"
            className='flex items-center space-x-2 p-1 rounded'
          >
            <FaUsers/>
            <span className="hidden md:inline-block">
            সকল ব্যবহারকারী
            </span>
          </NavLink>
          <NavLink 
            to="/admin/doctors"
            className='flex items-center space-x-2 p-1 rounded'
          >
            <FcGraduationCap/>
            <span className="hidden md:inline-block">
            সকল ডাক্তারগণ
            </span>
          </NavLink>
          <NavLink 
            to="/admin/hospitals"
            className='flex items-center space-x-2 p-1 rounded'
          >
            <FaRegHospital/>
            <span className="hidden md:inline-block">
            সকল হাসপাতাল
            </span>
          </NavLink>
          <NavLink 
            to="/admin/payments"
            className='flex items-center space-x-2 p-1 rounded'
          >
            <MdPayment/>
            <span className="hidden md:inline-block">
            পেমেন্টসমূহ
            </span>

          </NavLink>
        </div>
        <div className="w-full md:w-10/12 ">{children}</div>
      </div>
    </div>
  );
}
