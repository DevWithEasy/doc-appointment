import { useRoutes } from 'react-router-dom';
import { Admin, AppliedDoctors, AppointmentsAllPatient, AppliedHospital, Users, ApplyDoctor, Appointment, AppointmentSubmit, Appointments, AppointmentsAllPatientSearch, Doctor, Doctors, ForgetPassword, Home, HospitalDetails, Hospitals, Layout, Notification, Profile, ProtectedRoute, ResetPassword, Signin, Signup, VerifyAccount, AddBalance, Success, Failure, NotFound, Payments, AppointmentFind, Dashboard, Specialists, BillPayments } from './pages/Index'
import { DoctorDetails, UpdateHospital, UpdateSpecialist, UserDetails } from './components/Index';

function App() {
  const routes = useRoutes(
    [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: '/signup',
            element: <Signup />
          },
          {
            path: '/signin',
            element: <Signin />
          },
          {
            path: '/forget_password',
            element: <ForgetPassword />
          },
          {
            path: '/password_reset',
            element: <ResetPassword />
          },
          {
            path: '/verify',
            element: <VerifyAccount />
          },
          {
            path: '/profile/:id',
            element: <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          },
          {
            path: '/hospitals',
            element: <Hospitals />
          },
          {
            path: '/doctors',
            element: <Doctors />
          },
          {
            path: '/apply_doctor',
            element: <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>
          },
          {
            path: '/hospital/:id',
            element: <HospitalDetails />
          },
          {
            path: '/appointment',
            element: <Appointment />
          },
          {
            path: '/appointment/find',
            element: <AppointmentFind />
          },
          {
            path: '/appointment_submit/:id',
            element: <ProtectedRoute>
              <AppointmentSubmit />
            </ProtectedRoute>
          },
          {
            path: '/appointments',
            element: <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          },
          {
            path: '/notification',
            element: <ProtectedRoute>
              <Notification />
            </ProtectedRoute>,
          },
          {
            path: '/doctor/',
            element: <ProtectedRoute>
              <Doctor />
            </ProtectedRoute>
          },
          {
            path: '/doctor/allAppointments',
            element: <ProtectedRoute>
              <AppointmentsAllPatient />
            </ProtectedRoute>
          },
          {
            path: '/doctor/allAppointments/search',
            element: <ProtectedRoute>
              <AppointmentsAllPatientSearch />
            </ProtectedRoute>
          },
          {
            path: '/admin/dashboard',
            element: <ProtectedRoute>
              <Admin>
                <Dashboard />
              </Admin>
            </ProtectedRoute>,
          },
          {
            path: '/admin/users',
            element: <ProtectedRoute>
              <Admin>
                <Users />
              </Admin>
            </ProtectedRoute>,
          },
          {
            path: '/admin/user/:id',
            element: <ProtectedRoute>
              <Admin>
                <UserDetails />
              </Admin>
            </ProtectedRoute>,
          },
          {
            path: '/admin/specialists',
            element: <ProtectedRoute>
              <Admin>
                <Specialists />
              </Admin>
            </ProtectedRoute>,
          },
          {
            path: '/admin/specialist/update/:id',
            element: <ProtectedRoute>
              <Admin>
                <UpdateSpecialist />
              </Admin>
            </ProtectedRoute>,
          },
          {
            path: '/admin/doctors',
            element: <ProtectedRoute>
              <Admin>
                <AppliedDoctors />
              </Admin>
            </ProtectedRoute>,
          },
          {
            path: '/admin/doctor/:id',
            element: <ProtectedRoute>
              <Admin>
                <DoctorDetails />
              </Admin>
            </ProtectedRoute>,
          },
          {
            path: '/admin/hospitals',
            element: <ProtectedRoute>
              <Admin>
                <AppliedHospital />
              </Admin>
            </ProtectedRoute>,
          },
          {
            path: '/admin/hospitals/update/:id',
            element: <ProtectedRoute>
              <Admin>
                <UpdateHospital />
              </Admin>
            </ProtectedRoute>,
          },
          {
            path: '/admin/payments',
            element: <ProtectedRoute>
              <Admin>
                <BillPayments />
              </Admin>
            </ProtectedRoute>,
          },
          {
            path: '/payments/',
            element: <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          },
          {
            path: '/payment/add',
            element: <ProtectedRoute>
              <AddBalance />
            </ProtectedRoute>
          },
          {
            path: '/payment/success',
            element: <Success />
          },
          {
            path: '/payment/failure',
            element: <Failure />
          },
          {
            path: '/*',
            element: <NotFound />
          }
        ]
      },

    ]
  )
  return routes
}

export default App;
