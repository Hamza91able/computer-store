import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

// Screens
import PaymentGateway from './PaymentGateway';
import { Container } from '@material-ui/core';

class PaymentPage extends Component {

    render() {

        return (
            <div>
                <Container maxWidth='lg'>
                    <StripeProvider apiKey="pk_test_c3PhM4i4DvSgumkkrvaovsSH0019Vo1Mq6">
                        <div className="example">
                            <h1>React Stripe Elements Example</h1>
                            <Elements>
                                <PaymentGateway token={this.props.token} />
                            </Elements>
                        </div>
                    </StripeProvider>
                </Container>
            </div>
        );
    }
}

export default PaymentPage;