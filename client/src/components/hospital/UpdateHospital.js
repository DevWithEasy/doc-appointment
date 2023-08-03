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
import { AiFillEdit } from 'react-icons/ai'

export default function UpdateHospital({hospital}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {reload} = useUserStore()
    const [file,setFile] = useState()
    const [image,setImage] = useState()
    const [value,setValue] = useState(hospital)
    const handleFile = (e)=>{
        setFile(e.target.files[0])
        const fileReader = new FileReader()
        fileReader.onload =(e)=>{
            setImage(e.target.result)
        }
        fileReader.readAsDataURL(e.target.files[0])
    }

    async function updateHospital(){
        const formData = new FormData()
        formData.append('file',file)
        formData.append('name',value.name)
        formData.append('location',value.location)
        formData.append('image',value.image)
        formData.append('type',value.type)
        formData.append('open',value.open)
        formData.append('close',value.close)
        formData.append('lat',value.lat)
        formData.append('long',value.long)
        const res = await axios.put(`/api/hospital/update/${hospital._id}`,formData,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.status === 200){
            reload()
            onClose()
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
                    <label>প্রতিষ্ঠানের নাম :</label>
                    <input type='text' name='name' value={value?.name} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                    
                    <label>ঠিকানা :</label>
                    <input type='text' name='location' value={value?.location} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>

                    <div className="w-full space-y-1">
                            <label className="block">প্রতিষ্ঠানের ধরণ : </label>
                            <select name='type' value={value?.type} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'>
                            <option value="">বাছাই করুন </option>
                                <option value="Hospital">হাসপাতাল </option>
                                <option value="Dainogostic Center">ডায়নোগষ্টিক সেন্টার </option>
                                <option value="Clinic">ক্লিনিক</option>
                                <option value="Personal Chember">পার্সোনাল চেম্বার</option>
                            </select>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="space-y-2">
                            <label>প্রতিষ্ঠানের ছবি :</label>
                            <input type='file' onChange={(e)=>handleFile(e)} className="w-full border p-1 rounded-md"/>
                            <div className="w-full flex items-center space-x-2">
                                <div className=" space-y-1">
                                    <label>Lantitude :</label>
                                    <input type="number" name='lat' value={Number(value?.lat)} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                                <div className=" space-y-1">
                                    <label>Longtitude :</label>
                                    <input type="number" name='long' value={Number(value?.long)} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                            </div>
                            <div className="w-full flex items-center space-x-2">
                                <div className=" space-y-1">
                                    <label>খোলার সময় :</label>
                                    <input type="time" name='open' value={value?.open} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                                <div className=" space-y-1">
                                    <label>বন্ধের সময় :</label>
                                    <input type="time" name='close' value={value?.close} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                            </div>
                            
                        </div>
                        <div className="flex justify-center items-center">
                            {image && <img src={image} alt='user_image' className="h-[180px] mx-auto rounded-md"/>}
                            {!image && <img src={hospital?.image} alt='user_image' className="h-[180px] mx-auto rounded-md"/>}
                        </div>
                    </div>
                    
                </div>
            </ModalBody>

            <ModalFooter className='space-x-2 font-bangla'>
            <button onClick={onClose} className='py-2 px-6 bg-gray-500 text-white rounded-md'>বাতিল</button>
                <button onClick={()=>updateHospital()} className='py-2 px-6 bg-green-400 text-white rounded-md'>হালনাগাদ</button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    )
}