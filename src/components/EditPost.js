import React, { Fragment } from 'react';
import Navigation from './Navigation';
import Header from './Header';
import Newsletter from './Newsletter';
import Media from './Media';
import Footer from './Footer';
import validator from 'validator';
import { Link } from 'react-router-dom';
import {addAllUsers} from '../actions/users.js';
import { connect } from 'react-redux';

class EditPost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            posttitle:'',
            author:'',
            postcontent:'',
            message:''
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handlePostTitleChange=this.handlePostTitleChange.bind(this);
        this.handleAuthorChange=this.handleAuthorChange.bind(this);
        this.handlePostContentChange=this.handlePostContentChange.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        try{
            let response= await fetch("/posts/edit",{
                method: 'POST',
                // mode: 'no-cors', blocks application/json sending and can debug in development //can be 'cors' on  production if on react app and express api are on same domain for better security
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    post_id:this.state.post_id,
                    posttitle: this.state.posttitle,
                    author: this.state.author,
                    postcontent: this.state.postcontent
                })
            });
            await response.json().then(answer => {this.setState({message: answer.message});
            if(answer.login&&answer.login===true){
                window.location.href="/login";//this type of reload could be avoided by either using history or by changing some state but the project gets too be time consuming so we need to take shortcuts :P
            }else if(answer.dashboardredirect&&answer.dashboardredirect===true){
                window.location.href="/dashboard";
            }else{/*don't do nothing allow user to type valid input*/ }
        });
        } catch (error) {
            console.log("Operation Failed : ",error);
        }
    }

    handlePostTitleChange(event){
        const posttitle=validator.escape(event.target.value);

        //for alphanumeric validation
        if (!validator.isAlphanumeric(posttitle.trim().split(" ").join("a"))&&posttitle.length>1){
            const validation=document.getElementById("alphanumericvalidation");
            validation.innerText="";
            const text=document.createTextNode("Please input a title that contains only letters and numbers");
            validation.appendChild(text);
        }
        else{
            const validation=document.getElementById("alphanumericvalidation");
            validation.innerText="";
            this.setState({posttitle});
        }

        //empty string validation
        if(validator.isEmpty(posttitle)){
            const validation=document.getElementById("emptyvalidation");
            validation.innerText="";
            const text=document.createTextNode("Please input a title that's not empty");
            validation.appendChild(text);
        }else{
            const validation=document.getElementById("emptyvalidation");
            validation.innerText="";
            this.setState({posttitle});
        }

        //for max length validation
        if (posttitle.length>250){
            const validation=document.getElementById("lengthvalidation");
            validation.innerText="";
            const text=document.createTextNode("The title can contain a maximum of 250 characters");
            validation.appendChild(text);
        }else{
            const validation=document.getElementById("lengthvalidation");
            validation.innerText="";
            this.setState({posttitle});
        }
    }

    handleAuthorChange(event){
        const author=validator.escape(event.target.value);
                 //for alphanumeric validation for author
                 if (!validator.isAlphanumeric(author.trim().split(" ").join("a"))&&author.length>1){
                    const validation=document.getElementById("authoralphanumericvalidation");
                    validation.innerText="";
                    const text=document.createTextNode("Please input an author name that contains only letters and numbers");
                    validation.appendChild(text);
                }else{
                    const validation=document.getElementById("authoralphanumericvalidation");
                    validation.innerText="";
                    this.setState({author});
                }
        
                //empty string validation for author
                if(validator.isEmpty(author)){
                    const validation=document.getElementById("authoremptyvalidation");
                    validation.innerText="";
                    const text=document.createTextNode("Please input an author name that's not empty");
                    validation.appendChild(text);
                }else{
                    const validation=document.getElementById("authoremptyvalidation");
                    validation.innerText="";
                    this.setState({author});
                }
        
                 //for max length validation for author
                 if (author.length>50){
                    const validation=document.getElementById("authorlengthvalidation");
                    validation.innerText="";
                    const text=document.createTextNode("The author name can contain a maximum of 50 characters");
                    validation.appendChild(text);
                }else{
                    const validation=document.getElementById("authorlengthvalidation");
                    validation.innerText="";
                    this.setState({author});
                }
        
    }

    handlePostContentChange(event){
        const postcontent=validator.escape(event.target.value);
       //empty string validation for postcontent
       if(validator.isEmpty(postcontent)){
           const validation=document.getElementById("authoremptyvalidation");
           validation.innerText="";
           const text=document.createTextNode("Please input post content that's not empty");
           validation.appendChild(text);
       }else{
           const validation=document.getElementById("authoremptyvalidation");
           validation.innerText="";
           this.setState({postcontent});
       }

        //for max length validation for postcontent
        if (postcontent.length>10000){
           const validation=document.getElementById("postcontentlengthvalidation");
           validation.innerText="";
           const text=document.createTextNode("The post content can contain a maximum of 100000 characters");
           validation.appendChild(text);
       }else{
           const validation=document.getElementById("postcontentlengthvalidation");
           validation.innerText="";
           this.setState({postcontent});
       }
    }

    componentDidMount() {
        const path = `/posts/${this.props.match.params.id}`
        async function getPost() {
            let response = await fetch(path, { method: 'GET' });
            return await response.json();
        }
        const post = getPost();
        post.then(postdata => { this.setState(state => ({ post_id: postdata[0].post_id, posttitle: postdata[0].posttitle, author: postdata[0].username, postcontent: postdata[0].postcontent })) });
        async function getUsers() {
            let response = await fetch("/users", { method: 'POST', mode: 'no-cors' });
            return await response.json();
        }
        const users = getUsers();
        users.then(postsdata => {
            if (postsdata.login && postsdata.login === true) {//if browser has valid generated cookie token than it gets users list or if login is set true it redirects you to login page
                window.location.href = "/login";
            } else {
                this.props.dispatch(addAllUsers(postsdata));
            }
        });
    }

    render() {
        let index=0;
        return (
            <Fragment>
                <div>
                    <div className="big-section">

                        {/*Top Header*/}
                        <Header />

                        {/* Navigation*/}
                        <Navigation />

                        {/*Sections*/}
                        <section>
                            <div className="container-fluid p-2">
                                <form method="post" onSubmit={this.handleSubmit} action="/posts/add">
                                    <div className="form-row p-2">
                                        <div className="col-12">
                                            <p className="h3 text-center">Edit Post</p>
                                        </div>
                                    </div>
                                    <div className="form-row p-2">
                                        <div className="text-danger validation-summary">
                                            <ul id="validation">
                                                <li id="alphanumericvalidation"></li>
                                                <li id="emptyvalidation"></li>
                                                <li id="lengthvalidation"></li>
                                                <li id="authoralphanumericvalidation"></li>
                                                <li id="authoremptyvalidation"></li>
                                                <li id="authorlengthvalidation"></li>
                                                <li id="postcontentemptyvalidation"></li>
                                                <li id="postcontentlengthvalidation"></li>
                                            </ul></div>
                                        <div className="text-danger message"><h3>{this.state.message}</h3></div>
                                    </div>
                                    <div className="form-row p-2">
                                        <div className="col-12">
                                            <label htmlFor="posttitle">Post Title:</label><input type="text" onChange={this.handlePostTitleChange} className="form-control" name="posttitle" value={validator.unescape(this.state.posttitle)}></input>
                                        </div>
                                    </div>
                                    <div className="form-row p-2">
                                        <div className="col-6">
                                            <label htmlFor="author">Author:</label>
                                            <select name="author" className="form-control" onChange={this.handleAuthorChange}>
                                                {this.props.users.users.map(user => { Boolean(index++); return <option key={index} value={validator.unescape(user.username)}>{validator.unescape(user.username)}</option> })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row p-2">
                                        <div className="col-12">
                                            <label htmlFor="postcontent">Post Content:</label><textarea rows="15" onChange={this.handlePostContentChange} className="form-control" name="postcontent" value={validator.unescape(this.state.postcontent)}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-row p-2">
                                        <div className="col">
                                            <button type="submit" className="btn btn-primary">Update Post</button>
                                        </div>
                                        <Link className="btn btn-primary" to="/dashboard">Go Back To Dashboard</Link>
                                    </div>
                                </form>
                            </div>
                        </section>


                        {/*Media = Instagram and Facebook links*/}
                        <Media />

                        {/*Newsletter*/}
                        <Newsletter />

                        {/*Footer*/}
                        <Footer />
                    </div>
                </div>
            </Fragment>
        );
    };
};

const mapStateToProps = (state)=>{
    return {users:state.users};
}

export default connect(mapStateToProps)(EditPost);