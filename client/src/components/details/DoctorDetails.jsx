import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import api_url from "../../utils/apiUrl";
import useServiceStore from "../../features/serviceStore";

export default function DoctorDetails({ id, view, setView }) {
  const { doctors } = useServiceStore()
  const doctor = doctors.find(d => d._id === id)
  console.log(doctor)
  return (
    <>
      <Modal isOpen={view} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            className='font-bangla'
          >
            {doctor?.name} সম্পর্কে বিস্তারিত
          </ModalHeader>
          <ModalCloseButton onClick={() => setView(!view)} />
          <ModalBody
            className="flex space-x-2"
          >
            <div
              className="flex flex-col items-center space-y-2"
            >
              <img
                src={`${api_url}/${doctor?.user?.image?.url}`}
                alt="doctor_image"
                className="h-[150px] w-[150px] mx-auto rounded-md hover:scale-[2] hover:transition-all hover:duration-300"
              />
              <button
                className={`px-4 py-1 text-white ${doctor?.status === "Pending"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                  } rounded-full`}
              >
                {doctor?.status}
              </button>
            </div>
            <div className="font-bangla">
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td className='px-2'> : </td>
                    <td>{doctor?.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td className='px-2'> : </td>
                    <td>{doctor?.email}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td className='px-2'> : </td>
                    <td>{doctor?.phone}</td>
                  </tr>
                  <tr>
                    <td>Specialization</td>
                    <td className='px-2'> : </td>
                    <td>{doctor?.specialization}</td>
                  </tr>
                  <tr>
                    <td>Experience Area</td>
                    <td className='px-2'> : </td>
                    <td>{doctor?.experienceArea}</td>
                  </tr>
                  <tr>
                    <td>Education</td>
                    <td className='px-2'> : </td>
                    <td>{doctor?.education}</td>
                  </tr>
                  <tr>
                    <td>Works At</td>
                    <td className='px-2'> : </td>
                    <td>{doctor?.workedAt}</td>
                  </tr>
                  <tr>
                    <td>Designation</td>
                    <td className='px-2'> : </td>
                    <td>{doctor?.designation}</td>
                  </tr>
                  <tr>
                    <td>Consultation Fee</td>
                    <td className='px-2'> : </td>
                    <td>{doctor?.feesPerConsultation} টাকা</td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          </ModalBody>

          <ModalFooter className="space-x-2">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={() => setView(!view)}
            >
              Close
            </button>
            {/* <DeleteDoctor
              {...{
                id: doctor._id,
                deleteHandler: deleteDoctor,
              }}
            >
              Delete
            </DeleteDoctor> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
