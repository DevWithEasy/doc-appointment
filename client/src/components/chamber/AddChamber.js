import axios from "axios"
import { useState } from "react"
import useUserStore from "../../features/userStore"
import handleChange from "../../utils/handleChange"
import Input from "../Input"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { IoMdAddCircleOutline } from "react-icons/io"

export default function AddChamber({id}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {reload} = useUserStore()
    const [value,setValue] = useState({
        vanue : '',
        location : '',
        day : '',
        from : '',
        to : ''
    })
    async function addChamber(id,value,onClose){
        const res = await axios.post(`/api/doctor/addChamber/${id}`,value,{
            headers : {
                authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        })

        if(res.data.status === 200){
            reload()
            onClose()
        }
    }
    return(
        <>
            <button 
                onClick={onOpen}
                className="p-2 flex items-center space-x-1 bg-green-400 text-white rounded-md"
            >
                <IoMdAddCircleOutline size={22}/>
                <span>Add Chamber</span>
            </button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Add Chamber With Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="p-2 space-y-2">
                        <Input label='Hospital / Clinic /Diagnostic Name' type='text' name='vanue' value={value} setValue={setValue}/>
                        <Input label='Location' type='text' name='location' value={value} setValue={setValue}/>
                        <div className="space-y-2">
                            <div className="w-full space-y-1">
                                <label className="block">Service Day and Time : </label>
                                <select name='day' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'>
                                    <option value="">Select Day</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="WednesDay">WednesDay</option>
                                    <option value="Thusday">Thusday</option>
                                    <option value="Friday">Friday</option>
                                </select>
                            </div>
                            <div className="w-full flex items-center space-x-2">
                                <div className=" space-y-1">
                                    <label>Start Time :</label>
                                    <input type="time" name='from' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                                <div className=" space-y-1">
                                    <label>End Time :</label>
                                    <input type="time" name='to' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter className="space-x-2">
                    <button 
                        onClick={onClose}
                        className='py-2 px-6 bg-gray-500 text-white rounded-md'
                    >
                        Close
                    </button>
                    <button 
                        onClick={()=>addChamber(id,value,onClose)} 
                        className='py-2 px-6 bg-blue-500 text-white rounded-md'
                    >
                        Submit
                    </button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}