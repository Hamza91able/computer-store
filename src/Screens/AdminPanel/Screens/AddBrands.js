import React, { Component } from 'react';
import { Container, TextField, Grid, Divider, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react'
import swal from 'sweetalert2';

import connectionString from '../../../Static/Utilities/connectionString';

// Components
import BrandsTable from '../Components/Table';

class AddCategories extends Component {

    state = {
        categories: [],
        brand: '',
        parentCategory: '',
        categoriesTable: [],
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
                        categories: [...this.state.categories, { key: category._id, value: category.name, text: category.name }]
                    })
                })
                this.setState({
                    categoriesTable: res.data.categories,
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    addBrands = () => {
        const { parentCategory, brand } = this.state;

        axios({
            url: `${connectionString}/admin/add-brand`,
            method: "POST",
            data: {
                parentCategory,
                brand,
            },
            headers: {
                Authorization: 'bearer ' + this.props.token
            }
        }).then(res => {
            console.log(res.data);
            if (res.data.message == "Brand already exists") {
                swal.fire({
                    icon: 'error',
                    title: 'Error while adding brand',
                    text: 'Brand already exists',
                })
            } else {
                swal.fire({
                    icon: 'success',
                    title: 'Added Brand',
                    text: 'Brand Added Successfully',
                }).then(() => {
                    this.getCategories();
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { categories, categoriesTable } = this.state;

        return (
            <div>
                <Container maxWidth='lg'>
                    <Grid item>
                        <Grid xs={12}>
                            <Typography variant='body2' style={{ marginBottom: 5 }}>
                                Select Parent Category
                            </Typography>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Dropdown
                                    placeholder='Select Category'
                                    search
                                    selection
                                    options={categories}
                                    onChange={e => this.setState({ parentCategory: e.target.textContent })}
                                />
                            </FormControl>
                            <div style={{ marginTop: 20 }} />
                            <Typography variant='body2' style={{ marginBottom: 5 }}>
                                Add Brands
                            </Typography>
                            <TextField
                                id="filled-basic"
                                label="Add Brands"
                                variant="filled"
                                onChange={e => this.setState({ brand: e.target.value })}
                            />
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#f0c14b',
                                    color: '#111',
                                    fontWeight: 'normal',
                                    boxShadow: 'none',
                                    border: '1px solid black',
                                    borderColor: "#a88734 #9c7e31 #846a29",
                                    height: 55,
                                    marginLeft: 10
                                }}
                                onClick={this.addBrands}
                            >
                                Add Brand
                            </Button>
                        </Grid>
                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                        <Grid xs={12}>
                            Current Brands
                            <BrandsTable categories={categoriesTable} heading="Brands" />
                        </Grid>
                    </Grid>

                </Container>
            </div>
        );
    }
}

export default AddCategories;