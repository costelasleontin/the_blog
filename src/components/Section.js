import React from 'react';
import Moment from 'react-moment';
import { Link} from 'react-router-dom';

const Section = ({ post } = this.props) => (
    <section>
        <div className="container-fluid">
            <div className="title text-center col-12">
                <Link to={"/home/"+ post.post_id}><h2>{post.posttitle}</h2></Link>
            </div>
            <div className="row align-items-left">
                <div className="col-2 text-justify p-2">
                    <p>Author : {post.username}</p>
                </div>
                <div className="col-2 text-justify p-2">
                    <p>Publish Date : <Moment format="DD/MM/YYYY HH:mm" parse="YYYY-MM-DD HH:mm">{post.publishdate}</Moment></p>
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-12 text-justify p-2">
                    <p>{post.postcontent}</p>
                    {// <button onClick={() => this.props.dispatch(addOne())}>Add One</button> //block for testing counter
                        // <button onClick={() => this.props.dispatch(subtractOne())}>Subtract One</button>
                        // <button onClick={() => this.props.dispatch(resetCounter())}>Reset</button>
                        // <h1>Hola all from = {Number(this.props.counter)}</h1>
                    }
                </div>

            </div>
        </div>
    </section>
);

export default Section;