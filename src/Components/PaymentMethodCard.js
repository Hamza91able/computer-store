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
});

export default function OutlinedCard(props) {
    const classes = useStyles();
    const { disable } = props;
    const { name, cardNumber, month, year } = props;

    return (
        <div style={{
            justifyContent: 'center',
            alignItems: 'center,',
            display: 'inline-flex',
            width: '100%',
        }}>
            <Card className={classes.card} variant="outlined">
                <CardActions>
                    {disable
                        ?
                        <div style={{
                            justifyContent: 'center',
                            alignItems: 'center,',
                            display: 'inline-flex',
                            width: '100%',
                        }}>
                            <Button
                                variant="contained"
                                style={{
                                    width: '90%',
                                    backgroundColor: '#f0c14b',
                                    fontWeight: 'normal',
                                    boxShadow: 'none',
                                    border: '1px solid black',
                                    borderColor: "#a88734 #9c7e31 #846a29",
                                }}
                                disabled={true}
                            >
                                CONTINUE
                        </Button>
                        </div>
                        :
                        <Link to={`/buy/placeorder/${name}/${cardNumber}/${month}/${year}`} style={{ textDecoration: 'none', width: '100%' }}>
                            <div style={{
                                justifyContent: 'center',
                                alignItems: 'center,',
                                display: 'inline-flex',
                                width: '100%',
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
                                    disabled={disable}
                                >
                                    CONTINUE
                                </Button>
                            </div>
                        </Link>}
                </CardActions>
                <CardContent style={{ marginTop: -20 }}>
                    <div style={{
                        justifyContent: 'center',
                        alignItems: 'center,',
                        display: 'inline-flex',
                        width: '100%',
                    }}>
                        <p style={{ width: "90%" }}>
                            You can review this order before it's final.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div >
    );
}