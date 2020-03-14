import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <Fragment>
        <footer className="footer section text-center">
            <div className="container">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/contact">CONTACT</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/TermsOfService">TERMS OF SERVICE</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/PrivacyPolicy">PRIVACY POLICY</Link>
                    </li>
                </ul>
            </div>
            <p>Powered by Bootstrap</p>
        </footer>
    </Fragment>
);

export default Footer;