import axios from 'axios';
import { useEffect, useState } from 'react';
import api_url from '../../utils/apiUrl';
import { toBengaliNumber } from 'bengali-number';
import useUserStore from '../../features/userStore';
import { IoMdAddCircleOutline } from 'react-icons/io';
import useServiceStore from '../../features/serviceStore';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import {AddSpecialist, Delete, Heading, Loading, UpdateSpecialist} from '../../components/Index'
import { Link } from 'react-router-dom';

const Specialists = () => {
    const { random } = useUserStore()
    const {addSpecialists,specialists,process,processing} = useServiceStore()
    const [view, setView] = useState(false)
    const [id, setId] = useState('')
    const [updateView, setUpdateView] = useState(false)
    const [deleteView, setDeleteView] = useState(false)
    async function getAllSpecialist() {
        processing(true)
        try {
            const res = await axios.get(`${api_url}/api/specialist/`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            if (res.data.status === 200) {
                processing(false)
                addSpecialists(res.data.data)
            }
        } catch (error) {
            processing(false)
            console.log(error)
        }
    }
    useEffect(() => {
        getAllSpecialist()
    }, [random])

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
                    <button
                        onClick={() => setView(!view)}
                        className="px-2 py-1 flex items-center space-x-1 bg-blue-500 text-white rounded-md"
                    >
                        <IoMdAddCircleOutline size={22} />
                        <span>যোগ করুন </span>
                    </button>
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
                                    <td className="p-1 text-center">{specialist?.name}</td>
                                    <td className="p-1 flex justify-center text-center space-x-2">
                                        <Link
                                            to={`/admin/specialist/update/${specialist?._id}`}
                                        >
                                            <AiFillEdit />
                                        </Link>
                                        <button 
                                            onClick={()=>
                                                {
                                                    setDeleteView(!deleteView),
                                                    setId(specialist._id)
                                                }
                                            } 
                                            className="flex items-center space-x-2 p-1 bg-red-400 text-white rounded hover:bg-red-500"
                                        >
                                            <AiFillDelete />
                                        </button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {view &&
                <AddSpecialist {...{ view, setView }} />
            }
            {updateView &&
                <UpdateSpecialist {...{ id, updateView, setUpdateView }} />
            }
            {deleteView &&
                <Delete {...{ path : '', deleteView, setDeleteView }}/>
            }
            {process && <Loading/>}
            
        </div>
    );
};

export default Specialists;