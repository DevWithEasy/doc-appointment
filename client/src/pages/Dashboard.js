import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AddChamber from "../components/chamber/AddChamber";
import ChamberList from "../components/chamber/ChamberList";
import useUserStore from "../features/userStore";
import { getDoctor, updateDoctor } from "../utils/doctors_utils";
import handleChange from "../utils/handleChange";

export default function Dashboard() {
  const { random, user } = useUserStore();
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    getDoctor(user?._id, setDoctor);
  }, [user?._id, random]);
  console.log(doctor.chambers);
  return (
    <div className="mx-2 md:w-10/12 md:mx-auto space-y-2">
      <h1 className="text-2xl">Doctor Dashboard</h1>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-4">
        <div className="bg-white/50 p-2 shadow rounded-md">
          <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-2">
            <div>
              <label>নামঃ</label>
              <input
                type="text"
                name="name"
                value={doctor?.name}
                onChange={(e) => handleChange(e, doctor, setDoctor)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="নাম"
              />
            </div>

            <div>
              <label>ই-মেইলঃ</label>
              <input
                type="email"
                name="email"
                value={doctor?.email}
                onChange={(e) => handleChange(e, doctor, setDoctor)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="ই-মেইল"
              />
            </div>
            <div>
              <label>মোবাইল নাম্বারঃ</label>
              <input
                type="text"
                name="phone"
                value={doctor?.phone}
                onChange={(e) => handleChange(e, doctor, setDoctor)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="মোবাইল নাম্বার"
              />
            </div>
            <div>
              <label>শিক্ষাগত যোগ্যতাঃ</label>
              <input
                type="text"
                name="education"
                value={doctor?.education}
                onChange={(e) => handleChange(e, doctor, setDoctor)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="শিক্ষাগত যোগ্যতা"
              />
            </div>
            <div>
              <label>অভিজ্ঞতার বিষয়ঃ</label>
              <input
                type="text"
                name="specialization"
                value={doctor?.specialization}
                onChange={(e) => handleChange(e, doctor, setDoctor)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="অভিজ্ঞতার বিষয়"
              />
            </div>
            <div>
              <label>অভিজ্ঞতার ক্ষেত্রসমূহঃ</label>
              <input
                type="text"
                name="experienceArea"
                value={doctor?.experienceArea}
                onChange={(e) => handleChange(e, doctor, setDoctor)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="অভিজ্ঞতার ক্ষেত্রসমূহ"
              />
            </div>
            <div>
              <label>মোট অভিজ্ঞতার বছরঃ</label>
              <input
                type="text"
                name="experience"
                value={doctor?.experience}
                onChange={(e) => handleChange(e, doctor, setDoctor)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder=" মোট অভিজ্ঞতার বছর"
              />
            </div>
            <div>
              <label>বর্তমানে কর্মরত আছেনঃ</label>
              <input
                type="text"
                name="designation"
                value={doctor?.designation}
                onChange={(e) => handleChange(e, doctor, setDoctor)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="বর্তমানে কর্মরত আছেন"
              />
            </div>
            <div>
              <label>কর্মরত পদবীঃ</label>
              <input
                type="text"
                name="workedAt"
                value={doctor?.workedAt}
                onChange={(e) => handleChange(e, doctor, setDoctor)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="কর্মরত পদবী"
              />
            </div>
            <div>
              <label>সার্ভিস চার্জঃ</label>
              <input
                type="text"
                name="feesPerConsultation"
                value={doctor?.feesPerConsultation}
                onChange={(e) => handleChange(e, doctor, setDoctor)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="সার্ভিস চার্জ"
              />
            </div>
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
        {doctor.name && (
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
