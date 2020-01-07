import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

// Components
import Tabs from './Components/Tabs';
import { Container } from '@material-ui/core';

class Admin extends Component {
    render() {

        return (
            <div>
                <Container maxWidth='lg'>
                    <Typography style={{ padding: 20, color: 'red', fontWeight: 500 }}>
                        Logged in as: Hamza
                    </Typography>
                </Container>
                <div style={{ height: 20 }} />
                <Tabs />
            </div>
        );
    }
}

export default Admin;