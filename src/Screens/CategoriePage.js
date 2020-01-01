import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Typography, Paper, Grid, Card, CardContent, Divider, Box, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';

// Components
import ProductFilterTypeList from '../Components/ProductFilterTypeList';
import ProductFilterBrandList from '../Components/ProductFilterBrandList';
import Pagination from '../Components/Pagination';

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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});


class CategoriePage extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={3}>
                            <br />
                            <div style={{ height: 10 }} />
                            <ProductFilterTypeList />
                            <ProductFilterBrandList />
                        </Grid>
                        <Grid item xs={12} md={9}>
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
                                    <Typography style={{ color: "rgb(255, 163, 58)", fontWeight: 'bold' }} variant='h4'>
                                        Processors
                                    </Typography>
                                </Toolbar>
                                <Paper style={{ boxShadow: 'none' }}>
                                    <Grid container>
                                        <Grid style={{ marginTop: 5 }} item xs={5} md={4}>
                                            <Typography variant='caption'>
                                                Showing <strong>1 - 10</strong> of <strong>13</strong> Results
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={7} md={5}>
                                            <div style={{
                                                justifyContent: 'center',
                                                alignItems: 'center,',
                                                display: 'inline-flex',
                                                width: '100%',
                                            }}>
                                                <Pagination />
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                value={10}
                                                style={{ float: 'right' }}
                                            >
                                                <MenuItem value={10}>Price Low - High</MenuItem>
                                                <MenuItem value={20}>Price High - Low</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <div style={{ height: 3 }} />
                            </AppBar>
                            <br />
                            <Grid container spacing={5}>
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
                                    <Typography variant='caption' style={{ fontSize: 14, fontWeight: 'bold' }}>
                                        Rs. 76,641
                                    </Typography>
                                    <Typography style={{ fontSize: 13 }} className={classes.title} color="textSecondary" gutterBottom>
                                        Sold and Shipped by: <strong>Computer Store</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                            <Paper style={{ boxShadow: 'none' }}>
                                <Grid container>
                                    <Grid style={{ marginTop: 5 }} item xs={5} md={4}>
                                        <Typography variant='caption'>
                                            Showing <strong>1 - 10</strong> of <strong>13</strong> Results
                                            </Typography>
                                    </Grid>
                                    <Grid item xs={7} md={5}>
                                        <div style={{
                                            justifyContent: 'center',
                                            alignItems: 'center,',
                                            display: 'inline-flex',
                                            width: '100%',
                                        }}>
                                            <Pagination />
                                        </div>

                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(CategoriePage);