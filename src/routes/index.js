import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import DoctorRoutes from './DoctorRoutes';
import PatientRoutes from './PatientRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, LoginRoutes, DoctorRoutes, PatientRoutes]);
}
