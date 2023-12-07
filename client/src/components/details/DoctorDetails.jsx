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
import { deleteDoctor } from "../../utils/doctors_utils";
import DeleteDoctor from "./DeleteDoctor";
import api_url from "../../utils/apiUrl";

export default function DoctorDetails({ doctor }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className="px-2 py-1 bg-green-500 text-white rounded-md"
      >
        বিস্তারিত
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            className='font-bangla'
          >
            About {doctor?.firstName} {doctor?.lastName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="p-2 space-y-2 font-bangla">
              <img
                src={`${api_url}/${doctor?.user?.image?.url}`}
                alt="doctor_image"
                className="h-[200px] mx-auto rounded-md"
              />
              <p className="">
                Name : {doctor?.firstName} {doctor?.lastName}
              </p>
              <p className="">Email : {doctor?.email} </p>
              <p className="">Phone : {doctor?.phone} </p>
              <p className="">Specialization : {doctor?.specialization}</p>
              <p className="">Experience Area : {doctor?.experienceArea}</p>
              <p className="">Education : {doctor?.education}</p>
              <p className="">Works At : {doctor?.workedAt}</p>
              <p className="">Designation : {doctor?.designation}</p>
              <p className="">
                Fees Per Consultation : {doctor?.feesPerConsultation}
              </p>
              <button
                className={`px-4 py-1 text-white ${
                  doctor?.status === "Pending"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                } rounded-full`}
              >
                {doctor?.status}
              </button>
            </div>
          </ModalBody>

          <ModalFooter className="space-x-2">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={onClose}
            >
              Close
            </button>
            <DeleteDoctor
              {...{
                id: doctor._id,
                deleteHandler: deleteDoctor,
              }}
            >
              Delete
            </DeleteDoctor>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
