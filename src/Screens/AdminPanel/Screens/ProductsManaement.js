import React, { Component } from 'react';
import { Container, TextField, Grid, Divider, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import swal from 'sweetalert2'

import connectionString from '../../../Static/Utilities/connectionString';

// Components
import CategoriesTable from '../Components/Table';
import Swal from 'sweetalert2';

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

    deleteProduct = prodId => {
        console.log(prodId, this.props.token);
        axios({
            url: `${connectionString}/admin/delete-product/${prodId}`,
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + this.props.token,
            },
        }).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Product Deleted',
            }, () => this.getProducts());
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Internal Server Error',
            });
        });
    }

    render() {
        const { categoriesDropDown, products } = this.state;

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
                                                    }}
                                                        onClick={() => this.deleteProduct(product._id)}
                                                    >
                                                        Delete Product
                                                    </Button>
                                                    <Button style={{
                                                        backgroundColor: '#f0c14b',
                                                        color: '#111',
                                                        fontWeight: 'normal',
                                                        bomdhadow: 'none',
                                                        border: '1px solid black',
                                                        borderColor: "#a88734 #9c7e31 #846a29",
                                                        marginLeft: 10
                                                    }}>
                                                        Edit Product
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