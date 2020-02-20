import React from 'react';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import Home from '../components/Home.js';
import About from '../components/About.js';
import Contact from '../components/Contact.js';
import NoMatch404 from '../components/NoMatch404.js';
import Login from '../components/Login.js';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore.js';

const store=configureStore();


const Routes = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/">
                    <Home />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/contact">
                    <Contact />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route>
                    <NoMatch404 />
                </Route>
            </Switch>
        </BrowserRouter>
    </Provider>
);

export default Routes;