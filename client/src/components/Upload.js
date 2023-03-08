import { useState } from "react"
import { BiImageAdd } from "react-icons/bi"
import { FiUploadCloud } from 'react-icons/fi'
import { RxCrossCircled } from "react-icons/rx"

export default function Upload(props){
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
    console.log(image);
    return (
        <div className="absolute -top-2 left-0 w-full h-screen bg-gray-500/50 flex justify-center items-center z-10">
            <div className="relative w-1/2 p-4 bg-white shadow-md rounded">
                <RxCrossCircled onClick={()=>setUpload(!upload)} size={25} className="absolute bg-white text-red-400 rounded-full -top-4 -right-4 cursor-pointer"/>
                {image && <img src={image} alt='user_image'/>}
                <label htmlFor="image" className="flex justify-center items-center my-2 p-4 space-x-3 border-2 border-dashed rounded-md cursor-pointer">
                    <FiUploadCloud size={30}/>
                    <p className="text-center">
                        <span className='text-xl font-bold text-blue-400'>Browse Here</span>
                        <br/>
                        <span className="text-gray-300 text-sm">support file jpg,jpeg,png</span>
                    </p>
                </label>
                <input type="file" id="image" onChange={(e)=>handleFile(e)} className='hidden'/>
                <div className="flex justify-center items-center py-2">
                    <button className="flex items-center px-6 py-2 space-x-2 bg-green-400 text-white rounded-full hover:bg-green-500">
                        <BiImageAdd size={20}/>
                        <span>UPLOAD</span>
                    </button>
                </div>
            </div>
        </div>
    )
}