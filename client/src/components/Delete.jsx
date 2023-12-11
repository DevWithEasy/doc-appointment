import axios from "axios"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import api_url from "../utils/apiUrl"
import useUserStore from "../features/userStore"

export default function Delete({ path, deleteView, setDeleteView }) {
    const { reload } = useUserStore()

    async function deleteChamber() {
        const res = await axios.delete(`${api_url}/api/${path}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if (res.data.status === 200) {
            setDeleteView(!deleteView)
            reload()
        }
    }
    return (
        <>
            <AlertDialog
                isOpen={deleteView}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader className="font-bangla">মুছে ফেলুন ?</AlertDialogHeader>
                    <AlertDialogCloseButton 
                        onClick={()=>setDeleteView(!deleteView)} 
                    />
                    <AlertDialogBody className="font-bangla">
                        মুছে ফেললে এটা ডাটাবেস থেকে চিরতরে মুছে যাবে আর ফিরিয়ে আনতে পারবেন না।
                    </AlertDialogBody>
                    <AlertDialogFooter className="space-x-2 font-bangla">
                        <button 
                            onClick={()=>setDeleteView(!deleteView)} 
                            className='py-2 px-6 bg-gray-500 text-white rounded-md'
                        >
                            নিশ্চিত না
                        </button>
                        <button 
                            onClick={() => deleteChamber()} 
                            className='py-2 px-6 bg-red-500 text-white rounded-md'
                        >
                            নিশ্চিত
                        </button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}