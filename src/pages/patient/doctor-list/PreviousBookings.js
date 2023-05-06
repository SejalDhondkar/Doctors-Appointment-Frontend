import PropTypes from 'prop-types';
// import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import MainCard from 'components/MainCard';
import { getPatientHistory, cancelSlot } from './api/List';

// function createData(trackingNo, name, fat, carbs, protein) {
//     return { trackingNo, name, fat, carbs, protein };
// }

// const rows = [
//     createData('Dr. Avni Sinha, MD', '02 December, 2022', '10:00 - 11:00', 0, 'In-Clinic'),
//     createData('Dr. Sanjana Singh, MBBS', '16 June, 2022', '14:00 - 15:00', 1, 'Online'),
//     createData('Dr. Avni Sinha, MD', '15 June, 2022', '11:00 - 12:00', 2, 'In-Clinic'),
//     createData('Dr. Abhijeet Desai, MD', '23 May, 2022', '12:00 - 13:00', 1, 'In-Clinic')
// ];

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
        label: 'Doctor Name'
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
    status: PropTypes.string
};

import { useNavigate } from 'react-router-dom';

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
    const [order] = useState('asc');
    const [orderBy] = useState('');
    const [selected] = useState([]);
    let navigate = useNavigate();

    const [items, setItems] = useState([]);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    const getAllItems = async () => {
        const response = await getPatientHistory();
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

    useEffect(() => {
        // console.log(docId);
        getAllItems();
    }, []);

    return (
        <Box>
            <MainCard title="Appointment Booking History">
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
                                        key={row.doctorId}
                                        selected={isItemSelected}
                                    >
                                        <TableCell component="th" id={name} scope="row" align="left">
                                            <Link color="black" component={RouterLink} to="">
                                                {row.doctor[0].firstname} {row.doctor[0].lastname}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left">{row.date}</TableCell>
                                        <TableCell align="left">{row.startTime} - {row.endTime}</TableCell>
                                        <TableCell align="left">
                                            <OrderStatus status={row.appointmentStatus} />
                                        </TableCell>
                                        <TableCell align="right">
                                            {/* <Button 
                                                variant={row.appointmentStatus=='booked'?'outlined':'disabled'}
                                                color="primary" 
                                                onClick={ ()=> {                                                   
                                                    cancelThisSlot(row._id);
                                                }}>
                                                Cancel Slot
                                            </Button> */}
                                            {
                                                row.appointmentStatus=='booked' && !row.link && (
                                                    <Button 
                                                    variant={row.appointmentStatus=='booked'?'outlined':'disabled'}
                                                    color="primary" 
                                                    onClick={ ()=> {                                                   
                                                        cancelThisSlot(row._id);
                                                    }}>
                                                    Cancel Slot
                                                    </Button>
                                                )
                                            }
                                            {
                                                row.appointmentStatus=='booked' && row.link && (
                                                    <Button 
                                                    sx = {'margin-left: 10px'}
                                                    variant="contained"
                                                    color="primary" 
                                                    onClick={ ()=> {                                                   
                                                        window.open(row.link, "_blank");
                                                    }}>
                                                    Video Call Started. Join
                                                    </Button>
                                                )
                                            }

                                            {
                                                row.appointmentStatus=='completed' && (
                                                    <Button 
                                                    variant="contained"
                                                    color="success" 
                                                    onClick={ ()=> {                      
                                                        navigate(`/view-prescription/${row._id}`)
                                                    }}>
                                                    View Prescription
                                                    </Button>
                                                )
                                            }
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
