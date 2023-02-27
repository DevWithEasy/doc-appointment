import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
export default function ChamberList(props){
    const {chambers,setUpdateId,update,setUpdate,setDeleteId,chamberDelete,setChamberDelete} = props
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    {chambers.map((chamber,i)=> <tr key={chamber._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                            {chamber.day}
                        </td>
                        <td className="px-6 py-4">
                            {chamber.from}
                        </td>
                        <td className="px-6 py-4">
                            {chamber.to}
                        </td>
                        <td className="px-6 py-4 flex justify-center items-center p-2 text-center space-x-2">
                            <button onClick={()=>{setUpdate(!update);setUpdateId(chamber._id)}} className="flex items-center space-x-2 p-2 bg-blue-400 text-white rounded hover:bg-blue-500">
                                        <AiFillEdit/>
                                        <span>Update</span>
                            </button>
                            <button onClick={()=>{setChamberDelete(!chamberDelete);setDeleteId(chamber._id)}}  className="flex items-center space-x-2 p-2 bg-red-400 text-white rounded hover:bg-red-500">
                                        <AiFillDelete/>
                                        <span>Delete</span>
                            </button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>

    )
}