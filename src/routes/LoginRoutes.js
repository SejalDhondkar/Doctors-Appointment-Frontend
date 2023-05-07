import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegisterPatient = Loadable(lazy(() => import('pages/authentication/PatientRegister')));
const AuthRegisterDoctor = Loadable(lazy(() => import('pages/authentication/DoctorRegister')));
const LandingPage = Loadable(lazy(() => import('pages/landing-page/LandingPage')));
const MentalScore = Loadable(lazy(() => import('pages/health-modules/mental-health/MentalSurvey')));
const MentalResult = Loadable(lazy(() => import('pages/health-modules/mental-health/MentalResult')));
const DoctorList = Loadable(lazy(() => import('pages/patient/doctor-list/DocList')));
const MentalDoctorList = Loadable(lazy(() => import('pages/patient/doctor-list/MentalDocList')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'home',
            element: <LandingPage />
        },
        {
            path: 'register/patient',
            element: <AuthRegisterPatient />
        },
        {
            path: 'register/doctor',
            element: <AuthRegisterDoctor />
        },
        {
            path: '/mentalcheck',
            element: <MentalScore />
        },
        {
            path: '/mentalresult',
            element: <MentalResult />
        },
        {
            path: '/newuser/doctors',
            element: <DoctorList />
        },
        {
            path: '/newuser/doctors/mental-health-professionals',
            element: <MentalDoctorList />
        },
    ]
};

export default LoginRoutes;
