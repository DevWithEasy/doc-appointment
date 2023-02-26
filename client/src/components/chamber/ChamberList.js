import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
export default function ChamberList(props){
    const {chambers,setUpdateId,update,setUpdate,setDeleteId,chamberDelete,setChamberDelete} = props
    return (
        <table className="w-full">
            <thead className="bg-slate-400 text-white">
                <td className="text-center p-2">Sl</td>
                <td className="">Vanue</td>
                <td className="text-center">Location</td>
                <td className="text-center">Day</td>
                <td className="text-center">Start Time</td>
                <td className="text-center">End Time</td>
                <td className="text-center">Actions</td>
            </thead>
            <tbody>
                {
                    chambers.map((chamber,i) => 
                        <tr key={chamber._id} className='border-b'>
                            <td className="text-center p-2">{i+1}</td>
                            <td>{chamber.vanue}</td>
                            <td>{chamber.location}</td>
                            <td className="text-center">{chamber.day}</td>
                            <td className="text-center">{chamber.from}</td>
                            <td className="text-center">{chamber.to}</td>
                            <td className="flex justify-center items-center p-2 text-center space-x-2">
                                    <button onClick={()=>{setUpdate(!update);setUpdateId(chamber._id)}} className="flex items-center space-x-2 p-2 bg-blue-400 text-white rounded hover:bg-blue-500">
                                        <AiFillEdit/>
                                        <span>Update</span>
                                    </button>
                                    <button onClick={()=>{setChamberDelete(!chamberDelete);setDeleteId(chamber._id)}}  className="flex items-center space-x-2 p-2 bg-red-400 text-white rounded hover:bg-red-500">
                                        <AiFillDelete/>
                                        <span>Delete</span>
                                    </button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}