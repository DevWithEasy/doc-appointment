import { toBengaliNumber } from 'bengali-number';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import useUserStore from '../../features/userStore';
import AppointmentStatusBangla from '../../utils/AppointmentStatusBangla';
import { cancelAppointment } from '../../utils/appoimtments_utils';
import dayNameBangla from '../../utils/dayNameBangla';

const AppointmentsCardView = ({ appointments,setAppointments, setView, setId }) => {
    const { user } = useUserStore()
    return (
        <div
            className='md:hidden m-2 space-y-2'
        >
            {
                appointments && appointments.map(appointment =>
                    <div
                        key={appointment._id}
                        className='p-4 bg-white rounded'
                    >
                        <p>
                            <span
                                className='font-bold'
                            >
                                রোগীর নামঃ
                            </span>
                            <span>
                                &nbsp;
                                {appointment?.patientName}
                            </span>
                        </p>
                        <p>
                            <span
                                className='font-bold'
                            >
                                ঠিকানাঃ
                            </span>
                            <span>
                                &nbsp;
                                {appointment?.address}
                            </span>
                        </p>
                        <p>
                            <span
                                className='font-bold'
                            >
                                অ্যাপয়েন্টম্যান্টঃ
                            </span>
                            <span>
                                &nbsp;
                                {dayNameBangla(appointment?.appointmentDay)}
                            </span>
                        </p>
                        <p>
                            <span
                                className='font-bold'
                            >
                                অবস্থাঃ
                            </span>
                            <span>
                                &nbsp;
                                {AppointmentStatusBangla(appointment?.status)}
                            </span>
                        </p>
                        <p>
                            <span
                                className='font-bold'
                            >
                                সিরিয়াল নংঃ
                            </span>
                            <span>
                                &nbsp;
                                {toBengaliNumber(appointment?.appointmentId)}
                            </span>
                        </p>
                        <div
                            className='pt-2 space-x-2'
                        >
                            <button
                                onClick={() => { setId(appointment?._id); setView(true) }}
                                className="px-2 py-1 bg-green-400 text-white rounded hover:bg-green-500"
                            >
                                বিস্তারিত
                            </button>
                            <button onClick={() => cancelAppointment(appointment._id, user, toast,setAppointments)} className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500">বাতিল</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default AppointmentsCardView;