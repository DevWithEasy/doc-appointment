import UpdateChamber from './UpdateChamber';
import DeleteChamber from './DeleteChamber';
export default function ChamberList({doctor}){
    
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            Sl
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Vanue
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Limit
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Day
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            From
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            To
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {doctor?.chambers.map((chamber,i)=> <tr key={chamber._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-4 py-4">
                            {i+1}
                        </td>
                        <td className="px-6 py-4">
                            {chamber.vanue}
                        </td>
                        <td className="px-6 py-4">
                            {chamber.location}
                        </td>
                        <td className="px-6 py-4">
                            {chamber.appointment_limit}
                        </td>
                        <td className="px-6 py-4">
                            {chamber.day}
                        </td>
                        <td className="px-6 py-4">
                            {chamber.from}
                        </td>
                        <td className="px-6 py-4">
                            {chamber.to}
                        </td>
                        <td className="px-6 py-4 flex justify-center items-center p-2 text-center space-x-2">
                            <UpdateChamber {...{doctor,chamber}}/>
                            <DeleteChamber {...{doctor,chamber}}/>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>

    )
}