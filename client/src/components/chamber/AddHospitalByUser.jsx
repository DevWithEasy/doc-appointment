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
import useUserStore from "../../features/userStore"
import handleChange from "../../utils/handleChange"
import Input from "../Input"
import api_url from '../../utils/apiUrl'

export default function AddHospitalByUser({setName, setLocation,setVanue,addVanue_view, setAddVanue_View,handleView}) {
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
        try {
            const res = await axios.post(`${api_url}/api/vanue/add/`, value, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if (res.data.success) {
                reload()
                setAddVanue_View(!addVanue_view)
                setVanue(prev => {
                    return {
                        ...prev,
                        vanue: res?.data?.data?._id
                    }
                })
                setName(res?.data?.data?.name)
                setLocation(res?.data?.data?.location)
                toast.success('Successfully added')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <>
            <Modal isOpen={addVanue_view}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className='font-bangla'>
                        নতুন সেবা প্রতিষ্ঠান যোগ করুন
                    </ModalHeader>
                    <ModalCloseButton onClick={()=>{
                        setAddVanue_View(!addVanue_view),
                        handleView('vanue')
                    }}/>
                    <ModalBody>
                        <div className="p-2 space-y-2 font-bangla">
                            <Input {...{
                                label: 'প্রতিষ্ঠানের নাম ',
                                name: 'name',
                                c_value: value?.name,
                                value, setValue
                            }}
                            />
                            <Input {...{
                                label: 'ঠিকানা ',
                                type: 'text',
                                name: 'location',
                                c_value: value?.location,
                                value, setValue
                            }}
                            />

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

                            <div className="grid md:grid-cols-2 md:gap-x-2 space-y-2 md:space-y-0">
                                <Input {...{
                                    label: 'Lantitude ',
                                    name: 'lat',
                                    type: 'number',
                                    c_value: value?.lat,
                                    value, setValue
                                }}
                                />
                                <Input {...{
                                    label: 'Longtitude ',
                                    name: 'long',
                                    type: 'number',
                                    c_value: value?.long,
                                    value, setValue
                                }}
                                />
                                <Input {...{
                                    label: 'খোলার সময় ',
                                    name: 'open',
                                    type: 'time',
                                    c_value: value?.open,
                                    value, setValue
                                }}
                                />
                                <Input {...{
                                    label: 'বন্ধের সময় ',
                                    name: 'close',
                                    type: 'time',
                                    c_value: value?.close,
                                    value, setValue
                                }}
                                />
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