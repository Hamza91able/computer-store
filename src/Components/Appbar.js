import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {
    FormControl,
    OutlinedInput,
    InputAdornment,
    Container
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';

// Components
import MenuDrawer from './MenuDrawer';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        minWidth: 50,
        width: 300,
        margin: 5,
    },
    margin: {
        margin: theme.spacing(1),
    },
    searchBarWeb: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
    },
    searchBarMobile: {
        display: 'block',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    greetingsWeb: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
    }
});

class Appbar extends React.Component {

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar style={{ backgroundColor: '#232f3e' }} position="static">
                    <Toolbar>
                        <MenuDrawer />
                        <Link style={{ textDecoration: 'none' }} to='/'>
                            <Typography variant="h5" className={classes.title}>
                                <strong style={{ color: '#ffa33a' }}>COMPUTER STORE</strong>
                            </Typography>
                        </Link>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start" ><SearchIcon style={{ marginTop: 40 }} /></InputAdornment>}
                                style={{ backgroundColor: 'white', height: 38, width: 'auto' }}
                                className={classes.searchBarWeb}
                            />
                        </FormControl>
                        <div className={classes.greetingsWeb} style={{ width: 300 }}>
                            <Link to='/login' style={{ textDecoration: 'none' }}>
                                <Button style={{ color: "#ffa33a" }}>Hello, Sign in</Button>
                            </Link>
                            <Link style={{ textDecoration: 'none' }}>
                                <Button style={{ color: '#ffa33a' }}>
                                    <ShoppingCartIcon /> Cart
                                </Button>
                            </Link>
                        </div>
                    </Toolbar>
                    <Toolbar className={classes.searchBarMobile}>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start" ><SearchIcon style={{ marginTop: 40 }} /></InputAdornment>}
                                style={{ backgroundColor: 'white', height: 38, width: 'auto' }}
                                className={classes.searchBarMobile}
                            />
                            <Link to='/login' style={{ textDecoration: 'none' }}>
                                <Button style={{ color: "#ffa33a" }}>Hello, Sign in</Button>
                            </Link>
                            <Link style={{ textDecoration: 'none' }}>
                                <Button style={{ color: '#ffa33a' }}>
                                    <ShoppingCartIcon /> Cart
                            </Button>
                            </Link>
                        </FormControl>
                    </Toolbar>
                    <Toolbar className={classes.searchBarWeb}>
                        <Container maxWidth='lg'>
                            <Button variant='text' style={{ margin: 5, color: '#ffa33a' }}>DESKTOPS</Button>
                            <Button variant='text' style={{ margin: 5, color: '#ffa33a' }}>LAPTOPS</Button>
                            <Button variant='text' style={{ margin: 5, color: '#ffa33a' }}>MONITOR</Button>
                            <Button variant='text' style={{ margin: 5, color: '#ffa33a' }}>MOUSE</Button>
                            <Button variant='text' style={{ margin: 5, color: '#ffa33a' }}>KEYBOARDS</Button>
                            <Button variant='text' style={{ margin: 5, color: '#ffa33a' }}>HEADPHONES</Button>
                            <Button variant='text' style={{ margin: 5, color: '#ffa33a' }}>PROCESSORS</Button>
                            <Button variant='text' style={{ margin: 5, color: '#ffa33a' }}>GRAPHIC CARDS</Button>
                            <Button variant='text' style={{ margin: 5, color: '#ffa33a' }}>SOLID STATE DRIVES</Button>
                        </Container>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}

export default withStyles(styles)(Appbar);
