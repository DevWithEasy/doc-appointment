import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ hospitals }) => {
    const center = [26.029539, 88.462343];

    return (
        <div>
            <MapContainer center={center} zoom={13}>
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
                            <Marker key={hospital.id} position={position}>
                                <Popup>{hospital?.name}</Popup>
                            </Marker>
                        );
                    })}
            </MapContainer>
        </div>
    );
};

export default MapView;
