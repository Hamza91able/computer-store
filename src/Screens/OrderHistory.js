import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Divider, Button, Paper } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Axios from 'axios';

import connectionString from '../Static/Utilities/connectionString';
import swal from 'sweetalert2';

const styles = theme => ({
    root: {
        // display: 'flex',
    },
});

class OrderHistory extends Component {

    state = {
        orders: [],
    }

    componentDidUpdate(prevProps) {
        if (this.props.token !== prevProps.token) {
            this.getOrders();
        }
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders = () => {

        Axios({
            url: `${connectionString}/order/get-user-order`,
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + this.props.token
            }
        }).then(res => {
            this.setState({
                orders: res.data.orders
            });
        }).catch(err => {
            console.log(err);
            // swal.fire({
            //     icon: 'error',
            //     title: 'Error retrieving order history',
            // })
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <React.Fragment>
                    <Typography variant='h5' style={{ paddingTop: 20, paddingBottom: 6, color: 'rgb(255, 163, 58)', fontWeight: 'bold' }}>
                        Order History
                        </Typography>
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                    <div className={classes.root}>
                        {this.state.orders.length > 0
                            ?
                            this.state.orders.map((order, i) => {
                                return (
                                    <React.Fragment>
                                        <Paper style={{ width: '100%' }} variant="outlined">
                                            <Typography variant='body1' style={{ fontSize: 15, padding: 5 }}>
                                                Order #{order._id}
                                                <Button style={{
                                                    float: 'right',
                                                    backgroundColor: '#f0c14b',
                                                    color: '#111',
                                                    fontWeight: 'normal',
                                                    boxShadow: 'none',
                                                    border: '1px solid black',
                                                    borderColor: "#a88734 #9c7e31 #846a29",
                                                    marginTop: 5
                                                }} onClick={() => {
                                                    window.open(
                                                        order.receipt,
                                                        '_blank'
                                                    );
                                                }}>
                                                    Open receipt
                                            </Button>
                                                <br />
                                                <Typography style={{ fontSize: 13 }} variant='caption' color="textSecondary" gutterBottom>
                                                    <strong>Placed on 17 Sep 2019 18:54:10</strong>
                                                </Typography>
                                            </Typography>
                                            <Divider />
                                            {order.products.map((product, i2) => {
                                                return (
                                                    <React.Fragment>
                                                        <Grid style={{ padding: 20 }} container spacing={1}>
                                                            {product.product.pictures && <Grid item md={2}>
                                                                <img style={{ hegiht: 80, width: 80 }} src={product.product.pictures[0]} />
                                                            </Grid>}
                                                            <Grid item md={4}>
                                                                <Typography style={{ width: '100%' }}>
                                                                    {product.product.title}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item md={1}>
                                                                <Typography variant='caption' style={{ width: '100%' }}>
                                                                    <Typography style={{ fontSize: 15 }} variant='caption' color="textSecondary" gutterBottom>
                                                                        Qty:
                                                                </Typography> <strong style={{ fontSize: 15 }}>{product.quantity}</strong>
                                                                </Typography>
                                                            </Grid>
                                                            {product.product.delivered ?
                                                                <React.Fragment>
                                                                    <Grid item md={2}>
                                                                        <Chip style={{ height: 20 }} label="Delivered" />
                                                                    </Grid>
                                                                    <Grid item md={3}>
                                                                        <Typography style={{ fontSize: 13 }} variant='caption' color="textSecondary" gutterBottom>
                                                                            <strong>Delivered on 19 Aug 2019</strong>
                                                                        </Typography>
                                                                    </Grid>
                                                                </React.Fragment>
                                                                :
                                                                <React.Fragment>
                                                                    <Grid item md={2}>
                                                                        <Chip style={{ height: 20 }} label="Not Yet Delivered" />
                                                                    </Grid>
                                                                    <Grid item md={3}>
                                                                        <Typography style={{ fontSize: 13 }} variant='caption' color="textSecondary" gutterBottom>
                                                                            <strong>DELIVERY PENDING</strong>
                                                                        </Typography>
                                                                    </Grid>
                                                                </React.Fragment>
                                                            }
                                                        </Grid>
                                                        <Divider />
                                                    </React.Fragment>
                                                )
                                            })}
                                        </Paper>
                                        <br />
                                    </React.Fragment>
                                )
                            })
                            :
                            <h1>No orders</h1>}
                    </div>
                </React.Fragment>
            </div>
        );
    }
}

export default withStyles(styles)(OrderHistory);