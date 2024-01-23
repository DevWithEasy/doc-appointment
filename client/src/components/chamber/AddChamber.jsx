import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import useUserStore from "../../features/userStore";
import { addChamber } from "../../utils/doctors_utils";
import handleChange from "../../utils/handleChange";
import Input from "../Input";

export default function AddChamber({ id, value, setValue, view, setView, name, location, handleView }) {
  const { onClose } = useDisclosure()
  const { reload } = useUserStore()
  return (
    <>
      <Modal isOpen={view}
        className='font-bangla'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='font-bangla'>তথ্য গুলো দিয়ে নতুন চেম্বার যোগ করুন </ModalHeader>
          <ModalCloseButton onClick={() => setView(!view)} />
          <ModalBody
            className='font-bangla'
          >
            <div className="p-2 space-y-2">
              <button
                onClick={() => handleView('vanue')}
                className='w-full p-2 bg-gray-50 border rounded focus:outline-none focus:ring-2'
              >
                চেম্বারের স্থান খুঁজুন ও সিলেক্ট করুন
              </button>
              <Input
                label="হাসপাতাল / ক্লিনিক /ডায়ানগস্টিক নাম "
                type="text"
                // name="vanue"
                c_value={name}
                value={value}
                setValue={setValue}
              />
              <Input
                label="ঠিকানা"
                type="text"
                // name="location"
                c_value={location}
                value={value}
                setValue={setValue}
                disabled
              />
              <Input
                label="সর্বোচ্চ অ্যাপয়েন্টমেন্ট"
                type="number"
                name="limit"
                c_value={value?.limit}
                value={value}
                setValue={setValue}
              />
              <div className="space-y-2">
                <div className="w-full space-y-1">
                  <label className="block">দিন ও সময় : </label>
                  <select
                    name="day"
                    c_value={value?.day}
                    onChange={(e) => handleChange(e, value, setValue)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2"
                  >
                    <option value="">দিন বাছাই করুন</option>
                    <option value="Saturday">শনিবার</option>
                    <option value="Sunday">রবিবার</option>
                    <option value="Monday">সোমবার</option>
                    <option value="Tuesday">মঙ্গলবার</option>
                    <option value="Wednesday">বুধবার</option>
                    <option value="Thursday">বৃহস্পতিবার</option>
                    <option value="Friday">শুক্রবার</option>
                  </select>
                </div>
                <div className="w-full flex items-center space-x-2">
                  <Input
                    label="শুরুর সময় "
                    type="time"
                    name="from"
                    c_value={value?.from}
                    value={value}
                    setValue={setValue}
                  />
                  <Input
                    label="শেষ সময়"
                    type="time"
                    name="to"
                    c_value={value?.to}
                    value={value}
                    setValue={setValue}
                  />
                </div>
              </div>
              <div
                className="pt-2 flex justify-end space-x-2"
              >
                <button
                  onClick={() => setView(!view)}
                  className="py-2 px-6 bg-gray-500 text-white rounded-md"
                >
                  বন্ধ করুন
                </button>
                <button
                  onClick={() => addChamber(id, value, reload, onClose)}
                  className="py-2 px-6 bg-blue-500 text-white rounded-md"
                >
                  সাবমিট দিন
                </button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
