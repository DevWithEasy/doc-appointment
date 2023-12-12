import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import dateGenerator from "../../utils/dateGenerator";
import useServiceStore from "../../features/serviceStore";
import api_url from "../../utils/apiUrl";

export default function UserDetails({ id,view,setView }) {
  const { users } = useServiceStore()
  const user = users.find(u => u._id === id)
  return (
    <>
      

      <Modal isOpen={view} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user?.name} সম্পর্কে বিস্তারিত</ModalHeader>
          <ModalCloseButton onClick={()=>setView(!view)}/>
          <ModalBody
            className="flex space-x-2"
          >
            <div
              className="flex flex-col items-center space-y-2"
            >
              <img
                src={`${api_url}/${user?.image?.url}`}
                alt={user?.name}
                className="h-[150px] w-[150px] mx-auto rounded-md hover:scale-[2] hover:transition-all hover:duration-300"
              />
            </div>
            <div className="font-bangla">
              <table>
                <tbody>
                <tr>
                    <td>Name</td>
                    <td className='px-2'> : </td>
                    <td>{user?.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td className='px-2'> : </td>
                    <td>{user?.email}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td className='px-2'> : </td>
                    <td>{user?.phone}</td>
                  </tr>
                  <tr>
                    <td>Date of Birth</td>
                    <td className='px-2'> : </td>
                    <td>{dateGenerator(user?.dob)}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td className='px-2'> : </td>
                    <td>{user?.address?.location},{user?.address?.post_office}
                ,{user?.address?.upazilla},{user?.address?.district}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ModalBody>

          <ModalFooter className="space-x-2">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={() => {}}
            >
              Delete
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
