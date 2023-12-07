import { NavLink } from "react-router-dom";
import { FaUsers, FaRegHospital, FaHome } from 'react-icons/fa'
import { FcGraduationCap } from 'react-icons/fc'
import { MdPayment } from 'react-icons/md'

export default function Admin({ children }) {
  return (
    <div className="h-screen -mt-16 -mb-5 pt-[58px] flex justify-between">
      <div className="md:w-2/12 p-4 pt-4 flex flex-col space-y-2">
        <NavLink
          to="/admin/dashboard"
          className='flex items-center space-x-2 px-4 py-1 rounded-full'
        >
          <FaHome />
          <span className="hidden md:inline-block">
            ড্যাশবোর্ড
          </span>
        </NavLink>
        <NavLink
          to="/admin/users"
          className='flex items-center space-x-2 px-4 py-1 rounded-full'
        >
          <FaUsers />
          <span className="hidden md:inline-block">
            ব্যবহারকারী
          </span>
        </NavLink>
        <NavLink
          to="/admin/doctors"
          className='flex items-center space-x-2 px-4 py-1 rounded-full'
        >
          <FcGraduationCap />
          <span className="hidden md:inline-block">
            ডাক্তারগণ
          </span>
        </NavLink>
        <NavLink
          to="/admin/hospitals"
          className='flex items-center space-x-2 px-4 py-1 rounded-full'
        >
          <FaRegHospital />
          <span className="hidden md:inline-block">
            হাসপাতাল
          </span>
        </NavLink>
        <NavLink
          to="/admin/payments"
          className='flex items-center space-x-2 px-4 py-1 rounded-full'
        >
          <MdPayment />
          <span className="hidden md:inline-block">
            পেমেন্টসমূহ
          </span>

        </NavLink>
      </div>
      <div className="w-full md:w-10/12 bg-white">{children}</div>
    </div>
  );
}
