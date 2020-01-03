import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Divider,
    Box,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';

// Components
import QuantitySelect from '../Components/QuantitySelect';
import TotalCartCard from '../Components/TotalCartCard';

const styles = theme => ({
    rating1: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            color: "#c45500",
            textDecoration: 'none'
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    pricePara: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});

class Cart extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Container style={{ marginTop: 30 }}>
                    <Typography variant='h5' style={{ fontWeight: 'bold' }}>Shopping Cart</Typography>
                    <Grid container spacing={2}>
                        <Grid item md={9}>
                            <p style={{ float: 'right', fontSize: 13 }} className={classes.pricePara}>Price</p>
                            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <div style={{
                                        justifyContent: 'center',
                                        alignItems: 'center,',
                                        display: 'inline-flex',
                                        width: '100%',
                                    }}>
                                        <Link to='/product-details'>
                                            <img src="https://m.media-amazon.com/images/I/71RsweT83eL._AC_UY218_ML3_.jpg" />
                                        </Link>
                                    </div>
                                </Grid>
                                <Grid item xs={9} md={6}>
                                    <Link className={classes.link} to='/product-details'>
                                        <Typography style={{ fontWeight: 'bold' }} className={classes.title} gutterBottom>
                                            Intel Core i9-9900K Desktop Processor 8 Cores up to 5.0 GHz Turbo unlocked LGA1151 300 Series 95W
                                        </Typography>
                                    </Link>
                                    <div className={classes.rating1}>
                                        <Rating
                                            name="hover-side"
                                            value={5}
                                            size='small'
                                        />
                                        <Box style={{ marginTop: -7, fontSize: 13 }} ml={1}><Link to='/product-details'>680</Link></Box>
                                    </div>
                                    <Typography style={{ fontSize: 13 }} className={classes.title} color="textSecondary" gutterBottom>
                                        Sold and Shipped by: <strong>Computer Store</strong>
                                    </Typography>
                                    <br />
                                    <Grid container>
                                        <QuantitySelect />
                                        <Button style={{ height: 36, width: 100, marginTop: 8 }} variant='outlined'>Delete</Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3} md={2}>
                                    <Typography variant='caption' style={{ fontSize: 16, fontWeight: 'bold', color: '#B12704', float: 'right' }}>
                                        Rs. 76,641
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                            <Typography style={{ float: 'right' }}>
                                Subtotal(1 item): <strong style={{ color: '#B12704' }}>Rs. 76,641</strong>
                            </Typography>
                        </Grid>
                        <Grid item md={3} style={{ width: '100%' }}>
                            <TotalCartCard />
                        </Grid>
                    </Grid>
                </Container>
            </div >
        );
    }
}

export default withStyles(styles)(Cart);