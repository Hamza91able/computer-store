import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, AppBar, Toolbar, Typography, Grid } from '@material-ui/core';

// Components
import BannerAds from '../Components/BannerAds';
import FeaturedProductsCard from '../Components/FeaturedProductsCard';

const styles = theme => ({
    title: {
        flexGrow: 1,
    },
});

class LandingPage extends Component {

    render() {
        const { classes } = this.props;

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
                        <Grid item xs={6} sm={5} md={4} lg={3}>
                            <FeaturedProductsCard />
                        </Grid>
                        <Grid item xs={6} sm={5} md={4} lg={3}>
                            <FeaturedProductsCard />
                        </Grid>
                        <Grid item xs={6} sm={5} md={4} lg={3}>
                            <FeaturedProductsCard />
                        </Grid>
                        <Grid item xs={6} sm={5} md={4} lg={3}>
                            <FeaturedProductsCard />
                        </Grid>
                        <Grid item xs={6} sm={5} md={4} lg={3}>
                            <FeaturedProductsCard />
                        </Grid>
                        <Grid item xs={6} sm={5} md={4} lg={3}>
                            <FeaturedProductsCard />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(LandingPage);