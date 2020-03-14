import React, { Fragment } from 'react';
import Navigation from './Navigation';
import Header from './Header';
import Newsletter from './Newsletter';
import Media from './Media';
import Footer from './Footer';
import validator from 'validator';
import {logedin} from '../actions/login.js';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
//import {addOne,subtractOne,resetCounter} from '../actions/counter.js';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            message:'',
            username:'',
            password:''
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleUsernameChange=this.handleUsernameChange.bind(this);
        this.handlePasswordChange=this.handlePasswordChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            let response = await fetch("/login", {
                method: 'POST',
                // mode: 'no-cors', // blocks application/json sending and can't debug in development //can be 'cors' on  production if on react app and express api are on same domain for better security
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                })
            });
            await response.json().then(async(answer) => {
                if (answer.dashboardredirect && answer.dashboardredirect === true) {
                    this.setState({ message: answer.message });
                    this.props.dispatch(logedin());
                } else {
                    this.setState({ message: answer.message })
                }
            });
        } catch (error) {
            console.log("Operation Failed : ", error);
        }
    }

    renderRedirect(){
        if(this.props.login){
            return <Redirect to="/dashboard"/>;
        }
    }

    handleUsernameChange(event) {
        const username = validator.escape(event.target.value);
        //for alphanumeric validation for author
        if (!validator.isAlphanumeric(username.trim().split(" ").join("a")) && username.length > 1) {
            const validation = document.getElementById("usernamealphanumericvalidation");
            validation.innerText = "";
            const text = document.createTextNode("Please input an username that contains only letters and numbers");
            validation.appendChild(text);
        } else {
            const validation = document.getElementById("usernamealphanumericvalidation");
            validation.innerText = "";
            this.setState({ username });
        }

        //empty string validation for author
        if (validator.isEmpty(username)) {
            const validation = document.getElementById("usernameemptyvalidation");
            validation.innerText = "";
            const text = document.createTextNode("Please input an username that's not empty");
            validation.appendChild(text);
        } else {
            const validation = document.getElementById("usernameemptyvalidation");
            validation.innerText = "";
            this.setState({ username });
        }

        //for max length validation for author
        if (username.length > 50) {
            const validation = document.getElementById("usernamelengthvalidation");
            validation.innerText = "";
            const text = document.createTextNode("The username can contain a maximum of 50 characters");
            validation.appendChild(text);
        } else {
            const validation = document.getElementById("usernamelengthvalidation");
            validation.innerText = "";
            this.setState({ username });
        }
    }

    handlePasswordChange(event) {
        const password = validator.blacklist(event.target.value,'<>/\'"');
        //for alphanumeric validation for author
        if (!validator.matches(password.trim(),/^([ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+]*)$/)&& password.length > 0) {
            const validation = document.getElementById("passwordalphanumericvalidation");
            validation.innerText = "";
            const text = document.createTextNode("Please input an password that contains only letters, numbers and special characters");
            validation.appendChild(text);
        } else {
            const validation = document.getElementById("passwordalphanumericvalidation");
            validation.innerText = "";
            this.setState({ password });
        }

        //empty string validation for author
        if (validator.isEmpty(password)) {
            const validation = document.getElementById("passwordemptyvalidation");
            validation.innerText = "";
            const text = document.createTextNode("Please input an password that's not empty");
            validation.appendChild(text);
        } else {
            const validation = document.getElementById("passwordemptyvalidation");
            validation.innerText = "";
            this.setState({ password });
        }

        //for max length validation for author
        if (password.length > 255) {
            const validation = document.getElementById("passwordlengthvalidation");
            validation.innerText = "";
            const text = document.createTextNode("The password can contain a maximum of 255 characters");
            validation.appendChild(text);
        } else {
            const validation = document.getElementById("passwordlengthvalidation");
            validation.innerText = "";
            this.setState({ password });
        }
    }

    render(){
        return (
        <Fragment>
        <div>
            <div className="big-section">

                {/*Top Header*/}
                <Header />

                {/* Navigation*/}
                <Navigation activeRoute="/home" />

                {/*Login Section*/}
                <section>
                    <div className="container-fluid p-2">
                        <form method="post" onSubmit={this.handleSubmit}>
                            <div className="form-row p-2">
                                <div className="col-12">
                                    <p className="h3 text-center">{this.state.message}</p>
                                </div>
                            </div>
                            <div className="form-row p-2">
                                <div className="col-3">
                                    <p className="h3 text-center">Login User</p>
                                </div>
                            </div>
                            <div className="form-row p-2">
                            <div className="text-danger validation-summary">
                                <ul id="validation">
                                    <li id="usernamealphanumericvalidation"></li>
                                    <li id="usernameemptyvalidation"></li>
                                    <li id="usernamelengthvalidation"></li>
                                    <li id="passwordalphanumericvalidation"></li>
                                    <li id="passwordemptyvalidation"></li>
                                    <li id="passwordlengthvalidation"></li>
                                </ul></div>
                            <div className="text-danger message"><h3>{this.state.message}</h3></div>
                        </div>
                            <div className="form-row p-2">
                                <div className="col-3">
                                    <input type="text" className="form-control" placeholder="UserName" name="username" onChange={this.handleUsernameChange} value={validator.unescape(this.state.username)} />
                                </div>
                            </div>
                            <div className="form-row p-2">
                                <div className="col-3">
                                    <input type="password" className="form-control" placeholder="Password" name="Password" onChange={this.handlePasswordChange} value={validator.unescape(this.state.password)} />
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

                {/*Redirect to dashboard if logged in */}
                {this.renderRedirect()}

                {/*Media = Instagram and Facebook links*/}
                <Media />

                {/*Newsletter*/}
                <Newsletter />

                {/*Footer*/}
                <Footer />
            </div>
        </div>
    </Fragment>
);}}
    
const mapStateToProps = (state)=>({login:state.login});

export default connect(mapStateToProps)(Login);