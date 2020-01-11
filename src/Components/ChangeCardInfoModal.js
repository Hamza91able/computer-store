import React from 'react';
import { Modal, ButtonToolbar, Button } from 'react-bootstrap';
import { Grid, Typography, TextField, FormControl, Select, MenuItem } from '@material-ui/core';

let years = []

for (let i = 2020; i <= 2040; i++) {
    years.push(i);
};

function MyVerticallyCenteredModal(props) {
    console.log(props);

    const [name, setName] = React.useState(props.name);
    const [cardNumber, setCardNumber] = React.useState(props.cardNumber);
    const [month, setMonth] = React.useState(props.month);
    const [year, setYear] = React.useState(props.year);

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Change Billing Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Grid container spacing={1}>
                    <Grid item md={3}>
                        <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>
                            Name on card
                        </Typography>
                        <TextField
                            required
                            id="standard-required"
                            variant='outlined'
                            value={name}
                            name='name'
                            onChange={e => { setName(e.target.value); props.setName(e.target.value) }}
                            style={{ width: '100%' }}
                            size='small'
                            error={name.length < 3}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>
                            Card Number
                            </Typography>
                        <TextField
                            required
                            id="standard-required"
                            variant='outlined'
                            type='number'
                            value={cardNumber}
                            name='cardNumber'
                            onChange={e => { setCardNumber(e.target.value); props.setCardNumber(e.target.value) }}
                            style={{ width: '100%' }}
                            size='small'
                            error={cardNumber.length !== 16}
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
                                value={month}
                                style={{ backgroundColor: '#eff0f3' }}
                                onChange={e => { setMonth(e.target.value); props.setMonth(e.target.value) }}
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
                                value={year}
                                onChange={e => { setYear(e.target.value); props.setYear(e.target.value) }}
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
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Save</Button>
            </Modal.Footer>
        </Modal >
    );
}

function App(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [name, setName] = React.useState(props.name);
    const [cardNumber, setCardNumber] = React.useState(props.cardNumber);
    const [month, setMonth] = React.useState(props.month);
    const [year, setYear] = React.useState(props.year);

    return (
        <ButtonToolbar>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Change Billing Information
            </Button>

            <MyVerticallyCenteredModal
                {...props}
                show={modalShow}
                onHide={() => { setModalShow(false); props.changeCardInformation(name, cardNumber, month, year) }}
                setName={setName}
                setCardNumber={setCardNumber}
                setMonth={setMonth}
                setYear={setYear}
            />
        </ButtonToolbar>
    );
}

export default App;