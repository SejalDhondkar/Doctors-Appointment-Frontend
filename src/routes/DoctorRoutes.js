import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const DoctorInfo = Loadable(lazy(() => import('pages/doctor/info-pages/DoctorInfo')));
const PatientList = Loadable(lazy(() => import('pages/doctor/patient-info/PatientList')));
const ManageSlots = Loadable(lazy(() => import('pages/doctor/manage-slots/EditSlots')));

// ==============================|| MAIN ROUTING ||============================== //

const DoctorRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'details',
            element: <DoctorInfo />
        },
        {
            path: 'patient-list',
            element: <PatientList />
        },
        {
            path: 'manage-slots',
            element: <ManageSlots />
        }
    ]
};

export default DoctorRoutes;
