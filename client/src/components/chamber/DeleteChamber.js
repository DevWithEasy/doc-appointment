import axios from "axios"
import useUserStore from "../../features/userStore"

export default function DeleteChamber(props){
    const {reload} = useUserStore()
    const {deleteId,chamberDelete,setChamberDelete} = props

    async function deleteChamber(){
        const res = await axios.delete(`/api/doctor/deleteChamber/${deleteId}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            reload()
            setChamberDelete(!chamberDelete)
        }
    }
    return(
        <div className="absolute top-0 left-0 w-full h-screen bg-gray-500/50 flex justify-center items-center">
            <div className="relative w-1/2 bg-white shadow-md rounded">
                <h1 className="text-xl text-center font-bold p-2 border-b">Delete This Chamber</h1>
                    <div className="p-2 space-y-2">
                        <p>You cant back this data.It will parmanently delete from your database.</p>
                    </div>
                    <div className="flex justify-end space-x-2 p-2">
                    <button onClick={()=>setChamberDelete(!chamberDelete)} className='py-2 px-6 bg-gray-400 text-white rounded-md'>Cancel</button>
                    <button onClick={()=>deleteChamber()} className='py-2 px-6 bg-red-400 text-white rounded-md'>Delete</button>
                    </div>
                </div>
            </div>
    )
}