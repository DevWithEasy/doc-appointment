import React from 'react';
import D_Input from '../D_Input';
import { toast } from "react-hot-toast";
import { updateDoctor } from '../../utils/doctors_utils';

const Information = ({doctor, setDoctor}) => {
    return (
        <div className="bg-white/50 p-2 shadow rounded-md">
            <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-2">
                <D_Input {...{
                    label: 'নামঃ',
                    name: 'name',
                    c_value: doctor?.name,
                    value: doctor,
                    setValue: setDoctor
                }} />

                <D_Input {...{
                    label: 'ই-মেইলঃ',
                    name: 'email',
                    c_value: doctor?.email,
                    value: doctor,
                    setValue: setDoctor
                }} />

                <D_Input {...{
                    label: 'মোবাইল নাম্বারঃ',
                    name: 'phone',
                    c_value: doctor?.phone,
                    value: doctor,
                    setValue: setDoctor
                }} />

                <D_Input {...{
                    label: 'শিক্ষাগত যোগ্যতাঃ',
                    name: 'education',
                    c_value: doctor?.education,
                    value: doctor,
                    setValue: setDoctor
                }} />

                <D_Input {...{
                    label: 'অভিজ্ঞতার বিষয়ঃ',
                    name: 'specialization',
                    c_value: doctor?.specialization,
                    value: doctor,
                    setValue: setDoctor
                }} />

                <D_Input {...{
                    label: 'অভিজ্ঞতার ক্ষেত্রসমূহঃ',
                    name: 'experienceArea',
                    c_value: doctor?.experienceArea,
                    value: doctor,
                    setValue: setDoctor
                }} />

                <D_Input {...{
                    label: 'মোট অভিজ্ঞতার বছরঃ',
                    name: 'experience',
                    c_value: doctor?.experience,
                    value: doctor,
                    setValue: setDoctor
                }} />

                <D_Input {...{
                    label: 'বর্তমানে কর্মরত আছেনঃ',
                    name: 'designation',
                    c_value: doctor?.designation,
                    value: doctor,
                    setValue: setDoctor
                }} />

                <D_Input {...{
                    label: 'কর্মরত পদবীঃ',
                    name: 'workedAt',
                    c_value: doctor?.workedAt,
                    value: doctor,
                    setValue: setDoctor
                }} />

                <D_Input {...{
                    label: 'সার্ভিস চার্জঃ',
                    name: 'feesPerConsultation',
                    c_value: doctor?.feesPerConsultation,
                    value: doctor,
                    setValue: setDoctor
                }} />
            </div>

            <div className="flex justify-center items-center pt-4">
                <button
                    onClick={() => updateDoctor(doctor, setDoctor, toast)}
                    className="px-6 py-1 bg-green-400 text-white rounded-full hover:bg-green-500"
                >
                    সংরক্ষন করুন
                </button>
            </div>
        </div>
    );
};

export default Information;