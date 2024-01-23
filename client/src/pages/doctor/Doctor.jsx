import { useEffect, useState } from "react";
import AddChamber from "../../components/chamber/AddChamber";
import useUserStore from "../../features/userStore";
import { getDoctor } from "../../utils/doctors_utils";

import { useNavigate } from 'react-router-dom';
import FindVanue from "../../components/chamber/FindVanue";
import { AppointmentSummery, Chambers, Information } from "../Index";
import AddHospitalByUser from "../../components/chamber/AddHospitalByUser";

export default function Dashboard() {
  const navigate = useNavigate()
  const { random, user } = useUserStore()
  const [doctor, setDoctor] = useState({})
  const [view, setView] = useState(false)
  const [vanue_view, setVanue_View] = useState(false)
  const [addVanue_view, setAddVanue_View] = useState(false)
  const [name, setName] = useState(null)
  const [location, setLocation] = useState(null)
  const [value, setValue] = useState({
    vanue: "",
    day: "",
    limit: 0,
    from: "",
    to: "",
  })

  const handleView = (name) => {
    if (name === 'add') {
      setView(true)
      setVanue_View(false)
      setAddVanue_View(false)
    } else if (name === 'vanue') {
      setView(false)
      setAddVanue_View(false)
      setTimeout(() => setVanue_View(true), 100)
    } else if (name === 'new') {
      setView(false)
      setVanue_View(false)
      setTimeout(() => setAddVanue_View(true), 100)
    }
  }

  useEffect(() => {
    if (!user?.isDoctor) {
      return navigate('/')
    }
    getDoctor(user?._id, setDoctor);
  }, [user?._id, random]);

  return (
    <div className="mx-2 md:w-10/12 md:mx-auto space-y-2">
      <h1 className="text-2xl">Doctor Dashboard</h1>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-4">

        <Information {...{
          doctor, setDoctor
        }} />

        <AppointmentSummery {...{

        }} />

      </div>

      <Chambers {...{
        doctor, handleView
      }} />

      {view &&
        <AddChamber {...{
          id: doctor?._id, name, location,
          value, setValue,
          view, setView, handleView
        }} />
      }
      {vanue_view &&
        <FindVanue {...{
          setName, setLocation, setValue,
          vanue_view, setVanue_View, handleView
        }} />
      }
      {addVanue_view &&
        <AddHospitalByUser {...{
          setName, setLocation, setVanue: setValue,
          addVanue_view, setAddVanue_View, handleView
        }} />
      }
    </div>
  );
}
