import axios from 'axios';
import { useEffect, useState } from 'react';
import api_url from '../../utils/apiUrl';
import Heading from '../../components/Heading';
import { toBengaliNumber } from 'bengali-number';
import AddSpecialist from '../../components/specialist/AddSpecialist';
import UpdateSpecialist from '../../components/specialist/UpdateSpecialist';
import DeleteSpecialist from '../../components/specialist/DeleteSpecialist';

const Specialists = () => {
    const [specialists, setSpecialists] = useState([])
    async function getAllSpecialist() {
        try {
            const res = await axios.get(`${api_url}/api/specialist/`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if (res.data.status === 200) {
                setSpecialists(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllSpecialist()
    }, [])
    return (
        <div>
            <Heading>
                বিশেষজ্ঞ বিষয়
            </Heading>
            <div
                className="p-2"
            >
                <div className="pb-2 flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-2">
                    <input
                        onChange={() => { }}
                        className="w-full md:w-4/12 p-1 border rounded focus:outline-none focus:ring-2"
                        placeholder="সার্চ করুন - নাম /ঠিকানা /ধরণ "
                    />
                    <AddSpecialist />
                </div>
                <table className="w-full">
                    <thead className="bg-gray-300">
                        <tr className="text-center">
                            <td className="p-1">নং</td>
                            <td className="p-1">নাম </td>
                            <td className="p-1">পদক্ষেপ</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            specialists && specialists.map((specialist, i) =>
                                <tr key={i} className='border-b'>
                                    <td className="p-1 text-center">{toBengaliNumber(i + 1)}</td>
                                    <td className="p-1 ">{specialist?.name}</td>
                                    <td className="p-1 text-center space-x-2">
                                        <UpdateSpecialist {...{specialist}}/>
                                        <DeleteSpecialist {...{specialist}}/>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Specialists;