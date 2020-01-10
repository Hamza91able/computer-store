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
import axios from 'axios';
import swal from 'sweetalert2';

import connectionString from '../Static/Utilities/connectionString';

// Components
import CheckoutStepper from '../Components/CheckoutStepper';
import TotalCartCard from '../Components/TotalCartCard';
import AddressRenderCard from '../Components/AddressRenderCard';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 2
})

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

class ReviewItem extends Component {

    state = {
        products: [],
        subTotal: 0,
    }

    componentDidMount() {
        this.getCart();
        this.getUserDelieveryInformation();
    }

    componentDidUpdate(prevProps) {
        if (this.props.token !== prevProps.token) {
            this.getCart();
            this.getUserDelieveryInformation();
        }
    }

    getCart = () => {

        axios({
            url: `${connectionString}/products/get-cart`,
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + this.props.token,
            }
        }).then(res => {
            this.setState({
                products: res.data.products,
            }, () => {
                let subtotal = 0;
                this.state.products.forEach(product => {
                    subtotal = subtotal + (product.productId.price * product.quantity)
                })
                this.setState({
                    subTotal: subtotal,
                })
            })
        }).catch(err => {
            console.log(err.response);
        })
    }

    getUserDelieveryInformation = () => {

        axios({
            url: `${connectionString}/user/get-user-delievery-information`,
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + this.props.token,
            }
        }).then(res => {
            this.setState({
                user: res.data.user,
            })
        }).catch(err => {
            console.log(err.response);
        })
    }

    render() {
        const { classes } = this.props;
        const { products, subTotal, user } = this.state;

        return (
            <div>
                <Container maxWidth='lg'>
                    <CheckoutStepper />
                    <Grid>
                        <Typography style={{color: 'rgb(240, 193, 75)'}} variant='h4'>
                            Order Review
                        </Typography>
                        When finished, click the "Proceed to Payment" button to proceed with your order.
                        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={2}>
                            <Grid item md={9}>
                                <p style={{ float: 'right', fontSize: 13 }} className={classes.pricePara}>Price</p>
                                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                                {products.map((value, index) => {
                                    return (
                                        <React.Fragment>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={4}>
                                                    <div style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center,',
                                                        display: 'inline-flex',
                                                        width: '100%',
                                                    }}>
                                                        {value.productId.pictures && <Link to={`/product-details/${value.productId._id}`}>
                                                            <img style={{ height: 218, width: 242 }} src={value.productId.pictures[0]} />
                                                        </Link>}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={9} md={6}>
                                                    <Link className={classes.link} to={`/product-details/${value.productId._id}`}>
                                                        <Typography style={{ fontWeight: 'bold' }} className={classes.title} gutterBottom>
                                                            {value.productId.title}
                                                        </Typography>
                                                    </Link>
                                                    <div className={classes.rating1}>
                                                        <Rating
                                                            name="hover-side"
                                                            value={value.productId.ratings}
                                                            size='small'
                                                            readOnly
                                                        />
                                                        <Box style={{ marginTop: -7, fontSize: 13 }} ml={1}><Link to={`/product-details/${value.productId._id}`}>{value.productId.ratings ? value.productId.ratings : 0}</Link></Box>
                                                    </div>
                                                    <Typography style={{ fontSize: 13 }} className={classes.title} color="textSecondary" gutterBottom>
                                                        Sold and Shipped by: <strong>{value.productId.soldAndShippedBy}</strong>
                                                    </Typography>
                                                    <br />
                                                    <Grid container>
                                                        <Typography>
                                                            Quantity: {value.quantity}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={3} md={2}>
                                                    <Typography variant='caption' style={{ fontSize: 16, fontWeight: 'bold', color: '#B12704', float: 'right' }}>
                                                        {formatter.format(value.productId.price)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                                        </React.Fragment>
                                    )
                                })}
                                <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                                <Typography style={{ float: 'right' }}>
                                    Subtotal(1 item): <strong style={{ color: '#B12704' }}>{formatter.format(subTotal)}</strong>
                                </Typography>
                            </Grid>
                            <Grid item md={3} style={{ width: '100%' }}>
                                <TotalCartCard origin="review" price={subTotal} />
                                <AddressRenderCard user={user} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div >
        );
    }
}

export default withStyles(styles)(ReviewItem);