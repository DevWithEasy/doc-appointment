import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import axios from 'axios';
import React, { useEffect } from 'react';
import useServiceStore from '../../features/serviceStore';
import api_url from '../../utils/apiUrl';

const FindVanue = ({ setName, setValue, setLocation, vanue_view, setVanue_View, handleView }) => {
    const { hospitals, addHospitals } = useServiceStore()

    const handleSelect = (hospital) => {
        setValue(prev => {
            return {
                ...prev,
                vanue: hospital._id
            }
        })
        setName(hospital.name)
        setLocation(hospital.location)
        handleView('add')
    }

    async function getAllHospitals() {
        try {
            const res = await axios.get(`${api_url}/api/vanue/all`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if (res.data.success) {
                addHospitals(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getAllHospitals()
    }, [])

    return (
        <>
            <Modal isOpen={vanue_view}
                className='font-bangla'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        className='font-bangla'
                    >
                        চেম্বার বাছাই করুন
                    </ModalHeader>
                    <ModalCloseButton onClick={() => setVanue_View(!vanue_view)} />
                    <ModalBody
                        className='font-bangla h-screen overflow-y-auto space-y-2'
                    >
                        <button
                            onClick={() => handleView('new')}
                            className='w-full p-2 bg-gray-50 border rounded focus:outline-none focus:ring-2'
                        >
                            চেম্বারের স্থান না পেলে নতুন যোগ করুন
                        </button>
                        <div
                            className='h-96 w-full space-y-2 bg-white overflow-y-auto'
                        >
                            <input
                                type="text"
                                placeholder='খুঁজুন (নাম ও স্থান)'
                                className='sticky -top-2 w-full p-2 border rounded focus:outline-none focus:ring-2'
                            />
                            <div
                                className='space-y-1 overflow-y-auto'
                            >
                                {
                                    hospitals &&
                                    hospitals.map(hospital =>
                                        <div
                                            key={hospital?._id}
                                            onClick={() => handleSelect(hospital)}
                                            className='p-2 border rounded cursor-pointer'
                                        >
                                            <p
                                                className='font-semibold'
                                            >
                                                {hospital?.name}
                                            </p>
                                            <p
                                                className='text-gray-500'
                                            >
                                                {hospital?.location}
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default FindVanue;