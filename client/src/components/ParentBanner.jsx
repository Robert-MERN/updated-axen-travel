import React from 'react'
import MainBanner from './MainBanner'
import Carousel from "react-material-ui-carousel";


const ParentBanner = () => {
    return (
        <Carousel
            IndicatorIcon=""
            navButtonsAlwaysInvisible="false"
            animation="slide"
            autoPlay="true"
            timeout={500}
            cycleNavigation="true"
        >
            <MainBanner imageRoute="1" >
                <div className="slider">
                    <div className="slider_inner">
                        <div className="txt1">
                            <span>Welcome To </span>
                        </div>
                        <div className="txt2">
                            <span>AXEN HOLIDAYS</span>
                        </div>
                        <div className="txt3">
                            <span>
                                Explore a universe filled with limitless
                                possibilities.
                            </span>
                        </div>
                    </div>
                </div>
            </MainBanner>
            <MainBanner imageRoute="2" >
                <div className="slider">
                    <div className="slider_inner">
                        <div className="txt1">
                            <span>7 - Day Tour</span>
                        </div>
                        <div className="txt2">
                            <span>AMAZING CARIBBEAN</span>
                        </div>
                        <div className="txt3">
                            <span>
                                With us, you may take in the breathtaking
                                beauty of the Caribbean islands.
                            </span>
                        </div>
                    </div>
                </div>
            </MainBanner>
            <MainBanner imageRoute="3" >
                <div className="slider">
                    <div className="slider_inner">
                        <div className="txt1">
                            <span>5 Days In</span>
                        </div>
                        <div className="txt2">
                            <span>PARIS (Capital Of World)</span>
                        </div>
                        <div className="txt3">
                            <span>
                                Join us in discovering the wonders of
                                Paris!
                            </span>
                        </div>
                    </div>
                </div>
            </MainBanner>
        </Carousel>

    )
}

export default ParentBanner