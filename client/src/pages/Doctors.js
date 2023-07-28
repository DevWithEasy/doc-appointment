import { useEffect, useState } from "react";
import Doctor from "../components/Doctor";
import useUserStore from "../features/userStore";
import { getAllActiveDoctors } from "../utils/doctors_utils";

export default function Doctors() {
  const [specialization, setSpecilaization] = useState("");
  const { doctors, addDoctors } = useUserStore();

  useEffect(() => {
    getAllActiveDoctors(addDoctors);
  }, []);

  console.log(specialization);
  return (
    <div className="mx-2 md:w-10/12 md:mx-auto">
      <h1 className="p-2 text-2xl font-bold text-center uppercase">সকল ডাক্তারগণ</h1>
      <div className="flex justify-end py-2">
        <select
          onChange={(e) => setSpecilaization(e.target.value.toLowerCase())}
          className="p-2 border rounded shadow focus:outline-none focus:ring-2"
        >
          <option value="">সকল অভিজ্ঞতা</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor?.specialization}>
              {doctor.specialization}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border">
        {doctors
          .filter((doctor) =>
            doctor.specialization.toLowerCase().includes(specialization)
          )
          .map((doctor) => (
            <Doctor key={doctor._id} doctor={doctor} />
          ))}
      </div>
    </div>
  );
}
