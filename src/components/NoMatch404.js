import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

const NoMatch404 = () => (
    <Fragment>
        <h1>PAGE NOT FOUND</h1>
        <h1>404</h1>
        <h1><Link to="/">GO HOME</Link></h1>
    </Fragment>
);

export default NoMatch404;