import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    container: {
        maxHeight: 280,
    },
});

export default function SimpleTable(props) {
    const classes = useStyles();
    const { categories } = props;

    return (
        <TableContainer style={{ marginTop: 20 }} className={classes.container} component={Paper}>
            <Table stickyHeader className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow style={{ backgroundColor: '#989898' }}>
                        <TableCell style={{ backgroundColor: '#989898' }} >{props.heading}</TableCell>
                        {props.heading === "Sub-Categories" || props.heading === "Brands" && <TableCell style={{ backgroundColor: '#989898' }} >Parent Category</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories && categories.map(row => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            {props.heading === "Sub-Categories" || props.heading === "Brands" && <TableCell component="th" scope="row">
                                {row.parent}
                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}