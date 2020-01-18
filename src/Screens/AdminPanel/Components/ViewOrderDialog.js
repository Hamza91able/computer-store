import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Container, Grid, Box, Card, CardContent, CardActions, CircularProgress } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import connectionString from '../../../Static/Utilities/connectionString';
import swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    rating1: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0
})

export default function FullScreenDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { order } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size='small' style={{
                backgroundColor: '#f0c14b',
                color: '#111',
                fontWeight: 'normal',
                bomdhadow: 'none',
                border: '1px solid black',
                borderColor: "#a88734 #9c7e31 #846a29",
            }} onClick={() => { handleClickOpen(); props.getOrder(props.id) }} >
                View Order
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Order # {order._id}
                        </Typography>
                        {props.markAsDelievered ?
                            <Button size='medium' style={{
                                backgroundColor: '#f0c14b',
                                color: '#111',
                                fontWeight: 'normal',
                                boxShadow: 'none',
                                border: '1px solid black',
                                borderColor: "#a88734 #9c7e31 #846a29",
                            }} onClick={() => {
                                props.markAsDelievered(props.id);
                                handleClose();
                            }}>
                                Mark as Delievered
                            </Button>
                            :
                            <Button disabled={true} size='medium' style={{
                                backgroundColor: '#f0c14b',
                                color: '#111',
                                fontWeight: 'normal',
                                boxShadow: 'none',
                                border: '1px solid black',
                                borderColor: "#a88734 #9c7e31 #846a29",
                            }}>
                                Order Complete
                            </Button>
                        }
                    </Toolbar>
                </AppBar>
                <br />
                <Container maxWidth='lg'>
                    <Grid container spacing={3}>
                        <Grid item md={4}>
                            <Grid>
                                <Grid md={12}>
                                    <Typography variant='h5'>
                                        User Details
                                    </Typography>
                                    <Divider style={{ marginBottom: 20, marginTop: 20 }} />
                                    <Card className={classes.card}>
                                        {order.user ?
                                            <CardContent>
                                                <Typography className={classes.title} gutterBottom>
                                                    <strong>Name:</strong> {order.user.fullName}
                                                </Typography>
                                                <Typography variant="body1" component="h2">
                                                    <strong>Address:</strong> {order.user.addressLine1} {order.user.addressLine2 || ""}, {order.user.city} {order.user.state} {order.user.country}
                                                </Typography>
                                                <Typography className={classes.pos} >
                                                    <strong>ZIP:</strong> {order.user.zip}
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    <strong>Phone Number:</strong> {order.user.phoneNumber}
                                                    <br />
                                                    <strong>Extra Information:</strong> {order.user.delieveryInformation || "Not extra provided"}
                                                </Typography>
                                            </CardContent> :
                                            <div style={{
                                                justifyContent: 'center',
                                                alignItems: 'center,',
                                                display: 'inline-flex',
                                                width: '100%',
                                            }}>
                                                <CircularProgress style={{ marginTop: 20 }} />
                                            </div>}
                                    </Card>
                                </Grid>
                                <Divider style={{ marginTop: 20, marginBottom: 10 }} />
                                <Grid md={12}>
                                    <Typography variant='h5'>
                                        Order Details
                                    </Typography>
                                    <Divider style={{ marginBottom: 10, marginTop: 10 }} />
                                    <Card className={classes.card}>
                                        {order.user ?
                                            <CardContent>
                                                <Typography className={classes.title} gutterBottom>
                                                    <strong>Order#</strong> {order._id}
                                                </Typography>
                                                <Typography variant="body1" component="h2">
                                                    <strong>Status:</strong> {order.status}
                                                </Typography>
                                                <Typography className={classes.pos} >
                                                    <strong>Shipping Cost:</strong> {order.shippingCost}
                                                </Typography>
                                                <Typography className={classes.pos} >
                                                    <strong>Total Cost:</strong> {order.totalCost}
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    <strong>Order Placed on:</strong> {moment(order.createdAt).format('MMMM Do YYYY, h:mm a')}
                                                </Typography>
                                            </CardContent> :
                                            <div style={{
                                                justifyContent: 'center',
                                                alignItems: 'center,',
                                                display: 'inline-flex',
                                                width: '100%',
                                            }}>
                                                <CircularProgress style={{ marginTop: 20 }} />
                                            </div>}
                                        <CardActions>
                                            <Button style={{
                                                float: 'right',
                                                backgroundColor: '#f0c14b',
                                                color: '#111',
                                                fontWeight: 'normal',
                                                bomdhadow: 'none',
                                                border: '1px solid black',
                                                borderColor: "#a88734 #9c7e31 #846a29",
                                            }} onClick={() => {
                                                window.open(
                                                    order.receipt,
                                                    '_blank'
                                                );
                                            }}>
                                                Open receipt
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item md={8}>
                            <Typography variant='h5'>
                                Products
                            </Typography>
                            <Divider style={{ marginBottom: 20, marginTop: 20 }} />
                            {order.products ? order.products.map((value, index) => {
                                return (
                                    <React.Fragment>
                                        <Grid container spacing={2}>
                                            <Grid item md={12} md={2}>
                                                <div style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center,',
                                                    display: 'inline-flex',
                                                    width: '100%',
                                                }}>
                                                    {value.product.pictures && <Link to={`/product-details/${value.product._id}`}>
                                                        <img style={{ height: 100, width: 100 }} src={value.product.pictures[0]} />
                                                    </Link>}
                                                </div>
                                            </Grid>
                                            <Grid item md={9} md={9}>
                                                <Link className={classes.link} to={`/product-details/${value.product._id}`}>
                                                    <Typography style={{ fontWeight: 'bold', maxWidth: 590 }} className={classes.title} gutterBottom>
                                                        {value.product.title}
                                                    </Typography>
                                                </Link>
                                                <div className={classes.rating1}>
                                                    <Rating
                                                        name="hover-side"
                                                        value={value.product.averageRating}
                                                        size="small"
                                                        readOnly={true}
                                                    />
                                                    <Box style={{ marginTop: -10, fontSize: 13, marginLeft: 7 }}>{value.product.reviews ? value.product.reviews.length : "(0)"}</Box>
                                                </div>
                                                <Typography style={{ fontSize: 13 }} className={classes.title} color="textSecondary" gutterBottom>
                                                    Sold and Shipped by: <strong>{value.product.soldAndShippedBy}</strong>
                                                </Typography>
                                                <br />
                                                <Grid container>
                                                    <Typography>
                                                        Quantity: {value.quantity}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item md={3} md={1}>
                                                {/* <Typography variant='caption' style={{ fontSize: 16, fontWeight: 'bold', color: '#B12704', float: 'right' }}>
                                                    {formatter.format(value.product.price)}
                                                </Typography> */}
                                                {value.product.onSale && <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#cc1c39', float: 'right' }}>
                                                    {formatter.format(value.product.priceAfterDiscount)}
                                                </Typography>}
                                                <Typography variant='caption' style={{ fontSize: 14, fontWeight: 'bold', float: 'right' }}>
                                                    {value.product.onSale ? <del>{formatter.format(value.product.price)}</del> : formatter.format(value.product.price)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                                    </React.Fragment>
                                )
                            }) :
                                <div style={{
                                    justifyContent: 'center',
                                    alignItems: 'center,',
                                    display: 'inline-flex',
                                    width: '100%',
                                }}>
                                    <CircularProgress style={{ marginTop: 20 }} />
                                </div>}
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}