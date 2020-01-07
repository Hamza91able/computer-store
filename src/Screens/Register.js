import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, Container, Paper, TextField, Grid, Divider } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import axios from 'axios';

import connectionString from '../Static/Utilities/connectionString';

// Static
import '../Static/CSS/Register.css';


const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    titleCard: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    title: {
        flexGrow: 1,
        margin: 5,
    },
});

class Register extends Component {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    }

    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        const { email, password, confirmPassword, name } = this.state;

        return (
            <div>
                <Container maxWidth='lg'>
                    <Paper>
                        <Typography variant="h5" className={classes.title}>
                            <div style={{
                                justifyContent: 'center',
                                alignItems: 'center,',
                                display: 'inline-flex',
                                width: '100%',
                                padding: 30,
                                color: '#ffa33a',
                                fontWeight: 'bold'
                            }}>
                                COMPUTER STORE
                            </div>
                        </Typography>
                        <div style={{
                            justifyContent: 'center',
                            alignItems: 'center,',
                            display: 'inline-flex',
                            width: '100%',
                            padding: 30,
                            paddingTop: 0
                        }}>
                            <Paper style={{ width: 450 }}>
                                <div style={{ padding: 30, width: '100%' }}>
                                    <Typography variant="h5" component="h2">
                                        Create account
                                     </Typography>
                                    <Grid>
                                        <Grid style={{ marginTop: 10 }} item xs={12}>
                                            <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13 }}>
                                                Your Name
                                            </Typography>
                                            <TextField
                                                required
                                                id="standard-required"
                                                variant='outlined'
                                                name='name'
                                                onChange={this.handleInput}
                                            />
                                        </Grid>
                                        <Grid style={{ marginTop: 10 }} item xs={12}>
                                            <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13 }}>
                                                Email
                                            </Typography>
                                            <TextField
                                                required
                                                id="standard-required"
                                                variant='outlined'
                                                name='email'
                                                onChange={this.handleInput}
                                            />
                                        </Grid>
                                        <Grid style={{ marginTop: 10 }} item xs={12}>
                                            <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13 }}>
                                                Password
                                            </Typography>
                                            <TextField
                                                required
                                                id="standard-required"
                                                variant='outlined'
                                                helperText="Password Must Be 6 Characters"
                                                type='password'
                                                name='password'
                                                onChange={this.handleInput}
                                            />
                                        </Grid>
                                        <Grid style={{ marginTop: 10 }} item xs={12}>
                                            <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13 }}>
                                                Re-enter password
                                            </Typography>
                                            <TextField
                                                required
                                                id="standard-required"
                                                variant='outlined'
                                                type='password'
                                                name='confirmPassword'
                                                onChange={this.handleInput}
                                            />
                                        </Grid>
                                        <Grid style={{ marginTop: 20 }} xs={12}>
                                            <div style={{
                                                justifyContent: 'center',
                                                alignItems: 'center,',
                                                display: 'inline-flex',
                                                width: '100%',
                                            }}>
                                                <Button
                                                    variant="contained"
                                                    style={{
                                                        width: '185%',
                                                        backgroundColor: '#f0c14b',
                                                        color: '#111',
                                                        fontWeight: 'normal',
                                                        boxShadow: 'none',
                                                        border: '1px solid black',
                                                        borderColor: "#a88734 #9c7e31 #846a29",
                                                    }}
                                                    onClick={() => this.props.onRegister({ email, password, confirmPassword, name })}
                                                >
                                                    Create your Computer Store account
                                                </Button>
                                            </div>
                                        </Grid>
                                        <Grid style={{ marginTop: 20 }} xs={12}>
                                            <Typography variant='overline'>
                                                By creating an account, you agree to Computer Store's Conditions of Use and Privacy Notice.
                                            </Typography>
                                        </Grid>
                                        <Divider style={{ marginTop: 20 }} />
                                        <Grid style={{ marginTop: 20 }} xs={12}>
                                            <Typography variant='overline'>
                                                Already have an account? <Link to='/login'>Sign-In</Link>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>

                            </Paper>
                        </div>
                    </Paper>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Register);