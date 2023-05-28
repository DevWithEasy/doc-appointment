import { NavLink } from "react-router-dom";
import useUserStore from "../features/userStore";
import icon from '../assets/images/icon.png';
import { adminData, doctorData, userData } from '../utils/sidebarData';

export default function Sidebar(){
    const user = useUserStore(state=>state.user)
    const data = user?.isAdmin ? adminData : user?.isDoctor ? doctorData : userData

    return(
        <div className='bg-blue-200 h-screen'>
            <div className='flex justify-center items-center py-3 space-x-2'>
                <img src={icon} alt="" className='w-10'/>
            </div>
            <div className='p-2 space-y-2'>
                {data.map((item,i)=><NavLink to={item.path} key={i} className='flex items-center space-x-2 px-3 py-2 rounded'>
                    {item.icon} <span>{item.title}</span>
                </NavLink>)}
            </div>
        </div>
    )
}