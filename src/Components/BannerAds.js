import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

// Banners
import BannerAd1 from '../Assets/images/banner1.jpg'
import BannerAd2 from '../Assets/images/banner2.jpg'
import BannerAd3 from '../Assets/images/banner3.jpg'
import BannerAd4 from '../Assets/images/banner4.jpg'
import BannerAd5 from '../Assets/images/banner5.jpg'


class BannerAds extends Component {
    render() {
        return (
            <div>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={BannerAd5}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={BannerAd2}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={BannerAd3}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={BannerAd4}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={BannerAd1}
                            alt="First slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default BannerAds;