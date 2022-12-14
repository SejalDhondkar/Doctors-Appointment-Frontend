import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegisterPatient = Loadable(lazy(() => import('pages/authentication/PatientRegister')));
const AuthRegisterDoctor = Loadable(lazy(() => import('pages/authentication/DoctorRegister')));

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
            path: 'register/patient',
            element: <AuthRegisterPatient />
        },
        {
            path: 'register/doctor',
            element: <AuthRegisterDoctor />
        }
    ]
};

export default LoginRoutes;
