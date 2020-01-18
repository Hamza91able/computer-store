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

import connectionString from '../Static/Utilities/connectionString';

// Components
import QuantitySelect from '../Components/QuantitySelect';
import TotalCartCard from '../Components/TotalCartCard';

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

class Cart extends Component {

    state = {
        products: [],
        subTotal: 0,
    }

    componentDidMount() {
        this.getCart();
    }

    componentDidUpdate(prevProps) {
        if (this.props.token !== prevProps.token) {
            this.getCart();
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
                    if (product.productId.onSale) {
                        subtotal = subtotal + (product.productId.priceAfterDiscount * product.quantity)
                    } else {
                        subtotal = subtotal + (product.productId.price * product.quantity)
                    }
                })
                this.setState({
                    subTotal: subtotal,
                })
            })
        }).catch(err => {
            console.log(err.response.statusText);
        })
    }

    deleteFromCart = prodId => {

        axios({
            url: `${connectionString}/products/post-delete-from-cart`,
            method: 'POST',
            data: {
                prodId
            },
            headers: {
                Authorization: 'bearer ' + this.props.token,
            }
        }).then(res => {
            console.log(res.data)
            this.getCart();
        }).catch(err => {
            console.log(err.response.statusText);
        })
    }

    render() {
        const { classes } = this.props;
        const { products, subTotal } = this.state;

        return (
            <div>
                {this.props.isAuth ? <Container style={{ marginTop: 30 }}>
                    <Typography variant='h5' style={{ fontWeight: 'bold' }}>Shopping Cart</Typography>
                    <Grid container spacing={2}>
                        <Grid item md={9}>
                            <p style={{ float: 'right', fontSize: 13 }} className={classes.pricePara}>Price</p>
                            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                            {products.length > 0 ? products.map((value, index) => {
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
                                                        value={value.productId.averageRating}
                                                        size="small"
                                                    />
                                                    <Box style={{ marginTop: -10, fontSize: 13, marginLeft: 7 }}>{value.productId.reviews ? value.productId.reviews.length : "(0)"}</Box>
                                                </div>
                                                <Typography style={{ fontSize: 13 }} className={classes.title} color="textSecondary" gutterBottom>
                                                    Sold and Shipped by: <strong>{value.productId.soldAndShippedBy}</strong>
                                                </Typography>
                                                <br />
                                                <Grid container>
                                                    <QuantitySelect value={value.quantity} />
                                                    <Button style={{ height: 36, width: 100, marginTop: 8 }} onClick={() => this.deleteFromCart(value.productId._id)} variant='outlined'>Delete</Button>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={3} md={2}>
                                                {/* <Typography variant='caption' style={{ fontSize: 16, fontWeight: 'bold', color: '#B12704', float: 'right' }}>
                                                    {formatter.format(value.productId.price)}
                                                </Typography> */}
                                                {value.productId.onSale && <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#cc1c39', float: 'right' }}>
                                                    Discounted Price {formatter.format(value.productId.priceAfterDiscount)}
                                                </Typography>}
                                                <Typography variant='caption' style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                    {value.productId.onSale ? <del>{formatter.format(value.productId.price)}</del> : formatter.format(value.productId.price)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                                    </React.Fragment>
                                )
                            }) : <h1>No Items in cart</h1>}
                            <Divider style={{ marginTop: 10, marginBottom: 20 }} />
                            <Typography style={{ float: 'right' }}>
                                Subtotal({products.length} items): <strong style={{ color: '#B12704' }}>{formatter.format(subTotal)}</strong>
                            </Typography>
                        </Grid>
                        <Grid item md={3} style={{ width: '100%' }}>
                            <TotalCartCard noOfItems={products.length} price={subTotal} />
                        </Grid>
                    </Grid>
                </Container> : <Container maxWidth='lg' style={{ marginTop: 30 }}><h1>Please login first.</h1></Container>}
            </div >
        );
    }
}

export default withStyles(styles)(Cart);