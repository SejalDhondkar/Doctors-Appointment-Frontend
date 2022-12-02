import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import MainCard from 'components/MainCard';

function createData(trackingNo, name, fat, carbs, protein) {
    return { trackingNo, name, fat, carbs, protein };
}

const rows = [
    createData('Brijlal Mohan', '02 December, 2022', '10:00 - 11:00', 0, 'In-Clinic'),
    createData('Sanjana Singh', '01 December, 2022', '14:00 - 15:00', 1, 'Online'),
    createData('Mukesh Sharma', '30 November, 2022', '11:00 - 12:00', 2, 'In-Clinic'),
    createData('Priya Sinha', '30 November, 2022', '12:00 - 13:00', 1, 'In-Clinic'),
    createData('Shanti Lal', '30 November, 2022', '16:00 - 17:00', 1, 'In-Clinic'),
    createData('Sarvesh Jadhav', '29 November, 2022', '09:00 - 10:00', 1, 'In-Clinic'),
    createData('Mukti Prakash', '29 November, 2022', '13:00 - 14:00', 2, 'Online'),
    createData('Aditya Pawar', '29 November, 2022', '15:00 - 16:00', 1, 'In-Clinic')
];

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
        id: 'trackingNo',
        align: 'left',
        disablePadding: false,
        label: 'Name'
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Appointment Date'
    },
    {
        id: 'fat',
        align: 'left',
        disablePadding: false,
        label: 'Appointment Time'
    },
    {
        id: 'carbs',
        align: 'left',
        disablePadding: false,
        label: 'Status'
    },
    {
        id: 'protein',
        align: 'right',
        disablePadding: false,
        label: 'Mode'
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
        case 0:
            color = 'warning';
            title = 'Booked';
            break;
        case 1:
            color = 'success';
            title = 'Completed';
            break;
        case 2:
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

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

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
                            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                                const isItemSelected = isSelected(row.trackingNo);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.trackingNo}
                                        selected={isItemSelected}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" align="left">
                                            <Link color="secondary" component={RouterLink} to="">
                                                {row.trackingNo}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.fat}</TableCell>
                                        <TableCell align="left">
                                            <OrderStatus status={row.carbs} />
                                        </TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
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
