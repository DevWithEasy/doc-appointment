import axios from "axios"
import useUserStore from "../../features/userStore"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    AlertDialogCloseButton,
  } from '@chakra-ui/react'
import { useRef } from "react"
import { AiFillDelete } from "react-icons/ai"

export default function DeleteHospital({hospital}){
    const {reload} = useUserStore()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    async function deleteChamber(){
        const res = await axios.delete(`/api/hospital/delete/${hospital._id}`,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            reload()
        }
    }
    return(
        <>
        <button onClick={onOpen} className="flex items-center space-x-2 p-2 bg-red-400 text-white rounded hover:bg-red-500">
            <AiFillDelete/>
            <span>Delete</span>
        </button>
        <AlertDialog
          motionPreset='slideInBottom'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>Delete This Chamber?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
                You cant back this data.It will parmanently delete from your database.
            </AlertDialogBody>
            <AlertDialogFooter className="space-x-2">
              <button ref={cancelRef} onClick={onClose} className='py-2 px-6 bg-gray-400 text-white rounded-md'>
                No
              </button>
              <button onClick={()=>deleteChamber()} className='py-2 px-6 bg-red-400 text-white rounded-md'>Delete</button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
}