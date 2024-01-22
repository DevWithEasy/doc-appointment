import hospital from '../assets/images/hospital.png'
import diagnostic from '../assets/images/densitometer.png'
import clinic from '../assets/images/clinic.png'
import p_chamber from '../assets/images/doctor.png'
import {Icon} from 'leaflet'

const markerIcon = (type) => {
    const iconUrl = type === 'hospital' ? hospital
        : type === 'diagnostic' ? diagnostic
            : type === 'clinic' ? clinic : p_chamber

    return new Icon ({
        iconUrl : iconUrl,
        iconSize : [38,38]
    })
}

export default markerIcon