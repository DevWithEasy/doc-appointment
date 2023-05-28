import React, { useState } from 'react';
import {
    Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,useDisclosure,Button, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Radio, RadioGroup, Stack
  } from '@chakra-ui/react'
import bkash from '../assets/images/how_to_pay/BKash_Logo.png'
import nagad from '../assets/images/how_to_pay/Nagad_Logo.png'
import howToPay from '../assets/data/howtopay';

const HowtoAddBalance = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [payment,setPayment] = useState('bkash')
    const [payBy,setPayBy] = useState('ussd')

    function handlePaymentHelp(payment,payBy){
      setPayment(payment)
      setPayBy(payBy)
    }

    return (
        <>
      <button onClick={onOpen}>How to Add Balance</button>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How to add balance</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs position="relative" variant="unstyled">
                <TabList>
                    <Tab onClick={()=>handlePaymentHelp('bkash','ussd')} className='space-x-2'>
                        <img src={bkash} alt='bkash' className='h-6'/>
                        <span>Bkash</span>
                    </Tab>
                    <Tab onClick={()=>handlePaymentHelp('nagad','ussd')} className='space-x-2'>
                        <img src={nagad} alt='nagad' className='h-6'/>
                        <span>Nagad</span>
                    </Tab>
                </TabList>
                <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
                />
                <TabPanels>
                    <TabPanel>
                      <RadioGroup onChange={setPayBy} value={payBy}>
                        <Stack direction='row' mb='5' spacing={10}>
                          <Radio value='ussd'>USSD</Radio>
                          <Radio value='app'>APP</Radio>
                        </Stack>
                      </RadioGroup>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {howToPay.filter(pay => pay.payment_option === payment && pay.pay_by === payBy).map(pay=><img key={pay.id} src={pay.image} alt='bkash' className='rounded-md'/>)}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <RadioGroup onChange={setPayBy} value={payBy}>
                          <Stack direction='row' mb='5' spacing={10}>
                            <Radio value='ussd'>USSD</Radio>
                            <Radio value='app'>APP</Radio>
                          </Stack>
                        </RadioGroup>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {howToPay.filter(pay => pay.payment_option === payment && pay.pay_by === payBy).map(pay=><img key={pay.id} src={pay.image} alt='bkash' className='rounded-md'/>)}
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    );
};

export default HowtoAddBalance;