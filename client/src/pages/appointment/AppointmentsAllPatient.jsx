import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import AppointmentDetails from "../../components/AppointmentDeatils";
import {
    completeAppointment,
    confirmAppointment,
    getAppointments,
    rejectAppointment,
} from "../../utils/appoimtments_utils";
import dateGenerator from "../../utils/dateGenerator";
import statusColor from "../../utils/statusColor";

export default function AppointmentsAllPatient() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [selected, setSelected] = useState();
  const [view, setView] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const date = dateGenerator(selected);
    setDate(date);
  }, [selected]);

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-center uppercase">
        All appointments
      </h1>
      <hr />
      <div className="relative flex justify-center space-x-2">
        <select
          name="day"
          value={day}
          onChange={(e) => {
            setDay(e.target.value);
            setSelected();
          }}
          className="p-2 border rounded focus:outline-none focus:ring-2"
        >
          <option value="">দিন বাছাই করুন</option>
                    <option value="Saturday">শনিবার</option>
                    <option value="Sunday">রবিবার</option>
                    <option value="Monday">সোমবার</option>
                    <option value="Tuesday">মঙ্গলবার</option>
                    <option value="Wednesday">বুধবার</option>
                    <option value="Thursday">বৃহস্পতিবার</option>
                    <option value="Friday">শুক্রবার</option>
        </select>
        <button
          onClick={() => setView(!view)}
          className="p-2 bg-white border rounded focus:outline-none focus:ring-2"
        >
          {date}
        </button>
        <button
          onClick={() => getAppointments(day, date, setAppointments)}
          className="px-6 bg-blue-400 text-white rounded-md"
        >
          Search
        </button>
        {day && !selected && (
          <div className="absolute top-12 bg-gray-50 rounded-md shadow-md">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
            />
          </div>
        )}
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              নং
            </th>
            <th scope="col" className="px-6 py-3">
              নাম
            </th>
            <th scope="col" className="px-6 py-3">
              লিঙ্গ
            </th>
            <th scope="col" className="px-6 py-3 ">
              ঠিকানা
            </th>
            <th scope="col" className="px-6 py-3 ">
              অবস্থা
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              পদক্ষেপ
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments &&
            appointments
              .filter((appointment) => appointment?.status !== "Canceled")
              .map((appointment, i) => (
                <tr
                  key={appointment._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-4 py-4">{appointment?.appointmentId}</td>
                  <td className="px-6 py-4">{appointment?.patientName}</td>
                  <td className="px-6 py-4">{appointment?.gender}</td>
                  <td className="px-6 py-4">{appointment?.address}</td>
                  <td
                    className={`px-6 py-4 ${statusColor(appointment?.status)}`}
                  >
                    {appointment?.status}
                  </td>
                  <td className="flex space-x-2 justify-center px-6 py-4">
                    <Menu>
                      <MenuButton as={Button}>পদক্ষেপ</MenuButton>
                      <MenuList className="p-2">
                        <MenuItem
                          onClick={() => {
                            setId(appointment?._id);
                            onOpen();
                            setView(true);
                          }}
                          className="p-2 rounded"
                        >
                          বিস্তারিত
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            confirmAppointment(appointment?._id, day, date,setAppointments)
                          }
                          className="p-2 rounded hover:bg-green-500 hover:text-white transition-all duration-300"
                        >
                          নিশ্চিত
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            completeAppointment(appointment?._id, day, date,setAppointments)
                          }
                          className="p-2 rounded hover:bg-blue-500 hover:text-white transition-all duration-300"
                        >
                          সফল
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            rejectAppointment(appointment?._id, day, date,setAppointments)
                          }
                          className="p-2 rounded hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                          বাতিল
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {view && <AppointmentDetails {...{ id, isOpen, onOpen, onClose }} />}
    </div>
  );
}
