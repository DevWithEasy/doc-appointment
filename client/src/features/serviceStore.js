import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const serviceStore = (set) => ({
    hospitals : [],
    
    addHospitals: (data) => {
        set((state) => ({
            hospitals : data
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