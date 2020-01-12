import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';

import connectionString from '../Static/Utilities/connectionString';

// Banners
import BannerAd1 from '../Assets/images/banner1.jpg'
import BannerAd2 from '../Assets/images/banner2.jpg'
import BannerAd3 from '../Assets/images/banner3.jpg'
import BannerAd4 from '../Assets/images/banner4.jpg'
import BannerAd5 from '../Assets/images/banner5.jpg'


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
                                <img
                                    className="d-block w-100"
                                    src={banner.src}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
        );
    }
}

export default BannerAds;