import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userStore = (set) => ({
    isAuth: false,
    user: {},
    notifications : [],
    doctors: [],
    hospital: {},
    random: 0,
    addUser: (user) => {
        set((state) => ({
            isAuth: true,
            user: user,
            notifications : user.notifications
        }))
    },
    addDoctors: (doctors) => {
        set((state) => ({
            doctors: doctors
        }))
    },
    addNewNotification: (notification) => {
        set((state) => ({
            notifications : state.notifications.find(n => n.id === notification.id) ? [...state.notifications] : [...state.notifications,notification]
        }))
    },
    readSingleNotification: (id) => {
        set((state) => ({
            notifications: state.notifications.map(notification=>{
                if(notification.id === id){
                    return {...notification ,status : 'read' }
                }else{
                    return notification
                }
            })
        }))
    },
    readAllNotifications: () => {
        set((state) => ({
            notifications: state.notifications.map(notification=>{
                return {...notification, status : 'read'}
            })
        }))
    },
    deleteAllNotifications: () => {
        set((state) => ({
            notifications: []
        }))
    },
    removeUser: () => {
        set((state) => ({
            isAuth: false,
            user: {},
        }))
    },
    reload: () => {
        set((state) => ({
            random: Math.random()
        }))
    }
})
const useUserStore = create(
    devtools(
        persist(userStore, {
            name: "user"
        })
    )
)
export default useUserStore;