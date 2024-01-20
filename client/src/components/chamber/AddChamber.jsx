import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useUserStore from "../../features/userStore";
import { addChamber } from "../../utils/doctors_utils";
import handleChange from "../../utils/handleChange";
import Input from "../Input";
import FindVanue from "./FindVanue";
import useServiceStore from "../../features/serviceStore";
import api_url from "../../utils/apiUrl";
import axios from "axios";

export default function AddChamber({ id, view, setView }) {
  const { onClose } = useDisclosure()
  const { hospitals, addHospitals } = useServiceStore()
  const { reload } = useUserStore()
  const [vanue_view, setVanue_View] = useState(false)
  const [hospital_view, setHospital_View] = useState(false)
  const [name, setName] = useState(null)
  const [location, setLocation] = useState(null)
  const [value, setValue] = useState({
    vanue: "",
    day: "",
    appointment_limit: 0,
    from: "",
    to: "",
  })

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
            {vanue_view &&
              <FindVanue {...{
                hospitals, setName, setLocation, setValue, vanue_view, setVanue_View,hospital_view, setHospital_View
              }} />
            }
            {!vanue_view &&
              <div className="p-2 space-y-2">
                <button
                  onClick={() => setVanue_View(true)}
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
                      <option value="Wednesday">বুধবার</option>
                      <option value="Thursday">বৃহস্পতিবার</option>
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
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
