import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';

import MainLayout from '../layout/MainLayout/index';
// render - modules


const MentalScore = Loadable(lazy(() => import('../pages/health-modules/mental-health/MentalSurvey')));
const MentalResult = Loadable(lazy(() => import('../pages/health-modules/mental-health/MentalResult')));


// ==============================|| MAIN ROUTING ||============================== //

const HealthModules = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/user/mentalcheck',
            element: <MentalScore />
        },
        {
            path: '/user/mentalresult',
            element: <MentalResult />
        }
    ]
};

export default HealthModules;
