import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Container, FormControl, InputLabel, Divider } from '@material-ui/core';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import swal from 'sweetalert2'

import connectionString from '../../../Static/Utilities/connectionString';

// Components
import StockManagementTable from '../Components/StockManagementTable';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function sortArray(a, b) {
    return a - b;
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SimpleTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Out of Stock Products" {...a11yProps(0)} />
                    <Tab label="All Products" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <OutOfStockProducts token={props.token} userId={props.userId} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AllProducts token={props.token} userId={props.userId} />
            </TabPanel>
        </div>
    );
}

class OutOfStockProducts extends Component {

    state = {
        categoriesDropDown: [],
        categories: [],
        selectedCategory: '',
        products: [],
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories = () => {

        axios({
            url: `${connectionString}/categories/get-categories`,
            method: 'GET',
        })
            .then(res => {
                res.data.categories.forEach(category => {
                    this.setState({
                        categoriesDropDown: [...this.state.categoriesDropDown, { key: category._id, value: category.name, text: category.name }],
                    })
                })
                this.setState({
                    categories: res.data.categories
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    getOutOfStockProducts = () => {
        const { selectedCategory } = this.state;

        axios({
            url: `${connectionString}/products/get-out-of-stock-products/${selectedCategory}`,
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

    changeStock = (prodId, newStock) => {

        axios({
            url: `${connectionString}/admin/change-stock`,
            method: 'POST',
            data: {
                prodId,
                newStock,
            },
            headers: {
                Authorization: 'bearer ' + this.props.token,
            }
        }).then(res => {
            swal.fire({
                icon: 'success',
                title: 'Stock Changed',
            }).then(() => this.getOutOfStockProducts())
        }).catch(err => {
            swal.fire({
                icon: 'error',
                title: `${err.response.data.message}`
            })
        })
    }

    render() {
        const { categoriesDropDown, products, selectedCategory } = this.state;

        return (
            <div>
                <Typography variant='body2' style={{ marginBottom: 5 }}>
                    Add Front Page Categories.
                </Typography>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Dropdown
                        placeholder='Select Category'
                        search
                        selection
                        options={categoriesDropDown}
                        onChange={e => this.setState({ selectedCategory: e.target.textContent }, () => this.getOutOfStockProducts())}
                    />
                </FormControl>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <StockManagementTable changeStock={this.changeStock} products={products} selectedCategory={selectedCategory} token={this.props.token} />
            </div >
        );
    }
}

class AllProducts extends Component {

    state = {
        categoriesDropDown: [],
        categories: [],
        selectedCategory: '',
        products: [],
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories = () => {

        axios({
            url: `${connectionString}/categories/get-categories`,
            method: 'GET',
        })
            .then(res => {
                res.data.categories.forEach(category => {
                    this.setState({
                        categoriesDropDown: [...this.state.categoriesDropDown, { key: category._id, value: category.name, text: category.name }],
                    })
                })
                this.setState({
                    categories: res.data.categories
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    getProducts = () => {
        const { selectedCategory } = this.state;

        axios({
            url: `${connectionString}/products/get-products-by-category-no-pagination/${selectedCategory}`,
            method: 'GET',
        }).then(res => {
            console.log(res.data.products);
            let sortedProductsArray = res.data.products.sort((a, b) => parseFloat(a.stock) - parseFloat(b.stock));
            this.setState({
                products: sortedProductsArray,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    changeStock = (prodId, newStock) => {

        axios({
            url: `${connectionString}/admin/change-stock`,
            method: 'POST',
            data: {
                prodId,
                newStock,
            },
            headers: {
                Authorization: 'bearer ' + this.props.token,
            }
        }).then(res => {
            swal.fire({
                icon: 'success',
                title: 'Stock Changed',
            }).then(() => this.getProducts())
        }).catch(err => {
            swal.fire({
                icon: 'error',
                title: `${err.response.data.message}`
            })
        })
    }

    render() {
        const { categoriesDropDown, products, selectedCategory } = this.state;

        return (
            <div>
                <Typography variant='body2' style={{ marginBottom: 5 }}>
                    Add Front Page Categories.
                </Typography>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Dropdown
                        placeholder='Select Category'
                        search
                        selection
                        options={categoriesDropDown}
                        onChange={e => this.setState({ selectedCategory: e.target.textContent }, () => this.getProducts())}
                    />
                </FormControl>
                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                <StockManagementTable changeStock={this.changeStock} products={products} selectedCategory={selectedCategory} token={this.props.token} />
            </div >
        );
    }
}