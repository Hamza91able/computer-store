import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

export default function OutlinedCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <div style={{
            justifyContent: 'center',
            alignItems: 'center,',
            display: 'inline-flex',
            width: '100%'
        }}>
            <Card className={classes.card} variant="outlined">
                <CardContent>
                    <Typography variant="h6" >
                        Subtotal(1 item): <strong style={{ color: '#B12704' }}>Rs. 76,641</strong>
                    </Typography>
                </CardContent>
                <CardActions>
                    <div style={{
                        justifyContent: 'center',
                        alignItems: 'center,',
                        display: 'inline-flex',
                        width: '100%',
                        paddingBottom: 20
                    }}>
                        <Button
                            variant="contained"
                            style={{
                                width: '90%',
                                backgroundColor: '#f0c14b',
                                color: '#111',
                                fontWeight: 'normal',
                                boxShadow: 'none',
                                border: '1px solid black',
                                borderColor: "#a88734 #9c7e31 #846a29",
                            }}
                        >
                            Proceed to checkout
                    </Button>
                    </div>
                </CardActions>
            </Card>
        </div>
    );
}