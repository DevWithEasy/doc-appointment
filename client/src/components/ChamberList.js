export default function ChamberList({ chambers }) {
  return (
    <div className="overflow-x-auto z-0">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
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
          </tr>
        </thead>
        <tbody>
          {chambers.map((chamber, i) => (
            <tr
              key={i}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-4 py-4">{i + 1}</td>
              <td className="px-6 py-4">{chamber.vanue}</td>
              <td className="px-6 py-4">{chamber.location}</td>
              <td className="px-6 py-4">{chamber.appintment_limit}</td>
              <td className="px-6 py-4">{chamber.day}</td>
              <td className="px-6 py-4">{chamber.from}</td>
              <td className="px-6 py-4">{chamber.to}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
