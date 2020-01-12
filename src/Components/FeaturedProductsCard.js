import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Button, Grid, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        height: 557
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 2
})

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const { product } = props;

    return (
        <Card className={classes.card}>
            <Link to={`/product-details/${product._id}`}>
                <CardHeader style={{ height: 72 }}
                    title={
                        <Typography style={{
                            fontSize: 20, justifyContent: 'center',
                            alignItems: 'center,',
                            display: 'inline-flex',
                            width: '100%',
                            color: "blue",
                            cursor: 'pointer',
                            fontSize: 13
                        }}>
                            {product.title}
                        </Typography>
                    }
                />
            </Link>
            {product.pictures && <CardMedia
                style={{ cursor: "pointer" }}
                className={classes.media}
                image={product.pictures[0]}
                title="Paella dish"
            />}
            <CardContent style={{ height: 220 }}>
                <br />
                <Typography color='textSecondary'>
                    <ul>
                        {product.bulletPoints && product.bulletPoints.map((points, index) => {
                            return (
                                <li>{points}</li>
                            )
                        })}
                    </ul>
                </Typography>
            </CardContent>
            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
            <CardActions disableSpacing>
                <Grid container spacing={3}>
                    <Grid xs={12}>
                        <Typography variant='caption' style={{
                            justifyContent: 'center',
                            alignItems: 'center,',
                            display: 'inline-flex',
                            width: '100%',
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>
                            {formatter.format(product.price)}
                        </Typography>
                    </Grid>
                    <Grid xs={12}>
                        <div style={{
                            justifyContent: 'center',
                            alignItems: 'center,',
                            display: 'inline-flex',
                            width: '100%',
                        }}>
                            <Link style={{ textDecoration: 'none' }} to={`/product-details/${product._id}`}>
                                <Button
                                    variant="contained"
                                    style={{ width: 200, backgroundColor: 'rgb(255, 163, 58)', color: '#101820FF' }}
                                >
                                    VIEW DETAILS
                                </Button>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}