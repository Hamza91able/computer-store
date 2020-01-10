import React, { Component } from 'react';
import { Container, Typography, Divider, Grid, Button } from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert2';

import connectionString from '../Static/Utilities/connectionString';

// Components
import CheckoutStepper from '../Components/CheckoutStepper';

class Checkout extends Component {

    state = {
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phoneNumber: '',
        delieveryInformation: '',
    }

    saveUserInformation = () => {
        const {
            fullName,
            addressLine1,
            addressLine2,
            city,
            state,
            zip,
            country,
            phoneNumber,
            delieveryInformation,
        } = this.state;

        axios({
            url: `${connectionString}/user/save-information`,
            method: 'POST',
            data: {
                fullName,
                addressLine1,
                addressLine2,
                city,
                state,
                zip,
                country,
                phoneNumber,
                delieveryInformation,
            },
            headers: {
                Authorization: 'bearer ' + this.props.token
            }
        }).then(res => {
            console.log(res.data);
            swal.fire({
                icon: 'success',
                title: 'Delievery information successfully saved',
            }).then(() => {
                this.props.history.replace('/review-items');
            })
        }).catch(err => {
            console.log(err.response.statusText);
            swal.fire({
                icon: 'error',
                title: 'Internal Server Error',
            })
        })
    }

    render() {
        return (
            <div>
                <Container maxWidth='lg'>
                    <CheckoutStepper />
                    <Grid>
                        <Typography variant='h4'>
                            Deliever to this address
                        </Typography>
                        When finished, click the "Deliever to this address" button to proceed with your order.
                    <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                        <Grid item xs={12} md={4}>
                            <div>
                                <div style={{ height: 13 }} />
                                <Typography style={{ fontWeight: 700, fontSize: 13 }}>
                                    Full name:
                                </Typography>
                                <input
                                    style={{ width: '100%', color: '-internal-light-dark-color(black, white);' }}
                                    onChange={e => this.setState({ fullName: e.target.value })}
                                />
                                <div style={{ height: 13 }} />
                                <Typography style={{ fontWeight: 700, fontSize: 13 }}>
                                    Address line 1:
                                </Typography>
                                <input
                                    style={{ width: '100%' }}
                                    onChange={e => this.setState({ addressLine1: e.target.value })}
                                />
                                <div style={{ height: 13 }} />
                                <Typography style={{ fontWeight: 700, fontSize: 13 }}>
                                    Address line 2:
                                </Typography>
                                <input
                                    style={{ width: '100%' }}
                                    onChange={e => this.setState({ addressLine2: e.target.value })}
                                />
                                <div style={{ height: 13 }} />
                                <Typography style={{ fontWeight: 700, fontSize: 13 }}>
                                    City:
                                </Typography>
                                <input
                                    style={{ width: '100%' }}
                                    onChange={e => this.setState({ city: e.target.value })}
                                />
                                <div style={{ height: 13 }} />
                                <Typography style={{ fontWeight: 700, fontSize: 13 }}>
                                    State/Province/Region
                                </Typography>
                                <input
                                    style={{ width: '100%' }}
                                    onChange={e => this.setState({ state: e.target.value })}
                                />
                                <div style={{ height: 13 }} />
                                <Typography style={{ fontWeight: 700, fontSize: 13 }}>
                                    ZIP:
                                </Typography>
                                <input
                                    style={{ width: '100%' }}
                                    onChange={e => this.setState({ zip: e.target.value })}
                                />
                                <div style={{ height: 13 }} />
                                <Typography style={{ fontWeight: 700, fontSize: 13 }}>
                                    Country
                                </Typography>
                                <input value='Pakistan' style={{ width: '100%' }} disabled={true} />
                                <div style={{ height: 13 }} />
                                <Typography style={{ fontWeight: 700, fontSize: 13 }}>
                                    Phone number:
                                </Typography>
                                <input
                                    style={{ width: '100%' }}
                                    onChange={e => this.setState({ phoneNumber: e.target.value })}
                                />
                                <div style={{ height: 13 }} />
                                <Typography style={{ fontWeight: 700, fontSize: 15 }}>
                                    Add delievery instructions (optional)
                                </Typography>
                                <Typography varinat='caption' style={{ fontWeight: 500, fontSize: 13 }}>
                                    Do we need additional instructions to find this address?
                                </Typography>
                                <input
                                    style={{ width: '100%' }}
                                    onChange={e => this.setState({ delieveryInformation: e.target.value })}
                                />
                            </div>
                            <br />
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#f0c14b',
                                    color: '#111',
                                    fontWeight: 'normal',
                                    boxShadow: 'none',
                                    border: '1px solid black',
                                    borderColor: "#a88734 #9c7e31 #846a29",
                                    float: 'right',
                                }}
                                onClick={this.saveUserInformation}
                            >
                                Deliever to this address
                            </Button>
                        </Grid>
                    </Grid>

                </Container>
            </div >
        );
    }
}

export default Checkout;