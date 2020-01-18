import React, { Component } from 'react';
import { Container, TextField, Grid, Divider, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import moment from 'moment'

import connectionString from '../../../Static/Utilities/connectionString';

// Components
import SaleSectionDrawer from '../Components/SaleSectionDrawer';
import CountDownTimer from '../../../Components/CountDownTimer';
import Swal from 'sweetalert2';

class SaleSection extends Component {

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

    endSale = prodId => {
        console.log(this.props.token)

        axios({
            url: `${connectionString}/admin/end-sale/${prodId}`,
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + this.props.token,
            },
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Sale Ended manually',
                }).then(() => window.location.reload())
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: err.response.data.message,
                })
            })
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
                                                        <br />
                                                        Sale Ends In: {product.onSale
                                                            ?
                                                            <CountDownTimer
                                                                timeTillDate={moment(product.saleEndDate).format('MM DD YYYY, h:mm a')}
                                                                timeFormat="MM DD YYYY, h:mm a" />
                                                            :
                                                            "Currently Not on Sale"}
                                                    </Typography>
                                                    <SaleSectionDrawer token={this.props.token} userId={this.props.userId} prodId={product._id} />
                                                    <Button onClick={() => this.endSale(product._id)} style={{
                                                        backgroundColor: '#f0c14b',
                                                        color: '#111',
                                                        fontWeight: 'normal',
                                                        bomdhadow: 'none',
                                                        border: '1px solid black',
                                                        borderColor: "#a88734 #9c7e31 #846a29",
                                                        marginLeft: 10
                                                    }}>
                                                        End Sale
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

export default SaleSection;