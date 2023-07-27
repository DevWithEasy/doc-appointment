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

  return (
    <div className="mx-2 md:w-10/12 md:mx-auto space-y-2">
      <h1 className="text-2xl">Doctor Dashboard</h1>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-4">
        <div className="bg-white/50 p-2 shadow rounded-md">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="firstName"
              value={doctor?.firstName}
              onChange={(e) => handleChange(e, doctor, setDoctor)}
              className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={doctor?.lastName}
              onChange={(e) => handleChange(e, doctor, setDoctor)}
              className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
              placeholder="Last Name"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="email"
              name="email"
              value={doctor?.email}
              onChange={(e) => handleChange(e, doctor, setDoctor)}
              className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              value={doctor?.phone}
              onChange={(e) => handleChange(e, doctor, setDoctor)}
              className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
              placeholder="Phone number"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="education"
              value={doctor?.education}
              onChange={(e) => handleChange(e, doctor, setDoctor)}
              className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
              placeholder="Email"
            />
            <input
              type="text"
              name="specialization"
              value={doctor?.specialization}
              onChange={(e) => handleChange(e, doctor, setDoctor)}
              className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
              placeholder="Phone number"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="experienceArea"
              value={doctor?.experienceArea}
              onChange={(e) => handleChange(e, doctor, setDoctor)}
              className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
              placeholder="Experience areas"
            />
            <input
              type="text"
              name="experience"
              value={doctor?.experience}
              onChange={(e) => handleChange(e, doctor, setDoctor)}
              className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
              placeholder="Total experience year"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="designation"
              value={doctor?.designation}
              onChange={(e) => handleChange(e, doctor, setDoctor)}
              className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
              placeholder="Now working as a"
            />
            <input
              type="text"
              name="workedAt"
              value={doctor?.workedAt}
              onChange={(e) => handleChange(e, doctor, setDoctor)}
              className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
              placeholder="Now working at"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="feesPerConsultation"
              value={doctor?.feesPerConsultation}
              onChange={(e) => handleChange(e, doctor, setDoctor)}
              className="md:w-1/2 w-full p-2 border-b focus:outline-none focus:border-blue-300"
              placeholder="Now working as a"
            />
          </div>
          <div className="flex justify-center items-center pt-4">
            <button
              onClick={() => updateDoctor(doctor, setDoctor, toast)}
              className="px-6 py-2 bg-green-400 text-white rounded-full hover:bg-green-500"
            >
              Save
            </button>
          </div>
        </div>
        <div className="bg-white/50 p-2 rounded-md shadow space-y-2">
          <p className="flex justify-between">
            <span className="font-bold">Total Appointment</span>
            <span>20</span>
          </p>
          <hr />
          <div className="space-y-1">
            <p className="flex justify-between">
              <span>Success Appointment</span>
              <span>20</span>
            </p>
            <p className="flex justify-between">
              <span>Reject Appointment</span>
              <span>20</span>
            </p>
            <p className="flex justify-between">
              <span>Cancel Appointment</span>
              <span>20</span>
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2 border p-2 shadow rounded-md overflow-x-auto pb-6">
        <p className="flex justify-between">
          <span className="text-xl">Chamber Lists :</span>
          <AddChamber {...{ id: doctor._id }} />
        </p>
        {doctor.firstName && (
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
