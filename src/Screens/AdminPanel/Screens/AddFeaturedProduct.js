import React, { Component } from 'react';
import { Container, TextField, Grid, Divider, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import swal from 'sweetalert2'

import connectionString from '../../../Static/Utilities/connectionString';

// Components
import CategoriesTable from '../Components/Table';

class AddFeaturedProducts extends Component {

    state = {
        category: '',
        categories: [],
        categoriesDropDown: [],
        selectedCategory: '',
        products: [],
        featuredProducts: [],
    }

    componentDidMount() {
        this.getCategories();
        this.getFeaturedProducts();
    }

    getFeaturedProducts = () => {

        axios({
            url: `${connectionString}/products/get-featured-products`,
            method: 'GET',
        }).then(res => {
            console.log(res.data.products)
            this.setState({
                featuredProducts: res.data.products,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    removeFeaturedProduct = prodId => {

        axios({
            url: `${connectionString}/admin/remove-from-featured`,
            method: 'POST',
            data: {
                prodId
            },
            headers: {
                Authorization: 'bearer ' + this.props.token,
            }
        }).then(res => {
            swal.fire({
                icon: 'success',
                title: 'Product Removed From Featured',
            })
            this.getFeaturedProducts();
        }).catch(err => {
            console.log(err);
            swal.fire({
                icon: 'error',
                title: `${err.response.data.message}`
            })
        })
    }

    featureProduct = prodId => {

        axios({
            url: `${connectionString}/admin/feature-product`,
            method: 'POST',
            data: {
                productId: prodId
            },
            headers: {
                Authorization: 'bearer ' + this.props.token,
            }
        }).then(res => {
            swal.fire({
                icon: 'success',
                title: 'Product Featured',
            }).then(() => this.getFeaturedProducts())
        }).catch(err => {
            swal.fire({
                icon: 'error',
                title: `${err.response.data.message}`
            })
        })
    }

    getProducts = () => {
        const { selectedCategory } = this.state;

        axios({
            url: `${connectionString}/products/get-products-by-category-no-pagination/${selectedCategory}`,
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

    render() {
        const { categories, categoriesDropDown, products } = this.state;

        return (
            <div>
                <Container maxWidth='lg'>
                    <Grid item>
                        <Grid md={12}>
                            <Typography variant='body2' style={{ marginBottom: 5 }}>
                                Select Category to Choose Product From.
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
                            <br />
                            <br />
                            <Typography>
                                Current products in this category
                            </Typography>
                            <br />
                            <div style={{ border: '1px solid black' }}>
                                <Grid container spacing={0}>
                                    {products.map((product, i) => {
                                        return (
                                            <React.Fragment>
                                                <Grid item md={1}>
                                                    {product.pictures && <img
                                                        style={{ height: 100, width: 100 }}
                                                        src={product.pictures[0]}
                                                    />}
                                                </Grid>
                                                <Grid item md={5}>
                                                    <Typography style={{ padding: 10 }}>
                                                        {product.title}
                                                    </Typography>
                                                    <Button style={{
                                                        backgroundColor: '#f0c14b',
                                                        color: '#111',
                                                        fontWeight: 'normal',
                                                        bomdhadow: 'none',
                                                        border: '1px solid black',
                                                        borderColor: "#a88734 #9c7e31 #846a29",
                                                    }} onClick={() => this.featureProduct(product._id)} >
                                                        Add as Featured Product
                                                    </Button>
                                                </Grid>
                                            </React.Fragment>
                                        )
                                    })}
                                </Grid>
                            </div>
                        </Grid>
                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                        <Grid md={12}>
                            <Typography>
                                Current Featured Products
                            </Typography>
                            <br />
                            <div style={{ border: '1px solid black' }}>
                                <Grid container spacing={0}>
                                    {this.state.featuredProducts.map((product, i) => {
                                        return (
                                            <React.Fragment>
                                                <Grid item md={1}>
                                                    {product.productId.pictures && <img
                                                        style={{ height: 100, width: 100 }}
                                                        src={product.productId.pictures[0]}
                                                    />}
                                                </Grid>
                                                <Grid item md={5}>
                                                    <Typography style={{ padding: 10 }}>
                                                        {product.productId.title}
                                                    </Typography>
                                                    <Button style={{
                                                        backgroundColor: '#f0c14b',
                                                        color: '#111',
                                                        fontWeight: 'normal',
                                                        bomdhadow: 'none',
                                                        border: '1px solid black',
                                                        borderColor: "#a88734 #9c7e31 #846a29",
                                                    }} onClick={() => this.removeFeaturedProduct(product._id)} >
                                                        Remove from featured product
                                                    </Button>
                                                </Grid>
                                            </React.Fragment>
                                        )
                                    })}
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>

                </Container>
            </div>
        );
    }
}

export default AddFeaturedProducts;