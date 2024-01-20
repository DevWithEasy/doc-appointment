import { useEffect, useState } from 'react';


const MapView = () => {
    const [location, setLocation] = useState(null)


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                    setSelectedPlace({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                },
                (error) => {
                    console.error('Error getting location:', error.message)
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser')
        }
    }, [])

    console.log(location)
    return (
        <>
            
        </>
    );
};

export default MapView;