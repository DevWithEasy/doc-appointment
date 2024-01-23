import axios from 'axios';
import { useEffect, useState } from "react";
import Hospital from "../components/hospital/Hospital";
import api_url from "../utils/apiUrl";
import useServiceStore from '../features/serviceStore';

export default function Hospitals() {
    const [query, setQuery] = useState('')
    const { addHospitals,hospitals } = useServiceStore()
    async function getAllHospitals() {
        try {
            const res = await axios.get(`${api_url}/api/vanue/all`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            addHospitals(res.data.data)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getAllHospitals()
    }, [])
    
    return (
        <div className="space-y-2 mx-2 md:w-10/12 md:mx-auto">
            <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-2">
                <input
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                    className="w-full md:w-4/12 p-2 border rounded focus:outline-none focus:border-blue-500"
                    placeholder="সার্চ করুন - নাম /ঠিকানা /ধরণ "
                />
            </div>
            <div
                className="grid md:grid-cols-3 md:gap-4 space-y-3 md:space-y-0"
            >
                {
                    hospitals && hospitals
                        .filter((hospital) =>
                            hospital?.name?.toLowerCase().includes(query) ||
                            hospital?.type?.toLowerCase().includes(query) || hospital?.loaction?.toLowerCase().includes(query)
                        )
                        .map((hospital) => <Hospital 
                                key={hospital._id} 
                                {...{ hospital }} 
                            />
                        )
                }
            </div>
        </div>
    )
}