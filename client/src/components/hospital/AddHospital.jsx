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
import useUserStore from "../../features/userStore"
import handleChange from "../../utils/handleChange"
import Input from "../Input"
import { IoMdAddCircleOutline } from 'react-icons/io'
import api_url from '../../utils/apiUrl'

export default function AddHospital() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { reload } = useUserStore()
    const [value, setValue] = useState({
        name: '',
        location: '',
        type: '',
        open: '',
        close: '',
        lat: '',
        long: ''
    })

    async function addHospital() {
        console.log('addHospital')
        const res = await axios.post(`${api_url}/api/vanue/add/`, value, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if (res.data.success) {
            reload()
            onClose()
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
                        নতুন সেবা প্রতিষ্ঠান যোগ করুন
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="p-2 space-y-2 font-bangla">
                            <Input label='প্রতিষ্ঠানের নাম ' type='text' name='name' value={value} setValue={setValue} />
                            <Input label='ঠিকানা ' type='text' name='location' value={value} setValue={setValue} />
                            <div className="w-full space-y-1">
                                <label className="block">প্রতিষ্ঠানের ধরণ  : </label>
                                <select name='type' onChange={(e) => handleChange(e, value, setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'>
                                    <option value="">বাছাই করুন </option>
                                    <option value="hospital">হাসপাতাল </option>
                                    <option value="diagnostic">ডায়নোগষ্টিক সেন্টার </option>
                                    <option value="clinic">ক্লিনিক</option>
                                    <option value="p_chamber">পার্সোনাল চেম্বার</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <div className="space-y-2">
                                    <div className="w-full flex items-center space-x-2">
                                        <div className=" space-y-1">
                                            <label>Lantitude :</label>
                                            <input type="number" name='lat' onChange={(e) => handleChange(e, value, setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2' />
                                        </div>
                                        <div className=" space-y-1">
                                            <label>Longtitude :</label>
                                            <input type="number" name='long' onChange={(e) => handleChange(e, value, setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2' />
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center space-x-2">
                                        <div className=" space-y-1">
                                            <label>খোলার সময়  :</label>
                                            <input type="time" name='open' onChange={(e) => handleChange(e, value, setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2' />
                                        </div>
                                        <div className=" space-y-1">
                                            <label>বন্ধের সময় :</label>
                                            <input type="time" name='close' onChange={(e) => handleChange(e, value, setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2' />
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </ModalBody>

                    <ModalFooter className='space-x-2 font-bangla'>
                        <button onClick={() => addHospital()} className='py-2 px-6 bg-green-400 text-white rounded-md'>নিশ্চিত করুন</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}