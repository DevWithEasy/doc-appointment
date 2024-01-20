import React, { useState } from 'react';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";

const FindVanue = ({ hospitals, setName, setLocation, setValue, vanue_view, setVanue_View }) => {

    const handleSelect = (hospital) => {
        setValue(prev => {
            return {
                ...prev,
                vanue: hospital._id
            }
        })
        setName(hospital.name)
        setLocation(hospital.location)
        setVanue_View(false)
    }

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
                        className='font-bangla h-screen overflow-y-auto'
                    >
                        <div
                            className='h-80 w-full space-y-2 p-2 bg-white overflow-y-auto'
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