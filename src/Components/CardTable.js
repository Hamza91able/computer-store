import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles({
    table: {
        minWidth: 350
    },
});

function createData(card, name, expiry) {
    return { card, name, expiry };
}

const rows = [
    createData(4242, "Hamza Khan", "01/22"),
    createData(4242, "Hamza Khan", "01/22"),
];

export default function SimpleTable() {
    const classes = useStyles();

    return (
        <TableContainer style={{ width: 600 }} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontSize: 15, fontWeight: 'bold' }}>Your credit and debit cards</TableCell>
                        <TableCell style={{ fontSize: 15 }} align="center">Name on card</TableCell>
                        <TableCell style={{ fontSize: 15 }} align="center">Exipres on</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.card}>
                            <TableCell component="th" scope="row"><Radio /><strong>Ends In </strong>{row.card}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.expiry}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}