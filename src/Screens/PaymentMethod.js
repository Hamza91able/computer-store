import React, { Component } from 'react';
import {
    Container,
    Typography,
    Grid,
    Divider,
    TextField,
    Select,
    MenuItem,
    FormControl,
    Button,
} from '@material-ui/core';

// Assets
import cards from '../Assets/images/cards.png';

// Components
import CheckoutStepper from '../Components/CheckoutStepper';
import PaymentMethodCard from '../Components/PaymentMethodCard';
// import CardTable from '../Components/CardTable';

let years = []

for (let i = 2020; i <= 2040; i++) {
    years.push(i);
};

class PaymentMethod extends Component {

    state = {
        disable: true,
        cards: [],
        name: '',
        cardNumber: '',
        month: 1,
        year: 2020
    }

    handleInput = e => {

        this.setState({
            [e.target.name]: e.target.value,
        }, () => {
            if (this.state.name.length >= 3 && this.state.cardNumber.length === 16) {
                this.setState({
                    disable: false
                })
            }
        })
    }

    render() {

        return (
            <div>
                <div style={{ height: 50 }} />
                <Container maxWidth='lg'>
                    <CheckoutStepper />
                    <Grid container spacing={3}>
                        <Grid item md={10}>
                            <Typography variant='h4'>
                                Select a payment method
                            </Typography>
                            <Divider style={{ marginTop: 20, marginBottom: 10 }} />
                        </Grid>
                        <Grid item md={1}>
                        </Grid>
                        <Grid item md={1}>
                            <PaymentMethodCard
                                disable={this.state.disable}
                                name={this.state.name}
                                cardNumber={this.state.cardNumber}
                                month={this.state.month}
                                year={this.state.year}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item md={10}>
                            <Typography style={{ fontWeight: 'bold' }} variant='h5'>
                                Add a Payment Method
                            </Typography>
                            <Divider style={{ marginTop: 20, marginBottom: 10 }} />
                            <Grid container>
                                <Grid item md={8}>
                                    <Typography style={{ fontWeight: 'bold' }} variant='h6'>
                                        Credit or Debit Cards
                                </Typography>
                                    <p style={{ fontSize: 14 }}>Computer Store accepts all major credit and debit cards.</p>
                                </Grid>
                                <Grid item md={4}>
                                    <img src={cards} />
                                </Grid>
                            </Grid>
                            <Container>
                                <Typography style={{ paddingBottom: 15 }}>
                                    Enter your card information
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item md={10}>
                                        <Grid container spacing={2}>
                                            <Grid item md={2}>
                                                <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>
                                                    Name on card
                                                </Typography>
                                                <TextField
                                                    required
                                                    id="standard-required"
                                                    variant='outlined'
                                                    value={this.state.name}
                                                    name='name'
                                                    onChange={this.handleInput}
                                                    style={{ width: '100%' }}
                                                    size='small'
                                                    error={this.state.name.length < 3}
                                                />
                                            </Grid>
                                            <Grid item md={3}>
                                                <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>
                                                    Card Number
                                                </Typography>
                                                <TextField
                                                    required
                                                    id="standard-required"
                                                    variant='outlined'
                                                    type='number'
                                                    value={this.state.cardNumber}
                                                    name='cardNumber'
                                                    onChange={this.handleInput}
                                                    style={{ width: '100%' }}
                                                    size='small'
                                                    error={this.state.cardNumber.length !== 16}
                                                />
                                            </Grid>
                                            <Grid item md={5}>
                                                <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>
                                                    Expiration Date
                                                </Typography>
                                                <FormControl variant='filled' size='small' variant="outlined">
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={this.state.month}
                                                        style={{ backgroundColor: '#eff0f3' }}
                                                        onChange={e => this.setState({ month: e.target.value })}
                                                    >
                                                        <MenuItem value={1}>01</MenuItem>
                                                        <MenuItem value={2}>02</MenuItem>
                                                        <MenuItem value={3}>03</MenuItem>
                                                        <MenuItem value={4}>04</MenuItem>
                                                        <MenuItem value={5}>05</MenuItem>
                                                        <MenuItem value={6}>06</MenuItem>
                                                        <MenuItem value={7}>07</MenuItem>
                                                        <MenuItem value={8}>08</MenuItem>
                                                        <MenuItem value={9}>09</MenuItem>
                                                        <MenuItem value={10}>10</MenuItem>
                                                        <MenuItem value={11}>11</MenuItem>
                                                        <MenuItem value={12}>12</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl style={{ marginLeft: 5 }} variant='filled' size='small' variant="outlined">
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        style={{ backgroundColor: '#eff0f3' }}
                                                        value={this.state.year}
                                                        onChange={e => this.setState({ year: e.target.value })}
                                                    >
                                                        {years.map((year, i) => {
                                                            return (
                                                                <MenuItem key={i} value={year}>{year}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Container>
                            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                            <Grid container>
                                <Grid item md={8}>
                                    <Typography style={{ fontWeight: 'bold' }} variant='h6'>
                                        Cash on Delievery
                                    </Typography>
                                    <p style={{ fontSize: 14 }}>Pay at your doorstep</p>
                                    <p style={{ fontSize: 14, fontWeight: 'bold' }}>Comming Soon....</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <div style={{ height: 50 }} />
                    <CardTable /> */}
                </Container>
            </div>
        );
    }
}

export default PaymentMethod;