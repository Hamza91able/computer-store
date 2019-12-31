import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Typography, Paper, Grid, Card, CardContent, Divider, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';

const styles = theme => ({
    rating1: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            color: "#c45500",
            textDecoration: 'none'
        },
    }
});

class SearchPage extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Container maxWidth="lg">
                    <br />
                    <AppBar
                        style={{
                            backgroundColor: 'white',
                            color: 'black',
                            boxShadow: 'none',
                            borderBottom: '1px solid black'
                        }}
                        position='relative'
                    >
                        <Toolbar>
                            <Typography variant='caption'>
                                1-16 of 29 results for <strong style={{ color: '#c45500' }}>"{this.props.match.params.k}"</strong>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <br />
                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <div style={{
                                justifyContent: 'center',
                                alignItems: 'center,',
                                display: 'inline-flex',
                                width: '100%',
                            }}>
                                <Link to='/product-details'>
                                    <img src="https://m.media-amazon.com/images/I/71RsweT83eL._AC_UY218_ML3_.jpg" />
                                </Link>
                            </div>

                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Link className={classes.link} to='/product-details'>
                                <Typography style={{ fontWeight: 'bold' }} className={classes.title} gutterBottom>
                                    Intel Core i9-9900K Desktop Processor 8 Cores up to 5.0 GHz Turbo unlocked LGA1151 300 Series 95W
                            </Typography>
                            </Link>
                            <div className={classes.rating1}>
                                <Rating
                                    name="hover-side"
                                    value={5}
                                    size='small'
                                />
                                <Box style={{ marginTop: -7, fontSize: 13 }} ml={1}><Link to='/product-details'>680</Link></Box>
                            </div>
                            <Link>
                                <Typography variant='caption' style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    Processors
                                </Typography>
                            </Link>
                            <br />
                            <Typography variant='caption' style={{ fontSize: 14, fontWeight: 'bold' }}>
                                Rs. 76,641
                            </Typography>
                            <Typography style={{ fontSize: 13 }} className={classes.title} color="textSecondary" gutterBottom>
                                Sold and Shipped by: <strong>Computer Store</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <div style={{
                                justifyContent: 'center',
                                alignItems: 'center,',
                                display: 'inline-flex',
                                width: '100%',
                            }}>
                                <Link to='/product-details'>
                                    <img src="https://m.media-amazon.com/images/I/81t4McdI7PL._AC_UY218_ML3_.jpg" />
                                </Link>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Link className={classes.link} to='/product-details'>
                                <Typography style={{ fontWeight: 'bold' }} className={classes.title} gutterBottom>
                                    Intel Core i9-9820X X-Series Processor 10 Cores up to 4.1GHz Turbo Unlocked LGA2066 X299 Series 165W
                                </Typography>
                            </Link>
                            <div className={classes.rating1}>
                                <Rating
                                    name="hover-side"
                                    value={4}
                                    size='small'
                                />
                                <Box style={{ marginTop: -7, fontSize: 13 }} ml={1}><Link to='/product-details'>10</Link></Box>
                            </div>
                            <Link>
                                <Typography variant='caption' style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    Processors
                                </Typography>
                            </Link>
                            <br />
                            <Typography variant='caption' style={{ fontSize: 14, fontWeight: 'bold' }}>
                                Rs. 92,970
                            </Typography>
                            <Typography style={{ fontSize: 13 }} className={classes.title} color="textSecondary" gutterBottom>
                                Sold and Shipped by: <strong>Computer Store</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(SearchPage);