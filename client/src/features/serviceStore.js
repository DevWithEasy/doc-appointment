import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const serviceStore = (set) => ({
    hospitals : [],
    specialists : [],
    process : false,
    
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