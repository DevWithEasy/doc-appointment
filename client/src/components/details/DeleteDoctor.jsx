import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import useUserStore from '../../features/userStore';


const DeleteDoctor = ({children,id,deleteHandler}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {reload} = useUserStore()
    const cancelRef = useRef()
    
    return (
        <>
        <button 
          onClick={onOpen}
          className='p-2 bg-red-500 text-white rounded'
        >
          {children}
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
            <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to discard request?This action will delete the request from the database parmanently.
            </AlertDialogBody>
            <AlertDialogFooter className='space-x-2'>
              <button ref={cancelRef} onClick={onClose} className='px-4 py-2 bg-gray-500 text-white rounded-md'>
                No
              </button>
              <button 
                    className='px-4 py-2 bg-red-500 text-white rounded-md'
                    onClick={()=>deleteHandler(id,reload)}
                >
                    Delete
                </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
};

export default DeleteDoctor;