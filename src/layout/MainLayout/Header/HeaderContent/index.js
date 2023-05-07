// material-ui
import { Box, IconButton, Link, useMediaQuery, Typography } from '@mui/material';
import { GithubOutlined } from '@ant-design/icons';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import { getStorage } from 'utils/localstorage-utils';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const role = getStorage('role');

    return (
        <>
            {}
            {!matchesXs && (
                <Typography variant="h4" sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
                    {role} Dashboard
                </Typography>
            )}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
            {/* <Notification /> */}
            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />}
        </>
    );
};

export default HeaderContent;
