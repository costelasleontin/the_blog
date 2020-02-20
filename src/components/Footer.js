import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => (
    <Fragment>
        <footer className="footer section text-center">
            <div className="container">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" href="/contact">CONTACT</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Home/TermsOfService">TERMS OF SERVICE</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Home/PrivacyPolicy">PRIVACY POLICY</a>
                    </li>
                </ul>
            </div>
            <p>Powered by Bootstrap</p>
        </footer>
    </Fragment>
);

export default Footer;