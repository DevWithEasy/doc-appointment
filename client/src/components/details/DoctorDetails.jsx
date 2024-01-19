import { useState } from "react";
import { useParams } from 'react-router-dom';
import useServiceStore from "../../features/serviceStore";
import api_url from "../../utils/apiUrl";
import Heading from "../Heading";

export default function DoctorDetails() {
  const { id } = useParams()
  const { doctors } = useServiceStore()
  const [doctor, setDoctor] = useState(doctors.find(d => d._id === id))

  return (
    <div
      className="h-full overflow-y-auto"
    >
      <Heading>
        ডাক্তার
      </Heading>
      <div
        className="p-2"
      >
      <div
        className="flex flex-col items-center space-y-2"
      >
        <img
          src={`${api_url}/${doctor?.user?.image?.url}`}
          alt="doctor_image"
          className="h-[150px] w-[150px] mx-auto rounded-full hover:transition-all hover:duration-300"
        />
        <button
          className={`px-4 py-1 text-white ${doctor?.status === "Pending"
            ? "bg-yellow-500"
            : "bg-green-500"
            } rounded-full`}
        >
          {doctor?.status}
        </button>
      </div>
      <div className="font-bangla">
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td className='px-2'> : </td>
              <td>{doctor?.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td className='px-2'> : </td>
              <td>{doctor?.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td className='px-2'> : </td>
              <td>{doctor?.phone}</td>
            </tr>
            <tr>
              <td>Specialization</td>
              <td className='px-2'> : </td>
              <td>{doctor?.specialization}</td>
            </tr>
            <tr>
              <td>Experience Area</td>
              <td className='px-2'> : </td>
              <td>{doctor?.experienceArea}</td>
            </tr>
            <tr>
              <td>Education</td>
              <td className='px-2'> : </td>
              <td>{doctor?.education}</td>
            </tr>
            <tr>
              <td>Works At</td>
              <td className='px-2'> : </td>
              <td>{doctor?.workedAt}</td>
            </tr>
            <tr>
              <td>Designation</td>
              <td className='px-2'> : </td>
              <td>{doctor?.designation}</td>
            </tr>
            <tr>
              <td>Consultation Fee</td>
              <td className='px-2'> : </td>
              <td>{doctor?.feesPerConsultation} টাকা</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
