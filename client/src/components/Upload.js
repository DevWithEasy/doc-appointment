import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useDisclosure,
} from '@chakra-ui/react'
import { useState } from "react"
import { toast } from 'react-hot-toast'
import { BiImageAdd } from "react-icons/bi"
import { FiUploadCloud } from 'react-icons/fi'
import useUserStore from "../features/userStore"
import { uploadPhoto } from '../utils/users_utils'

export default function Upload(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading,setLoading] = useState(false)
    const {user,reload} = useUserStore()
    const [file,setFile] = useState()
    const [image,setImage] = useState()
    const handleFile = (e)=>{
        setFile(e.target.files[0])
        const fileReader = new FileReader()
        fileReader.onload =(e)=>{
            setImage(e.target.result)
        }
        fileReader.readAsDataURL(e.target.files[0])
    }

    return (
        <>
        <button 
            onClick={onOpen}
            className="flex items-center px-6 py-2 space-x-2 bg-green-400 text-white rounded-full hover:bg-green-500"
        >
            <BiImageAdd size={20}/>
            <span>UPLOAD</span>
        </button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Upload profile picture</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {image && <img src={image} alt='user_image' className="h-[250px] mx-auto rounded-md"/>}
                <label htmlFor="image" className="flex justify-center items-center my-2 p-2 space-x-3 border-2 border-dashed rounded-md cursor-pointer">
                    <FiUploadCloud size={30}/>
                    <p className="text-center">
                        <span className='text-xl font-bold text-blue-400'>Browse Here</span>
                        <br/>
                        <span className="text-gray-300 text-sm">support file jpg,jpeg,png</span>
                    </p>
                </label>
                <input type="file" id="image" onChange={(e)=>handleFile(e)} className='hidden'/>
                {!loading && <div className="flex justify-center items-center py-2">
                    <button onClick={()=>uploadPhoto(user,file,reload,setLoading,toast)} className="flex items-center px-6 py-2 space-x-2 bg-green-400 text-white rounded-full hover:bg-green-500">
                        <BiImageAdd size={20}/>
                        <span>UPLOAD</span>
                    </button>
                </div>}
                {/* file upload processing animation */}
                {loading && <div className="flex justify-center items-center">
                    <button className="flex items-center space-x-2 bg-indigo-500 text-white px-4 py-2 rounded-md">
                        <Spinner/>
                        <span>Uploading...</span>
                    </button>
                </div>}
            </ModalBody>
        </ModalContent>
        </Modal>
        </>
    )
}