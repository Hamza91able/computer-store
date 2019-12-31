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

class ProductDetails extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Container fluid={true}>
                    <div style={{ height: 50 }} />
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={4}>
                            <ImageGallery
                                showPlayButton={false}
                                thumbnailPosition="bottom"
                                style={{ height: 50 }}
                                autoPlay={true}
                                items={images}
                                showNav={false}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography style={{ fontWeight: 'bold' }} variant='h6'>
                                Intel Core i9-9900K Coffee Lake 8-Core, 16-Thread,
                                3.6 GHz (5.0 GHz Turbo) LGA 1151 (300 Series)
                                95W BX80684I99900K Desktop Processor Intel UHD Graphics 630
                            </Typography>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <div className={classes.rating1}>
                                    <Rating
                                        name="hover-side"
                                        value={5}
                                        size="small"
                                    />
                                    <Box style={{ fontSize: 13 }}>(520)</Box>
                                </div>
                            </Box>
                            <Divider style={{ marginTop: 10 }} />
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography style={{ fontSize: 13, color: 'rgb(17, 176, 9)', fontWeight: 'bold' }} variant='body1'>
                                        In stock.
                                    </Typography>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Sold and Shipped by: <bold>Computer Store</bold>
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Divider style={{ marginTop: 10 }} />
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography className={classes.title} >
                                        <ul>
                                            <li>9th Gen Intel Processor</li>
                                            <li>Intel UHD Graphics 630</li>
                                            <li>Only Compatible with Intel 300 Series Motherboard</li>
                                            <li>Socket LGA 1151 (300 Series)</li>
                                            <li>Max Turbo Frequency 5.0 GHz</li>
                                            <li>Unlocked Processor</li>
                                            <li>DDR4 Support</li>
                                            <li>Intel Optane Memory and SSD Supported</li>
                                            <li>Cooling device not included - Processor Only</li>
                                            <li>Intel Turbo Boost Technology 2.0 and Intel vPro technology offer pro-level performance for gaming, creating, and overall productivity</li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Card className={classes.card} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Sold and Shipped by: <strong>Computer Store</strong>
                                    </Typography>
                                    <Divider style={{ marginTop: 10 }} />
                                    <Typography style={{ marginTop: 20, fontWeight: 'bold' }} variant="h5" component="h2">
                                        Rs.76,641
                                    </Typography>
                                    <Divider style={{ marginTop: 10 }} />
                                    <Typography style={{ fontSize: 12, marginTop: 10 }} className={classes.pos} color="textSecondary">
                                        <LocalShippingIcon style={{ width: 22, height: 20, marginRight: 5 }} /> Shipping & Delievery
                                    </Typography>
                                    <Typography variant="caption" component="p">
                                        <strong>Shipping Cost: Rs.300/unit</strong>
                                        <br />
                                        Shippinh in Karachi: Rs.100/unit
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
                                        defaultValue={1}
                                    />
                                    <Button
                                        variant="contained"
                                        style={{
                                            width: '80%',
                                            backgroundColor: 'rgb(255, 163, 58)',
                                            color: '#101820FF',
                                            fontWeight: 'bold'
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
                    <ProductDesriptionTabs />
                </MContainer>
            </div>
        );
    }
}

export default withStyles(styles)(ProductDetails);