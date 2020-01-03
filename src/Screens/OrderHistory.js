import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Divider, Button, Paper } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    root: {
        display: 'flex',
    },
});

class OrderHistory extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <React.Fragment>
                    <Typography variant='h5' style={{ paddingTop: 20, paddingBottom: 6, color: 'rgb(255, 163, 58)', fontWeight: 'bold' }}>
                        Order History
                        </Typography>
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                    <div className={classes.root}>
                        <Paper style={{ width: '100%' }} variant="outlined">
                            <Typography variant='body1' style={{ fontSize: 15, padding: 5 }}>
                                Order #105430602080288
                                <br />
                                <Typography style={{ fontSize: 13 }} variant='caption' color="textSecondary" gutterBottom>
                                    <strong>Placed on 17 Sep 2019 18:54:10</strong>
                                </Typography>
                            </Typography>
                            <Divider />
                            <Grid style={{ padding: 20 }} container spacing={1}>
                                <Grid item md={2}>
                                    <img style={{ hegiht: 80, width: 80 }} src='https://static-01.daraz.pk/original/e65698a3ac82e9a962ee549f91741789.jpg' />
                                </Grid>
                                <Grid item md={4}>
                                    <Typography style={{ width: '100%' }}>
                                        9 In 1 - Multi-Function Folding Plier - Red
                                    </Typography>
                                </Grid>
                                <Grid item md={1}>
                                    <Typography variant='caption' style={{ width: '100%' }}>
                                        <Typography style={{ fontSize: 15 }} variant='caption' color="textSecondary" gutterBottom>
                                            Qty:
                                        </Typography> <strong style={{ fontSize: 15 }}>1</strong>
                                    </Typography>
                                </Grid>
                                <Grid item md={2}>
                                    <Chip style={{ height: 20 }} label="Delivered" />
                                </Grid>
                                <Grid item md={3}>
                                    <Typography style={{ fontSize: 13 }} variant='caption' color="textSecondary" gutterBottom>
                                        <strong>Delivered on 19 Aug 2019</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </React.Fragment>
            </div>
        );
    }
}

export default withStyles(styles)(OrderHistory);