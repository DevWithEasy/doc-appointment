import Heading from '../../components/Heading';
import { FaUsers, FaRegHospital, } from 'react-icons/fa'
import { FcGraduationCap } from 'react-icons/fc'
import Info from '../../components/Info';

const Dashboard = () => {
    const infos = [
        {
            title : 'মোট ব্যবহারকারী',
            value : '01',
            color : 'green',
            icon : <FaUsers size={25} className='text-green-500'/>
        },
        {
            title : 'মোট হাসপাতাল',
            value : '01',
            color : 'yellow',
            icon : <FaRegHospital size={25} className='text-yellow-500'/>
        },
        {
            title : 'মোট ডাক্তার',
            value : '01',
            color : 'blue',
            icon : <FcGraduationCap size={25} className='text-blue-500'/>
        }
    ]
    
    return (
        <div
            className=''
        >
            <Heading>
                ড্যাশবোর্ড
            </Heading>
            <div
                className='p-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3'
            >
                {
                    infos.map((info,i)=>
                        <Info key={i}
                            {...{
                                title : info.title,
                                value : info.value,
                                color : info.color,
                            }}
                        >
                            {info.icon}
                        </Info>
                    )
                }
            </div>
        </div>
    );
};

export default Dashboard;