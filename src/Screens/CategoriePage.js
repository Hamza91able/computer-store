import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Typography, Paper, Grid, Card, CardContent, Divider, Box, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import axios from 'axios';

import connectionString from '../Static/Utilities/connectionString';

// Components
import ProductFilterTypeList from '../Components/ProductFilterTypeList';
import ProductFilterBrandList from '../Components/ProductFilterBrandList';
import Pagination from '../Components/Pagination';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0
})

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

    state = {
        products: [],
        order: 10,
    }

    componentDidMount() {
        this.getProducts();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.categoryName !== prevProps.match.params.categoryName) {
          this.getProducts();
        }
      }

    getProducts = () => {

        axios({
            url: `${connectionString}/products/get-products-by-category/${this.props.match.params.categoryName}/${this.state.order}`,
            method: 'GET',
        }).then(res => {
            console.log(res.data);
            this.setState({
                products: res.data.products,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { classes } = this.props;
        const { products } = this.state;

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
                                                value={this.state.order}
                                                style={{ float: 'right' }}
                                                onChange={e => this.setState({ order: e.target.value, products: [] }, () => this.getProducts())}
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
                            {products && products.map((product, index) => {
                                return (
                                    <React.Fragment>
                                        <Grid container spacing={5}>
                                            <Grid item xs={12} md={3}>
                                                <div style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center,',
                                                    display: 'inline-flex',
                                                    width: '100%',
                                                }}>
                                                    <Link to='/product-details'>
                                                        <img style={{ height: 218, width: 242 }} src={product.pictures[0]} />
                                                    </Link>
                                                </div>

                                            </Grid>
                                            <Grid item xs={12} md={9}>
                                                <Link className={classes.link} to={`/product-details/${product._id}`}>
                                                    <Typography style={{ fontWeight: 'bold' }} className={classes.title} gutterBottom>
                                                        {product.title}
                                                    </Typography>
                                                </Link>
                                                <div className={classes.rating1}>
                                                    <Rating
                                                        name="hover-side"
                                                        value={product.ratings}
                                                        size='small'
                                                        readOnly={true}
                                                    />
                                                    <Box style={{ fontSize: 13 }} ml={1}><Link to={`/product-details/${product._id}`}>{products.ratings ? products.ratings : 0}</Link></Box>
                                                </div>
                                                <Typography variant='caption' style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                    {formatter.format(product.price)}
                                                </Typography>
                                                <Typography style={{ fontSize: 13 }} className={classes.title} color="textSecondary" gutterBottom>
                                                    Sold and Shipped by: <strong>{product.soldAndShippedBy}</strong>
                                                </Typography>
                                            </Grid>


                                        </Grid>
                                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                                    </React.Fragment>
                                )
                            })}
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
            </div >
        );
    }
}

export default withStyles(styles)(CategoriePage);