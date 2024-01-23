import React from 'react';

const AppointmentSummery = () => {
    return (
        <div className="bg-white/50 p-2 rounded-md shadow space-y-2">
            <p>
                <span className="font-bold">মাসিক বিবরণী সংক্ষেপঃ </span>
            </p>
            <hr />
            <div className="space-y-1">
                <p className="flex justify-between">
                    <span>সফল অ্যাপয়েন্টমেন্ট সংখ্যা</span>
                    <span>20 টি </span>
                </p>
                <p className="flex justify-between">
                    <span>সফল সংখ্যা অনুযায়ী আয়</span>
                    <span>২০ টাকা </span>
                </p>
            </div>
        </div>
    );
};

export default AppointmentSummery;