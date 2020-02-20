import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => (
    <header>
        <div className="container-fluid">
            {/*Site logo*/}
            <div className="row justify-content-center">
                <div class="col-3">

                </div>
                <div className="col-6 text-center">
                    <a href="index.html">
                        {/*logo here*/}
                        <p className="logo">COSTELOS</p>
                    </a>
                </div>
                <div className="col-3 align-self-end">
                    <ul class="nav justify-content-end">
                        <li className="nav-item p-2">
                            <a href="/Account/%23">Cart</a>
                        </li>
                        <li className="nav-item p-2">
                            <a href="/Login">Sign In</a>
                        </li>
                        <li className="nav-item p-2">
                            <a href="/Account/Logout">Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr />
    </header>
);

export default Header;