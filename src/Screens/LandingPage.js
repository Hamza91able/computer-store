import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Typography, Grid, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert2'

import connectionString from '../Static/Utilities/connectionString';

// Components
import BannerAds from '../Components/BannerAds';
import FeaturedProductsCard from '../Components/FeaturedProductsCard';

const styles = theme => ({
    title: {
        flexGrow: 1,
    },
});

class LandingPage extends Component {

    state = {
        featuredProducts: [],
    }

    componentDidMount() {
        this.getFeaturedProducts();
    }

    getFeaturedProducts = () => {

        axios({
            url: `${connectionString}/products/get-featured-products`,
            method: 'GET',
        }).then(res => {
            this.setState({
                featuredProducts: res.data.products,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { classes } = this.props;
        const { featuredProducts } = this.state;

        return (
            <div>
                <Container maxWidth='lg'>
                    <BannerAds />
                    <br />
                    <AppBar style={{ boxShadow: 'none', backgroundColor: '#282828' }} position="static">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                FEATURED PRODUCTS
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <br />
                    <Grid container spacing={3}>
                        {
                            featuredProducts.length > 0 ? featuredProducts.map((product, i) => {
                                console.log(product);
                                return (
                                    <Grid item xs={6} sm={5} md={4} lg={3}>
                                        <FeaturedProductsCard product={product.productId} />
                                    </Grid>
                                )
                            })
                                :

                                <Grid container>
                                    <Grid item xs={12}>
                                        <div style={{
                                            justifyContent: 'center',
                                            alignItems: 'center,',
                                            display: 'inline-flex',
                                            width: '100%',
                                            marginTop: 20
                                        }}>
                                            <CircularProgress />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div style={{
                                            justifyContent: 'center',
                                            alignItems: 'center,',
                                            display: 'inline-flex',
                                            width: '100%',
                                        }}>
                                            <Typography>Loading...</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                        }
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(LandingPage);