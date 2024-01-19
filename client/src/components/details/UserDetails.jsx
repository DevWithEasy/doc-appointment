import { useState } from "react";
import { useParams } from 'react-router-dom';
import useServiceStore from "../../features/serviceStore";
import api_url from "../../utils/apiUrl";
import dateGenerator from "../../utils/dateGenerator";
import Heading from "../Heading";

export default function UserDetails() {
  const { id } = useParams()
  const { users } = useServiceStore()
  const [user, setUser] = useState(users.find(u => u._id === id))
  return (
    <div
      className="h-full overflow-y-auto"
    >
      <Heading>
        ব্যবহারকারী
      </Heading>
      <div
        className="p-2 space-y-2"
      >
        <img
          src={`${api_url}/${user?.image?.url}`}
          alt={user?.name}
          className="h-[150px] w-[150px] mx-auto rounded-full hover:transition-all hover:duration-300"
        />
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
      </div>

    </div>
  );
}
