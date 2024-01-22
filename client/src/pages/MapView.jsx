import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api_url from '../utils/apiUrl';
import axios from 'axios';
import { useEffect } from 'react';
import useServiceStore from '../features/serviceStore';
import { Link } from 'react-router-dom'
import { toBengaliNumber } from 'bengali-number';

const MapView = () => {
    const center = [26.03224, 88.46250]
    const { addHospitals, hospitals } = useServiceStore()
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
        <div
            className='h-screen overflow-hidden -mt-1.5'
        >
            <MapContainer
                center={center}
                zoom={15}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {hospitals.length > 0 &&
                    hospitals.map((hospital) => {
                        const lat = Number(hospital?.lat);
                        const lng = Number(hospital?.long);
                        const position = L.latLng(lat, lng);

                        return (
                            <Marker key={hospital._id} position={position}>
                                <Popup>
                                    <div>
                                        <Link to={`/hospital/${hospital._id}`}>{hospital?.name}</Link>

                                        <p
                                            className=''
                                        >
                                            {
                                                hospital?.type === 'Hospital' ? 'হাসপাতাল' :
                                                    hospital?.type === 'Dainogostic Center' ? 'ডায়নোগষ্টিক সেন্টার ' :
                                                        hospital?.type === 'Clinic' ? 'ক্লিনিক ' : 'নিজস্ব চেম্বার'
                                            }
                                        </p>
                                        <p>{hospital?.location}</p>
                                        <p
                                            className='space-x-2'
                                        >
                                            <span>
                                                খোলার সময়ঃ {toBengaliNumber(hospital?.open)}
                                            </span>
                                            
                                            <span>
                                                বন্ধের সময়ঃ
                                                {toBengaliNumber(hospital?.close)}
                                            </span>

                                        </p>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
            </MapContainer>
        </div>
    );
};

export default MapView;
