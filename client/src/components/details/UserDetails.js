import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react'
import dateGenerator from '../../utils/dateGenerator';

export default function UserDetails({user}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
            <Button onClick={onOpen}>Details</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>About {user?.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="p-2">
                        <img src={user?.image?.url} alt={user?.name} className='h-[200px] mx-auto rounded-lg'/>
                        <p className="text-xl font-bold">{user?.name}</p>
                        <p className="">Email : {user?.email} </p>
                        <p className="">Phone : {user?.phone} </p>
                        <p className="">Date of Birth : {dateGenerator(user?.dob)} </p>
                        <p className="">Address : {user?.address?.location},{user?.address?.post_office},{user?.address?.upazilla},{user?.address?.district} </p>
                    </div>
                </ModalBody>

                <ModalFooter className='space-x-2'>
                    <button 
                        className='px-4 py-2 bg-red-500 text-white rounded-md'
                        onClick={()=>{}}
                    >
                        Delete
                    </button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
        
    )
}