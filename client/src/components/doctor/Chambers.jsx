import React from 'react';
import { ChamberList } from '../Index';
import { IoMdAddCircleOutline } from 'react-icons/io';

const Chambers = ({doctor,handleView}) => {
    return (
        <div className="space-y-2 border p-2 shadow rounded-md overflow-x-auto pb-6 bg-white/50">
            <p className="flex justify-between">
                <span className="text-xl">চেম্বারের তালিকা :</span>
                <button
                    onClick={() => handleView('add')}
                    className="px-2 py-1 flex items-center space-x-1 bg-green-400 text-white rounded-md"
                >
                    <IoMdAddCircleOutline size={22} />
                    <span>চেম্বার যোগ করুন</span>
                </button>
            </p>
            {doctor?.chambers?.length > 0 && (
                <ChamberList
                    {...{
                        doctor,
                    }}
                />
            )}
        </div>
    );
};

export default Chambers;