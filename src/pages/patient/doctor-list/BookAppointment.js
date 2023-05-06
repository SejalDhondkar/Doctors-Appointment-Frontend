// material-ui
import { Typography, Breadcrumbs, Divider, Grid, Link, Stack, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

// project import
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';
import ComponentSkeleton from '../../components-overview/ComponentSkeleton';

import { getSlotList, bookNewSlot } from './api/List';
import { useNavigate, useParams } from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

// ==============================|| SAMPLE PAGE ||============================== //

const BookAppointment = () => {
    const [value, setValue] = useState(new Date());
    const [slots, setSlots] = useState(undefined);
    const [slotId, setSlotId] = useState(undefined);
    const [start, setStart] = useState(undefined);
    const [end, setEnd] = useState(undefined);
    const params = useParams();

    const docId = params.doctorId;

    const getAllSlotList = async () => {
        const data = {
            docId: docId
        };
        // console.log(data);
        const response = await getSlotList(data);
        if (response) {
            setSlots(response);
            console.log(response);
        }
    };

    const bookSlot = async () => {
        
        const data = {
            slotId,
            doctorId: docId,
            date: value.format('D MMMM YYYY'),
            startTime: start,
            endTime: end
        };
        // console.log(data);
        const response = await bookNewSlot(data);
        if (response) {
            console.log(response);
        }
    };

    useEffect(() => {
        // console.log(docId);
        getAllSlotList();
    }, []);

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
                                    {
                                        slots && slots.map((slot,index)=> (
                                            <Grid item lg={2}>
                                                <Button 
                                                    variant={slot.status=='open' ? 'contained': 'disabled'} 
                                                    color = {slotId === slot._id ? 'success' : 'primary'}
                                                    onClick={ ()=> {
                                                        setSlotId(slot._id); 
                                                        setStart(slot.startTime); 
                                                        setEnd(slot.endTime); 
                                                    }}>
                                                    {slot.startTime} - {slot.endTime}
                                                </Button>
                                            </Grid>
                                        ))
                                    }
                                    
                                    {/* <Grid item lg={2}>
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
                                    </Grid> */}
                                </Grid> 
                                <br></br>
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        bookSlot();
                                    }}
                                >
                                    Confirm Booking
                                </Button>
                            </Stack>
                        </MainCard>
                    </Stack>
                </Grid>
            </Grid>
        </ComponentSkeleton>
    );
};

export default BookAppointment;
