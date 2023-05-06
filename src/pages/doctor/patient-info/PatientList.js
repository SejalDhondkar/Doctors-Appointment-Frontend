import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Grid,InputLabel, OutlinedInput, FormHelperText, TextField , Dialog , DialogActions, DialogContent , DialogContentText , DialogTitle, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import MainCard from 'components/MainCard';
import { getDoctorHistory, cancelSlot, addTreatment, getMeetLink, saveMeetLink } from '../api/info';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'name',
        align: 'left',
        disablePadding: false,
        label: 'Patient Name'
    },
    {
        id: 'date',
        align: 'left',
        disablePadding: true,
        label: 'Appointment Date'
    },
    {
        id: 'time',
        align: 'left',
        disablePadding: false,
        label: 'Appointment Time'
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'Status'
    },
    {
        id: 'action',
        align: 'right',
        disablePadding: false,
        label: 'Action'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 'booked':
            color = 'primary';
            title = 'Booked';
            break;
        case 'completed':
            color = 'success';
            title = 'Completed';
            break;
        case 'cancelled':
            color = 'error';
            title = 'Cancelled';
            break;
        default:
            color = 'primary';
            title = 'Booked';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
    const [order] = useState('asc');
    const [orderBy] = useState('');
    const [selected] = useState([]);
    const [items, setItems] = useState([]);
    const [slotId, setSlotId] = useState(undefined);
    const [history, setHistory] = useState({});
    const [treatment, setTreatment] = useState({
        complaint: '',
        remarks: '',
        fees: '',
        prescription: ''
    });

    const [historyId, setHistoryId] = useState(undefined);
    const [link, setLink] = useState('');

    let navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    const getAllItems = async () => {
        const response = await getDoctorHistory();
        if (response) {
            setItems(response);
            console.log(response);
        }
    };

    const cancelThisSlot = async (slotId) => {
        const data = {
            bookingId: slotId
        };
        console.log(data);
        const response = await cancelSlot(data);
        if (response) {
            console.log(response);
            // setItems(response.data);
            getAllItems();
        }
    };

    const handleClickOpen = (row) => {
        console.log(row);
        setHistory(row);
        setOpen(true);
        // setTreatment({
        //     complaint: '',
        //     remarks: '',
        //     fees: '',
        //     prescription: ''
        // })
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleSubmit = async (values) => {
        values.historyId = history._id;
        values.patientId = history.patientId;
        console.log(values);
        const response = await addTreatment(values);
        if (response) {
            console.log(response)
            setOpen(false);
            getAllItems();
        }
        
      };

      const startMeeting = async(hisId) => {
        const response = await getMeetLink();
        if (response) {
            // console.log(response.joinLink);
            // setLink(response.joinLink)
            console.log(response.joinLink)
            saveLink(hisId, response.joinLink);
            window.open(response.joinLink, "_blank");
        }
      };

      const saveLink = async(hisId, meetLink) => {
        const body = {
            historyId: hisId,
            link: meetLink
        }
        console.log(body);
        const response = await saveMeetLink(body);
        if (response) {
            console.log(response);
            getAllItems();
        }
      };

    useEffect(() => {
        // console.log(docId);
        getAllItems();
    }, []);

    return (
        <Box>
            <MainCard title="Patients List">
                <TableContainer
                    sx={{
                        width: '100%',
                        overflowX: 'auto',
                        position: 'relative',
                        display: 'block',
                        maxWidth: '100%',
                        '& td, & th': { whiteSpace: 'nowrap' }
                    }}
                >
                    <Table
                        aria-labelledby="tableTitle"
                        sx={{
                            '& .MuiTableCell-root:first-child': {
                                pl: 2
                            },
                            '& .MuiTableCell-root:last-child': {
                                pr: 3
                            }
                        }}
                    >
                        <OrderTableHead order={order} orderBy={orderBy} />
                        <TableBody>
                            {stableSort(items, getComparator(order, orderBy)).map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.patientId}
                                        selected={isItemSelected}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" align="left">
                                            <Link color="secondary" component={RouterLink} to="">
                                                {row.patient[0].firstname} {row.patient[0].lastname}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left">{row.date}</TableCell>
                                        <TableCell align="left">{row.startTime} - {row.endTime}</TableCell>
                                        <TableCell align="left">
                                            <OrderStatus status={row.appointmentStatus} />
                                        </TableCell>
                                        <TableCell align="right">
                                        {
                                                row.appointmentStatus=='booked' && (
                                                    <Button 
                                                    variant={row.appointmentStatus=='booked'?'outlined':'disabled'}
                                                    color="warning" 
                                                    onClick={ ()=> {                                                   
                                                        cancelThisSlot(row._id);
                                                    }}>
                                                    Cancel Slot
                                                    </Button>
                                                )
                                            }
                                            {
                                                row.appointmentStatus=='booked' && !row.link &&(
                                                    <Button 
                                                        sx = {'margin-left: 10px'}
                                                        variant={row.appointmentStatus=='booked'?'contained':'disabled'}
                                                        color="primary" 
                                                        onClick={ ()=> {    
                                                            // setHistoryId(row._id)
                                                            startMeeting(row._id)
                                                        }}>
                                                        Start Video Call
                                                    </Button>
                                                )
                                            }
                                            {
                                                row.appointmentStatus=='booked' && row.link && (
                                                    <Button 
                                                        sx = {'margin-left: 10px'}
                                                        variant={row.appointmentStatus=='booked'?'contained':'disabled'}
                                                        color="primary" 
                                                        onClick={ ()=> {    
                                                            window.open(row.link, "_blank");
                                                        }}>
                                                        Video Call Started. Join
                                                    </Button>
                                                )
                                            }
                                            {
                                                row.appointmentStatus=='booked' && (
                                                    <Button 
                                                        sx = {'margin-left: 10px'}
                                                        variant={row.appointmentStatus=='booked'?'contained':'disabled'}
                                                        color="success" 
                                                        onClick={ ()=> {    
                                                            // setHistory(row);                                            
                                                            handleClickOpen(row);
                                                        }}>
                                                        Give Prescription
                                                    </Button>
                                                )
                                            }
                                            {
                                                row.appointmentStatus=='completed' && (
                                                    <Button 
                                                        sx = {'margin-left: 10px'}
                                                        variant={row.appointmentStatus=='completed'?'contained':'disabled'}
                                                        color="success" 
                                                        onClick={ ()=> {    
                                                            // setHistory(row);    
                                                            navigate(`/view-prescription/${row._id}`)                                        
                                                        }}>
                                                        View Prescription
                                                    </Button>
                                                )
                                            }
                                            
                                            
                                            <Dialog open={open} onClose={handleClose} >
                                                  <Formik
                                                    enableReinitialize
                                                    initialValues={treatment}
                                                    validationSchema={Yup.object().shape({
                                                        complaint: Yup.string().max(255).required('Field is required'),
                                                        remarks: Yup.string().max(255).required('Field is required'),
                                                        fees: Yup.string().max(255).required('Field is required'),
                                                        prescription: Yup.string().max(255).required('Field is required')
                                                    })}
                                                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                                        try {
                                                            handleSubmit(values);
                                                            setStatus({ success: false });
                                                            setSubmitting(false);
                                                        } catch (err) {
                                                            console.error(err);
                                                            setStatus({ success: false });
                                                            setErrors({ submit: err.message });
                                                            setSubmitting(false);
                                                        }
                                                    }}
                                                >
                                                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                                        <form noValidate onSubmit={handleSubmit}>
                                                            <DialogTitle>Prescription</DialogTitle>
                                                <DialogContent>
                                                <DialogContentText>
                                                        Patient Name: {history.patient[0].firstname}  {history.patient[0].lastname} <br></br>
                                                        Appointment: {history.date} <br></br>
                                                        Slot: {history.startTime} to {history.endTime}
                                                        <br></br><br></br>
                                                </DialogContentText>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} md={12}>
                                                    <InputLabel htmlFor="firstname-login">Symptoms</InputLabel>
                                                    <OutlinedInput
                                                        id="firstname-login"
                                                        type="text"
                                                        value={values.complaint}
                                                        name="complaint"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        fullWidth
                                                        error={Boolean(touched.degree && errors.degree)}
                                                    />
                                                        {/* <TextField
                                                        fullWidth
                                                        id="symptoms"
                                                        label="Symptoms"
                                                        type="text"
                                                        value={values.complaint}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        /> */}
                                                        
                                                    </Grid>

                                                    <Grid item xs={12} md={12}>
                                                    <InputLabel htmlFor="firstname-login">Prescription</InputLabel>
                                                    <OutlinedInput
                                                        id="firstname-login"
                                                        type="text"
                                                        value={values.prescription}
                                                        name="prescription"
                                                        multiline
                                                        rows={4}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        fullWidth
                                                        error={Boolean(touched.degree && errors.degree)}
                                                    />
                                                        {/* <TextField
                                                        fullWidth 
                                                        id="prescr"
                                                        label="Prescription"
                                                        type="text"
                                                        multiline
                                                        minRows={4}  
                                                        value={values.prescription}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        /> */}
                                                    </Grid>

                                                    <Grid item xs={12} md={6}>
                                                    <InputLabel htmlFor="firstname-login">Remarks</InputLabel>
                                                    <OutlinedInput
                                                        id="firstname-login"
                                                        type="text"
                                                        value={values.remarks}
                                                        name="remarks"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        fullWidth
                                                        error={Boolean(touched.degree && errors.degree)}
                                                    />
                                                        {/* <TextField
                                                        fullWidth 
                                                        id="start"
                                                        label="Remarks"
                                                        type="text"
                                                        value={values.remarks}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        /> */}
                                                        
                                                    </Grid>

                                                    <Grid item xs={12} md={6}>
                                                    <InputLabel htmlFor="firstname-login">Fees (in INR)</InputLabel>
                                                    <OutlinedInput
                                                        id="firstname-login"
                                                        type="text"
                                                        value={values.fees}
                                                        name="fees"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        fullWidth
                                                        error={Boolean(touched.degree && errors.degree)}
                                                    />
                                                        {/* <TextField
                                                        fullWidth 
                                                        id="start"
                                                        label="Fees (in INR)"
                                                        type="text"
                                                        value={values.fees}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        
                                                        /> */}
                                                        
                                                    </Grid>
                                                </Grid>
                                                
                                                
                                                </DialogContent>
                                                <DialogActions>
                                                <Button variant="outlined" color="primary" onClick={handleClose}>Cancel</Button>
                                                <Button variant="contained" color="success" onClick={handleSubmit}>Save and Mark as Completed</Button>
                                                </DialogActions>
                                                </form>
                                                )}
                                            </Formik>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>
        </Box>
    );
}
