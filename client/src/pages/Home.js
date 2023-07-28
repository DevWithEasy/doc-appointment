import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllActiveDoctors } from "../utils/doctors_utils";
import { BsSearch } from "react-icons/bs";
import Doctor from "../components/Doctor";
import useUserStore from "../features/userStore";

export default function Home() {
  const navigate = useNavigate();
  const { isAuth,doctors, addDoctors } = useUserStore();
  const [query, setQuery] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [day, setDay] = useState("");

  const daysOfWeek = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  useEffect(() => {
    getAllActiveDoctors(addDoctors);
  }, [addDoctors]);

  
  return (
    <div>
      <div className="text-center space-y-2 mb-5">
        <h1 className="text-3xl font-semibold">
          ডাক্তার খুঁজুন , অ্যাপয়েন্টমেন্ট নিন
        </h1>
        <p className="text-gray-600">ঠাকুরগাঁও জেলার সকল উপজেলার</p>
        <p className="text-gray-600">
          সকল ডাক্তার হাসপাতাল এবং এম্বুলেন্স খুঁজুন
        </p>
        {!isAuth &&
          <div className="pt-5 space-x-2">
            <input
              type="email"
              onChange={() => {}}
              placeholder="ইমেইল অ্যাড্রেস"
              className="p-1 border border-gray-400 bg-[#f8f8f8] focus:bg-white focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              onChange={() => {}}
              placeholder="পাসওয়ার্ড"
              className="p-1 border border-gray-400 bg-[#f8f8f8] focus:bg-white focus:outline-none focus:border-blue-500"
            />
            <button className="px-6 py-1 bg-red-500 text-white border border-red-500">
              প্রবেশ করুন
            </button>
          </div>
        }
      </div>
      <hr />
      <div className="mx-2 md:w-10/12 md:mx-auto">
        <div className="w-full flex flex-col md:flex-row md:justify-between ">
          <div className="w-full md:w-4/12">
            <div className="flex flex-col-reverse md:flex-col md:w-8/12 space-y-3 md:pt-5">
              <div className="space-y-2 mt-5 md:mt-0">
                <label className="font-semibold"> খুঁজুন </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="নাম দিয়ে খুঁজুন"
                    className="w-full p-1.5 border border-gray-400 bg-[#f8f8f8] focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                  <button className="px-4 py-[10px] bg-black text-white border border-black">
                    <BsSearch />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-semibold">অ্যাপয়েন্টমেন্ট খুঁজুন</label>
                <select
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full p-2 text-sm  border border-gray-400  bg-[#f8f8f8] focus:bg-[#f8f8f8] focus:outline-none focus:border-blue-500"
                >
                  <option>অভিজ্ঞতা বাছাই করুন</option>
                  {doctors &&
                    doctors
                      .map((doctor) => doctor?.specialization)
                      .map((specialization, i) => (
                        <option key={i} value={specialization}>
                          {specialization}
                        </option>
                      ))}
                </select>
                <select
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full p-2 text-sm  border border-gray-400  bg-[#f8f8f8] focus:bg-[#f8f8f8] focus:outline-none focus:border-blue-500"
                >
                  <option>বার বাছাই করুন</option>
                  {daysOfWeek &&
                    daysOfWeek
                      .map((day) => day)
                      .map((day, i) => (
                        <option key={i} value={day}>
                          {day}
                        </option>
                      ))}
                </select>
                <button
                  onClick={() =>
                    navigate(
                      `/appointment/find?specialization=${specialization}&day=${day}`
                    )
                  }
                  className="px-6 py-1 bg-black text-white border border-black"
                >
                  খুঁজুন
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-8/12 mt-5 md:mt-0 border-l overflow-y">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-t md:border-none">
              {doctors &&
                doctors
                  .filter((doctor) =>
                    doctor.name.toLowerCase().includes(query)
                  )
                  .map((doctor) => (
                    <Doctor key={doctor?._id} {...{ doctor }} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
