import React, { Component } from 'react';
import { Container, Divider, InputLabel, CircularProgress, Button } from '@material-ui/core';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import swal from 'sweetalert2';

import connectionString from '../../../Static/Utilities/connectionString';


class ChangeBanners extends Component {

    state = {
        pictures: [],
        isLoading: false,
    }

    onDrop = picture => {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }


    changeBanners = () => {
        const { pictures } = this.state;

        const formData = new FormData();
        for (let x = 0; x < pictures.length; x++) {
            formData.append('pictures', pictures[x]);
        }

        axios({
            url: `${connectionString}/admin/change-banners`,
            method: 'POST',
            data: formData,
            headers: {
                Authorization: 'bearer ' + this.props.token
            }
        }).then(response => {
            console.log(response.data);
            swal.fire({
                icon: 'success',
                title: 'Pictures Uploaded',
            }).then(() => window.location.reload())
        }).catch(err => {
            console.log(err);
            this.setState({
                isLoading: false,
            })
            swal.fire({
                icon: 'error',
                title: 'Error Occoured please try again',
            })
        })
    }

    render() {
        const { isLoading } = this.state;

        return (

            <div>
                <Container maxWidth='lg'>
                    Change Banners of Front Page
                </Container>
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
                <div style={{
                    justifyContent: 'center',
                    alignItems: 'center,',
                    display: 'inline-flex',
                    width: '100%',
                }}>
                    {!isLoading
                        ?
                        <Button
                            variant="contained"
                            style={{
                                height: 40,
                                backgroundColor: '#f0c14b',
                                color: '#111',
                                fontWeight: 'normal',
                                boxShadow: 'none',
                                border: '1px solid black',
                                borderColor: "#a88734 #9c7e31 #846a29",
                            }}
                            onClick={() => {
                                this.changeBanners();
                                this.setState({
                                    isLoading: true,
                                })
                            }}
                        >
                            Upload Pictures
                        </Button>
                        :
                        <Button
                            variant="contained"
                            style={{
                                height: 'auto',
                                backgroundColor: '#f0c14b',
                                color: '#111',
                                fontWeight: 'normal',
                                boxShadow: 'none',
                                border: '1px solid black',
                                borderColor: "#a88734 #9c7e31 #846a29",
                            }}
                            disabled={true}
                        >
                            <CircularProgress />
                        </Button>
                    }
                </div>
            </div>
        );
    }
}

export default ChangeBanners;