import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import useUserStore from "../../features/userStore";
import { addChamber } from "../../utils/doctors_utils";
import handleChange from "../../utils/handleChange";
import Input from "../Input";

export default function AddChamber({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { reload } = useUserStore();
  const [value, setValue] = useState({
    vanue: "",
    location: "",
    day: "",
    appointment_limit: 0,
    from: "",
    to: "",
  });
  return (
    <>
      <button
        onClick={onOpen}
        className="px-2 py-1 flex items-center space-x-1 bg-green-400 text-white rounded-md"
      >
        <IoMdAddCircleOutline size={22} />
        <span>চেম্বার যোগ করুন</span>
      </button>

      <Modal isOpen={isOpen} onClose={onClose} className='font-bangla'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='font-bangla'>তথ্য গুলো দিয়ে নতুন চেম্বার যোগ করুন </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            className='font-bangla'
          >
            <div className="p-2 space-y-2">
              <Input
                label="হাসপাতাল / ক্লিনিক /ডায়ানগস্টিক নাম "
                type="text"
                name="vanue"
                value={value}
                setValue={setValue}
              />
              <Input
                label="ঠিকানা"
                type="text"
                name="location"
                value={value}
                setValue={setValue}
              />
              <Input
                label="সর্বোচ্চ অ্যাপয়েন্টমেন্ট"
                type="number"
                name="appointment_limit"
                value={value}
                setValue={setValue}
              />
              <div className="space-y-2">
                <div className="w-full space-y-1">
                  <label className="block">দিন ও সময় : </label>
                  <select
                    name="day"
                    onChange={(e) => handleChange(e, value, setValue)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2"
                  >
                    <option value="">দিন বাছাই করুন</option>
                    <option value="Saturday">শনিবার</option>
                    <option value="Sunday">রবিবার</option>
                    <option value="Monday">সোমবার</option>
                    <option value="Tuesday">মঙ্গলবার</option>
                    <option value="WednesDay">বুধবার</option>
                    <option value="Thusday">বৃহস্পতিবার</option>
                    <option value="Friday">শুক্রবার</option>
                  </select>
                </div>
                <div className="w-full flex items-center space-x-2">
                  <div className=" space-y-1">
                    <label>শুরুর সময় :</label>
                    <input
                      type="time"
                      name="from"
                      onChange={(e) => handleChange(e, value, setValue)}
                      className="w-full p-1.5 border rounded focus:outline-none focus:ring-2"
                    />
                  </div>
                  <div className=" space-y-1">
                    <label>শেষ সময় :</label>
                    <input
                      type="time"
                      name="to"
                      onChange={(e) => handleChange(e, value, setValue)}
                      className="w-full p-1.5 border rounded focus:outline-none focus:ring-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="space-x-2">
            <button
              onClick={onClose}
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
