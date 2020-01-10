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
    Container as MContainer,
    List,
    ListItem,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Container } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import Rating from '@material-ui/lab/Rating';
import "react-image-gallery/styles/css/image-gallery.css";
import axios from 'axios';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import swal from 'sweetalert2';

import connectionString from '../Static/Utilities/connectionString';

// Static
import '../Static/CSS/ProductDetails.css'

// Components
import ProductDesriptionTabs from '../Components/ProductDescriptionTabs';
import { Link } from 'react-router-dom';

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
    breadcrumb: {
        height: 'auto',
        [theme.breakpoints.up('md')]: {
            height: 37,
        }
    },
    listItem: {
        marginTop: 0,
        [theme.breakpoints.up('md')]: {
            marginTop: -9
        }
    },
});

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0
})

class ProductDetails extends Component {

    state = {
        product: '',
        quantity: '',
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

    postCart = () => {
        const { product, quantity } = this.state;
        const productId = product._id;

        axios({
            url: `${connectionString}/products/post-cart`,
            method: 'POST',
            data: {
                prodId: productId,
                quantity: quantity,
            },
            headers: {
                Authorization: 'bearer ' + this.props.token
            }
        }).then(res => {
            console.log(res.data);
            swal.fire({
                icon: 'success',
                title: 'Added to cart'
            })
        }).catch(err => {
            console.log(err);
            swal.fire({
                icon: 'error',
                title: `${err.res.data.message}`
            })
        })
    }

    render() {
        const { classes } = this.props;
        const { product, pictures } = this.state;

        return (
            <div>
                <div style={{ height: 30 }} />
                <MContainer maxWidth='lg'>
                    <List className={classes.breadcrumb} style={{ border: '1px solid #34495E' }}>
                        <ListItem className={classes.listItem}>
                            <Breadcrumbs style={{ fontSize: 13 }} aria-label="breadcrumb">
                                <Link className={classes.link} to="/">
                                    <HomeIcon className={classes.icon} />
                                    Home
                                </Link>
                                <Link className={classes.link} to={`/c/${product.category}`}>
                                    <WhatshotIcon className={classes.icon} />
                                    {product.category}
                                </Link>
                                <Typography color="textPrimary">
                                    <GrainIcon className={classes.icon} />
                                    {product.title}
                                </Typography>
                            </Breadcrumbs>
                        </ListItem>
                    </List>
                </MContainer>
                <Container fluid={true}>
                    <div style={{ height: 50 }} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            {pictures && <ImageGallery
                                showPlayButton={false}
                                thumbnailPosition="bottom"
                                style={{ height: 50 }}
                                autoPlay={true}
                                items={pictures}
                                showNav={false}
                            />}
                        </Grid>
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={12} md={5}>
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
                                        onChange={e => this.setState({ quantity: e.target.value })}
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
                                        onClick={this.postCart}
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
                <div style={{
                    justifyContent: 'center',
                    alignItems: 'center,',
                    display: 'inline-flex',
                    width: '100%',
                    margin: 20,
                    marginBottom: 30
                }}>
                    <div style={{ width: 1512 }} className='ProductDesriptionTabsDesktop'>
                        <ProductDesriptionTabs overview={product.overview} specifications={product.specifications} />
                    </div>
                </div>
                <div className='ProductDesriptionTabsMobile' >
                    <MContainer maxWidth='lg'>.
                        <ProductDesriptionTabs overview={product.overview} specifications={product.specifications} />
                    </MContainer>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ProductDetails);