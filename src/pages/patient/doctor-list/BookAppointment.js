// material-ui
import { Typography, Breadcrumbs, Divider, Grid, Link, Stack, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

// project import
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import ComponentSkeleton from '../../components-overview/ComponentSkeleton';

import { getDoctorList } from './api/List';
import { useNavigate } from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

// ==============================|| SAMPLE PAGE ||============================== //

const BookAppointment = () => {
    const [value, setValue] = useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
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
                        <MainCard title="Book Appointment" bgcolor="primary.lighter">
                            <Stack spacing={1} sx={{ mt: -1.5 }}>
                                <Typography variant="h4">Select Date:</Typography>
                                <br></br>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <StaticDatePicker
                                        orientation="landscape"
                                        openTo="day"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <Typography variant="h4">Select Time Slot:</Typography>
                                <br></br>
                                <Grid container spacing={3}>
                                    <Grid item lg={2}>
                                        <Button variant="outlined" color="primary">
                                            9:00 - 10:00
                                        </Button>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Button variant="outlined" color="primary">
                                            10:00 - 11:00
                                        </Button>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Button variant="outlined" color="primary" disabled>
                                            11:00 - 12:00
                                        </Button>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Button variant="outlined" color="primary">
                                            12:00 - 13:00
                                        </Button>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Button variant="outlined" color="primary">
                                            13:00 - 14:00
                                        </Button>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Button variant="outlined" color="primary">
                                            14:00 - 15:00
                                        </Button>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Button variant="outlined" color="primary">
                                            15:00 - 16:00
                                        </Button>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Button variant="outlined" color="primary" disabled>
                                            16:00 - 17:00
                                        </Button>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Button variant="outlined" color="primary">
                                            17:00 - 18:00
                                        </Button>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Button variant="outlined" color="primary">
                                            18:00 - 19:00
                                        </Button>
                                    </Grid>
                                </Grid>
                                <br></br>
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        // navigate('/book');
                                    }}
                                >
                                    Confirm Booking
                                </Button>
                            </Stack>
                        </MainCard>
                        {/* <MainCard>
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
                        </MainCard> */}
                    </Stack>
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
};

export default BookAppointment;
