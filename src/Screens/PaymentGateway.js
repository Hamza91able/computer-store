import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Axios from 'axios';

import connectionString from '../Static/Utilities/connectionString';

class PaymentGateway extends Component {
    constructor(props) {
        super(props);
        this.state = { complete: false };
        this.submit = this.submit.bind(this);
    }

    submit(ev) {
        // console.log(this.props);
        this.props.stripe
            .createToken({ name: "Name" })
            .then(token => {
                console.log(token.token, "test");
                Axios({
                    url: `${connectionString}/products/charge`,
                    method: 'POST',
                    headers: {
                        Authorization: 'bearer ' + this.props.token,
                    },
                    data: {
                        tesT: 'test',
                        source: token.token.id
                    },
                }).then(res => {
                    console.log(res.data);
                    this.setState({ complete: true });
                }).catch(err => {
                    console.log(err);
                })
            })

        // let token = await this.props.stripe.createToken({ name: "Name" });
        // let response = await fetch(`${connectionString}/products/charge`, {
        //     method: "POST",
        //     headers: { "Content-Type": "text/plain", "Authentication": "bearer " + this.props.token },
        //     body: token.id
        // });

        // if (response.ok) console.log("Purchase Complete!")
    }

    render() {
        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <button onClick={this.submit}>Purchase</button>
            </div>
        );
    }
}

export default injectStripe(PaymentGateway);