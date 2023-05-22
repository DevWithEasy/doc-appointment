import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { AiOutlinePrinter } from "react-icons/ai"
import { useReactToPrint } from "react-to-print"
import PrintHeader from "./PrintHeader"
import { Spinner } from '@chakra-ui/react'

export default function AppointmentDetails({id,isOpen, onOpen, onClose}){
    
    const printRef = useRef()
    const [appointment,setAppointment] = useState({})
    const [chamber,setChamber] = useState({})
    const [status,setStatus] = useState({})
    const [loading,setLoading] = useState(false)

    async function getAppointmentDetails(id){
        try{
            const res = await axios.get(`/api/appointment/details/${id}`,{
                headers : {
                    authorization : 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if(res.status === 200){
                setAppointment(res.data.data)
                setChamber(res.data.data.doctor.chambers.find(c => c.id === res.data.data.chamberId))
            }
        }catch(err){
            console.log(err)
        }
    }

    async function getAppointmentStatus(){
        setLoading(true)
        try {
            const res = await axios.get(`/api/appointment/status?dId=${appointment?.doctor?._id}&date=${appointment?.appointmentDate}&aId=${appointment?._id}`,{
                headers : {
                    authorization : 'Bearer ' + localStorage.getItem('accessToken')
                }
            })

            if(res.data.status === 200){
                setLoading(false)
                setStatus(res.data)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    function selectedDay(appoinmentDate){
        const date = new Date(appoinmentDate);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = daysOfWeek[date.getDay()];
        let day
        let month

        if(date.getDate() <10){
            day = `0${date.getDate()}`
        }else{
            day = date.getDate()
        }

        if(date.getMonth() <10){
            month = `0${date.getMonth()+1}`
        }else{
            month = date.getMonth()+1
        }
        return `${day}-${month}-${date.getFullYear()} (${dayName})` 
    }

    const handlePrint = useReactToPrint({
        content : ()=> printRef.current,
        documentTitle : appointment?.appointmentId + '-' + appointment?.patientName + '-'  + selectedDay(appointment?.appointmentDate)
    })

    useEffect(()=>{
        getAppointmentDetails(id)
    },[id])

    return(
        <>
            <Modal isOpen={isOpen} size='xl' onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>
                    Appointment Details
                </ModalHeader>
                <ModalCloseButton onClick={()=>setStatus({})}/>
                <ModalBody>
                    <div ref={printRef} className="print:mx-6">
                        <PrintHeader/>
                        <div>
                            <div className="">
                                <p className="p-2 space-x-2">
                                    <span>Appointment ID :</span>
                                    <span className="font-mono">{appointment?.appointmentId}</span>
                                </p>
                                <p className="p-2">
                                    <p className="space-x-2">
                                        <span>Appointment Date :</span>
                                        <span className="font-mono">
                                            {selectedDay(appointment?.appointmentDate)}
                                        </span>
                                    </p>
                                </p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p className="p-2 space-x-2">
                                    <span>Patient Name :</span>
                                    <span className="font-mono">{appointment?.patientName}</span>
                                </p>
                                <p className="p-2 space-x-2">
                                    <span>Mobile :</span>
                                    <span className="font-mono">{appointment?.patientPhone}</span>
                                </p>
                                <p className="p-2 space-x-2">
                                    <span>Gender : </span>
                                    <span className="font-mono">{appointment?.gender}</span>
                                </p>
                                <p className="p-2 space-x-2">
                                    <span>Age : </span>
                                    <span className="font-mono">{appointment?.age} Years</span>
                                </p>
                            </div>
                        </div>
                        <hr className='mt-3 mb-6'/>
                        <div className="">
                            <table className="w-full border border-gray-400 text-left">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">
                                            Appointment info
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Consultation Fee
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white">
                                        <td className="px-4 py-5 font-mono space-y-2">
                                            <span className="font-bold">Dr . {appointment?.doctor?.firstName} {appointment?.doctor?.lastName}</span>
                                            <br/>
                                            <br/>
                                            <span>{chamber?.vanue}</span>
                                            <br/>
                                            <span>{chamber?.location}</span>
                                        </td>
                                        <td className="px-6 py-10 font-mono">
                                        <span>= {appointment?.doctor?.feesPerConsultation}/- Tk</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="py-4">
                                <p>Submited by : <span className="font-mono">{appointment?.user?.name}</span></p>
                                <p>Submited on : <span className="font-mono">{new Date(appointment?.createdAt).toDateString()}</span></p>
                            </div>
                        </div>
                    </div>
                    {loading && <div className='flex justify-center print:hidden'>
                        <span className='flex items-center space-x-2 px-4 py-2 border border-green-500 rounded-full'>
                            <Spinner color='red.500' />
                            <span>Please wait...</span>
                        </span>
                    </div>}
                    {status?.message && <div className='flex justify-center print:hidden'>
                        <span className={`px-4 py-2 border rounded-full border-green-500`}>{status?.message}</span>
                    </div>}
                </ModalBody>

                <ModalFooter className="space-x-2">
                    <button 
                        className='px-4 py-2 bg-gray-500 text-white rounded-md'
                        onClick={()=>{onClose();setStatus({})}}
                    >
                    Close
                    </button>
                    <button
                        className={`px-4 py-2 text-white rounded-md ${status.message ? 'bg-yellow-500' : 'bg-green-500'}`}
                        onClick={()=>getAppointmentStatus()}
                    >
                        {status?.message ? 'Check again' : 'Check status'}
                    </button>
                    <button
                        onClick={()=>handlePrint()} 
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        <AiOutlinePrinter size={20} className='cursor-pointer'/>
                        <span>Print</span>
                    </button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}