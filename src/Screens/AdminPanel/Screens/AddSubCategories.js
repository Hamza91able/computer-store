import React, { Component } from 'react';
import { Container, TextField, Grid, Divider, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';
import swal from 'sweetalert2';

import connectionString from '../../../Static/Utilities/connectionString';

// Components
import CategoriesTable from '../Components/Table';

class AddCategories extends Component {

    state = {
        categories: [],
        subCategory: '',
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
                        categories: [...this.state.categories, { key: category._id, value: category.name, text: category.name }],
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

    addSubCategory = () => {
        const { subCategory, parentCategory } = this.state;

        axios({
            url: `${connectionString}/admin/add-sub-category`,
            method: 'POST',
            data: {
                parentCategory,
                subCategory,
            },
            headers: {
                Authorization: 'bearer ' + this.props.token,
            }
        }).then(res => {
            console.log(res.data.message);
            if (res.data.message == "Sub-Category already exists") {
                swal.fire({
                    icon: 'error',
                    title: 'Error while adding category',
                    text: 'Sub-Category already exists',
                })
            } else {
                swal.fire({
                    icon: 'success',
                    title: 'Added Sub-Category',
                    text: 'Sub-Cateogry Added Successfully',
                }).then(() => {
                    this.getCategories();
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    deleteSubCategory = categoryData => {
        const { categoryId, subCategoryName } = categoryData;

        axios({
            url: `${connectionString}/admin/delete-subcategory`,
            method: "POST",
            data: {
                categoryId,
                subCategoryName,
            },
            headers: {
                Authorization: 'bearer ' + this.props.token
            }
        }).then(res => {
            console.log(res.data);
            swal.fire({
                icon: 'success',
                title: 'Sub Category Deleted',
            }).then(() => this.getCategories())
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
                                Add Sub-Categories
                            </Typography>
                            <TextField
                                id="filled-basic"
                                label="Add Category"
                                variant="filled"
                                onChange={e => this.setState({ subCategory: e.target.value })}
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
                                onClick={this.addSubCategory}
                            >
                                Add Sub-Category
                            </Button>
                        </Grid>
                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                        <Grid xs={12}>
                            Current Sub-Categories
                            <CategoriesTable deleteSubCategory={this.deleteSubCategory} categories={categoriesTable} heading="Sub-Categories" />
                        </Grid>
                    </Grid>

                </Container>
            </div>
        );
    }
}

export default AddCategories;