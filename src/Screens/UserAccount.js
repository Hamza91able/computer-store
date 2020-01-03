import React, { Component } from 'react';
import { Container, Grid, Typography, Divider, Button } from '@material-ui/core';

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
                        <td>Muhammad Hamza Khan</td>
                    </tr>
                    <tr>
                        <th style={{ background: "#f0f3f6" }}>Email Address:</th>
                        <td>hamza@gmail.com</td>
                    </tr>
                    <tr>
                        <th style={{ background: "#f0f3f6" }}>Phone</th>
                        <td>030023*****</td>
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
                        <td>There is no address saved with your account.</td>
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
                        Email:
                    </Typography>
                    <input style={{ width: '100%', color: '-internal-light-dark-color(black, white);' }} />
                    <div style={{ height: 13 }} />
                    <Typography style={{ fontWeight: 700, fontSize: 13 }}>
                        Old password
                    </Typography>
                    <input style={{ width: '100%' }} />
                    <div style={{ height: 13 }} />
                    <Typography style={{ fontWeight: 700, fontSize: 13 }}>
                        New password
                    </Typography>
                    <input style={{ width: '100%' }} />
                    <div style={{ height: 13 }} />
                    <Typography style={{ fontWeight: 700, fontSize: 13 }}>
                        Confirm password
                     </Typography>
                    <input style={{ width: '100%' }} />
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
                >
                    Change Password
                </Button>
            </React.Fragment>
        )
    }

    render() {
        const { selectedLink } = this.state;

        return (
            <div>
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
                                    <OrderHistory />
                            }
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default UserAccount;