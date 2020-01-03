import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, Container, Paper, TextField, Grid, Divider } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Link } from 'react-router-dom';

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
        renderPassword: false
    }

    renderPassword = () => {
        return (
            <Paper style={{ width: 450 }}>
                <div style={{ padding: 30, width: '100%' }}>
                    <Typography variant="h5" component="h2">
                        Sign-In
                    </Typography>
                    <Grid>
                        <Grid style={{ marginTop: 10 }} item xs={12}>
                            <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13 }}>
                                Password
                            </Typography>
                            <TextField
                                required
                                id="standard-required"
                                variant='outlined'
                                type='password'
                            />
                        </Grid>
                        <Grid style={{ marginTop: 20 }} xs={12}>
                            <Link to='/account' style={{ textDecoration: 'none' }}>
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
                                    >
                                        Sign-In
                                </Button>
                                </div>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        )
    }

    render() {
        const { classes } = this.props;

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
                        <Grid>
                            <Grid xs={12} item>
                                <div style={{
                                    justifyContent: 'center',
                                    alignItems: 'center,',
                                    display: 'inline-flex',
                                    width: '100%',
                                    padding: 30,
                                    paddingTop: 0
                                }}>
                                    {!this.state.renderPassword && <Paper style={{ width: 450 }}>
                                        <div style={{ padding: 30, width: '100%' }}>
                                            <Typography variant="h5" component="h2">
                                                Sign-In
                                            </Typography>
                                            <Grid>
                                                <Grid style={{ marginTop: 10 }} item xs={12}>
                                                    <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13 }}>
                                                        Email
                                                    </Typography>
                                                    <TextField
                                                        required
                                                        id="standard-required"
                                                        variant='outlined'
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
                                                            onClick={() => this.setState({ renderPassword: true })}
                                                        >
                                                            Continue
                                                        </Button>
                                                    </div>
                                                </Grid>
                                                <Grid style={{ marginTop: 20 }} xs={12}>
                                                    <Typography variant='overline'>
                                                        By continuing, you agree to Computer Store's Conditions of Use and Privacy Notice.
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Paper>}
                                    {this.state.renderPassword && this.renderPassword()}
                                </div>
                            </Grid>
                            <Divider style={{ marginTop: -10 }} />
                            <Grid xs={12} item>
                                <div style={{
                                    justifyContent: 'center',
                                    alignItems: 'center,',
                                    display: 'inline-flex',
                                    width: '100%',
                                    padding: 30,
                                    marginTop: -30
                                }}>
                                    <Paper style={{ width: 450, boxShadow: 'none' }}>
                                        <div style={{ padding: 30, width: '100%' }}>
                                            <Grid>
                                                <Grid>
                                                    <Grid xs={12}>
                                                        <div style={{
                                                            justifyContent: 'center',
                                                            alignItems: 'center,',
                                                            display: 'inline-flex',
                                                            width: '100%',
                                                        }}>
                                                            <Typography variant='overline'>
                                                                New to Computer Store?
                                                            </Typography>
                                                        </div>
                                                    </Grid>
                                                    <Grid style={{ marginTop: 10 }} xs={12}>
                                                        <Link to='/register' style={{ textDecoration: 'none' }}>
                                                            <Button variant="contained"
                                                                style={{
                                                                    width: '100%',
                                                                    backgroundColor: '#eff0f3',
                                                                    color: '#111',
                                                                    fontWeight: 'normal',
                                                                    boxShadow: 'none',
                                                                    border: '1px solid black',
                                                                    borderColor: "#adb1b8 #a2a6ac #8d9096",
                                                                }}
                                                            >
                                                                Create your Computer store account
                                                            </Button>
                                                        </Link>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Paper>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </div >
        );
    }
}

export default withStyles(styles)(Register);