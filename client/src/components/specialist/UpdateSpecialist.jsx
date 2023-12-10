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
import handleChange from "../../utils/handleChange"
import { AiFillEdit } from 'react-icons/ai'

export default function UpdateSpecialist({specialist}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [value,setValue] = useState(specialist)

    async function updateSpecialist(){
        const res = await axios.put(`/api/hospital/update/${specialist._id}`,value,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            toast.success('Updated added') 
        }
    }
    return(
        <>
        <button onClick={onOpen} className="flex items-center space-x-2 p-1 bg-blue-400 text-white rounded hover:bg-blue-500">
            <AiFillEdit/>
        </button>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader className='font-bangla'>হালনাগাদ করন {value?.name} </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <div className="p-2 space-y-2 font-bangla">
                    <label>বিশেষজ্ঞ বিষয় :</label>
                    <input type='text' name='name' value={value?.name} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                </div>
            </ModalBody>

            <ModalFooter className='space-x-2 font-bangla'>
            <button onClick={onClose} className='py-2 px-6 bg-gray-500 text-white rounded-md'>বাতিল</button>
                <button onClick={()=>updateSpecialist()} className='py-2 px-6 font-bangla bg-green-400 text-white rounded-md'>হালনাগাদ</button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    )
}