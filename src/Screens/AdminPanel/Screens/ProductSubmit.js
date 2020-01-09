import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Typography, InputLabel, Divider, Container, Button, IconButton } from '@material-ui/core';
import axios from 'axios';
import swal from 'sweetalert2';
import { Dropdown } from 'semantic-ui-react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ImageUploader from 'react-images-upload';

import connectionString from '../../../Static/Utilities/connectionString';

// Components
import ProductSubmitOverview from '../Components/ProductSubmitOverview';
import ProductSubmitSpecifications from '../Components/ProductSubmitSpecifications';

// Static
import '../../../Static/CSS/ProductSubmit.css';

const styles = theme => ({

});

class ProductSubmit extends Component {

    state = {
        categories: [],
        values: [],
        pictures: [],
        subCategories: [],
        brands: [],
        parentCategory: '',
        subCategory: '',
        brand: '',
        title: '',
        price: '',
        stock: '',
        overview: '',
        specifications: '',
        soldAndShippedBy: '',
        shippingCost: '',
        shippingCostInKarachi: '',
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
            })
            .catch(err => {
                console.log(err);
            })
    }

    getSubCategoriesAndBrands = () => {
        const { parentCategory } = this.state;

        axios({
            url: `${connectionString}/categories/get-sub-categories/${parentCategory}`,
            method: 'GET',
        }).then(res => {
            res.data.subCategories.forEach((subCategory, index) => {
                this.setState({
                    subCategories: [...this.state.subCategories, { key: index, value: subCategory, text: subCategory }]
                })
            })
            res.data.brands.forEach((brand, index) => {
                this.setState({
                    brands: [...this.state.brands, { key: index, value: brand, text: brand }]
                })
            })
        }).catch(err => {
            console.log(err);
        })
    }

    setOverview = overview => {
        this.setState({
            overview
        })
    }

    setSpecifications = specifications => {
        this.setState({
            specifications
        })
    }

    handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
    }

    addClick() {
        this.setState(prevState => ({ values: [...prevState.values, ''] }))
    }

    removeClick(i) {
        let values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
    }

    onDrop = picture => {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    submit = () => {
        const {
            values,
            pictures,
            parentCategory,
            subCategory,
            brand,
            title,
            price,
            stock,
            overview,
            specifications,
            soldAndShippedBy,
            shippingCost,
            shippingCostInKarachi,
        } = this.state;

        const formData = new FormData();

        formData.append('title', title);
        formData.append('category', parentCategory);
        formData.append('subCategory', subCategory);
        formData.append('brand', brand);
        formData.append('bulletPoints', values);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('overview', overview);
        formData.append('specifications', specifications);
        for (let x = 0; x < pictures.length; x++) {
            formData.append('pictures', pictures[x]);
        }
        formData.append('soldAndShippedBy', soldAndShippedBy);
        formData.append('shippingCost', shippingCost);
        formData.append('shippingCostInKarachi', shippingCostInKarachi);

        axios({
            url: `${connectionString}/admin/post-product`,
            method: 'POST',
            data: formData
        }).then(response => {
            console.log(response.data);
            swal.fire({
                icon: 'success',
                title: 'Product Uploaded',
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { categories, subCategories, brands } = this.state;

        return (
            <Container maxWidth='lg'>
                <div>
                    <InputLabel style={{ fontWeight: 'bold' }} id="demo-simple-select-label">Title</InputLabel>
                    <TextField
                        id="standard-required"
                        variant='outlined'
                        style={{ width: '100%' }}
                        size='small'
                        placeholder="Title"
                        onChange={e => this.setState({ title: e.target.value })}
                    />
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                    <InputLabel style={{ fontWeight: 'bold' }} id="demo-simple-select-label">Select Category</InputLabel>
                    <Dropdown
                        placeholder='Select Category'
                        search
                        selection
                        options={categories}
                        onChange={e => this.setState({
                            parentCategory: e.target.textContent,
                            brands: [],
                            subCategories: [],
                            brand: '',
                            subCategory: ''
                        }, () => this.getSubCategoriesAndBrands())}
                        style={{ width: '100%' }}
                    />
                    <div style={{ padding: 10 }} />
                    <InputLabel style={{ fontWeight: 'bold' }} id="demo-simple-select-label">Select Sub-Category</InputLabel>
                    <Dropdown
                        placeholder='Select Sub-Category'
                        search
                        selection
                        options={subCategories}
                        onChange={e => this.setState({ subCategory: e.target.textContent })}
                        style={{ width: '100%' }}
                    />
                    <div style={{ padding: 10 }} />
                    <InputLabel style={{ fontWeight: 'bold' }} id="demo-simple-select-label">Select Brand</InputLabel>
                    <Dropdown
                        placeholder='Select Brand'
                        search
                        selection
                        options={brands}
                        onChange={e => this.setState({ brand: e.target.textContent })}
                        style={{ width: '100%' }}
                    />
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                    <InputLabel style={{ fontWeight: 'bold' }} id="demo-simple-select-label">Add Bullet Points</InputLabel>
                    {this.state.values.map((el, i) =>
                        <div key={i}>
                            <TextField
                                variant='outlined'
                                style={{ width: '50%' }}
                                size='small'
                                value={el || ''}
                                onChange={this.handleChange.bind(this, i)}
                            />
                            <Button onClick={this.removeClick.bind(this, i)}>
                                <RemoveIcon />
                            </Button>
                            <div style={{ padding: 5 }} />
                        </div>
                    )}
                    <Button onClick={this.addClick.bind(this)}>
                        <AddIcon /> Add More
                </Button>
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                    <InputLabel style={{ fontWeight: 'bold' }} id="demo-simple-select-label">Price</InputLabel>
                    <TextField
                        id="standard-required"
                        variant='outlined'
                        style={{ width: '100%' }}
                        size='small'
                        placeholder="Price"
                        type='number'
                        onChange={e => this.setState({ price: e.target.value })}
                    />
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                    <InputLabel style={{ fontWeight: 'bold' }} id="demo-simple-select-label">Stock</InputLabel>
                    <TextField
                        id="standard-required"
                        variant='outlined'
                        style={{ width: '100%' }}
                        size='small'
                        placeholder="Stock"
                        type='number'
                        onChange={e => this.setState({ stock: e.target.value })}
                    />
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                    <InputLabel style={{ fontWeight: 'bold' }} id="demo-simple-select-label">Pictures</InputLabel>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.png']}
                        maxFileSize={5242880}
                        withPreview={true}
                    />
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                    <InputLabel style={{ fontWeight: 'bold' }} id="demo-simple-select-label">Sold & Shipped By</InputLabel>
                    <TextField
                        id="standard-required"
                        variant='outlined'
                        style={{ width: '100%' }}
                        size='small'
                        placeholder="Sold & Shipped by"
                        onChange={e => this.setState({ soldAndShippedBy: e.target.value })}
                    />
                    <div style={{ padding: 10 }} />
                    <InputLabel style={{ fontWeight: 'bold' }} id="demo-simple-select-label">Shipping Cost</InputLabel>
                    <TextField
                        id="standard-required"
                        variant='outlined'
                        style={{ width: '100%' }}
                        size='small'
                        placeholder="Shipping Cost"
                        type='number'
                        onChange={e => this.setState({ shippingCost: e.target.value })}
                    />
                    <div style={{ padding: 10 }} />
                    <InputLabel style={{ fontWeight: 'bold' }} id="demo-simple-select-label">Shipping Cost in Karachi</InputLabel>
                    <TextField
                        id="standard-required"
                        variant='outlined'
                        style={{ width: '100%' }}
                        size='small'
                        placeholder="Shipping Cost"
                        type='number'
                        onChange={e => this.setState({ shippingCostInKarachi: e.target.value })}
                    />
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                    <InputLabel style={{ fontWeight: 'bold' }} id="demo-simple-select-label">Product Overview</InputLabel>
                    <ProductSubmitOverview setOverview={this.setOverview} />
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                    <InputLabel style={{ fontWeight: 'bold' }} id="demo-simple-select-label">Product Specifications</InputLabel>
                    <ProductSubmitSpecifications setSpecifications={this.setSpecifications} />
                    <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                    <div style={{
                        justifyContent: 'center',
                        alignItems: 'center,',
                        display: 'inline-flex',
                        width: '100%',
                    }}>
                        <Button
                            variant="contained"
                            style={{
                                width: '50%',
                                height: 40,
                                backgroundColor: '#f0c14b',
                                color: '#111',
                                fontWeight: 'normal',
                                boxShadow: 'none',
                                border: '1px solid black',
                                borderColor: "#a88734 #9c7e31 #846a29",
                            }}
                            onClick={() => {
                                this.submit();
                            }}
                        >
                            Submit
                    </Button>
                    </div>
                </div>
            </Container>
        );
    }
}



export default withStyles(styles)(ProductSubmit);