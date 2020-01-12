import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container, FormControl, InputLabel, Divider, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import swal from 'sweetalert2'

import connectionString from '../../../Static/Utilities/connectionString';

// Components
import OrdersTable from '../Components/OrdersTable';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function sortArray(a, b) {
    return a - b;
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SimpleTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Pending Orders" {...a11yProps(0)} />
                    <Tab label="Completed Orders" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <PendingOrders token={props.token} userId={props.userId} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CompletedOrders token={props.token} userId={props.userId} />
            </TabPanel>
        </div>
    );
}

class PendingOrders extends Component {

    state = {
        orders: [],
        order: {},
        delievered: false
    }

    componentDidMount() {
        console.log("did mount")
        this.getPendingOrders();
    }

    getPendingOrders = () => {
        console.log("TES");

        axios({
            url: `${connectionString}/admin/get-pending-orders`,
            method: 'GET',
        }).then(res => {
            this.setState({
                orders: res.data.orders,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    getOrder = orderId => {
        axios({
            url: `${connectionString}/admin/get-order/${orderId}`,
            method: 'GET'
        }).then(res => {
            console.log(res.data);
            this.setState({
                order: res.data.order
            })
        }).catch(err => {
            console.log(err)
        })
    }

    markAsDelievered = orderId => {

        axios({
            url: `${connectionString}/admin/mark-as-delievered`,
            method: 'POST',
            data: {
                orderId,
            },
            headers: {
                Authorization: 'bearer ' + this.props.token,
            }
        }).then(res => {
            swal.fire({
                icon: 'success',
                title: 'Marked as Delievered',
                text: 'Order Completed',
            }).then(() => window.location.reload())
        }).catch(err => {
            console.log(err);
            swal.fire({
                icon: 'error',
                title: err.response.data.message || "Internal Server Error",
            });
        });
    }

    render() {

        return (
            <div>
                {
                    this.state.orders.length > 0
                        ?
                        <OrdersTable
                            markAsDelievered={this.markAsDelievered}
                            order={this.state.order}
                            getOrder={this.getOrder}
                            orders={this.state.orders}
                            token={this.props.token}
                            userId={this.props.userId}
                            delievered={this.state.delievered}
                        />
                        :
                        <div style={{
                            justifyContent: 'center',
                            alignItems: 'center,',
                            display: 'inline-flex',
                            width: '100%',
                        }}>
                            <CircularProgress style={{ marginTop: 20 }} />
                        </div>
                }
            </div >
        );
    }
}

class CompletedOrders extends Component {

    state = {
        orders: [],
        order: {},
    }

    componentDidMount() {
        this.getCompletedOrder();
    }

    getCompletedOrder = () => {

        axios({
            url: `${connectionString}/admin/get-completed-orders`,
            method: 'GET',
        }).then(res => {
            // console.log(res.data.orders);
            this.setState({
                orders: res.data.orders,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    getOrder = orderId => {
        axios({
            url: `${connectionString}/admin/get-order/${orderId}`,
            method: 'GET'
        }).then(res => {
            console.log(res.data);
            this.setState({
                order: res.data.order
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {

        return (
            <div>
                {
                    this.state.orders.length > 0
                        ?
                        <OrdersTable
                            orders={this.state.orders}
                            token={this.props.token}
                            userId={this.props.userId}
                            getOrder={this.getOrder}
                            order={this.state.order}
                        />
                        :
                        <div style={{
                            justifyContent: 'center',
                            alignItems: 'center,',
                            display: 'inline-flex',
                            width: '100%',
                        }}>
                            <CircularProgress style={{ marginTop: 20 }} />
                        </div>
                }
            </div >
        );
    }
}