import axios from "axios"
import { useState } from "react"
import { toast } from 'react-hot-toast'
import { BiImageAdd } from "react-icons/bi"
import { FiUploadCloud } from 'react-icons/fi'
import { RxCrossCircled } from "react-icons/rx"
import useUserStore from "../features/userStore"

export default function Upload(props){
    const [startUpload,setStartUpload] = useState(false)
    const {user,reload} = useUserStore()
    const {upload,setUpload} = props
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
    async function uploadPhoto(){
        setStartUpload(!startUpload)
        const formData = new FormData()
        formData.append('file',file)
        formData.append('filename',file.name)
        const res = await axios.post(`/api/auth/upload/${user?._id}`,formData,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        if(res.data.success === true){
            reload()
            setUpload(!upload)
            toast.success('Profile Photo uploaded successfully')
            setStartUpload(!startUpload)
        }else{
            toast.success('Profile Photo uploaded failed')
            setStartUpload(!startUpload)
        }
    }
    return (
        <div className="absolute -top-2 left-0 w-full h-screen bg-gray-500/50 flex justify-center items-center z-10">
            <div className="relative w-11/12 md:w-1/2 p-4 bg-white shadow-md rounded">
                <RxCrossCircled onClick={()=>setUpload(!upload)} size={25} className="absolute bg-white text-red-400 rounded-full -top-4 -right-4 cursor-pointer"/>
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
                <div className="flex justify-center items-center py-2">
                    <button onClick={()=>uploadPhoto()} className="flex items-center px-6 py-2 space-x-2 bg-green-400 text-white rounded-full hover:bg-green-500">
                        <BiImageAdd size={20}/>
                        <span>UPLOAD</span>
                    </button>
                </div>
                {/* file upload processing animation */}
                {startUpload && <div className="absolute top-0 left-0 bg-indigo-200/75 w-full h-full flex justify-center items-center">
                    <button className="flex items-center space-x-2 bg-indigo-500 text-white px-4 py-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 animate-spin font-bold">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        <span>Uploading...</span>
                    </button>
                </div>}
            </div>
        </div>
    )
}