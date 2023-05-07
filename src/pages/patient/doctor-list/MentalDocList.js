// material-ui
import { Typography, Breadcrumbs, Divider, Grid, Link, Stack, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import ComponentSkeleton from '../../components-overview/ComponentSkeleton';

import { getMentalDoctorList } from './api/List';
import { useNavigate } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //

const DocList = () => {
    const [docs, setDocs] = useState(undefined);
    // const [user, setUser] = useState(undefined);

    const getDocList = async () => {
        const response = await getMentalDoctorList();
        if (response) {
            console.log(response);
            setDocs(response);
        }
    };

    let navigate = useNavigate();

    // const apptPage = () => {
    //     console.log('clicked');
    // };

    useEffect(() => {
        getDocList();
    }, []);

    return (
        <ComponentSkeleton>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack spacing={3}>
                        {docs &&
                            docs.map((doc, index) => (
                                <MainCard>
                                    <Stack spacing={1} sx={{ mt: -1.5 }}>
                                    <Typography variant="h4">Dr. {doc.userId.firstname} {doc.userId.lastname}, {doc.degree}</Typography>
                                    <Typography variant="h5">
                                        Mental Health Professional
                                    </Typography>
                                    
                                    <br></br>
                                    <Typography variant="h6">Specialization: {doc.specialization}</Typography>
                                    <Typography variant="h6">Experience: {doc.experience} Years</Typography>
                                    <Typography variant="h6">Registration No.: {doc.registrationNo}</Typography>
                                    <br></br>
                                    <Typography variant="h4">Clinic Details</Typography>
                                    <Typography variant="h5">{doc.clinicName}</Typography>
                                    <Typography variant="h6">Address: {doc.clinicAddr}</Typography>
                                    <Typography variant="h5">Timings: {doc.startTime}:00 to {doc.endTime}:00</Typography>
                                    <Typography variant="h5">First Fees: Rs. {doc.firstFees} Follow-Up Fees: Rs.{doc.followupFees}</Typography>
                                    <br></br>
                                    <Button
                                        onClick={() => navigate(`/book/${doc.userId._id}`)}
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Book Appointment 
                                    </Button>
                                </Stack>
                            </MainCard>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
};

export default DocList;
