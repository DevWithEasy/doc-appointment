import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const serviceStore = (set) => ({
    hospitals : [],
    specialists : [],
    doctors : [],
    users : [],
    process : false,

    addUsers: (data) => {
        set((state) => ({
            users : data
        }))
    },
    addDoctors: (data) => {
        set((state) => ({
            doctors : data
        }))
    },
    addHospitals: (data) => {
        set((state) => ({
            hospitals : data
        }))
    },
    addSpecialists: (data) => {
        set((state) => ({
            specialists : data
        }))
    },
    processing: (value) => {
        set((state) => ({
            process : value
        }))
    },
})
const useServiceStore = create(
    devtools(
        persist(serviceStore, {
            name: "service"
        })
    )
)
export default useServiceStore;