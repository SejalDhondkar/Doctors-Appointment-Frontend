import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const DoctorList = Loadable(lazy(() => import('pages/patient/doctor-list/DocList')));
const MentalDoctorList = Loadable(lazy(() => import('pages/patient/doctor-list/MentalDocList')));
const BookAppointment = Loadable(lazy(() => import('pages/patient/doctor-list/BookAppointment')));
const PreviousBookings = Loadable(lazy(() => import('pages/patient/doctor-list/PreviousBookings')));
const ViewPrescription = Loadable(lazy(() => import('pages/patient/doctor-list/ViewPrescription')));

// ==============================|| MAIN ROUTING ||============================== //

const PatientRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        // {
        //     path: '/',
        //     element: <DashboardDefault />
        // },
        {
            path: 'doctors',
            element: <DoctorList />
        },
        {
            path: 'doctors/mental-health-professionals',
            element: <MentalDoctorList />
        },
        {
            path: 'book/:doctorId',
            element: <BookAppointment />
        },
        {
            path: 'previous-bookings',
            element: <PreviousBookings />
        },
        {
            path: 'view-prescription/:historyId',
            element: <ViewPrescription />
        }
    ]
};

export default PatientRoutes;
