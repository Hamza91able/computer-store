import React, { Component } from 'react';
import { Container, Grid, Typography, Divider, Button } from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert2';

import connectionString from '../Static/Utilities/connectionString';

// Components
import UserAccountOptionsList from '../Components/UserAccountOptionsList';

// Screens
import OrderHistory from './OrderHistory';

class UserAccount extends Component {

    state = {
        selectedLink: 'profile',
    }

    handleSelectedLink = link => {
        this.setState({
            selectedLink: link
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.token !== prevProps.token) {
            this.getUserInformation();
        }
    }


    componentDidMount() {
        this.getUserInformation();
        if (!this.props.isAuth) {
            window.location.replace('/');
        }
    }

    getUserInformation = () => {

        axios({
            url: `${connectionString}/user/get-user-delievery-information`,
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + this.props.token
            }
        }).then(res => {
            const user = res.data.user;
            this.setState({
                fullName: user.fullName,
                addressLine1: user.addressLine1,
                addressLine2: user.addressLine2,
                city: user.city,
                state: user.state,
                zip: user.zip,
                phoneNumber: user.phoneNumber,
                delieveryInformation: user.delieveryInformation,
                email: user.email
            })
        }).catch(err => {
            console.log(err.response)
        })
    }

    changePassword = () => {
        const { oldPassword, newPassword, confirmPassword } = this.state;

        if (newPassword === confirmPassword) {
            axios({
                url: `${connectionString}/auth/change-password`,
                method: 'POST',
                data: {
                    oldPassword,
                    newPassword,
                    confirmPassword,
                },
                headers: {
                    Authorization: 'bearer ' + this.props.token
                }
            }).then(res => {
                console.log(res.data);
                swal.fire({
                    icon: 'success',
                    title: 'Password Changed'
                }).then(() => window.location.reload())
            }).catch(err => {
                console.log(err);
                swal.fire({
                    icon: 'error',
                    title: err.response.data.message,
                })
            })
        } else {
            swal.fire({
                icon: 'error',
                title: "New password and confirm password not equal",
            })
        }
    }

    renderMyProfile = () => {

        return (
            <React.Fragment>
                <Typography variant='h5' style={{ paddingTop: 20, paddingBottom: 6, color: 'rgb(255, 163, 58)', fontWeight: 'bold' }}>
                    My Profile
                </Typography>
                <Divider />
                <br />
                <table style={{ width: "100%" }}>
                    <tr>
                        <th style={{ background: "#f0f3f6" }}>Full Name:</th>
                        <td>{this.state.fullName || "No name given"}</td>
                    </tr>
                    <tr>
                        <th style={{ background: "#f0f3f6" }}>Email Address:</th>
                        <td>{this.state.email || "No email given"}</td>
                    </tr>
                    <tr>
                        <th style={{ background: "#f0f3f6" }}>Phone</th>
                        <td>{this.state.phoneNumber || "No phone number given"}</td>
                    </tr>
                </table>
                <Typography variant='h5' style={{ paddingTop: 20, paddingBottom: 6, color: 'rgb(255, 163, 58)', fontWeight: 'bold' }}>
                    My Address
                </Typography>
                <Divider />
                <br />
                <table style={{ width: "100%" }}>
                    <tr>
                        <th style={{ background: "#f0f3f6" }}>Address</th>
                        {this.state.addressLine1 ? <td>{this.state.addressLine1} {this.state.addressLine2},{this.state.state} {this.state.city}</td> : <td>No address given</td>}
                    </tr>
                </table>
            </React.Fragment>
        )
    }

    renderChangePassword = () => {

        return (
            <React.Fragment>
                <Typography variant='h5' style={{ paddingTop: 20, paddingBottom: 6, color: 'rgb(255, 163, 58)', fontWeight: 'bold' }}>
                    Change Password
                </Typography>
                <Divider />
                <div>
                    <div style={{ height: 13 }} />
                    <Typography style={{ fontWeight: 700, fontSize: 13 }}>
                        Old password
                    </Typography>
                    <input type='password' onChange={e => this.setState({ oldPassword: e.target.value })} style={{ width: '100%' }} />
                    <div style={{ height: 13 }} />
                    <Typography style={{ fontWeight: 700, fontSize: 13 }}>
                        New password
                    </Typography>
                    <input type='password' onChange={e => this.setState({ newPassword: e.target.value })} style={{ width: '100%' }} />
                    <div style={{ height: 13 }} />
                    <Typography style={{ fontWeight: 700, fontSize: 13 }}>
                        Confirm password
                     </Typography>
                    <input type='password' onChange={e => this.setState({ confirmPassword: e.target.value })} style={{ width: '100%' }} />
                    <div style={{ height: 13 }} />
                </div>
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
                    onClick={this.changePassword}
                >
                    Change Password
                </Button>
            </React.Fragment>
        )
    }

    render() {
        const { selectedLink } = this.state;

        return (
            this.props.isAuth && <div>
                <br />
                <Container maxWidth='lg'>
                    <Typography variant='h5' style={{ padding: 20 }}>
                        Account
                    </Typography>
                    <Grid container xs={12} spacing={3}>
                        <Grid style={{ width: '100%' }} item md={4}>
                            <UserAccountOptionsList handleSelectedLink={this.handleSelectedLink} />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            {selectedLink === 'profile'
                                ?
                                this.renderMyProfile()
                                :
                                selectedLink === 'changePassword'
                                    ?
                                    this.renderChangePassword()
                                    :
                                    <OrderHistory token={this.props.token} userId={this.props.tokenId} />
                            }
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default UserAccount;