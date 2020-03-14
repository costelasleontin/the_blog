import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = ({activeRoute})=>(
    <ul className="nav nav-tabs">
        <li className="nav-item">
            <Link className={(activeRoute==="/home")?"nav-link active":"nav-link"} to="/home">Home</Link>
        </li>
        <li className="nav-item">
            <Link className={(activeRoute==="/about")?"nav-link active":"nav-link"} to="/about">About US</Link>
        </li>
        <li className="nav-item">
            <Link className={(activeRoute==="/contact")?"nav-link active":"nav-link"} to="/contact">Contact Us</Link>
        </li>
    </ul>);

export default Navigation;

