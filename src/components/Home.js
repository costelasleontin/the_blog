import React, { Fragment } from 'react';
import Navigation from './Navigation';
import Header from './Header';
import Newsletter from './Newsletter';
import Media from './Media';
import Footer from './Footer';
import Section from './Section';
import {connect} from 'react-redux';
//import {addOne,subtractOne,resetCounter} from '../actions/counter.js';
import {addAllPosts} from '../actions/posts.js';

class Home extends React.Component {
    componentDidMount(){
        try{
            const getPosts=async()=>{
                if(this.props.match&&Object.keys(this.props.match.params).length>0){
                    const path="/posts/"+this.props.match.params.id;
                    const response= await fetch(path,{method:'GET',mode:'no-cors'});
                    await response.json().then(postsdata=>{this.props.dispatch(addAllPosts(postsdata))});
                }else{
                    const response = await fetch("/posts",{method:'GET',mode:'no-cors'});
                    await response.json().then(postsdata=>{this.props.dispatch(addAllPosts(postsdata))});
                }
               }
               getPosts();
        }catch (error){
            console.log(error);
        } 
    }

    render() {
        //define function to display Loading message if Posts Array is empty
        const ifEmptyPosts = () => {
            if(this.props.posts.isEmpty)return (<h2>Loading Posts ...</h2>);
        }
        return (
            <Fragment>
                <div>
                    <div className="big-section">

                        {/*Top Header*/}
                        <Header />

                        {/* Navigation*/}
                        <Navigation activeRoute="/home" />

                        {/*Sections*/}
                        {ifEmptyPosts()}
                        {this.props.posts.posts.map(post =><Section key={post.post_id} post={post}/>)}

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
        filter:state.filter
    };
};
    


export default connect(mapStateToProps)(Home);