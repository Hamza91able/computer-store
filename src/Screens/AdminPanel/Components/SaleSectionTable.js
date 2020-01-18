import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import connectionString from '../../../Static/Utilities/connectionString';

// Components
import DateTimeSale from './DateTimeSale';
import Axios from 'axios';
import Swal from 'sweetalert2';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0
})

function createData(prodId, title, currentPrice) {
    return { prodId, title, currentPrice };
}

let rows = [];

export default function SimpleTable(props) {
    const classes = useStyles();
    const { product } = props;
    const [go, setGo] = React.useState(false);
    const [discountPrice, setDiscountPrice] = React.useState(0);
    const [discountPercentage, setDiscountPercentage] = React.useState(0);
    const [date, setDate] = React.useState(null);

    React.useEffect(() => {
        rows = [];
        rows.push(createData(product._id, product.title, product.price));
        setGo(true)
    }, [])

    const setPriceAfterDiscount = e => {
        const discountPercentage = e.target.value;

        const discountPrice = rows[0].currentPrice - (rows[0].currentPrice * (discountPercentage / 100));
        setDiscountPrice(discountPrice);
        setDiscountPercentage(discountPercentage)
    }

    const setDateFromProps = dateFromProps => {
        setDate(dateFromProps);
        console.log(dateFromProps);
    }

    const putOnSale = () => {
        console.log(props.token);
        Axios({
            url: `${connectionString}/admin/put-on-sale`,
            method: 'POST',
            data: {
                prodId: product._id,
                percentage: discountPercentage,
                saleEndDate: date,
            },
            headers: {
                Authorization: 'bearer ' + props.token,
            },
        }).then(res => {
            console.log(res.data);
            alert("Item put on sale");
            window.location.reload();
        }).catch(err => {
            console.log(err);
            // Swal.fire({
            //     icon: 'error',
            //     title: err.response.data.message
            // })
            alert("Date needs to be in future");
        })
    }

    return (
        <Container maxWidth='lg'>
            <div style={{ height: 30 }} />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Current Price</TableCell>
                            <TableCell align="center">Price After Applying Discount</TableCell>
                            <TableCell align="center">Discount %</TableCell>
                            <TableCell align="center">Sale Ends In</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    {go && <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    <Link target='_blank' to={`/product-details/${row.prodId}`}>
                                        {row.prodId}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">{row.title}</TableCell>
                                <TableCell align="center">{formatter.format(row.currentPrice)}</TableCell>
                                <TableCell align="center"><input value={formatter.format(discountPrice)} readOnly={true} /></TableCell>
                                <TableCell align="center"><input value={discountPercentage} onChange={e => setPriceAfterDiscount(e)} /></TableCell>
                                <TableCell align="center"><DateTimeSale setDateFromProps={setDateFromProps} /></TableCell>
                                <TableCell align="center">
                                    <Button onClick={putOnSale} style={{
                                        backgroundColor: '#f0c14b',
                                        color: '#111',
                                        fontWeight: 'normal',
                                        bomdhadow: 'none',
                                        border: '1px solid black',
                                        borderColor: "#a88734 #9c7e31 #846a29",
                                        width: '100%'
                                    }}>
                                        Put on Sale
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>}
                </Table>
            </TableContainer>
        </Container >
    );
}