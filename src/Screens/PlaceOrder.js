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
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import connectionString from '../Static/Utilities/connectionString';

// Components
import CheckoutStepper from '../Components/CheckoutStepper';
import ChangeCardInfoModal from '../Components/ChangeCardInfoModal';

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

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 2
})

class PlaceOrder extends Component {

    state = {
        shippingInformation: {},
        products: [],
        name: '',
        cardNumber: '',
        month: '',
        year: '',
        subTotal: 0,
        shippingCost: 0,
        discount: 0,
        cvv: '',
    }

    componentDidMount() {
        if (!this.props.isAuth) {
            window.location.replace('/');
        }
        this.getShippingInformation();
        this.setState({
            name: this.props.match.params.n,
            cardNumber: this.props.match.params.c,
            month: this.props.match.params.m,
            year: this.props.match.params.y,
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.token !== prevProps.token) {
            this.getShippingInformation();
        }
    }

    changeCardInformation = (name, cardNumber, month, year) => {
        this.setState({
            name,
            cardNumber,
            month,
            year,
        })
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
                let shippingCost = 0;
                let discount = 0;
                this.state.products.forEach((product, index) => {
                    subtotal = subtotal + (product.productId.price * product.quantity)
                    console.log(this.state.shippingInformation.city === "Karachi")
                    if (this.state.shippingInformation.city === "Karachi") {
                        shippingCost = shippingCost + product.productId.shippingInKarachi
                    } else {
                        shippingCost = shippingCost + product.productId.shippingCost
                    }
                    if (product.productId.onSale) {
                        discount = discount + (product.productId.price - product.productId.priceAfterDiscount)
                    }
                })
                this.setState({
                    subTotal: subtotal,
                    shippingCost: shippingCost,
                    discount,
                })
            })
        }).catch(err => {
            // console.log(err.response);
        })
    }

    getShippingInformation = () => {

        axios({
            url: `${connectionString}/user/get-user-delievery-information`,
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + this.props.token,
            }
        }).then(res => {
            this.setState({
                shippingInformation: res.data.user,
            }, () => {
                this.getCart();
            })
        }).catch(err => {
            // console.log(err.response);
        })
    }

    pay = () => {
        const { name, cardNumber, month, year, cvv, shippingInformation } = this.state;
        const { addressLine1, addressLine2, city, state, zip } = shippingInformation;

        axios({
            url: `${connectionString}/products/charge`,
            method: 'POST',
            headers: {
                Authorization: 'bearer ' + this.props.token,
            },
            data: {
                name,
                cardNumber,
                month,
                year,
                cvv,
                addressLine1,
                addressLine2,
                city,
                state,
                zip
            },
        }).then(res => {
            console.log(res.data);
            swal.fire({
                icon: 'success',
                title: 'Order Placed',
                message: 'Payment Approved!'
            }).then(() => {
                this.props.history.replace(`/buy/complete/${res.data.id}`)
            })
        }).catch(err => {
            console.log(err.response);
            swal.fire({
                icon: 'error',
                title: 'Error while placing order',
                text: `${err.response.data.message}`,
            })
        })
    }

    render() {
        const { classes } = this.props;
        const { shippingInformation, products, name, cardNumber, month, year, subTotal, shippingCost, discount } = this.state;

        return (
            <React.Fragment>
                {this.props.isAuth &&
                    <div>
                        <div style={{ height: 50 }} />
                        <Container maxWidth='lg'>
                            <CheckoutStepper origin="placeorder" />
                            <br />
                            <Typography variant='h4'>
                                Place Your Order
                     </Typography>
                            By placing your order, you agree to Computer Store's <Link>privacy notice</Link> and <Link>conditions of use</Link>
                            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                            <div style={{ border: '1px solid black', padding: 20 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={9}>
                                        <Typography>
                                            <Grid container spacing={3}>
                                                <Grid item xs={6}>
                                                    <Typography style={{ fontWeight: 'bold', marginBottom: 10 }}>
                                                        Shipping Address:
                                             </Typography>
                                                    <ul>
                                                        <li>{shippingInformation.fullName}</li>
                                                        <li>{shippingInformation.addressLine1} {shippingInformation.addressLine2}, {shippingInformation.state}, {shippingInformation.city}</li>
                                                        <li>{shippingInformation.phoneNumber}</li>
                                                        <li>{shippingInformation.zip}</li>
                                                        <li>{shippingInformation.delieveryInformation}</li>
                                                    </ul>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography style={{ fontWeight: 'bold', marginBottom: 10 }}>
                                                        Billing Information:
                                             </Typography>
                                                    <ul>
                                                        <li><strong>Name on card: </strong>{name}</li>
                                                        {cardNumber && <li><strong>Card number: </strong>{cardNumber.match(/.{1,4}/g).join(' ')}</li>}
                                                        <li><strong>Expiry date: </strong>{month}/{year}</li>
                                                        <li><strong>CVV*: </strong>
                                                            <input
                                                                type="text"
                                                                pattern="[0-9]*"
                                                                maxlength="3"
                                                                style={{ width: 50 }}
                                                                value={this.state.cvv}
                                                                onChange={event => this.setState({ cvv: event.target.value.replace(/\D/, '') })}
                                                            />
                                                        </li>
                                                    </ul>
                                                    {name && cardNumber && month && year &&
                                                        <ChangeCardInfoModal
                                                            changeCardInformation={this.changeCardInformation}
                                                            name={name}
                                                            cardNumber={cardNumber}
                                                            month={month}
                                                            year={year}
                                                        />}
                                                </Grid>
                                            </Grid>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <div style={{ border: '1px solid black', backgroundColor: 'white' }}>
                                            <div style={{
                                                justifyContent: 'center',
                                                alignItems: 'center,',
                                                display: 'inline-flex',
                                                width: '100%',
                                                backgroundColor: '#add8e6',
                                                padding: 15
                                            }}>
                                                {this.state.cvv.length === 3
                                                    ?
                                                    <Button
                                                        variant="contained"
                                                        style={{
                                                            backgroundColor: '#f0c14b',
                                                            color: '#111',
                                                            fontWeight: 'normal',
                                                            boxShadow: 'none',
                                                            border: '1px solid black',
                                                            borderColor: "#a88734 #9c7e31 #846a29",
                                                        }}
                                                        onClick={this.pay}
                                                    >
                                                        Place Your Order
                                                    </Button>
                                                    :
                                                    <Button
                                                        variant="contained"
                                                        style={{
                                                            backgroundColor: '#f0c14b',
                                                            color: '#111',
                                                            fontWeight: 'normal',
                                                            boxShadow: 'none',
                                                            border: '1px solid black',
                                                            borderColor: "#a88734 #9c7e31 #846a29",
                                                        }}
                                                        disable={true}
                                                    >
                                                        Please enter your cvv
                                                    </Button>
                                                }
                                            </div>
                                            <div style={{
                                                justifyContent: 'center',
                                                alignItems: 'center,',
                                                display: 'inline-flex',
                                                width: '100%',
                                                fontWeight: 'bold',
                                                padding: 10,
                                                fontSize: 17
                                            }}>
                                                Order Summary
                                     </div>
                                            <Grid container spacing={0}>
                                                <Grid item xs={1}>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    Items
                                         </Grid>
                                                <Grid item xs={5}>
                                                    <strong style={{ float: 'right' }}>{formatter.format(this.state.subTotal)}</strong>
                                                </Grid>
                                                <Grid item xs={1}>
                                                </Grid>
                                                <Grid item xs={1}>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    Shipping & Handling
                                         </Grid>
                                                <Grid item xs={3}>
                                                    <strong style={{ float: 'right' }}>{formatter.format(shippingCost)}</strong>
                                                </Grid>
                                                <Grid item xs={1}>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider variant='inset' style={{ marginTop: 5, marginBottom: 5 }} />
                                                </Grid>
                                                <Grid item xs={1}>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    Total before discount
                                         </Grid>
                                                <Grid item xs={3}>
                                                    <strong style={{ float: 'right' }}>{formatter.format(subTotal + shippingCost)}</strong>
                                                </Grid>
                                                <Grid item xs={1}>
                                                </Grid>
                                                <Grid item xs={1}>
                                                </Grid>
                                                <Grid item xs={7}>
                                                    Discount
                                         </Grid>
                                                <Grid item xs={3}>
                                                    <strong style={{ float: 'right' }}>{formatter.format(discount)}</strong>
                                                </Grid>
                                                <Grid item xs={1}>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center,',
                                                        display: 'inline-flex',
                                                        width: '100%',
                                                        padding: 10,
                                                        color: '#890000',
                                                        fontWeight: 'bold',
                                                        fontSize: 18
                                                    }}>
                                                        Order Total: {formatter.format((subTotal - discount) + shippingCost)}
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                                <Typography variant='body1' style={{ marginBottom: 20, fontSize: 15 }}>
                                    Estimated delievery: 3-5 Business Days
                         </Typography>
                                {products.map((value, index) => {
                                    return (
                                        <React.Fragment>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={1}>
                                                    <div style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center,',
                                                        display: 'inline-flex',
                                                        width: '100%',
                                                    }}>
                                                        {value.productId.pictures && <Link to={`/product-details/${value.productId._id}`}>
                                                            <img style={{ height: 100, width: 100 }} src={value.productId.pictures[0]} />
                                                        </Link>}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={9} md={9}>
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
                                                            readOnly={true}
                                                        />
                                                        <Box style={{ marginTop: -10, fontSize: 13, marginLeft: 7 }}>{value.productId.reviews ? value.productId.reviews.length : "(0)"}</Box>
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
                                                <Grid item xs={3} md={1}>
                                                    {/* <Typography variant='caption' style={{ fontSize: 16, fontWeight: 'bold', color: '#B12704', float: 'right' }}>
                                                 {formatter.format(value.productId.price)}
                                             </Typography> */}
                                                    {value.productId.onSale && <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#cc1c39', float: 'right' }}>
                                                        {formatter.format(value.productId.priceAfterDiscount)}
                                                    </Typography>}
                                                    <Typography variant='caption' style={{ fontSize: 14, fontWeight: 'bold', float: 'right' }}>
                                                        {value.productId.onSale ? <del>{formatter.format(value.productId.price)}</del> : formatter.format(value.productId.price)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </Container>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(PlaceOrder);