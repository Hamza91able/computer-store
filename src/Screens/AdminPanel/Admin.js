import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

// Components
import Tabs from './Components/Tabs';
import { Container } from '@material-ui/core';

// Assets
import errImg from '../../Assets/images/err403.jpeg';

class Admin extends Component {

    render() {
        const { user } = this.props

        return (
            <div>
                {user && user.isAdmin
                    ?
                    <div>
                        <Container maxWidth='lg'>
                            <Typography style={{ padding: 20, color: 'red', fontWeight: 500 }}>
                                Logged in as: Hamza
                        </Typography>
                        </Container>
                        <div style={{ height: 20 }} />
                        <Tabs token={this.props.token} userId={this.props.userId} />
                    </div>
                    :
                    <Container maxWidth='lg' style={{ marginTop: 20 }}>
                        <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={errImg} />
                    </Container>
                }
            </div>
        );
    }
}

export default Admin;