import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api_url from '../utils/apiUrl';
import axios from 'axios';
import { useEffect } from 'react';
import useServiceStore from '../features/serviceStore';
import { Link } from 'react-router-dom'
import { toBengaliNumber } from 'bengali-number';
import { Icon } from 'leaflet'
import location from '../assets/images/location.png'
import MarkerClusterGroup from 'react-leaflet-cluster'

const MapView = () => {
    const center = [26.082397467648313, 88.4669244779722]
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

    const customIcon = new Icon({
        iconUrl: location,
        iconSize: [38, 38]
    })

    useEffect(() => {
        getAllHospitals()
    }, [])

    return (
        <div
            className='overflow-hidden -mt-3'
            style={{ height: 'calc(100vh - 50px)' }}
        >
            <MapContainer
                center={center}
                zoom={10}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup
                    chunkedLoading
                >
                    {hospitals.length > 0 &&
                        hospitals.map((hospital) => {
                            const lat = Number(hospital?.lat);
                            const lng = Number(hospital?.long);
                            const position = L.latLng(lat, lng);

                            return (
                                <Marker
                                    key={hospital._id}
                                    position={position}
                                    icon={customIcon}
                                >
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
                </MarkerClusterGroup>

            </MapContainer>
        </div>
    );
};

export default MapView;
