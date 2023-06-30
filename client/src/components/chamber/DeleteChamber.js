import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"
import { AiFillDelete } from "react-icons/ai"
import useUserStore from "../../features/userStore"
import { deleteChamber } from "../../utils/doctors_utils"

export default function DeleteChamber(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const {reload} = useUserStore()
    const {doctor,chamber} = props

    return(
            <>
                <button 
                    onClick={onOpen}
                    className="flex items-center space-x-2 p-2 bg-red-400 text-white rounded hover:bg-red-500"
                >
                    <AiFillDelete/>
                    {/* <span>Delete</span> */}
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
                      Are you sure you want to discard all of your chamber?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        No
                      </Button>
                      <Button colorScheme='red' ml={3} onClick={()=>deleteChamber(doctor._id,chamber._id,reload,onClose)}>
                        Yes
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </>
    )
}