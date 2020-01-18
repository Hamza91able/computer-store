import React, { Component } from 'react';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class ErrorFourZeroFour extends Component {

    render() {

        return (
            <div style={{ backgroundColor: 'black', height: '80vh', color: 'white' }}>
                <Container style={{ paddingTop: 50 }} maxWidth='lg'>
                    <Grid container>
                        <Grid item xs={9}>
                            <Typography style={{ fontSize: '80px', lineHeight: '90px', marginBottom: '30px' }}>
                                Our apologies.
                                <br />
                                We're unable to find the
                                page you're looking for.
                            </Typography>
                            <Typography style={{ fontSize: 17, marginBottom: '30px' }}>
                                404. Page Not Found
                            </Typography>
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <Button variant='contained' style={{
                                    color: 'black',
                                    backgroundColor: 'white',
                                    height: 44,
                                    width: 363,
                                    fontSize: 20,
                                    fontWeight: 'normal',
                                    borderRadius: 0,
                                    boxShadow: 'none'
                                }}>
                                    GO TO OUR HOME PAGE
                            </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default ErrorFourZeroFour;