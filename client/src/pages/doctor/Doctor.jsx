import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AddChamber from "../../components/chamber/AddChamber";
import ChamberList from "../../components/chamber/ChamberList";
import useUserStore from "../../features/userStore";
import { getDoctor, updateDoctor } from "../../utils/doctors_utils";
import D_Input from "../../components/D_Input";

export default function Dashboard() {
  const { random, user } = useUserStore();
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    getDoctor(user?._id, setDoctor);
  }, [user?._id, random]);

  console.log(doctor.chambers)
  return (
    <div className="mx-2 md:w-10/12 md:mx-auto space-y-2">
      <h1 className="text-2xl">Doctor Dashboard</h1>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-4">
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
      </div>
      <div className="space-y-2 border p-2 shadow rounded-md overflow-x-auto pb-6 bg-white/50">
        <p className="flex justify-between">
          <span className="text-xl">চেম্বারের তালিকা :</span>
          <AddChamber {...{ id: doctor._id }} />
        </p>
        {doctor?.chambers?.length > 0 && (
          <ChamberList
            {...{
              doctor,
            }}
          />
        )}
      </div>
    </div>
  );
}
