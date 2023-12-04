import UpdateChamber from "./UpdateChamber";
import DeleteChamber from "./DeleteChamber";
import dayNameBangla from "../../utils/dayNameBangla";
export default function ChamberList({ doctor }) {
  
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-gray-500 dark:text-gray-400">
        <thead className="text-white bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              নং
            </th>
            <th scope="col" className="px-6 py-3">
              চেম্বারের স্থান
            </th>
            <th scope="col" className="px-6 py-3">
              ঠিকানা
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              সর্বোচ্চ অ্যাপয়েন্টমেন্ট
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              বার
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              শুরু
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              শেষ
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              পদক্ষেপ
            </th>
          </tr>
        </thead>
        <tbody>
          {doctor?.chambers.map((chamber, i) => (
            <tr
              key={chamber._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-4 py-4">{i + 1}</td>
              <td className="px-6 py-4">{chamber.vanue}</td>
              <td className="px-6 py-4">{chamber.location}</td>
              <td className="px-6 py-4 text-center">{chamber.appointment_limit}</td>
              <td className="px-6 py-4">{dayNameBangla(chamber.day)}</td>
              <td className="px-6 py-4">{chamber.from}</td>
              <td className="px-6 py-4">{chamber.to}</td>
              <td className="px-6 py-4 flex justify-center items-center p-2 text-center space-x-2">
                <UpdateChamber {...{ doctor, chamber }} />
                <DeleteChamber {...{ doctor, chamber }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
