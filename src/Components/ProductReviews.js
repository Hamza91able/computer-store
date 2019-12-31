import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography, Paper, Grid, Box, Divider } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Rating from '@material-ui/lab/Rating';

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

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Paper>
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={2}>
                            <Card className={classes.card}>
                                <CardContent style={{ paddingLeft: 30, paddingTop: 25 }}>
                                    <Typography style={{ fontWeight: 'bold' }} className={classes.title} gutterBottom>
                                        Harold W.
                                    </Typography>
                                    <Typography color='textSecondary' variant="caption">
                                        <VerifiedUserIcon style={{ color: 'green', marginRight: 3, height: 20, width: 20, marginTop: -2 }} /> Verified Owner
                                    </Typography>
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
                                                    <Box style={{ fontSize: 13, marginTop: -10 }}>Very Fast</Box>
                                                    <Rating
                                                        name="hover-side"
                                                        value={5}
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Box style={{ fontSize: 13, marginTop: -10, float: 'right' }}>12/30/2019 1:56:49 PM</Box>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Typography>
                                    <Typography variant='caption' style={{ fontSize: 13 }}>
                                        <strong>Pros</strong>: MSI MEG Z390 GODLIKE LGA 1151 (300 Series) Intel Z390 Intel I 9-9900k it's run @ 4.8 GHZ with no problem and 64 gig dominator memory MSI 2080 water cooled graphic card
                                        <br />
                                        <strong>Cons</strong>: none
                                        <br />
                                        <strong>Overall Review</strong>: I recommend
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
                <br />
                <Paper>
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={2}>
                            <Card className={classes.card}>
                                <CardContent style={{ paddingLeft: 30, paddingTop: 25 }}>
                                    <Typography style={{ fontWeight: 'bold' }} className={classes.title} gutterBottom>
                                        William F.
                                    </Typography>
                                    <Typography color='textSecondary' variant="caption">
                                        <VerifiedUserIcon style={{ color: 'green', marginRight: 3, height: 20, width: 20, marginTop: -2 }} /> Verified Owner
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <Card className={classes.card}>
                                <CardContent style={{ paddingLeft: 30, paddingTop: 25 }}>
                                    <Typography style={{ fontWeight: 'bold', width: '100%' }} className={classes.title} gutterBottom>
                                        <div className={classes.rating1}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={9}>
                                                    <Box style={{ fontSize: 13, marginTop: -10 }}>Still the best gaming CPU out there</Box>
                                                    <Rating
                                                        name="hover-side"
                                                        value={5}
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Box style={{ fontSize: 13, marginTop: -10, float: 'right' }}>12/30/2019 6:48:51 AM</Box>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Typography>
                                    <Typography variant='caption' style={{ fontSize: 13 }}>
                                        <strong>Pros</strong>: MSI MEG Z390 GODLIKE LGA 1151 (300 Series) Intel Z390 Intel I 9-9900k it's run @ 4.8 GHZ with no problem and 64 gig dominator memory MSI 2080 water cooled graphic card
                                        <br />
                                        <strong>Cons</strong>: none
                                        <br />
                                        <strong>Overall Review</strong>: I recommend
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(ProductReviews);