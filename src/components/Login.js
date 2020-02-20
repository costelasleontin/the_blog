import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';
import Header from './Header';
import Newsletter from './Newsletter';
import Media from './Media';
import Footer from './Footer';

const Login = () => (
    <Fragment>
        <div>
            <script type="text/javascript">
                $(document).ready(function () => $("input.input-validation-error").addClass("has-danger"););
            </script>
            <div className="big-section">

                {/*Top Header*/}
                <Header />

                {/* Navigation*/}
                <Navigation />

                {/*Sections*/}
                <section>
                    <div className="container-fluid p-2">
                        <form method="post" action="/Account/Login">
                            <div className="form-row p-2">
                                <div className="col-3">
                                    <p className="h3 text-center">Login User</p>
                                </div>
                            </div>
                            <div className="form-row" p-2>
                                <div className="text-danger validation-summary-valid" data-valmsg-summary="true"><ul><li style={{display:"none"}}></li>
                                </ul></div>
                            </div>
                            <div className="form-row p-2">
                                <div className="col-3">
                                    <input type="text" className="form-control" placeholder="UserName" data-val="true" data-val-required="The UserName field is required." id="UserName" name="UserName" value=""></input>
                                </div>
                            </div>
                            <div className="form-row p-2">
                                <div className="col-3">
                                    <input type="password" className="form-control" placeholder="Password" data-val="true" data-val-required="The Password field is required." id="Password" name="Password"></input>
                                </div>
                            </div>
                            <div className="form-row p-2">
                                <div className="col">
                                    <button type="submit" className="btn btn-primary">Log In</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>


                {/*Media = Instagram and Facebook links*/}
                <Media />

                {/*Newsletter*/}
                <Newsletter />

                {/*Footer*/}
                <Footer/>
            </div>
        </div>
    </Fragment>
);

export default Login;