import {BiHomeSmile,BiGitPullRequest} from 'react-icons/bi'
import {FaHospital} from 'react-icons/fa'
import {BsFillJournalBookmarkFill} from 'react-icons/bs'
import {GiDoctorFace} from 'react-icons/gi'
import {MdAdminPanelSettings,MdOutlineSpaceDashboard} from'react-icons/md'

export const userData = [
    {
        path : '/',
        title : 'Home',
        icon : <BiHomeSmile size={20} className='shrink-0'/>
    },
    {
        path : '/hospitals',
        title : 'Hospitals',
        icon : <FaHospital size={20} className='shrink-0'/>
    },
    {
        path : '/doctors',
        title : 'Doctors',
        icon : <GiDoctorFace size={20} className='shrink-0'/>
    },
    {
        path : '/appointment',
        title : 'Appoinment',
        icon : <BsFillJournalBookmarkFill size={20} className='shrink-0'/>
    },
    {
        path : '/apply-doctor',
        title : 'Apply Doctor',
        icon : <BiGitPullRequest size={20} className='shrink-0'/>
    },
]

export const adminData = [
    {
        path : '/',
        title : 'Home',
        icon : <BiHomeSmile size={20} className='shrink-0'/>
    },
    {
        path : '/admin/users',
        title : 'Users',
        icon : <FaHospital size={20} className='shrink-0'/>
    },
    {
        path : '/admin/hospitals',
        title : 'Hospitals',
        icon : <FaHospital size={20} className='shrink-0'/>
    },
    {
        path : '/admin/doctors',
        title : 'Doctors',
        icon : <GiDoctorFace size={20} className='shrink-0'/>
    },
    {
        path : '/admin',
        title : 'Admin',
        icon : <MdAdminPanelSettings size={25} className='shrink-0'/>
    },
]

export const doctorData = [
    {
        path : '/',
        title : 'Home',
        icon : <BiHomeSmile size={20} className='shrink-0'/>
    },
    {
        path : '/hospitals',
        title : 'Hospitals',
        icon : <FaHospital size={20} className='shrink-0'/>
    },
    {
        path : '/doctors',
        title : 'Doctors',
        icon : <GiDoctorFace size={20} className='shrink-0'/>
    },
    {
        path : '/doctor/dashboard',
        title : 'Dashboard',
        icon : <MdOutlineSpaceDashboard size={20} className='shrink-0'/>
    }
]