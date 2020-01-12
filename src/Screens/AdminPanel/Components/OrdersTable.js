import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { TableRow, TableHead, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

// Components
import ViewOrderDialog from './ViewOrderDialog';

const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = event => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = event => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = event => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat, customer, amount, payment, shipment) {
    return { name, calories, fat, customer, amount, payment, shipment };
}

let rows = [];

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0
})

export default function CustomPaginationActionsTable(props) {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [go, setGo] = React.useState(false);
    const { orders, markAsDelievered } = props;

    React.useEffect(() => {
        rows = [];
        console.log(props.order);
        orders.forEach(order => {
            rows.push(
                createData(
                    order._id,
                    moment(order.createdAt).format('M/D/YYYY h:mm:ss a'),
                    order.status,
                    order.user.fullName,
                    formatter.format(order.totalPrice),
                    "Paid in Full",
                    order.delievery,
                )
            )
        })
        setGo(true)
    })

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Order
                        </TableCell>
                        <TableCell>
                            Date
                        </TableCell>
                        <TableCell align='center'>
                            Order Status
                        </TableCell>
                        <TableCell align='center'>
                            Customers
                        </TableCell>
                        <TableCell align='center'>
                            Amount
                        </TableCell>
                        <TableCell align='center'>
                            Payment
                        </TableCell>
                        <TableCell align='center'>
                            Shipment
                        </TableCell>
                        <TableCell align='center'>
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                {go && <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map(row => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                <Link>{row.name}</Link>
                            </TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell align='center'><Chip label={row.fat} /></TableCell>
                            <TableCell align='center'>{row.customer}</TableCell>
                            <TableCell align='center'>{row.amount}</TableCell>
                            <TableCell align='center'><Chip label={row.payment} color='primary' /></TableCell>
                            <TableCell align='center'><Chip label={row.shipment} color='secondary' /></TableCell>
                            <TableCell align='center'>
                                {props.order && <ViewOrderDialog
                                    markAsDelievered={markAsDelievered}
                                    order={props.order}
                                    getOrder={props.getOrder}
                                    id={row.name}
                                    delievered={props.delievered}
                                />}
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>}
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={8}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}