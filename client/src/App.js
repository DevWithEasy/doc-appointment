import { useRoutes } from 'react-router-dom';
import Admin from './pages/Admin';
import AppliedDoctors from './pages/Admin/Doctors';
import AppliedHospital from './pages/Admin/Hospitals';
import Users from './pages/Admin/Users';
import ApplyDoctor from './pages/ApplyDoctor';
import Appointment from './pages/Appointment';
import Appointments from './pages/Appointments';
import AppointmentsAllPatient from './pages/AppointmentsAllPatient';
import AppointmentsAllPatientSearch from './pages/AppointmentsAllPatientSearch';
import AppointmentSubmit from './pages/AppointmentSubmit';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Home from './pages/Home';
import HospitalDetails from './pages/HospitalDetails';
import Hospitals from './pages/Hospitals';
import Layout from './pages/Layout';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import VerifyAccount from './pages/VerifyAccount';
function App() {
  const routes = useRoutes(
    [
      {
        path : '/',
        element : <Layout/>,
        children : [
          {
            index : true,
            element : <Home/>
          },
          {
            path : '/signup',
            element : <Signup/>
          },
          {
            path : '/signin',
            element : <Signin/>
          },
          {
            path : '/verify',
            element : <VerifyAccount/>
          },
          {
            path : '/profile/:id',
            element : <ProtectedRoute><Profile/></ProtectedRoute>
          },
          {
            path : '/hospitals',
            element : <Hospitals/>
          },
          {
            path : '/doctors',
            element : <Doctors/>
          },
          {
            path : '/apply-doctor',
            element : <ProtectedRoute><ApplyDoctor/></ProtectedRoute>
          },
          {
            path : '/hospital/:id',
            element : <HospitalDetails/>
          },
          {
            path : '/appointment',
            element : <Appointment/>
          },
          {
            path : '/appointment-submit/:id',
            element : <ProtectedRoute><AppointmentSubmit/></ProtectedRoute>
          },
          {
            path : '/appointments',
            element : <ProtectedRoute><Appointments/></ProtectedRoute>
          },
          {
            path : '/notification',
            element : <ProtectedRoute><Notification/></ProtectedRoute>,
          },
          {
            path : '/doctor/dashboard',
            element : <ProtectedRoute><Dashboard/></ProtectedRoute>
          },
          {
            path : '/doctor/allAppointments',
            element : <ProtectedRoute><AppointmentsAllPatient/></ProtectedRoute>
          },
          {
            path : '/doctor/allAppointments/search',
            element : <ProtectedRoute><AppointmentsAllPatientSearch/></ProtectedRoute>
          },
          {
            path : '/admin',
            element : <ProtectedRoute><Admin/></ProtectedRoute>,
          },
          {
            path : '/admin/users',
            element : <ProtectedRoute><Users/></ProtectedRoute>,
          },
          {
            path : '/admin/doctors',
            element : <ProtectedRoute><AppliedDoctors/></ProtectedRoute>,
          },
          {
            path : '/admin/hospitals',
            element : <ProtectedRoute><AppliedHospital/></ProtectedRoute>,
          },
        ]
      }
    ]
  )
  return routes
}

export default App;
