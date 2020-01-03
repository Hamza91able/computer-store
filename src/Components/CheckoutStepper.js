import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LaptopIcon from '@material-ui/icons/Laptop';
import { Typography } from '@material-ui/core';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    }
}));

export default function HorizontalLinearStepper() {
    const classes = useStyles();
    const [signIn, setSignIn] = React.useState(false);
    const [shipping, setShipping] = React.useState(true);
    const [order, setOrder] = React.useState(false);

    return (
        <div className={classes.root}>
            <Stepper activeStep={1} alternativeLabel>
                <Step>
                    <StepLabel
                        style={{ color: 'rgb(255, 163, 58)' }}
                        StepIconComponent={signIn ? AccountCircleIcon : DoneRoundedIcon}
                    >
                        <Typography style={{ fontSize: 13, marginTop: -18 }}>
                            SIGN IN
                        </Typography>
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel
                        style={{ color: 'rgb(255, 163, 58)' }}
                        StepIconComponent={shipping ? ShoppingCartIcon : DoneRoundedIcon}
                    >
                        <Typography style={{ fontSize: 13, marginTop: -18, fontWeight: 'bold' }}>
                            SHIPPING & PAYMENT
                        </Typography>
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel
                        style={{ color: 'rgb(255, 163, 58)' }}
                        StepIconComponent={order ? LaptopIcon : FiberManualRecordRoundedIcon}

                    >
                        <Typography style={{ fontSize: 13, marginTop: -18 }}>
                            Place Order
                        </Typography>
                    </StepLabel>
                </Step>
            </Stepper>
        </div>
    );
}