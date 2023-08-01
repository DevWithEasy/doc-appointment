import { useEffect, useState } from "react";
import Doctor from "../components/Doctor";
import useUserStore from "../features/userStore";
import { getAllActiveDoctors } from "../utils/doctors_utils";

export default function Doctors() {
  const { doctors, addDoctors } = useUserStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllActiveDoctors(addDoctors);
  }, [addDoctors]);

  return (
    <div className="mx-2 md:w-10/12 md:mx-auto">
      <h1 className="p-2 text-2xl font-bold text-center uppercase">
        সকল ডাক্তারগণ
      </h1>
      <div className="flex justify-end items-cente py-2 space-x-2">
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="নাম দিয়ে খুঁজুন"
          className="p-1.5 border focus:bg-white focus:outline-none focus:border-blue-500 rounded-md"
        />
        <select
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          className="p-2 border rounded focus:outline-none focus:ring-2"
        >
          <option value="">সকল অভিজ্ঞতা</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor?.specialization}>
              {doctor.specialization}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {doctors
          .filter((doctor) =>
            doctor.specialization.toLowerCase().includes(query) ||
            doctor.name.toLowerCase().includes(query)
          )
          .map((doctor) => (
            <Doctor key={doctor._id} doctor={doctor} />
          ))}
      </div>
    </div>
  );
}
