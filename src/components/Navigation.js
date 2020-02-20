import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav} from 'react-bootstrap';

const Navigation = ({activeRoute})=>(
    <Nav variant="tabs" className="nav" defaultActiveKey={activeRoute}>
        <Nav.Item>
            <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/about">About Us</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
        </Nav.Item>
    </Nav>
);

export default Navigation;

