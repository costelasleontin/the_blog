import React from 'react';
import {Switch, BrowserRouter, Route, withRouter} from 'react-router-dom';
import Home from '../components/Home.js';
import About from '../components/About.js';
import Contact from '../components/Contact.js';
import NoMatch404 from '../components/NoMatch404.js';
import AddPost from '../components/AddPost.js';
import Login from '../components/Login.js';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore.js';
import Dashboard from '../components/Dashboard.js';
import EditPost from '../components/EditPost.js';

const store=configureStore();


const Routes = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/">
                    <Home />
                </Route>
                <Route path="/home/:id" component={withRouter(Home)} />
                <Route path="/home" component={withRouter(Home)} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/login" component={Login} />
                <Route path="/addpost" component={AddPost} />
                <Route path="/editpost/:id" component={EditPost} />
                <Route path="/dashboard" component={Dashboard} />
                <Route component={NoMatch404} />
            </Switch>
        </BrowserRouter>
    </Provider>
);

export default Routes;