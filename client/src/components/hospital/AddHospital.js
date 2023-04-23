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

export default function AddHospital(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {add,setAdd} = props
    const {reload} = useUserStore()
    const [file,setFile] = useState()
    const [image,setImage] = useState()
    const [value,setValue] = useState({
        name : '',
        location : '',
        image : '',
        type : '',
        open : '',
        close : '',
        lat : '',
        long : ''
    })
    const handleFile = (e)=>{
        setFile(e.target.files[0])
        const fileReader = new FileReader()
        fileReader.onload =(e)=>{
            setImage(e.target.result)
        }
        fileReader.readAsDataURL(e.target.files[0])
    }
    async function addHospital(){
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
        const res = await axios.post(`/api/hospital/add/`,formData,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        console.log(res.data);
        if(res.data.status === 200){
            reload()
            setAdd(!add)
            toast.success('Successfully added')
        }
    }
    return(

<>
    <button onClick={onOpen} className="p-2 flex items-center space-x-1 bg-green-400 text-white rounded-md">
        <IoMdAddCircleOutline size={22}/>
        <span>Add Hospitals</span>
    </button>

<Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
    <ModalHeader>Add new Hospital</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
    <div className="p-2 space-y-2">
                    <Input label='Hospital / Clinic /Diagnostic Name' type='text' name='name' value={value} setValue={setValue}/>
                    <Input label='Location' type='text' name='location' value={value} setValue={setValue}/>
                    <div className="w-full space-y-1">
                            <label className="block">Organisation Type : </label>
                            <select name='type' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'>
                                <option value="">Select type</option>
                                <option value="Hospital">Hospital</option>
                                <option value="Dainogostic Center">Dainogostic Center</option>
                                <option value="Clinic">Clinic</option>
                                <option value="Personal Chember">Personal Chember</option>
                            </select>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="space-y-2">
                            <label>Hospital Image :</label>
                            <input type='file' onChange={(e)=>handleFile(e)} className="w-full border p-1 rounded-md"/>
                            <div className="w-full flex items-center space-x-2">
                                <div className=" space-y-1">
                                    <label>Lantitude :</label>
                                    <input type="number" name='lat' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                                <div className=" space-y-1">
                                    <label>Longtitude :</label>
                                    <input type="number" name='long' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                            </div>
                            <div className="w-full flex items-center space-x-2">
                                <div className=" space-y-1">
                                    <label>Start Time :</label>
                                    <input type="time" name='open' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                                <div className=" space-y-1">
                                    <label>End Time :</label>
                                    <input type="time" name='close' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                            </div>
                            
                        </div>
                        <div className="flex justify-center items-center">
                            {image && <img src={image} alt='user_image' className="h-[180px] mx-auto rounded-md"/>}
                        </div>
                    </div>
                    
                </div>
    </ModalBody>

    <ModalFooter className='space-x-2'>
        <button onClick={()=>addHospital()} className='py-2 px-6 bg-green-400 text-white rounded-md'>Submit</button>
    </ModalFooter>
    </ModalContent>
</Modal>
</>
    )
}