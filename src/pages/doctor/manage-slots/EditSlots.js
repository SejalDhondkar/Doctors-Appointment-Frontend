import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, FormHelperText, TextField , Dialog , DialogActions, DialogContent , DialogContentText , DialogTitle, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import { disableDocSlot, addDocSlot, enableDocSlot, getDoctorSlots, getDoctorInfo } from '../api/info';
// import Button from 'themes/overrides/Button';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { CloseOutlined } from '@ant-design/icons';

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
        id: 'no',
        align: 'left',
        disablePadding: false,
        label: 'Slot No.'
    },
    {
        id: 'time',
        align: 'left',
        disablePadding: true,
        label: 'Slot Time'
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: true,
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
        case 'open':
            color = 'success';
            title = 'Open';
            break;
        case 'disabled':
            color = 'error';
            title = 'Disabled';
            break;
        default:
            color = 'success';
            title = 'Open';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
    const [order] = useState('asc');
    const [orderBy] = useState('');
    const [selected] = useState([]);
    const [items, setItems] = useState([]);
    const [slotId, setSlotId] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState({
        start: 0,
        end: 0
    });

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleSubmit = async (values) => {
        console.log(values);
        const response = await addDocSlot(values);
        console.log(response);
        getAllItems();
        getTimeDetails();        
        setOpen(false);
      };

    const theme = useTheme();

    
    const isSelected = (no) => selected.indexOf(no) !== -1;

    const getAllItems = async () => {
        const response = await getDoctorSlots();
        if (response) {
            setItems(response);
            console.log(response);
        }
    };

    const getTimeDetails = async () => {
        const response = await getDoctorInfo();
        if (response) {
            setTime({
                start: response.startTime,
                end: response.endTime
        });
    }
};

    const enableSlot = async (slotId) => {
        const data = {
            slotId
        };
        console.log(data);
        const response = await enableDocSlot(data);
        if (response) {
            console.log(response);
            setItems(response.data);
        }
    };

    const disableSlot = async (slotId) => {
        const data = {
            slotId: slotId
        };
        console.log(data)
        const response = await disableDocSlot(data);
        if (response) {
            console.log(response);
            setItems(response.data);
        }
    }

    useEffect(() => {
        // console.log(docId);
        getAllItems();
        getTimeDetails();
    }, []);

    return (
        <Box>
            <MainCard title="Manage Slots"
                secondary={
                    <Button 
                        variant="outlined"
                        color="primary"
                        onClick={handleClickOpen}
                        >Edit Timings</Button>
                }
            >

                <Dialog open={open} onClose={handleClose}>
                    
                    <Formik
                        enableReinitialize
                        initialValues={time}
                        validationSchema={Yup.object().shape({
                            start: Yup.number()
                            .min(0, 'Number must be greater than or equal to 0')
                            .max(24, 'Number must be less than or equal to 24')
                            .required('Number is required'),
                            end: Yup.number()
                            .min(0, 'Number must be greater than or equal to 0')
                            .max(24, 'Number must be less than or equal to 24')
                            .required('Number is required')
                            .when('time.start', {
                                is: (start) => start !== undefined,
                                then: Yup.number().min(
                                  Yup.ref('time.end'),
                                  'Start Time must be less than End Time'
                                ),
                              }),
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
                                <DialogTitle>Edit Slot Timimgs</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Enter start and end timings in 24 hour format. eg(11 for 11:00 am, 17 for 5:00 pm)
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                            margin="dense"
                            id="start"
                            label="Start Time"
                            type="number"
                            variant="standard"
                            value={values.start}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.start && errors.start)}
                            />
                            {touched.degree && errors.degree && (
                                <FormHelperText error id="helper-text-firstname-signup">
                                    {errors.start}
                                </FormHelperText>
                            )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                            margin="dense"
                            id="end"
                            label="End Time"
                            type="number"
                            variant="standard"
                            value={values.end}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={Boolean(touched.end && errors.end)}
                            />
                            {touched.degree && errors.degree && (
                                <FormHelperText error id="helper-text-firstname-signup">
                                    {errors.end}
                                </FormHelperText>
                            )}
                        </Grid>
                    </Grid>
                    
                    
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save Changes</Button>
                    </DialogActions>
                    </form>
                    )}
                </Formik>
                </Dialog>

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
                                const isItemSelected = isSelected(row.slotId);
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
                                        <TableCell component="th" id={index} scope="row" align="left">
                                            <Link color="secondary" component={RouterLink} to="">
                                                {index+1}
                                            </Link>
                                        </TableCell>
                                        {/* <TableCell align="left">{row.time}</TableCell> */}
                                        <TableCell align="left">{row.startTime} - {row.endTime}</TableCell>
                                        <TableCell align="left">
                                            <OrderStatus status={row.status} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button 
                                                    variant="outlined"
                                                    color={row.status=='disabled' ? 'success': 'error'} 
                                                    onClick={ ()=> {
                                                        setSlotId(row._id);                                                        
                                                        if(row.status=='disabled'){
                                                            enableSlot(row._id);
                                                        }else{
                                                            disableSlot(row._id);
                                                        }
                                                    }}>
                                                    {row.status=='disabled' ? 'Enable': 'Disable'}
                                                </Button>
                                            {/* {
                                                
                                                row.status!='disabled' && true (
                                                    <Button 
                                                        variant="outlined"
                                                        color="warning"
                                                        onClick={ ()=>{
                                                            console.log(r.status)
                                                            // setSlotId(row._id);
                                                            // disableSlot();
                                                        }}
                                                        >
                                                        Disable

                                                </Button>
                                            )
                                            }
                                            {
                                                row.status=='disabled' && (
                                                    <Button 
                                                        variant="outlined"
                                                        color="success" 
                                                        onClick={()=>{
                                                            setSlotId(row._id);
                                                            enableSlot();
                                                        }}
                                                        >
                                                        Enable
                                                </Button>
                                                )
                                            }  */}
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
