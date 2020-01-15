import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Typography, Paper, Grid, Card, CardContent, Divider, Box, CircularProgress } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import connectionString from '../Static/Utilities/connectionString';

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

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 2
})

class SearchPage extends Component {

    state = {
        products: [],
    }

    componentDidMount() {
        this.searchProduct();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.k !== prevProps.match.params.k) {
            this.searchProduct();
        }
    }

    searchProduct = () => {
        const keyWord = this.props.match.params.k;

        Axios({
            url: `${connectionString}/products/get-products-by-keyword/${keyWord}`,
            method: 'GET',
        }).then(res => {
            console.log(res.data.products);
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
                            <Typography variant='body1'>
                                1-{products.length} of {products.length} results for <strong style={{ color: '#c45500' }}>"{this.props.match.params.k}"</strong>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <br />
                    {products.length > 0 ? products.map((product, value) => {
                        return (
                            <React.Fragment>
                                <Grid container>
                                    <Grid item xs={12} md={3}>
                                        <div style={{
                                            justifyContent: 'center',
                                            alignItems: 'center,',
                                            display: 'inline-flex',
                                            width: '100%',
                                        }}>
                                            {product.pictures &&
                                                <Link to={`/product-details/${product._id}`}>
                                                    <img style={{ height: 218, width: 242 }} src={product.pictures[0]} />
                                                </Link>}
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
                                                value={product.rating}
                                                size='small'
                                            />
                                            <Box style={{ marginTop: -7, fontSize: 13 }} ml={1}><Link to={`/product-details/${product._id}`}>{product.rating ? product.rating.length : "0"}</Link></Box>
                                        </div>
                                        <Link>
                                            <Typography variant='caption' style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                {product.category}
                                            </Typography>
                                        </Link>
                                        <br />
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
                    }) : <div style={{
                        justifyContent: 'center',
                        alignItems: 'center,',
                        display: 'inline-flex',
                        width: '100%',
                    }}>
                            <CircularProgress style={{ marginTop: 20 }} />
                        </div>}}
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(SearchPage);