import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import useUserStore from "../../features/userStore"
import { deleteChamber } from "../../utils/doctors_utils"

export default function DeleteChamber({ s_Chamber, deleteView, setDeleteView }) {
  const { onClose } = useDisclosure()
  const { reload } = useUserStore()

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        onClose={onClose}
        isOpen={deleteView}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete This Chamber?</AlertDialogHeader>
          <AlertDialogCloseButton
            onClick={() => setDeleteView(!deleteView)}
          />
          <AlertDialogBody>
            Are you sure you want to discard all of your chamber?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              onClick={() => setDeleteView(!deleteView)}
            >
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={() => deleteChamber(s_Chamber._id, reload, onClose)}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}