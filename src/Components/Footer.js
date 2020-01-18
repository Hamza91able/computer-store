import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Container, Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
    title: {
        flexGrow: 1,
    },
    appbar: {
        height: 'auto',
        [theme.breakpoints.up('md')]: {
            height: 'auto'
        },
    },
    developBy: {
        [theme.breakpoints.up('md')]: {
            float: 'right'
        },
    },
    bottomAppbar: {
        height: 150,
        [theme.breakpoints.up('md')]: {
            height: 70
        },
    },
    liStyle: {
        '&:hover': {
            color: 'rgb(255, 163, 58)'
        }
    }
});

class Footer extends React.Component {

    render() {
        const { classes, appBarCategories } = this.props;

        return (
            <React.Fragment>
                <AppBar style={{ backgroundColor: '#232f3e' }} className={classes.appbar} position='static'>
                    <Toolbar style={{ marginTop: 30 }}>
                        <Container maxWidth='lg'>
                            <Grid container spacing={6}>
                                <Grid item xs={12} md={3} xl={3}>
                                    <Typography style={{ color: '#ffa33a' }} variant="h6" className={classes.title}>
                                        COMPUTER STORE
                                    </Typography>
                                    <Typography style={{ marginTop: 10 }}>
                                        Welcome to Online Computer store in Pakistan. Buy Dell, Lenovo, HP, Acer laptops at best prices in Pakistan.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={3} xl={3}>
                                    <Typography variant="h6" className={classes.title}>
                                        PRODUCTS
                                    </Typography>
                                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                                        {appBarCategories.map((category, ind) => {
                                            return (
                                                <Link key={ind} to={`/c/${category.name}`} style={{ textDecoration: 'none', color: 'white' }}>
                                                    <li className={classes.liStyle} style={{ padding: 3 }}>{category.name}</li>
                                                </Link>
                                            )
                                        })}
                                    </ul>
                                </Grid>
                                <Grid item xs={12} md={3} xl={3}>
                                    <Typography variant="h6" className={classes.title}>
                                        ACCOUNT
                                    </Typography>
                                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                                        {!this.props.isAuth && <Link to='/register' style={{ textDecoration: 'none', color: 'white' }}>
                                            <li className={classes.liStyle} style={{ padding: 3 }}>Sign Up</li>
                                        </Link>}
                                        {this.props.isAuth && <Link to='/account' style={{ textDecoration: 'none', color: 'white' }}>
                                            <li className={classes.liStyle} style={{ padding: 3 }}>My Account</li>
                                        </Link>}
                                        <Link to='/cart' style={{ textDecoration: 'none', color: 'white' }}>
                                            <li className={classes.liStyle} style={{ padding: 3 }}>Shopping Cart</li>
                                        </Link>
                                        {this.props.isAuth && <Link to='/account/order-history' style={{ textDecoration: 'none', color: 'white' }}>
                                            <li className={classes.liStyle} style={{ padding: 3 }}>Order History</li>
                                        </Link>}
                                    </ul>
                                </Grid>
                                <Grid item xs={12} md={3} xl={3}>
                                    <Typography variant="h6" className={classes.title}>
                                        CONTACT US
                                    </Typography>
                                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                                        <Link style={{ textDecoration: 'none', color: 'white' }}>
                                            <li className={classes.liStyle} style={{ padding: 3 }}>Contact Form</li>
                                        </Link>
                                        <Link style={{ textDecoration: 'none', color: 'white' }}>
                                            <li className={classes.liStyle} style={{ padding: 3 }}>+92 300 23** ***</li>
                                        </Link>
                                    </ul>
                                </Grid>
                            </Grid>
                        </Container>
                    </Toolbar>
                </AppBar>
                <AppBar className={classes.bottomAppbar} style={{ backgroundColor: '#232f3e', boxShadow: 'none' }} position='static'>
                    <Toolbar>
                        <Container maxWidth='lg'>
                            <br />
                            <Grid container spacing={3}>
                                <Grid item md={6} lg={6} xs={12}>
                                    <Typography style={{ float: 'left' }}>
                                        Copyright © Computer Store 2019. All rights reserved.
                                    </Typography>
                                </Grid>
                                <Grid item md={6} lg={6} xs={12}>
                                    <Typography className={classes.developBy}>
                                        Designed & Developed by Hamza ®
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br />
                        </Container>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Footer);
