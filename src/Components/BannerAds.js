import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';

import connectionString from '../Static/Utilities/connectionString';
import { Link } from 'react-router-dom';


class BannerAds extends Component {

    state = {
        banners: [],
    }

    componentDidMount() {
        this.getBanners();
    }

    getBanners = () => {
        axios({
            url: `${connectionString}/products/get-banners`,
            method: 'GET',
        }).then(res => {
            this.setState({
                banners: res.data.banners
            });
        })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { banners } = this.state;

        return (
            <div>
                <Carousel>
                    {banners.map((banner, i) => {
                        return (
                            <Carousel.Item>
                                <Link target='_blank' to={`/${banner.link}`}>
                                    <img
                                        className="d-block w-100"
                                        src={banner.src}
                                        alt="First slide"
                                    />
                                </Link>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
        );
    }
}

export default BannerAds;