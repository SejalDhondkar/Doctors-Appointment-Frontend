// material-ui
import { Typography, Breadcrumbs, Divider, Grid, Link, Stack, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import ComponentSkeleton from '../../components-overview/ComponentSkeleton';

import { getDoctorList } from './api/List';
import { useNavigate } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //

const DocList = () => {
    const [docs, setDocs] = useState(undefined);

    const getDocList = async () => {
        const response = await getDoctorList();
        if (response) {
            console.log(response);
            setDocs(response);
        }
    };

    let navigate = useNavigate();

    // const apptPage = () => {
    //     console.log('clicked');
    // };

    // useEffect(() => {
    //     getDocList();
    // }, []);

    return (
        <ComponentSkeleton>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack spacing={3}>
                        <MainCard>
                            <Stack spacing={1} sx={{ mt: -1.5 }}>
                                <Typography variant="h4">Dr. Abhimanyu Singh, MD</Typography>
                                <br></br>
                                <Typography variant="h6">Specialization: Consultant Physician, Cardiologist</Typography>
                                <Typography variant="h6">Experience: 13 years</Typography>
                                <Typography variant="h6">Registration No.: 46735</Typography>
                                <br></br>
                                <Typography variant="h4">Clinic Details</Typography>
                                <Typography variant="h5">Life Care Clinic</Typography>
                                <Typography variant="h6">
                                    Address: Hasnain Tower 1St Floor Nr.Shimla Park M.P.Rd. Kausa Mumbra Mumbra Thane, Mumbai, Maharashtra
                                    400612
                                </Typography>
                                <Typography variant="h5">Timings: Monday to Saturday, 11AM to 7PM</Typography>
                                <br></br>
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        navigate('/book');
                                    }}
                                >
                                    Book Appointment
                                </Button>
                            </Stack>
                        </MainCard>
                        <MainCard>
                            <Stack spacing={1} sx={{ mt: -1.5 }}>
                                <Typography variant="h4">Dr. Deepa Ghule, MD (IDCCM, FCEE)</Typography>
                                <br></br>
                                <Typography variant="h6">Specialization: Consultant Physician, Diabetologist</Typography>
                                <Typography variant="h6">Experience: 10 years</Typography>
                                <Typography variant="h6">Registration No.: 2013/03/0404</Typography>
                                <br></br>
                                <Typography variant="h4">Clinic Details</Typography>
                                <Typography variant="h5">Life Care Clinic</Typography>
                                <Typography variant="h6">
                                    Address: Hasnain Tower 1St Floor Nr.Shimla Park M.P.Rd. Kausa Mumbra Mumbra Thane, Mumbai, Maharashtra
                                    400612
                                </Typography>
                                <Typography variant="h5">Timings: Monday to Saturday, 11AM to 8PM</Typography>
                                <br></br>
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        navigate('/book');
                                    }}
                                >
                                    Book Appointment
                                </Button>
                            </Stack>
                        </MainCard>
                    </Stack>
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
};

export default DocList;
