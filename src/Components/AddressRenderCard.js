import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 2
})

export default function OutlinedCard(props) {
    const classes = useStyles();
    const { user } = props;

    return (
        <div style={{
            justifyContent: 'center',
            alignItems: 'center,',
            display: 'inline-flex',
            width: '100%',
        }}>
            <Card className={classes.card} variant="outlined">
                <CardContent>
                    <Typography variant="h6" >
                        <div style={{
                            justifyContent: 'center',
                            alignItems: 'center,',
                            display: 'inline-flex',
                            width: '100%',
                            color: 'rgb(177, 39, 4)',
                            fontWeight: 'bold'
                        }}>
                            Delievery Address
                        </div>
                    </Typography>
                </CardContent>
                {user && <CardActions>
                    <ul>
                        <li><strong>Name:</strong> {user.fullName}</li>
                        <li><strong>Shipping Address:</strong> {user.addressLine1} {user.addressLine2 && user.addressLine2}</li>
                        <li><strong>City:</strong> {user.city}</li>
                        <li><strong>State:</strong> {user.state}</li>
                        <li><strong>Zip:</strong> {user.zip}</li>
                        <li><strong>Phone Number:</strong> {user.phoneNumber}</li>
                        {user.delieveryInformation && <li><strong>Additional Information</strong> {user.delieveryInformation}</li>}
                    </ul>
                </CardActions>}
            </Card>
        </div>
    );
}