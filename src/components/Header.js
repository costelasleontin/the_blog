import React from 'react';
import { Link , Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logedout} from '../actions/login.js';

const Header = (props) => {
    const handleClick=(event)=>{
        event.preventDefault();
        props.dispatch(logedout());
    }

    const displayDash = (displayDashboard)=>{
        if(displayDashboard)return(<li className="nav-item p-2"><Link to="/dashboard">Dashboard</Link></li>);
    }

    const redirectHome=()=>{
        if(props.login===0&&window.location.pathname==="/dashboard"){
            return (<Redirect to="/login"/>);
        }
    }

    return(
    <header>
        <div className="container-fluid">
            {/*Site logo*/}
            <div className="row justify-content-center">
                <div className="col-3">
                </div>
                <div className="col-6 text-center">
                    <Link to="/home">
                        {/*logo here*/}
                        <p className="logo">COSTELOS</p>
                    </Link>
                </div>
                <div className="col-3 align-self-end">
                    <ul className="nav justify-content-end">
                        <li className="nav-item p-2">
                            <Link to="/Login">Sign In</Link>
                        </li>
                        <li className="nav-item p-2">
                            <Link to="/" onClick={handleClick.bind(this)}>Log Out</Link>
                        </li>
                        {displayDash(props.login)}
                        {redirectHome()}
                    </ul>
                </div>
            </div>
        </div>
        <hr />
    </header>
);}

const mapStateToProps=(state)=>({
    login:state.login
});

export default connect(mapStateToProps)(Header);