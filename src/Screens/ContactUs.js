import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Container, CircularProgress } from '@material-ui/core';

// Axios
import axios from 'axios';

// sweetAlert
import swal from 'sweetalert';

const styles = {
    form: {
        padding: '20px',
        margin: '20px auto ',
        border: '2px solid #E2E2E2',
        width: '100%',
    },
    input1: {
        marginBottom: '10px !important',
    },
    notchedOutline: {
    },
    focused: {
        "& $notchedOutline": {
            borderColor: '#FF0083 !important'
        }
    },
}

class Contact extends React.Component {

    state = {
        email: null,
        subject: null,
        full_name: null,
        message: null,
    }


    handleTextFields = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleForm = (e) => {

        let messageObject = {
            // eslint-disable-next-line
            ['Full Name']: this.state.full_name,
            // eslint-disable-next-line
            ['Email']: this.state.email,
            // eslint-disable-next-line
            ['Subject']: this.state.subject,
            // eslint-disable-next-line
            ['Message']: this.state.message
        }

        axios.post(
            "https://formspree.io/mlejoeya",
            messageObject,
            { headers: { "Accept": "application/json" } }
        )
            .then(function (response) {
                console.log(response);
                swal('Thank you for Contacting Us ');
                window.location.replace(window.location.origin);
            })
            .catch(function (error) {
                console.log(error);
            });

        e.preventDefault();
    }

    render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <Container maxWidth='lg' style={{ marginTop: 30 }}>
                    <div style={{
                        justifyContent: 'center',
                        alignItems: 'center,',
                        display: 'inline-flex',
                        width: '100%',
                    }}>
                        <Row>
                            <Col sm={12}>
                                <Card>
                                    <Card.Header className="editprofile-card-header">
                                        <Card.Title>
                                            Send Us a Message
                                    </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <form className={classes.form} onSubmit={this.handleForm} >
                                            <TextField
                                                label='Full Name'
                                                className={classes.input1}
                                                variant="outlined"
                                                fullWidth
                                                placeholder="Enter your Full Name"
                                                name="full_name"
                                                InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline,
                                                        focused: classes.focused,
                                                    }
                                                }}
                                                onChange={this.handleTextFields}
                                                value={this.state.full_name}
                                            />
                                            <TextField
                                                label='Email Address'
                                                className={classes.input1}
                                                variant="outlined"
                                                fullWidth
                                                placeholder="Enter your Email Address"
                                                name="email"
                                                InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline,
                                                        focused: classes.focused,
                                                    }
                                                }}
                                                onChange={this.handleTextFields}
                                                value={this.state.email}
                                            />

                                            <TextField
                                                label="Subject"
                                                className={classes.input1}
                                                variant="outlined"
                                                fullWidth
                                                placeholder="Subject"
                                                name="subject"
                                                InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline,
                                                        focused: classes.focused,
                                                    }
                                                }}
                                                onChange={this.handleTextFields}
                                                value={this.state.subject}
                                            />
                                            <TextField
                                                label="Description"
                                                className={classes.input1}
                                                variant="outlined"
                                                fullWidth
                                                placeholder="Message"
                                                multiline={true}
                                                name="message"
                                                InputProps={{
                                                    classes: {
                                                        notchedOutline: classes.notchedOutline,
                                                        focused: classes.focused,
                                                    }
                                                }}
                                                onChange={this.handleTextFields}
                                                value={this.state.message}
                                            />
                                            <br />
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
                                                    type='submit'
                                                >
                                                    Submit
                                                </Button>
                                            </div>
                                        </form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Contact);