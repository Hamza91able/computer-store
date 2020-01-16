import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Divider,
    Box,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabelm,
    List,
    ListItem,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import CircularProgress from '@material-ui/core/CircularProgress';

import connectionString from '../Static/Utilities/connectionString';

// Components
import ProductFilterTypeList from '../Components/ProductFilterTypeList';
import ProductFilterBrandList from '../Components/ProductFilterBrandList';
import Pagination from '../Components/Pagination';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 2
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
    icon: {
        marginRight: theme.spacing(0.5),
        width: 16,
        height: 16,
        marginTop: -2
    },
});


class CategoriePage extends Component {

    state = {
        products: [],
        order: 10,
        totalItems: 0,
        brands: [],
        subCategories: [],
        subCategory: '',
        page: 1,
    }

    componentDidMount() {
        this.getProducts();
        this.getSubCategoriesAndBrands();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.categoryName !== prevProps.match.params.categoryName) {
            this.getProducts();
            this.getSubCategoriesAndBrands();
            this.setState({
                heading: '',
            })
        }
    }

    changePage = page => {

        this.setState({
            products: [],
            page: page,
        }, () => this.getProducts())
    }

    sortByOrder = e => {
        const { heading, brands, subCategories } = this.state;
        console.log(heading);

        this.setState({
            order: e.target.value,
            products: []
        }, () => {
            if (subCategories.indexOf(heading) !== -1) {
                this.getProductsBySubCategory(heading)
            } else if (brands.indexOf(heading) !== -1) {
                this.getProductsByBrand(heading);
            } else {
                this.getProducts()
            }
        })
    }

    getSubCategoriesAndBrands = () => {
        const parentCategory = this.props.match.params.categoryName;

        axios({
            url: `${connectionString}/categories/get-sub-categories/${parentCategory}`,
            method: 'GET',
        }).then(res => {
            console.log(res.data);
            this.setState({
                subCategories: res.data.subCategories,
                brands: res.data.brands,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    getProducts = () => {
        const { page } = this.state;
        console.log(page);

        axios({
            url: `${connectionString}/products/get-products-by-category/${this.props.match.params.categoryName}/${this.state.order}?page=${page}`,
            method: 'GET',
        }).then(res => {
            console.log(res.data);
            this.setState({
                products: res.data.products,
                totalItems: res.data.totalItems,
                heading: ''
            })
        }).catch(err => {
            console.log(err);
        })
    }

    getProductsBySubCategory = subCategory => {

        axios({
            url: `${connectionString}/products/get-products-by-sub-category/${subCategory}/${this.state.order}`,
            method: 'GET',
        }).then(res => {
            console.log(res.data);
            this.setState({
                products: res.data.products,
                totalItems: res.data.totalItems,
                heading: subCategory,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    getProductsByBrand = brand => {

        axios({
            url: `${connectionString}/products/get-products-by-brand/${brand}/${this.state.order}`,
            method: 'GET',
        }).then(res => {
            console.log(res.data);
            this.setState({
                products: res.data.products,
                totalItems: res.data.totalItems,
                heading: brand,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { classes } = this.props;
        const { products, totalItems, subCategories, brands, heading } = this.state;
        console.log(this.state.page)

        return (
            <div>
                <Container maxWidth="lg">
                    <br />
                    <List style={{ border: '1px solid #34495E', height: 37 }}>
                        <ListItem style={{ marginTop: -9 }}>
                            <Breadcrumbs style={{ fontSize: 13 }} aria-label="breadcrumb">
                                <Link className={classes.link} to="/">
                                    <HomeIcon className={classes.icon} />
                                    Home
                                </Link>
                                <Link className={classes.link} onClick={this.getProducts}>
                                    <WhatshotIcon className={classes.icon} />
                                    {this.props.match.params.categoryName}
                                </Link>
                                {heading && <Typography color="textPrimary">
                                    <GrainIcon className={classes.icon} />
                                    {heading}
                                </Typography>}
                            </Breadcrumbs>
                        </ListItem>
                    </List>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={3}>
                            <br />
                            <div style={{ height: 10 }} />
                            <ProductFilterTypeList getProductsBySubCategory={this.getProductsBySubCategory} subCategories={subCategories} />
                            <ProductFilterBrandList getProductsByBrand={this.getProductsByBrand} brands={brands} />
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
                                        {this.props.match.params.categoryName} {heading && `» ${heading}`}
                                    </Typography>
                                </Toolbar>
                                <Paper style={{ boxShadow: 'none' }}>
                                    <Grid container>
                                        <Grid style={{ marginTop: 5 }} item xs={5} md={4}>
                                            <Typography variant='caption'>
                                                Showing <strong>{this.state.page} - {products.length}</strong> of <strong>{totalItems}</strong> Results
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={7} md={5}>
                                            <div style={{
                                                justifyContent: 'center',
                                                alignItems: 'center,',
                                                display: 'inline-flex',
                                                width: '100%',
                                            }}>
                                                <Pagination
                                                    page={this.state.page}
                                                    totalItems={this.state.totalItems}
                                                    changePage={this.changePage}
                                                />
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                value={this.state.order}
                                                style={{ float: 'right' }}
                                                onChange={e => this.sortByOrder(e)}
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
                            {products.length > 0 ? products.map((product, index) => {
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
                                                    <Link to={`/product-details/${product._id}`}>
                                                        <img style={{ height: 218, width: 242 }} src={product.pictures[0]} />
                                                    </Link>
                                                </div>

                                            </Grid>
                                            <Grid item xs={12} md={9}>
                                                <Link to={`/product-details/${product._id}`}>
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
                                                {product.onSale && <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#cc1c39' }}>
                                                    Discounted Price {formatter.format(product.priceAfterDiscount)}
                                                </Typography>}
                                                <Typography variant='caption' style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                    {product.onSale ? <del>{formatter.format(product.price)}</del> : formatter.format(product.price)}
                                                </Typography>
                                                <Typography style={{ fontSize: 13 }} className={classes.title} color="textSecondary" gutterBottom>
                                                    Sold and Shipped by: <strong>{product.soldAndShippedBy}</strong>
                                                </Typography>
                                                <ul>
                                                    {product.bulletPoints.map((bulletPoints, index) => {
                                                        return (
                                                            <li key={index}>{bulletPoints}</li>
                                                        )
                                                    })}
                                                </ul>
                                            </Grid>


                                        </Grid>
                                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                                    </React.Fragment>
                                )
                            })
                                :
                                <div style={{
                                    justifyContent: 'center',
                                    alignItems: 'center,',
                                    display: 'inline-flex',
                                    width: '100%',
                                    margin: 20,
                                    marginBottom: 30
                                }}>
                                    <CircularProgress />
                                </div>
                            }
                            <Paper style={{ boxShadow: 'none' }}>
                                <Grid container>
                                    <Grid style={{ marginTop: 5 }} item xs={5} md={4}>
                                        <Typography variant='caption'>
                                            Showing <strong>1 - {products.length}</strong> of <strong>{totalItems}</strong> Results
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7} md={5}>
                                        <div style={{
                                            justifyContent: 'center',
                                            alignItems: 'center,',
                                            display: 'inline-flex',
                                            width: '100%',
                                        }}>
                                            <Pagination
                                                page={this.state.page}
                                                totalItems={this.state.totalItems}
                                                changePage={this.changePage}
                                            />
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