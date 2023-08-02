import { useRoutes } from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import AppliedDoctors from './pages/Admin/Doctors';
import AppliedHospital from './pages/Admin/Hospitals';
import Users from './pages/Admin/Users';
import ApplyDoctor from './pages/ApplyDoctor';
import Appointment from './pages/Appointment';
import AppointmentSubmit from './pages/AppointmentSubmit';
import Appointments from './pages/Appointments';
import AppointmentsAllPatient from './pages/AppointmentsAllPatient';
import AppointmentsAllPatientSearch from './pages/AppointmentsAllPatientSearch';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import ForgetPassword from './pages/ForgetPassword';
import Home from './pages/Home';
import HospitalDetails from './pages/HospitalDetails';
import Hospitals from './pages/Hospitals';
import Layout from './pages/Layout';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import ResetPassword from './pages/ResetPassword';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import VerifyAccount from './pages/VerifyAccount';
import AddBalance from './pages/payment/AddBalance';
import Success from './pages/payment/Success';
import Failure from './pages/payment/Failure';
import NotFound from './pages/NotFound';
import Payments from './pages/Payments';
import AppointmentFind from './pages/AppointmentFind';
import AdminDashboard from './pages/Admin/AdminDashboard';
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
            path : '/forget_password',
            element : <ForgetPassword/>
          },
          {
            path : '/password_reset',
            element : <ResetPassword/>
          },
          {
            path : '/verify',
            element : <VerifyAccount/>
          },
          {
            path : '/profile/:id',
            element : <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
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
            path : '/apply_doctor',
            element : <ProtectedRoute>
              <ApplyDoctor/>
            </ProtectedRoute>
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
            path : '/appointment/find',
            element : <AppointmentFind/>
          },
          {
            path : '/appointment_submit/:id',
            element : <ProtectedRoute>
              <AppointmentSubmit/>
            </ProtectedRoute>
          },
          {
            path : '/appointments',
            element : <ProtectedRoute>
              <Appointments/>
            </ProtectedRoute>
          },
          {
            path : '/notification',
            element : <ProtectedRoute>
              <Notification/>
            </ProtectedRoute>,
          },
          {
            path : '/doctor/dashboard',
            element : <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          },
          {
            path : '/doctor/allAppointments',
            element : <ProtectedRoute>
              <AppointmentsAllPatient/>
            </ProtectedRoute>
          },
          {
            path : '/doctor/allAppointments/search',
            element : <ProtectedRoute>
              <AppointmentsAllPatientSearch/>
            </ProtectedRoute>
          },
          {
            path : '/admin',
            element : <ProtectedRoute>
              <Admin>
                <AdminDashboard/>
              </Admin>
            </ProtectedRoute>,
          },
          {
            path : '/admin/users',
            element : <ProtectedRoute>
              <Admin>
              <Users/>
              </Admin>
            </ProtectedRoute>,
          },
          {
            path : '/admin/doctors',
            element : <ProtectedRoute>
              <Admin>
              <AppliedDoctors/>
              </Admin>
            </ProtectedRoute>,
          },
          {
            path : '/admin/hospitals',
            element : <ProtectedRoute>
              <Admin>
              <AppliedHospital/>
              </Admin>
            </ProtectedRoute>,
          },
          {
            path : '/payments/',
            element : <ProtectedRoute>
              <Payments/>
            </ProtectedRoute>
          },
          {
            path : '/payment/add',
            element : <ProtectedRoute>
              <AddBalance/>
            </ProtectedRoute>
          },
          {
            path : '/payment/success',
            element : <Success/>
          },
          {
            path : '/payment/failure',
            element : <Failure/>
          },
          {
            path : '/*',
            element : <NotFound/>
          }
        ]
      },

    ]
  )
  return routes
}

export default App;
