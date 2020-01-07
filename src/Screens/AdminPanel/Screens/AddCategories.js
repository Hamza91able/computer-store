import React, { Component } from 'react';
import { Container, TextField, Grid, Divider, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert2'

import connectionString from '../../../Static/Utilities/connectionString';

// Components
import CategoriesTable from '../Components/Table';

class AddCategories extends Component {

    state = {
        category: '',
        categories: [],
    }

    componentDidMount() {
        this.getCategories();
    }

    addCategory = () => {
        const { category } = this.state;

        axios({
            url: `${connectionString}/admin/add-category`,
            method: 'POST',
            data: {
                name: category
            },
            headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        })
            .then(res => {
                swal.fire({
                    icon: 'success',
                    title: 'Category Added Successfully',
                }).then(() => {
                    this.getCategories();
                    this.setState({
                        category: '',
                    })
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    getCategories = () => {

        axios({
            url: `${connectionString}/categories/get-categories`,
            method: 'GET',
        })
            .then(res => {
                this.setState({
                    categories: res.data.categories
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { categories, category } = this.state;

        return (
            <div>
                <Container maxWidth='lg'>
                    <Grid item>
                        <Grid xs={12}>
                            <Typography variant='body2' style={{ marginBottom: 5 }}>
                                Add Categories
                            </Typography>
                            <TextField
                                id="filled-basic"
                                label="Add Category"
                                variant="filled"
                                name='category'
                                onChange={e => this.setState({ category: e.target.value })}
                                value={category}
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
                                onClick={this.addCategory}
                            >
                                Add Category
                            </Button>
                        </Grid>
                        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                        <Grid xs={12}>
                            Current Categories
                            <CategoriesTable heading="Categories" categories={categories} />
                        </Grid>
                    </Grid>

                </Container>
            </div>
        );
    }
}

export default AddCategories;