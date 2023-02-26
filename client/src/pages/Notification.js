import axios from 'axios'
import { useState } from 'react'
import { BsCheck2All, BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import useUserStore from '../features/userStore'
export default function Notification(){
    const {notifications} = useUserStore(state=>state.user)
    const addUser = useUserStore(state=>state.addUser)
    const [readState,setReadState] = useState(false)
    async function seenNotification(data){
        const res = await axios.post('/api/auth/user/seenNotification',data,{
            headers :{
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            addUser(res.data.data)
        }
    }
    async function seenAllNotification(){
        const res = await axios.post('/api/auth/user/seenAllNotification',{},{
            headers :{
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            addUser(res.data.data)
        }
    }

    async function deleteAllNotification(){
        const res = await axios.post('/api/auth/user/deleteAllNotification',{},{
            headers :{
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            addUser(res.data.data)
        }
    }

    return(
        <div>
            <div className="flex justify-between border-b">
                <div className='flex items-center space-x-2'>
                    <button onClick={()=>setReadState(!readState)} className={!readState ? 'p-2 border-b-2 border-blue-500 hover:text-blue-500' : 'p-2 border-b-2 border-white hover:text-blue-500'}>Unread</button>
                    <button onClick={()=>setReadState(!readState)} className={readState ? 'p-2 border-b-2 border-blue-500 hover:text-blue-500' : 'p-2 border-b-2 border-white hover:text-blue-500'}>Read</button>
                </div>
                <div className='flex items-center space-x-2'>
                    {!readState && <button onClick={()=>seenAllNotification()} className='flex items-center space-x-1 px-2 py-1 hover:bg-green-500 hover:text-white transition-all duration-300 rounded-md'>
                        <BsCheck2All/>
                        <span>Mark as all read</span>
                    </button>}
                    {readState && <button onClick={()=>deleteAllNotification()} className='flex items-center space-x-1 px-2 py-1 hover:bg-red-500 hover:text-white transition-all duration-300 rounded-md'>
                        <BsTrash/>
                        <span>Delete All</span>
                    </button>}
                </div>
            </div>
            <div className='py-2 space-y-1'>
                {
                    notifications && !readState && notifications.filter(notification=>notification.status === 'unread').map(notification=><Link to={notification?.onClickPath} key={notification.id} onClick={()=>seenNotification(notification)} className='block w-full p-1 border rounded'>
                        {notification?.message}
                    </Link>)
                }

                {
                    notifications && readState && notifications.filter(notification=>notification.status === 'read').map(notification=><Link to={notification?.onClickPath} key={notification.id} className='block w-full p-1 border rounded'>
                        {notification?.message}
                    </Link>)
                }
            </div>
        </div>
    )
}