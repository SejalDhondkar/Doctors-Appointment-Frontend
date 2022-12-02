import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const DoctorList = Loadable(lazy(() => import('pages/patient/doctor-list/DocList')));
const BookAppointment = Loadable(lazy(() => import('pages/patient/doctor-list/BookAppointment')));
const PreviousBookings = Loadable(lazy(() => import('pages/patient/doctor-list/PreviousBookings')));

// ==============================|| MAIN ROUTING ||============================== //

const PatientRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'doctors',
            element: <DoctorList />
        },
        {
            path: 'book',
            element: <BookAppointment />
        },
        {
            path: 'previous-bookings',
            element: <PreviousBookings />
        }
    ]
};

export default PatientRoutes;
