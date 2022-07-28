import React from 'react'
import Fade from "react-reveal/Fade"
import Carousel from "react-material-ui-carousel";


const MainBanner = ({ imageRoute, children }) => {
    return (

            <div toggle={imageRoute} id="slider_wrapper">
                <div className="container">
                    <div id="slider_inner">
                        <div className="">
                            <div id="slider">
                                <div className="">
                                    <div className="carousel-box">
                                        <div className="inner">
                                            <Fade delay={150} >
                                                {children}
                                            </Fade>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MainBanner