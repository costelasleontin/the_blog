import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';
import Header from './Header';
import Newsletter from './Newsletter';
import Media from './Media';
import Footer from './Footer';
import {Table} from 'react-bootstrap';
import {connect} from 'react-redux';
import Moment from 'react-moment';
//import {addOne,subtractOne,resetCounter} from '../actions/counter.js';
import {addAllPosts, deletePost} from '../actions/posts.js';
import {addAllUsers} from '../actions/users.js';

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            message: ""
        }
        this.handleDeletePost=this.handleDeletePost.bind(this);
    }

    async handleDeletePost(event){
        event.preventDefault();
        const post_id = Number(event.target.post_id.value);
        let response= await fetch("/deletepost",{   //could implement try - catch here to catch any fetch errors
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({post_id})
        });
        await response.json().then(answer => {
            if(answer.login&&answer.login===true){
                window.location.href="/login"; //send user to login page if usertoken is invalid or doesn't exists as signaled by api server through login variable
            }else if(answer.login&&answer.login===false){
                this.setState({
                    message: answer.message,
                })
            }else{
                this.setState({
                    message: answer.message,
                })
            }
        });
        this.props.dispatch(deletePost(post_id));
    }

    componentDidMount(){
        async function getPosts(){
            let response= await fetch("/posts",{method:'GET',mode:'no-cors'});
            return await response.json();
        }
        const posts= getPosts();
        posts.then(postsdata=>{this.props.dispatch(addAllPosts(postsdata))});
        async function getUsers(){
            let response= await fetch("/users",{method:'POST',mode:'no-cors'});
            return await response.json();
        }
        const users= getUsers();
        users.then(postsdata=>{
            if(postsdata.login&&postsdata.login===true){//if browser has valid generated cookie token than it gets users list or if login is set true it redirects you to login page
                window.location.href="/login";          
            }else{
                this.props.dispatch(addAllUsers(postsdata))
            }
        });
    }

    render() {
        //define function to display Loading message if Posts Array is empty
        const ifEmptyPosts = () => {
            if(this.props.posts.isEmpty)return (<h2>Loading Posts ...</h2>);
        }

        let index=0;

        return (
            <Fragment>
                <div>
                    <div className="big-section">

                        {/*Top Header*/}
                        <Header />

                        {/* Navigation*/}
                        <Navigation activeRoute="/home" />

                        {/*Users Table*/}
                        <h2>Users Table</h2>
                        <Link to="/notimplemented" className='h2 btn btn-primary'>Add New User</Link>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Account Creation Date</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.users.users.map(user => (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{user.username}</td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td><Moment format="DD/MM/YYYY HH:mm" parse="YYYY-MM-DD HH:mm">{user.createdate}</Moment></td>
                                        <td><Link to={"not implemented"} className="btn btn-sm btn-warning">Edit</Link></td>
                                    <td>
                                        <form  method="post">
                                            <input type="hidden" name="user_id" value={user.user_id} /> {/* this and also the edit link should also send a user security token to validate operation and will be implemented in the future*/}
                                            <button type="submit" className="btn btn-danger btn-sm">Delete</button>
                                        </form>
                                    </td>
                                        {Boolean(index++)}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/*Posts Table*/}
                        {ifEmptyPosts()}
                        <h2>Posts Table</h2>
                        <Link to="/addpost" className='h2 btn btn-primary'>Add New Post</Link>
                        <h2>{this.state.message}</h2>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Post Title</th>
                                    <th>Author</th>
                                    <th>Post Link</th>
                                    <th>Publish Date</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                               {this.props.posts.posts.map(post=>(
                                <tr key={post.post_id}>
                                    <td>{post.post_id}</td>
                                    <td>{post.posttitle}</td>
                                    <td>{post.username}</td>
                                    <td><Link to={"/home/"+post.post_id}>{"/home/"+post.post_id}</Link></td>
                                    <td><Moment format="DD/MM/YYYY HH:mm" parse="YYYY-MM-DD HH:mm">{post.publishdate}</Moment></td>
                                    <td><Link to={"/editpost/"+post.post_id} className="btn btn-sm btn-warning">Edit</Link></td>
                                    <td>
                                        <form onSubmit={this.handleDeletePost} method="post">
                                            <input type="hidden" name="post_id" value={post.post_id} /> {/* this and also the edit link should also send a user security token to validate operation and will be implemented when the users login will be setup*/}
                                            <button type="submit" className="btn btn-danger btn-sm">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                               ))}
                            </tbody>
                        </Table>

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
    }
}

const mapStateToProps=(state)=>{
    return {
        posts:state.posts,
        counter:state.counter,//will use to implement a vizitors counter
        filter:state.filter,
        users:state.users
    };
};
    


export default connect(mapStateToProps)(Dashboard);