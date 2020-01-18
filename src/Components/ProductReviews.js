import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography, Paper, Grid, Box, Divider } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Rating from '@material-ui/lab/Rating';
import moment from 'moment';

// let product;

const styles = theme => ({
    card: {
        minWidth: 275,
        marginLeft: 20,
        boxShadow: 'none'
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
    rating1: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
});

class ProductReviews extends Component {

    // componentDidMount() {
    //     try {
    //         if (this.props.currentProduct.title) {
    //             product = this.props.currentProduct;
    //         }
    //     } catch (error) {

    //     }

    // }

    render() {
        const { classes, currentProduct, productId } = this.props;

        return (
            <div>
                {currentProduct ? currentProduct.reviews.map((review, index) => {
                    return (
                        <React.Fragment>
                            <Paper>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} md={2}>
                                        <Card className={classes.card}>
                                            <CardContent style={{ paddingLeft: 30, paddingTop: 25 }}>
                                                <Typography style={{ fontWeight: 'bold' }} className={classes.title} gutterBottom>
                                                    {review.name.toUpperCase()}
                                                </Typography>
                                                {review.verifiedOwner
                                                    ?
                                                    <Typography color='textSecondary' variant="caption">
                                                        <VerifiedUserIcon style={{ color: 'green', marginRight: 3, height: 20, width: 20, marginTop: -2 }} /> Verified Owner
                                                    </Typography>
                                                    :
                                                    <Typography color='textSecondary' variant="caption">
                                                        <NotInterestedIcon style={{
                                                            color:
                                                                'red',
                                                            marginRight: 3,
                                                            height: 20,
                                                            width: 20,
                                                            marginTop: -2
                                                        }}
                                                        />
                                                        Not Verified Owner
                                                    </Typography>
                                                }
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={10}>
                                        <Card className={classes.card}>
                                            <CardContent style={{ paddingLeft: 30, paddingTop: 25 }}>
                                                <Typography style={{ fontWeight: 'bold' }} className={classes.title} gutterBottom>
                                                    <div className={classes.rating1}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={9}>
                                                                <Box style={{ fontSize: 13, marginTop: -10 }}>{review.title}</Box>
                                                                <Rating
                                                                    name="hover-side"
                                                                    value={review.rating}
                                                                    size="small"
                                                                    readOnly={true}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <Box style={{ fontSize: 13, marginTop: -10, float: 'right' }}>{moment(review.postedOn).format('MMMM Do YYYY, h:mm a')}</Box>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </Typography>
                                                <Typography variant='caption' style={{ fontSize: 13 }}>
                                                    <strong>Pros</strong>: {review.pros}
                                                    <br />
                                                    <strong>Cons</strong>: {review.cons}
                                                    <br />
                                                    <strong>Overall Review</strong>: {review.overallReview}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <br />
                        </React.Fragment>

                    )
                }) : <h1>No Reviews</h1>}
                <br />
            </div>
        );
    }
}

export default withStyles(styles)(ProductReviews);