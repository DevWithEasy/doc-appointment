import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { AiFillEdit } from "react-icons/ai"
import useUserStore from "../../features/userStore"
import { updateChamber } from "../../utils/doctors_utils"
import handleChange from "../../utils/handleChange"

export default function UpdateChamber(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {reload} = useUserStore()
    const {doctor,chamber} = props
    const [value,setValue] = useState(chamber)
    
    return(
        <>
            <button 
                onClick={onOpen}
                className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                <AiFillEdit/>
                {/* <span>Update</span> */}
            </button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Update Chamber</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="p-2 space-y-2">
                        <label>Hospital / Clinic /Diagnostic Name</label>
                        <input type='text' name='vanue' value={value?.vanue} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                        <label>Location</label>
                        <input type='text' name='location' value={value?.location} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                        <label>Appointment Limit</label>
                        <input type='number' name='appointment_limit' value={value?.appointment_limit} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
                        <div className="space-y-2">
                            <div className="w-full space-y-1">
                                <label className="block">Service Day and Time : </label>
                                <select name='day' value={value?.day} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'>
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
                                    <input value={value?.from} type="time" name='from' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
                                </div>
                                <div className=" space-y-1">
                                    <label>End Time :</label>
                                    <input value={value?.to} type="time" name='to' onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-1.5 border rounded focus:outline-none focus:ring-2'/>
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
                        onClick={()=>updateChamber(doctor._id,value,reload,onClose)} 
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