import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    Button,
    CardActions,
    Divider,
    Box,
    TextField,
    Container as MContainer
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Container } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import Rating from '@material-ui/lab/Rating';
import "react-image-gallery/styles/css/image-gallery.css";
import axios from 'axios';

import connectionString from '../Static/Utilities/connectionString';

// Static
import '../Static/CSS/ProductDetails.css'

// Components
import ProductDesriptionTabs from '../Components/ProductDescriptionTabs';

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
        minWidth: 275,
        boxShadow: 'none'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    rating1: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
});

const images = [
    {
        original: 'https://c1.neweggimages.com/NeweggImage/ProductImageCompressAll1280/19-117-957-V01.jpg',
        thumbnail: 'https://c1.neweggimages.com/NeweggImage/ProductImageCompressAll1280/19-117-957-V01.jpg',
    },
    {
        original: "https://c1.neweggimages.com/NeweggImage/ProductImageCompressAll1280/19-117-957-V02.jpg",
        thumbnail: "https://c1.neweggimages.com/NeweggImage/ProductImageCompressAll1280/19-117-957-V02.jpg",
    },
    {
        original: 'https://c1.neweggimages.com/NeweggImage/ProductImageCompressAll1280/19-117-957-V03.jpg',
        thumbnail: 'https://c1.neweggimages.com/NeweggImage/ProductImageCompressAll1280/19-117-957-V03.jpg',
    }
]

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0
})

class ProductDetails extends Component {

    state = {
        product: '',
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios({
            url: `${connectionString}/products/get-specific-product/${id}`,
            method: 'GET',
        }).then(res => {
            console.log(res.data);
            let images = [];
            if (res.data.product) {
                res.data.product.pictures.forEach(picture => {
                    images.push({
                        original: picture,
                        thumbnail: picture,
                    });
                })
            }
            this.setState({
                product: res.data.product,
                pictures: images
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { classes } = this.props;
        const { product, pictures } = this.state;

        return (
            <div>
                <Container fluid={true}>
                    <div style={{ height: 50 }} />
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={4}>
                            {pictures && <ImageGallery
                                showPlayButton={false}
                                thumbnailPosition="bottom"
                                style={{ height: 50 }}
                                autoPlay={true}
                                items={pictures}
                                showNav={false}
                            />}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography style={{ fontWeight: 'bold' }} variant='h6'>
                                {product.title}
                            </Typography>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <div className={classes.rating1}>
                                    <Rating
                                        name="hover-side"
                                        value={product.rating}
                                        size="small"
                                    />
                                    <Box style={{ marginTop: -10, fontSize: 13, marginLeft: 7 }}>{product.rating ? product.rating.length : "(0)"}</Box>
                                </div>
                            </Box>
                            <Divider style={{ marginTop: 10 }} />
                            <Card className={classes.card}>
                                <CardContent>
                                    {product.stock > 0
                                        ?
                                        <Typography style={{ fontSize: 13, color: 'rgb(17, 176, 9)', fontWeight: 'bold' }} variant='body1'>
                                            In stock.
                                        </Typography>
                                        :
                                        <Typography style={{ fontSize: 13, color: 'red', fontWeight: 'bold' }} variant='body1'>
                                            Out of Stock.
                                        </Typography>
                                    }
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Sold and Shipped by: <bold>{product.soldAndShippedBy}</bold>
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Divider />
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography className={classes.title} >
                                        <ul>
                                            {product.bulletPoints && product.bulletPoints.map((points, index) => {
                                                return (
                                                    <li key={index}>{points}</li>
                                                )
                                            })}
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Sold and Shipped by: <strong>{product.soldAndShippedBy}</strong>
                                    </Typography>
                                    <Divider style={{ marginTop: 10 }} />
                                    <Typography style={{ marginTop: 20, fontWeight: 'bold' }} variant="h5" component="h2">
                                        {formatter.format(product.price)}
                                    </Typography>
                                    <Divider style={{ marginTop: 10 }} />
                                    <Typography style={{ fontSize: 12, marginTop: 10 }} className={classes.pos} color="textSecondary">
                                        <LocalShippingIcon style={{ width: 22, height: 20, marginRight: 5 }} /> Shipping & Delievery
                                    </Typography>
                                    <Typography variant="caption" component="p">
                                        <strong>Shipping Cost: {formatter.format(product.shippingCost)}/unit</strong>
                                        <br />
                                        Shipping in Karachi: {formatter.format(product.shippingInKarachi)}/unit
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <TextField
                                        id="outlined-number"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        min={0}
                                        max={5}
                                        defaultValue={1}
                                        style={{
                                            width: 80
                                        }}
                                        size='small'
                                    />
                                    <Button
                                        variant="contained"
                                        style={{
                                            width: '100%',
                                            backgroundColor: 'rgb(255, 163, 58)',
                                            color: '#101820FF',
                                            fontWeight: 'bold',
                                            height: 37
                                        }}
                                    >
                                        <AddShoppingCartIcon />ADD TO CART <ArrowRightIcon style={{ marginTop: -1, marginLeft: -4 }} />
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
                <Divider style={{ marginTop: 30 }} />
                <div style={{ height: 40 }} />
                <MContainer maxWidth='lg'>
                    <ProductDesriptionTabs overview={product.overview} specifications={product.specifications} />
                </MContainer>
            </div>
        );
    }
}

export default withStyles(styles)(ProductDetails);