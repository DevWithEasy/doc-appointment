import { Link } from 'react-router-dom'
import hospital from '../images/hospital2.png'
export default function Hospital(){
    return(
        <div className="shadow border rounded p-2 space-y-2">
            <img src={hospital} alt="" className='w-full'/>
            <Link to='/hospital/1' className='text-xl font-bold'>Amader Hospital</Link>
            <p>Bus stand road,Thakurgaon sadar</p>
            <p>*****</p>
        </div>
    )
}