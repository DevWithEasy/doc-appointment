import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import locationIcon from '../assets/images/location.png'
import carIcon from '../assets/images/car.png'

const MapViewDirection = ({ view, setView, hospital }) => {
    const mapRef = useRef(null)

    const destinationIcon = (url) => {
        return L.icon({
            iconUrl: url,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });
    }

    useEffect(() => {
        if (!mapRef.current) {
            const map = L.map('map').setView([26.03225, 88.46250], 13)

            L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    attribution: '© OpenStreetMap contributors'
                }
            ).addTo(map)

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;

                        L.Routing.control({
                            waypoints: [
                                L.latLng(latitude, longitude),
                                L.latLng([Number(hospital?.lat), Number(hospital?.long)]),
                            ],
                            routeWhileDragging: true,
                            createMarker: () => null
                        }).addTo(map);

                        const yourMarker = L.marker(
                            [latitude, longitude],
                            {
                                icon: destinationIcon(carIcon)
                            }
                        ).addTo(map)

                        yourMarker.bindPopup('আপনার বর্তমান অবস্থান').openPopup()
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                    }
                );
            }

            const destinationMarker = L.marker(
                [Number(hospital?.lat), Number(hospital?.long)],
                {
                    icon: destinationIcon(locationIcon)
                }
            ).addTo(map)

            destinationMarker.bindPopup(`${hospital?.name},${hospital?.location}`).openPopup()

            mapRef.current = map
        }
    }, []);

    return (
        <div
            className='fixed top-0 left-0 h-screen w-full overflow-hidden z-50 pt-16 px-4 bg-slate-500/50  space-y-2'
        >
            <button
                onClick={() => setView(!view)}
                className='px-4 py-2 bg-red-500 text-white rounded-md'
            >
                বন্ধ করুন
            </button>
            <div
                id="map"
                style={{ height: '450px' }}
            >
            </div>
        </div>
    );
};

export default MapViewDirection;
