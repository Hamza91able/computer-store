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
                            <PaymentMethodCard disable={this.state.disable} />
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
                                    <p style={{ fontSize: 14 }}>Amazon accepts all major credit and debit cards.</p>
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
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                    style={{ width: '100%' }}
                                                    size='small'
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
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                    style={{ width: '100%' }}
                                                    size='small'
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
                                                        value={1}
                                                        style={{ backgroundColor: '#eff0f3' }}
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
                                                        value={2020}
                                                    >
                                                        {years.map((year, i) => {
                                                            return (
                                                                <MenuItem key={i} value={year}>{year}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </FormControl>
                                                <Button style={{
                                                    backgroundColor: '#f0c14b',
                                                    color: '#111',
                                                    fontWeight: 'normal',
                                                    bomdhadow: 'none',
                                                    border: '1px solid black',
                                                    borderColor: "#a88734 #9c7e31 #846a29",
                                                    height: 37,
                                                    marginLeft: 8,
                                                    boxShadow: 'none'
                                                }} variant='contained'>
                                                    Add your card
                                                </Button>
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