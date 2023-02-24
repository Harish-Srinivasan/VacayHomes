import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropertiesAll from './PropertiesAll';

function Properties() {
    return (
        <div>
            <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="images/Slider1.jpeg" class="bd-placeholder-img" width="100%" height="100%"
                            aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false" />

                        <div class="container">
                            <div class="carousel-caption text-start">
                                <h1>Perfect homes for your perfect vacation</h1>
                                <p>Choose homes with scenic views and awesome perks for your dream vacation!</p>
                                <p><a class="btn btn-lg btn-light" href="/login">Book now</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="images/Slider2.jpeg" class="bd-placeholder-img" width="100%" height="100%"
                            aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false" />

                        <div class="container">
                            <div class="carousel-caption">
                                <h1>Rent from trusted sources</h1>
                                <p>Choose best rated houses from trusted and verified sources for your trip</p>
                                <p><a class="btn btn-lg btn-light" href="/login">Learn more</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="images/Slider3.jpeg" class="bd-placeholder-img" width="100%" height="100%"
                            aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false" />


                        <div class="container">
                            <div class="carousel-caption text-end">
                                <h1>Rent out your home</h1>
                                <p>Host verified guests in your home and earn money!</p>
                                <p><a class="btn btn-lg btn-light" href="/hostregister">Host now</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div>
                <div className="container-fluid" style={{ marginTop: '30px' }}>
                    <div className="main">
                        <PropertiesAll />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Properties;