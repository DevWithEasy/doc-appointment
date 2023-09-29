import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';
import React from 'react';

const NoBalanceAlert = ({isOpen, onOpen, onClose,navigate}) => {
    const cancelRef = React.useRef()
    return (
        <>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        ব্যালান্স শেষ !
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        আন্তরিকভাবে দুঃখিত,আপনার একাউন্টে পর্যাপ্ত পরিমান টাকা নেই।
                        <br/>
                        অ্যাপয়েন্টমেন্ট করার পুর্বে টাকা যোগ করে নিন।
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        বাতিল
                    </Button>
                    <Button colorScheme='blue' onClick={()=>navigate('/payment/add')} ml={3}>
                        টাকা যোগ করুন
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default NoBalanceAlert;