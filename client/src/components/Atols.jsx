import React from 'react'
import Flip from "react-reveal/Flip";
import { Link } from "react-router-dom";
import Slide from "react-reveal/Slide";

const Atols = () => {
    return (
        <div id="partners">
            <div className="container border-6 border-teal-400 rounded-3xl lg:rounded-full bg-neutral-800 hover:bg-neutral-900 transition-all duration-300 cursor-pointer p-8">
                <div className="row flex ">
                    <Flip delay={150}>
                        <div className="col-sm-12 col-md-12 col-xs-12 col-lg-4">
                            <div className="thumb1">
                                <div className="thumbnail clearfix">
                                    <Link to="#">
                                        <figure style={{ textAlign: "center" }}>
                                            <img
                                                style={{ width: "20rem" }}
                                                src="images/ATOL.png"
                                                alt=""
                                                className="img1 img-responsive "
                                            />
                                            <img
                                                src="images/ATOL.png"
                                                alt=""
                                                className="img2 img-responsive"
                                            />
                                        </figure>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Flip>
                    <div className="col-sm-12 col-md-12 col-xs-12 col-lg-8 text-neutral-300">
                        <Slide top >
                            <h2 className='font-bold text-teal-400' >ATOL</h2>
                        </Slide>
                        <Slide right >
                            <p className='flex gap-3' >
                                <span>•</span>
                                We act as an agent for all ATOL holders. Please ask for
                                further information when you make your booking query.
                            </p>
                        </Slide>
                        <Slide bottom delay={500} >
                            <p className='flex gap-3' >
                                <span>•</span>
                                All the flights advertised on the website originated from
                                the UK are proctected by ATOL scheme. You will be provided
                                your ATOL certificate onceyour booking is fully paid.
                            </p>
                        </Slide>
                        <Slide right >
                            <div className='flex gap-3' >
                                <span>•</span>
                                <p>
                                    Please see our Terms & Conditions for further information
                                    about ATOL protection{" "}
                                    <Link to="/TermsAndCondition" className='underline text-teal-400 hover:text-teal-300  transition-all' > click here. </Link>
                                </p>
                            </div>
                        </Slide>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Atols