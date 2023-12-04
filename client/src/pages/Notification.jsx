import { useState } from 'react'
import { BsCheck2All, BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import useUserStore from '../features/userStore'
import { deleteAllNotification, seenAllNotification, seenNotification } from '../utils/users_utils'
export default function Notification(){
    const {notifications,readAllNotifications,readSingleNotification,deleteAllNotifications} = useUserStore()
    const addUser = useUserStore(state=>state.addUser)
    const [readState,setReadState] = useState(false)

    return(
        <div
            className='w-10/12 mx-auto'
        >
            <div className="flex justify-between border-b">
                <div className='flex items-center space-x-2'>
                    <button onClick={()=>setReadState(!readState)} className={!readState ? 'p-2 border-b-2 border-blue-500 hover:text-blue-500' : 'p-2 border-b-2 border-white hover:text-blue-500'}>অপঠিত বার্তা</button>
                    <button onClick={()=>setReadState(!readState)} className={readState ? 'p-2 border-b-2 border-blue-500 hover:text-blue-500' : 'p-2 border-b-2 border-white hover:text-blue-500'}>পঠিত বার্তা</button>
                </div>
                <div className='flex items-center space-x-2'>
                    {!readState && <button onClick={()=>seenAllNotification(addUser,readAllNotifications)} className='flex items-center space-x-1 px-2 py-1 hover:bg-green-500 hover:text-white transition-all duration-300 rounded-md'>
                        <BsCheck2All/>
                        <span>সকল বার্তা পঠিত</span>
                    </button>}
                    {readState && <button onClick={()=>deleteAllNotification(addUser,deleteAllNotifications)} className='flex items-center space-x-1 px-2 py-1 hover:bg-red-500 hover:text-white transition-all duration-300 rounded-md'>
                        <BsTrash/>
                        <span>সকল বার্তা মুছুন</span>
                    </button>}
                </div>
            </div>
            <div className='py-2 space-y-1'>
                {
                    notifications && !readState && 
                    notifications.filter(notification=>notification.status === 'unread')
                    .sort((a,b)=>  b.id - a.id)
                    .map(notification=><Link to={notification?.onClickPath} key={notification.id} onClick={()=>seenNotification(notification,addUser,readSingleNotification)} className='block w-full p-1 border rounded'>
                        {notification?.message}
                    </Link>)
                }

                {
                    notifications && readState && 
                    notifications.filter(notification=>notification.status === 'read')
                    .sort((a,b)=>  b.id - a.id)
                    .map(notification=><Link to={notification?.onClickPath} key={notification.id} className='block w-full p-1 border rounded'>
                        {notification?.message}
                    </Link>)
                }
            </div>
        </div>
    )
}