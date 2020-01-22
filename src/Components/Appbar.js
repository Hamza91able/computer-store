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
    Container,
    Grid
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, withRouter } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Components
import MenuDrawer from './MenuDrawer';
import Swal from 'sweetalert2';

const styles = theme => ({
    root: {
        flexGrow: 1,
        '& input': {
            height: '0px',
            marginLeft: 30
        }
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        minWidth: 50,
        width: 200,
        margin: 5,
    },
    margin: {
        margin: theme.spacing(1),
    },
    searchBarWeb: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
        }
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
    },
    categoriesButton: {
        "&:hover": {
            border: '1px solid #7a7a7a'
        },
    }
});

class Appbar extends React.Component {

    state = {
        keyword: '',
    }

    handleKeyPress(target, value) {
        const { history } = this.props;
        if (target.charCode == 13) {
            if (value.length > 0) {
                history.push(`/s/${value}`);
            }
        }
    }

    render() {
        const { classes, user, appBarCategories, categories } = this.props;

        return (
            <div className={classes.root}>
                <AppBar style={{ backgroundColor: '#232f3e' }} className={classes.appBar} position="relative">
                    <Toolbar>
                        <MenuDrawer isAuth={this.props.isAuth} categories={categories} user={user} />
                        <Link style={{ textDecoration: 'none' }} to='/'>
                            <Typography variant="h5" className={classes.title}>
                                <strong style={{ color: '#ffff' }}>COMPUTER STORE</strong>
                            </Typography>
                        </Link>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start" >
                                    <Link
                                        style={{ textDecoration: 'none', color: 'black' }}
                                        to={this.state.keyword.length > 0 && `/s/${this.state.keyword}`}><SearchIcon style={{ marginTop: 40 }} /></Link>
                                </InputAdornment>}
                                style={{ backgroundColor: 'white', height: 38, width: 'auto' }}
                                className={classes.searchBarWeb}
                                value={this.state.keyword}
                                onChange={e => this.setState({ keyword: e.target.value })}
                                onKeyPress={e => this.handleKeyPress(e, e.target.value)}
                            />
                        </FormControl>
                        <div className={classes.greetingsWeb} style={{ width: 500 }}>
                            <Grid container>
                                <Grid item xs={4}>
                                    {user
                                        ?
                                        <Link to='/account' style={{ textDecoration: 'none' }}>
                                            <Button style={{ color: "#ffff" }}>Hello, {user.name}</Button>
                                        </Link>
                                        :
                                        <Link to={`/login`} style={{ textDecoration: 'none' }}>
                                            <Button style={{ color: "#ffff" }}>Hello, Sign in</Button>
                                        </Link>
                                    }
                                </Grid>
                                <Grid item xs={3}>
                                    {this.props.isAuth ? <Link to='/cart' style={{ textDecoration: 'none' }}>
                                        <Button style={{ color: '#ffff' }}>
                                            <ShoppingCartIcon /> Cart
                                        </Button>
                                    </Link> : <Link style={{ textDecoration: 'none' }}>
                                            <Button onClick={() => Swal.fire({ icon: 'error', title: 'Please login first' })} style={{ color: '#ffff' }}>
                                                <ShoppingCartIcon /> Cart
                                            </Button>
                                        </Link>}
                                </Grid>
                                <Grid item xs={3}>
                                    {user &&
                                        <Button onClick={this.props.logoutHandler} style={{ color: '#ffff' }}>
                                            <ExitToAppIcon style={{ marginRight: 5 }} /> Signout
                                        </Button>
                                    }
                                </Grid>
                            </Grid>

                        </div>
                    </Toolbar>
                    <Toolbar className={classes.searchBarMobile}>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start" >
                                    <Link
                                        style={{ textDecoration: 'none', color: 'black' }}
                                        to={this.state.keyword.length > 0 && `/s/${this.state.keyword}`}><SearchIcon style={{ marginTop: 40 }} /></Link>
                                </InputAdornment>}
                                style={{ backgroundColor: 'white', height: 38, width: 'auto' }}
                                className={classes.searchBarMobile}
                                value={this.state.keyword}
                                onChange={e => this.setState({ keyword: e.target.value })}
                                onKeyPress={e => this.handleKeyPress(e, e.target.value)}
                            />
                            {user
                                ?
                                <Link to='/account' style={{ textDecoration: 'none' }}>
                                    <Button style={{ color: "#ffff" }}>Hello, {user.name}</Button>
                                </Link>
                                :
                                <Link to='/login' style={{ textDecoration: 'none' }}>
                                    <Button style={{ color: "#ffff" }}>Hello, Sign in</Button>
                                </Link>
                            }
                            <Link to='/cart' style={{ textDecoration: 'none' }}>
                                <Button style={{ color: '#ffff' }}>
                                    <ShoppingCartIcon /> Cart
                                </Button>
                            </Link>
                            {user && <Link style={{ textDecoration: 'none' }}>
                                <Button onClick={this.props.logoutHandler} style={{ color: '#ffff' }}>
                                    <ExitToAppIcon style={{ marginRight: 5 }} /> Signout
                                </Button>
                            </Link>}
                        </FormControl>
                    </Toolbar>
                    <Toolbar className={classes.searchBarWeb}>
                        <Container maxWidth='lg'>
                            {appBarCategories && appBarCategories.map((category, index) => {
                                return (
                                    <Link key={index} to={`/c/${category.name}`} style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant='text'
                                            style={{ margin: 5, color: '#ccc' }}
                                            className={classes.categoriesButton}
                                        >{category.name}</Button>
                                    </Link>
                                )
                            })}
                        </Container>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}

export default withRouter(withStyles(styles)(Appbar));
