import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Divider,
    IconButton,
    Container
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
        width: 300
    },
    margin: {
        margin: theme.spacing(1),

    },
});

class Appbar extends React.Component {

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar style={{ backgroundColor: '#232f3e' }} position="static">
                    <Toolbar>
                        <Button variant='outlined' className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon style={{ width: 30, height: 30 }} />
                        </Button>
                        <Typography variant="h5" className={classes.title}>
                            <strong style={{ color: '#ffa33a' }}>COMPUTER STORE</strong>
                        </Typography>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start" ><SearchIcon /></InputAdornment>}
                                style={{ backgroundColor: 'white', height: 38, width: 'auto' }}
                            />
                        </FormControl>
                        <div style={{ width: 300 }}>
                            <Button style={{ color: "#ffa33a" }}>Hello, Sign in</Button>
                            <Button style={{ color: '#ffa33a' }}>
                                <ShoppingCartIcon /> Cart
                            </Button>
                        </div>
                    </Toolbar>
                    <Toolbar>
                        <Container maxWidth='lg'>
                            <Button variant='text' color='inherit' style={{ color: "white", margin: 5, color: '#ffa33a' }}>DESKTOPS</Button>
                            <Button variant='text' color='inherit' style={{ color: "white", margin: 5, color: '#ffa33a' }}>LAPTOPS</Button>
                            <Button variant='text' color='inherit' style={{ color: "white", margin: 5, color: '#ffa33a' }}>MONITOR</Button>
                            <Button variant='text' color='inherit' style={{ color: "white", margin: 5, color: '#ffa33a' }}>MOUSE</Button>
                            <Button variant='text' color='inherit' style={{ color: "white", margin: 5, color: '#ffa33a' }}>KEYBOARDS</Button>
                            <Button variant='text' color='inherit' style={{ color: "white", margin: 5, color: '#ffa33a' }}>HEADPHONES</Button>
                            <Button variant='text' color='inherit' style={{ color: "white", margin: 5, color: '#ffa33a' }}>PROCESSORS</Button>
                            <Button variant='text' color='inherit' style={{ color: "white", margin: 5, color: '#ffa33a' }}>GRAPHIC CARDS</Button>
                            <Button variant='text' color='inherit' style={{ color: "white", margin: 5, color: '#ffa33a' }}>SOLID STATE DRIVES</Button>
                        </Container>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}

export default withStyles(styles)(Appbar);