import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { Typography, ListSubheader } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

const styles = theme => ({
    list: {
        width: 380,
    },
    fullList: {
        width: 'auto',
    },
    menuButton: {
        marginRight: 5
    },
});

class MenuDrawer extends React.Component {

    state = {
        left: false,
    }

    toggleDrawer = () => {
        this.setState({
            left: !this.state.left
        })
    };

    renderSideList = side => {
        const { classes, user, categories } = this.props;

        return (
            <div
                className={classes.list}
                role="presentation"
                onClick={this.toggleDrawer}
                onKeyDown={this.toggleDrawer}
                style={{ overflow: 'scroll', overflowX: 'hidden' }}
            >
                <AppBar style={{ backgroundColor: '#232f3e' }} position='absolute'>
                    <Toolbar>
                        <Typography variant='h6' style={{ fontWeight: "bold", width: 300 }}>
                            <ListItem button>
                                <ListItemIcon><AccountCircleIcon style={{ color: "white", height: 42, width: 42 }} /></ListItemIcon>
                                {user
                                    ?
                                    <Link to='/account' style={{ textDecoration: 'none', color: 'white' }}>
                                        <ListItemText primary={<Typography variant='h6' style={{ fontWeight: "bold" }}>
                                            HELLO, {user.name.toUpperCase()}
                                        </Typography>} />
                                    </Link>
                                    :
                                    <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
                                        <ListItemText primary={<Typography variant='h6' style={{ fontWeight: "bold" }}>
                                            Hello, Sign In
                                        </Typography>} />
                                    </Link>
                                }
                            </ListItem>
                        </Typography>
                        <Button onClick={this.toggleDrawer} style={{ float: 'right', color: 'white' }}>X</Button>
                    </Toolbar>
                </AppBar>
                <div style={{ height: 64 }}></div>

                <div >
                    <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                <Typography variant='body1' style={{ fontWeight: "bold", margin: 20 }}>
                                    SHOP BY CATEGORY
                            </Typography>
                            </ListSubheader>
                        }
                    >
                        {categories && categories.map((category, index) => {
                            return (
                                <Link to={`/c/${category.name}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <ListItem button>
                                        <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>{category.name}</Typography>} />
                                    </ListItem>
                                </Link>
                            )
                        })}
                        {/* <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Laptops</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Laptops Used</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Laptops Refurbished</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Laptops Accessories</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Branded Systems New</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Cameras</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Cartridge & Toners</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Casing</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Cooling Solutions</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Gaming Consoles</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Gaming Consoles</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Gaming Products</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Graphic Cards</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Graphic Tablets</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Hard Drives</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Headphones/Earphones</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Keyboards</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>LCD/LED Monitors</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Memory Cards</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Memory Module/Ram</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Motherboards</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Mouse</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Network Products</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Optical Drives</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Paper Shredder</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Peripherals/ Misc</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Power Supply</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Presenters</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Printers</Typography>} />
                        </ListItem>
                        <Link to='/c' style={{ textDecoration: 'none', color: 'black' }}>
                            <ListItem button>
                                <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Processors</Typography>} />
                            </ListItem>
                        </Link>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Projectors</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Scanner</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Smart Watches</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Softwares</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Solid-State Drives (SSDs)</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Sound Cards</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Speakers</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Stabilizer</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Storage Solutions</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Tablet PC</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Tablet Accessories</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>TV Tuners & TV Devices</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>UPS</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Used Branded Systems</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Used LCD Monitors</Typography>} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Used Products</Typography>} />
                        </ListItem> */}
                    </List>
                    <Divider />
                    <List
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                <Typography variant='body1' style={{ fontWeight: "bold", margin: 20 }}>
                                    HELP & SETTINGS
                            </Typography>
                            </ListSubheader>
                        }
                    >
                        <Link style={{ textDecoration: 'none', color: 'black' }} to='/account'>
                            <ListItem button>
                                <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Your Account</Typography>} />
                            </ListItem>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to='/admin'>
                            {user && user.isAdmin && <ListItem button>

                                <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Admin Panel</Typography>} />
                            </ListItem>}
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to='/account'>
                            <ListItem button>
                                <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Help</Typography>} />
                            </ListItem>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to='/account'>
                            {!user && <ListItem button>
                                <ListItemText primary={<Typography variant='button' style={{ marginLeft: 20 }}>Sign In</Typography>} />
                            </ListItem>}
                        </Link>
                    </List>
                </div>
            </div >
        )
    }

    render() {

        const { classes } = this.props;

        return (

            <div>
                <Button onClick={this.toggleDrawer} variant='outlined' className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon style={{ width: 30, height: 30 }} />
                </Button>
                <Drawer open={this.state.left} onClose={this.toggleDrawer}>
                    {this.renderSideList('left')}
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(MenuDrawer);
