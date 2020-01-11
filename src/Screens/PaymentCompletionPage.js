import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Grid,
    Divider,
    TextField,
    Select,
    MenuItem,
    FormControl,
    Button,
    Card,
    CardHeader,
    CardContent,
    CardActionArea,
    CardActions
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CircularProgress from '@material-ui/core/CircularProgress';

import connectionString from '../Static/Utilities/connectionString';

// Components
import CheckoutStepper from '../Components/CheckoutStepper';
import Axios from 'axios';

const styles = theme => ({
    card: {
        minWidth: 275,
        boxShadow: 'none'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class PaymentCompletionPage extends Component {

    componentDidMount() {
        this.getOrderRecipt();
    }

    componentDidUpdate(prevProps) {
        if (this.props.token !== prevProps.token) {
            this.getOrderRecipt();
        }
    }

    state = {
        reciept: '',
        loader: true,
    }

    getOrderRecipt = () => {
        const orderId = this.props.match.params.id;
        console.log(this.props.token);

        Axios({
            url: `${connectionString}/products/get-order-recipt/${orderId}`,
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + this.props.token
            }
        }).then(res => {
            console.log(res.data);
            this.setState({
                reciept: res.data.message,
                loader: false,
            })
        }).catch(err => {
            console.log(err.response);
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Container maxWidth='lg'>
                    <CheckoutStepper origin="complete" />
                    <Typography variant='h4'>
                        Thank you for your recent order
                        </Typography>
                    <Divider style={{ marginTop: 20, marginBottom: 10 }} />
                    <div style={{
                        justifyContent: 'center',
                        alignItems: 'center,',
                        display: 'inline-flex',
                        width: '100%',
                    }}>
                        <Card className={classes.card}>
                            <CardContent>
                                <div style={{
                                    justifyContent: 'center',
                                    alignItems: 'center,',
                                    display: 'inline-flex',
                                    width: '100%',
                                }}>
                                    <Typography className={classes.title} style={{ marginBottom: 20, color: '#009a00 ' }}>
                                        <CheckCircleIcon /> Your order has been placed
                                    </Typography>
                                </div>
                                <div style={{
                                    backgroundColor: '#add8e6',
                                    padding: 10,
                                    border: '1px solid #72bcd4',
                                    borderRadius: 10,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    color: '#286e84',
                                }}>
                                    <div style={{
                                        justifyContent: 'center',
                                        alignItems: 'center,',
                                        display: 'inline-flex',
                                        width: '100%',
                                    }}>
                                        <Typography variant="body1" style={{ fontSize: 15 }}>
                                            Order #: <strong>{this.props.match.params.id}</strong>
                                        </Typography>
                                    </div>
                                    <Typography className={classes.pos} style={{ color: '#286e84', fontSize: 15 }} color="textSecondary">
                                        If you need to check the status of your order <Link>Click Here</Link>
                                    </Typography>
                                </div>
                            </CardContent>
                            <CardActions>
                                <div style={{
                                    justifyContent: 'center',
                                    alignItems: 'center,',
                                    display: 'inline-flex',
                                    width: '100%',
                                }}>
                                    <Button style={{
                                        backgroundColor: '#f0c14b',
                                        color: '#111',
                                        fontWeight: 'normal',
                                        boxShadow: 'none',
                                        border: '1px solid black',
                                        borderColor: "#a88734 #9c7e31 #846a29",
                                        width: "50%",
                                        height: 40,
                                    }} size="small" onClick={() => this.props.history.push('/account')} >
                                        <ShoppingCartIcon style={{ marginRight: 10 }} /> View Order History
                                    </Button>
                                    {!this.state.loader
                                        ?
                                        <Button style={{
                                            backgroundColor: '#f0c14b',
                                            color: '#111',
                                            fontWeight: 'normal',
                                            boxShadow: 'none',
                                            border: '1px solid black',
                                            borderColor: "#a88734 #9c7e31 #846a29",
                                            width: "50%",
                                            height: 40,
                                            marginLeft: 20
                                        }}
                                            size="small"
                                            onClick={() => {
                                                window.open(
                                                    this.state.reciept,
                                                    '_blank'
                                                );
                                            }}
                                        >
                                            <AssessmentIcon style={{ marginRight: 10, }} /> View Recipt
                                        </Button>
                                        :
                                        <Button style={{
                                            backgroundColor: '#f0c14b',
                                            color: '#111',
                                            fontWeight: 'normal',
                                            boxShadow: 'none',
                                            border: '1px solid black',
                                            borderColor: "#a88734 #9c7e31 #846a29",
                                            width: "50%",
                                            height: 40,
                                            marginLeft: 20
                                        }} size="small">
                                            <CircularProgress />
                                        </Button>
                                    }
                                </div>
                            </CardActions>
                        </Card>
                    </div>
                </Container>
            </div >
        );
    }
}

export default withStyles(styles)(PaymentCompletionPage);