import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react'
import axios from "axios"
import { useState } from "react"
import { toast } from 'react-hot-toast'
import Input from "../Input"
import { IoMdAddCircleOutline } from 'react-icons/io'

export default function AddSpecialist(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [value, setValue] = useState({
        name: ''
    })

    async function addSpecialist() {
        const res = await axios.post(`/api/specialist/`, value, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        console.log(res.data);
        if (res.data.status === 200) {
            toast.success('Successfully added')
        }
    }
    return (

        <>
            <button onClick={onOpen} className="px-2 py-1 flex items-center space-x-1 bg-green-400 text-white rounded-md">
                <IoMdAddCircleOutline size={22} />
                <span>যোগ করুন </span>
            </button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className='font-bangla'>
                        বিশেষজ্ঞ বিষয় যোগ করুন
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="p-2 space-y-2 font-bangla">
                            <Input label='বিশেষজ্ঞ বিষয় ' type='text' name='name' value={value} setValue={setValue} />
                        </div>
                    </ModalBody>

                    <ModalFooter className='space-x-2'>
                        <button onClick={() => addSpecialist()} className='py-2 px-6 font-bangla bg-green-400 text-white rounded-md'>নিশ্চিত করুন</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}