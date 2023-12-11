import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react'
import axios from "axios"
import { useState } from "react"
import { toast } from 'react-hot-toast'
import handleChange from "../../utils/handleChange"
import useServiceStore from '../../features/serviceStore'
import api_url from '../../utils/apiUrl'
import useUserStore from '../../features/userStore'

export default function UpdateSpecialist({ id, updateView, setUpdateView }) {
    const { specialists,process,processing } = useServiceStore()
    const { reload } = useUserStore()
    const [value, setValue] = useState(specialists.find(s => s._id === id))

    async function updateSpecialist() {
        processing(true)
        try{
            const res = await axios.put(`${api_url}/api/specialist/${value._id}`, value, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if (res.data.status === 200) {
                processing(false)
                toast.success('Updated added')
                reload()
                setUpdateView(!updateView)
            }
        }catch{
            processing(false)
            toast.success('Something went wrong.')
        }
    }
    return (
        <>
            <Modal isOpen={updateView}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className='font-bangla'>হালনাগাদ করন </ModalHeader>
                    <ModalBody>
                        <div className="p-2 space-y-2 font-bangla">
                            <label>বিশেষজ্ঞ বিষয় :</label>
                            <input type='text' name='name' value={value?.name} onChange={(e) => handleChange(e, value, setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2' />
                        </div>
                    </ModalBody>

                    <ModalFooter className='space-x-2 font-bangla'>
                        <button 
                            onClick={() => setUpdateView(!updateView)} 
                            className='py-2 px-6 bg-gray-500 text-white rounded-md'
                        >
                            বাতিল
                        </button>
                        <button
                            onClick={() => updateSpecialist()}
                            className='py-2 px-6 font-bangla bg-green-400 text-white rounded-md'
                        >
                            { process ? 'কাজ হচ্ছে...' : 'নিশ্চিত'}
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}