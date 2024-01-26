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
import { AiFillEdit } from "react-icons/ai";
import useUserStore from "../../features/userStore";
import { updateChamber } from "../../utils/doctors_utils";
import handleChange from "../../utils/handleChange";
import Input from "../Input";

export default function UpdateChamber({ s_Chamber, updateView, setUpdateView }) {
  const { onClose } = useDisclosure();
  const { reload } = useUserStore();
  const [value, setValue] = useState(s_Chamber);

  return (
    <>
      <Modal isOpen={updateView}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="font-bangla">চেম্বার আপডেট</ModalHeader>
          <ModalCloseButton onClick={() => setUpdateView(!updateView)} />
          <ModalBody>
            <div className="p-2 space-y-2 font-bangla">
              <Input
                label="হাসপাতাল / ক্লিনিক /ডায়ানগস্টিক নাম "
                type="text"
                // name="vanue"
                c_value={value?.vanue?.name}
                value={value}
                setValue={setValue}
              />

              <Input
                label="ঠিকানা"
                type="text"
                // name="location"
                c_value={value?.vanue?.location}
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
                    value={value?.day}
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
            </div>
          </ModalBody>

          <ModalFooter className="space-x-2 font-bangla">
            <button
              onClick={() => setUpdateView(!updateView)}
              className="py-2 px-6 bg-gray-500 text-white rounded-md"
            >
              বাতিল
            </button>
            <button
              onClick={() => updateChamber(doctor._id, value, reload, onClose)}
              className="py-2 px-6 bg-blue-500 text-white rounded-md"
            >
              সাবমিট
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
