import React from 'react';

const Newsletter = () => (
    <section>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12 text-center">
                    <div className="title">
                        <h2>SUBSCRIBE TO NEWSLETTER</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, <br></br> facilis numquam impedit ut sequi. Minus facilis vitae excepturi sit laboriosam.</p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-md-offset-3">
                            <div className="input-group subscription-form">
                                <input type="text" className="form-control" placeholder="Enter Your Email Address"></input>
                                <span className="input-group-btn">
                                    <button className="btn btn-main" type="button">Subscribe Now!</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Newsletter;

