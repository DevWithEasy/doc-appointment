import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import axios from "axios"
import { useState } from "react"
import { toast } from 'react-hot-toast'
import Input from "../Input"
import useUserStore from '../../features/userStore'
import api_url from '../../utils/apiUrl'


export default function AddSpecialist({view,setView}) {
    const {reload} = useUserStore()
    const [value, setValue] = useState({
        name: ''
    })

    async function addSpecialist() {
        const res = await axios.post(`${api_url}/api/specialist/`, value, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if (res.data.status === 200) {
            reload()
            toast.success(res.data.message)
        }
    }
    return (

        <>
            <Modal isOpen={view}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className='font-bangla'>
                        বিশেষজ্ঞ বিষয় যোগ করুন
                    </ModalHeader>
                    <ModalCloseButton onClick={()=>setView(!view)}/>
                    <ModalBody>
                        <div className="p-2 space-y-2 font-bangla">
                            <Input 
                                label='বিশেষজ্ঞ বিষয় ' 
                                type='text' 
                                name='name'
                                c_value={value.name}
                                value={value} 
                                setValue={setValue} 
                                />
                        </div>
                    </ModalBody>

                    <ModalFooter className='space-x-2'>
                        <button 
                            onClick={() => addSpecialist()} 
                            className='py-2 px-6 font-bangla bg-blue-500 text-white rounded-md'
                        >
                            নিশ্চিত করুন
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}