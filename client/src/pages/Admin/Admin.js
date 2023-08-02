import { NavLink } from "react-router-dom";

export default function Admin({ children }) {
  return (
    <div
        className="mx-2"
    >
      <h1 className="text-center text-xl">এডমিন ড্যাশবোর্ড</h1>
      <div className="flex justify-between">
        <div className="w-3/12 flex flex-col">
            <NavLink to='/admin/users'>
                সকল ব্যবহারকারী
            </NavLink>
            <NavLink to='/admin/doctors'>
                সকল ডাক্তারগণ
            </NavLink>
            <NavLink to='/admin/hospitals'>
                সকল হাসপাতাল 
            </NavLink>
            <NavLink to='/admin/payments'>
                পেমেন্টসমূহ
            </NavLink>
        </div>
        <div className="w-9/12 ">{children}</div>
      </div>
    </div>
  );
}
