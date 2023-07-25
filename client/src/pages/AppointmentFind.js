import React from 'react';
import { useLocation } from 'react-router-dom';

const AppointmentFind = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const specialization = searchParams.get('specialization');
    const day = searchParams.get('day');
    console.log(specialization,day)
    return (
        <div>
            
        </div>
    );
};

export default AppointmentFind;