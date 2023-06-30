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
                        Non Sufficient Balance !
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Sorry you have no sufficient balance in your account.
                        <br/>
                        Please add balance to make appointment.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='blue' onClick={()=>navigate('/payment/add')} ml={3}>
                        Add balance
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default NoBalanceAlert;