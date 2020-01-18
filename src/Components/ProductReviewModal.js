import React from 'react';
import { Modal, ButtonToolbar } from 'react-bootstrap'
import { Button, Typography, Grid, TextField, Divider, TextareaAutosize } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Axios from 'axios';

import connectionString from '../Static/Utilities/connectionString';

// Components
import ProductReviewRating from './ProductReviewRating';
import Swal from 'sweetalert2';

let product;
let token;
let userId;

class ReviewModal extends React.Component {

    state = {
        modalShow: false,
        product: {},
        rating: 0,
        title: '',
        pros: '',
        cons: '',
        overallReview: '',
        edit: false,
    }

    componentDidMount() {
        console.log(this.props.token);
        try {
            if (this.props.currentProduct.title) {
                product = this.props.currentProduct;
                token = this.props.token;
                userId = this.props.userId;
                this.checkOwnReview();
            }
        } catch (error) {

        }
    }

    checkOwnReview = () => {
        console.log('TEST');
        console.log(product);
        for (let i = 0; i < product.reviews.length; i++) {
            console.log(product.reviews[i].userId);
            console.log(userId);
            if (product.reviews[i].userId === userId) {
                this.setState({
                    edit: true,
                    rating: product.reviews[i].rating,
                    title: product.reviews[i].title,
                    pros: product.reviews[i].pros,
                    cons: product.reviews[i].cons,
                    overallReview: product.reviews[i].overallReview,
                })
                break;
            }
        }
    }

    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    changeRating = rating => {
        this.setState({
            rating
        })
    }

    postReview = () => {
        const { rating, title, pros, cons, overallReview } = this.state;
        console.log(token);

        Axios({
            url: `${connectionString}/products/review-product`,
            method: 'POST',
            data: {
                prodId: product._id,
                rating,
                title,
                pros,
                cons,
                overallReview
            },
            headers: {
                Authorization: 'bearer ' + token
            }
        }).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Review Saved!',
            }).then(window.location.reload())
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Internal Server Error.',
            });
        });
    }

    render() {
        const { modalShow, edit } = this.state;

        return (
            <ButtonToolbar>

                {edit
                    ?
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
                        }}
                        onClick={() => { if (this.props.isAuth) { this.setState({ modalShow: true }) } else Swal.fire({ icon: 'error', title: 'Please login first' }) }}
                    >
                        Edit Review
                    </Button>
                    :
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
                        }}
                        onClick={() => { if (this.props.isAuth) { this.setState({ modalShow: true }) } else Swal.fire({ icon: 'error', title: 'Please login first' }) }}
                    >
                        Leave a Review
                </Button>}
                <Modal
                    show={modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    style={{ zIndex: 10000 }}
                >
                    {product &&
                        <React.Fragment>
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    {product.title}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div style={{ padding: 30, width: '100%' }}>
                                    <Typography variant="h5" component="h2">
                                        Review Product
                                    </Typography>
                                    <ProductReviewRating rating={this.state.rating} changeRating={this.changeRating} />
                                    <Grid>
                                        <Grid style={{ marginTop: 10 }} item xs={12}>
                                            <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13 }}>
                                                Title
                                            </Typography>
                                            <TextField
                                                required
                                                id="standard-required"
                                                variant='outlined'
                                                name='title'
                                                onChange={this.handleInput}
                                                value={this.state.title}
                                                style={{ width: '100%' }}
                                                size='small'
                                            />
                                        </Grid>
                                        <Grid style={{ marginTop: 10 }} item xs={12}>
                                            <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13 }}>
                                                Pros (OPTIONAL)
                                            </Typography>
                                            <TextareaAutosize
                                                aria-label="minimum height"
                                                rowsMin={3}
                                                placeholder="Maximum 500 letters"
                                                name='pros'
                                                onChange={this.handleInput}
                                                value={this.state.pros}
                                                style={{ width: '100%' }}
                                                maxLength={500}
                                            />
                                        </Grid>
                                        <Grid style={{ marginTop: 10 }} item xs={12}>
                                            <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13 }}>
                                                Cons (OPTIONAL)
                                            </Typography>
                                            <TextareaAutosize
                                                aria-label="minimum height"
                                                rowsMin={3}
                                                placeholder="Maximum 500 letters"
                                                name='cons'
                                                onChange={this.handleInput}
                                                value={this.state.cons}
                                                style={{ width: '100%' }}
                                                maxLength={500}
                                            />
                                        </Grid>
                                        <Grid style={{ marginTop: 10 }} item xs={12}>
                                            <Typography variant='body1' style={{ fontWeight: 700, fontSize: 13 }}>
                                                Overall Review
                                            </Typography>
                                            <TextareaAutosize
                                                aria-label="minimum height"
                                                rowsMin={3}
                                                placeholder="Maximum 500 letters"
                                                name='overallReview'
                                                onChange={this.handleInput}
                                                value={this.state.overallReview}
                                                style={{ width: '100%' }}
                                                maxLength={500}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => this.postReview()}>Save Review</Button>
                            </Modal.Footer>
                        </React.Fragment>

                    }
                </Modal>
            </ButtonToolbar >
        );
    }
}

export default ReviewModal;