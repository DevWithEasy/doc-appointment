import { AiOutlineCloseCircle } from 'react-icons/ai';
import { NavLink } from "react-router-dom";
import useUserStore from '../features/userStore';
import icon from '../images/icon.png';
import { adminData, doctorData, userData } from '../utils/sidebarData';

export default function Menu({menu,setMenu}){
    const user = useUserStore(state=>state.user)
    const data = user?.isAdmin ? adminData : user?.isDoctor ? doctorData : userData
    return(
        <div className='absolute top-0 left-0 bg-blue-200 w-1/3  h-screen'>
            <div className='flex justify-center items-center py-3 space-x-2'>
                <img src={icon} alt="" className='w-10'/>
            </div>
            <div className='p-2 space-y-2'>
                {data.map((item,i)=><NavLink to={item.path} key={i} onClick={()=>setMenu(!menu)} className='flex items-center space-x-2 px-3 py-2 rounded'>
                    {item.icon} <span>{item.title}</span>
                </NavLink>)}
            </div>
            <AiOutlineCloseCircle size={35} onClick={()=>setMenu(!menu)} className="absolute -right-3 top-4 text-red-500 cursor-pointer"/>
        </div>
    )
}