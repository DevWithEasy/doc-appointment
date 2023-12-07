import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from "react"
import { AiOutlinePrinter } from "react-icons/ai"
import { useReactToPrint } from "react-to-print"
import { getAppointmentDetails, getAppointmentStatus } from '../utils/appoimtments_utils'
import PrintHeader from "./PrintHeader"

// eslint-disable-next-line react/prop-types
export default function AppointmentDetails({ id, view, setView}) {
    const {onClose} = useDisclosure()
    const printRef = useRef()
    const [appointment, setAppointment] = useState({})
    const [chamber, setChamber] = useState({})
    const [status, setStatus] = useState({})
    const [loading, setLoading] = useState(false)

    function selectedDay(appoinmentDate) {
        const date = new Date(appoinmentDate);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = daysOfWeek[date.getDay()];
        let day = date.getDate()
        let month = date.getMonth() + 1

        return `${String(day).padStart(2,'0')}-${String(month).padStart(2,'0')}-${date.getFullYear()} (${dayName})`
    }

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: appointment?.appointmentId + '-' + appointment?.patientName + '-' + selectedDay(appointment?.appointmentDate)
    })

    useEffect(() => {
        getAppointmentDetails(id, setAppointment, setChamber)
    }, [id])
    
    return (
        <>
            <Modal isOpen={view} size='xl' onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        className='font-bangla'
                    >
                        অ্যাপয়েন্টম্যান্টের বিস্তারিত
                    </ModalHeader>
                    <ModalCloseButton onClick={() => {
                        setView(!view)
                        setStatus({})
                    }} />
                    <ModalBody
                        className='font-bangla'
                    >
                        <div ref={printRef} className="print:mx-6">
                            <PrintHeader />
                            <div>
                                <div className="">
                                    <p className="p-2 space-x-2">
                                        <span className='print:hidden'>অ্যাপয়েন্টম্যান্ট আইডিঃ </span>
                                        <span className='hidden print:inline-block'>Appointment ID :</span>
                                        <span className="font-mono">{appointment?.appointmentId}</span>
                                    </p>
                                    <p className="p-2">
                                        <p className="space-x-2">
                                            <span className='print:hidden'>অ্যাপয়েন্টম্যান্টের তারিখঃ </span>
                                            <span className='hidden print:inline-block'>Appointment Date : </span>
                                            <span className="font-mono">
                                                {selectedDay(appointment?.appointmentDate)}
                                            </span>
                                        </p>
                                    </p>
                                </div>
                                <div className="grid grid-cols-2">
                                    <p className="p-2 space-x-2">
                                        <span className='print:hidden'>রোগীর নামঃ </span>
                                        <span className='hidden print:inline-block'>Patient Name : </span>
                                        <span className="font-mono">{appointment?.patientName}</span>
                                    </p>
                                    <p className="p-2 space-x-2">
                                        <span className='print:hidden'>মোবাইল নাম্বারঃ </span>
                                        <span className='hidden print:inline-block'>Mobile No : </span>
                                        <span className="font-mono">{appointment?.patientPhone}</span>
                                    </p>
                                    <p className="p-2 space-x-2">
                                        <span className='print:hidden'>লিঙ্গঃ  </span>
                                        <span className='hidden print:inline-block'>Gender : </span>
                                        <span className="font-mono">{appointment?.gender}</span>
                                    </p>
                                    <p className="p-2 space-x-2">
                                        <span className='print:hidden'>বয়সঃ </span>
                                        <span className='hidden print:inline-block'>Age : </span>
                                        <span className="font-mono">{appointment?.age} Years</span>
                                    </p>
                                </div>
                            </div>
                            <hr className='mt-3 mb-6' />
                            <div>
                                <table className="w-full border border-gray-400 text-left">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">
                                                <span className='print:hidden'>অ্যাপয়েন্টম্যান্টের তথ্য </span>
                                                <span className='hidden print:inline-block'>Appointment Information : </span>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <span className='print:hidden'>সার্ভিস চার্জ </span>
                                                <span className='hidden print:inline-block'>Appointment Fee</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white">
                                            <td className="px-4 py-5 space-y-2">
                                                <span className="print:hidden font-bold">ডাক্তার {appointment?.doctor?.name} </span>
                                                <span className='hidden print:inline-block'> Dr. {appointment?.doctor?.name}</span>
                                                <br />
                                                <br />
                                                <span>{chamber?.vanue}</span>
                                                <br />
                                                <span>{chamber?.location}</span>
                                            </td>
                                            <td className="px-6 py-10">
                                                <span className='print:hidden'> {appointment?.doctor?.feesPerConsultation}/- টাকা </span>
                                                <span className='hidden print:inline-block'>{appointment?.doctor?.feesPerConsultation}/- TK </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="py-4 ">
                                    <p>
                                        <span className='print:hidden'>সাবমিট করেছেনঃ </span>
                                        <span className='hidden print:inline-block'>Submited By : </span> 
                                        <span className="font-mono"> {appointment?.user?.name}</span>
                                    </p>
                                    <p>
                                        <span className='print:hidden'>সাবমিটের তারিখঃ </span>
                                        <span className='hidden print:inline-block'>Submited Date : </span>
                                        <span className="font-mono"> {new Date(appointment?.createdAt).toDateString()}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {loading && <div className='flex justify-center print:hidden'>
                            <span className='flex items-center space-x-2 px-4 py-2 border border-green-500 rounded-full'>
                                <Spinner color='red.500' />
                                <span>অপেক্ষা করুন...</span>
                            </span>
                        </div>}
                        {status?.message && <div className='flex justify-center print:hidden'>
                            <span className={`px-4 py-2 border rounded-full border-green-500`}>{status?.message}</span>
                        </div>}
                    </ModalBody>

                    <ModalFooter className="space-x-2 font-bangla">
                        <button
                            className='px-4 py-2 bg-gray-500 text-white rounded-md'
                            onClick={() => { setView(!view); setStatus({}) }}
                        >
                            বন্ধ করুন
                        </button>
                        <button
                            className={`px-4 py-2 text-white rounded-md ${status.message ? 'bg-yellow-500' : 'bg-green-500'}`}
                            onClick={() => getAppointmentStatus(appointment, setLoading, setStatus)}
                        >
                            {status?.message ? 'পুনরায় চেষ্টা করুন' : 'অ্যাপয়েন্টম্যান্টের অবস্থা '}
                        </button>
                        <button
                            onClick={() => handlePrint()}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            <AiOutlinePrinter size={20} className='cursor-pointer' />
                            <span>প্রিন্ট করুন</span>
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}