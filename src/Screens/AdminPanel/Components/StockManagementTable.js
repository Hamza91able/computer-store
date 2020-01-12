import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Toolbar, Typography, Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
});

const EnhancedTableToolbar = props => {
    return (
        <Toolbar>
            <Typography variant="h6" id="tableTitle">
                {props.selectedCategory || "Please Select a Category First"}
            </Typography>
        </Toolbar>
    );
};

export default function DenseTable(props) {
    const classes = useStyles();
    const { selectedCategory, products } = props;

    return (
        <Container maxWidth='lg'>
            <TableContainer component={Paper}>
                <EnhancedTableToolbar selectedCategory={selectedCategory} />
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="center">Current Available Stock</TableCell>
                            <TableCell>Change Stock Level</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {products.map(row => (
                            <TableRow key={row.name}>
                                <TableCell style={{ fontSize: 15 }} component="th" scope="row">
                                    <Link target='_blank' to={`/product-details/${row._id}`}>
                                        {row.title}
                                    </Link>
                                </TableCell>
                                <TableCell style={{ color: row.stock === 0 ? "red" : 'black', fontSize: 15 }} align="center">{row.stock}</TableCell>
                                <TableCell >
                                    <Button size='small' style={{
                                        backgroundColor: '#f0c14b',
                                        color: '#111',
                                        fontWeight: 'normal',
                                        boxShadow: 'none',
                                        border: '1px solid black',
                                        borderColor: "#a88734 #9c7e31 #846a29",
                                    }}
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Enter new stock level',
                                                input: 'text',
                                                inputAttributes: {
                                                    autocapitalize: 'off'
                                                },
                                                showCancelButton: true,
                                                confirmButtonText: 'Change',
                                                showLoaderOnConfirm: true,
                                                preConfirm: (stock) => {
                                                    props.changeStock(row._id, stock)
                                                },
                                                allowOutsideClick: () => !Swal.isLoading()
                                            })
                                        }}>
                                        Change
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
