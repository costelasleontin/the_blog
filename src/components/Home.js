import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';
import Header from './Header';
import Newsletter from './Newsletter';
import Media from './Media';
import Footer from './Footer';
import {connect} from 'react-redux';
import {addOne,subtractOne,resetCounter} from '../actions/counter.js';

const Home = (props) => (
    <Fragment>
        <div>
            <script type="text/javascript">
                $(document).ready(function () => $("input.input-validation-error").addClass("has-danger"););
            </script>
            <div className="big-section">

                {/*Top Header*/}
                <Header/>

                {/* Navigation*/}
                <Navigation activeRoute="/home"/>

                {/*Sections*/}
                <section>
                    <div className="container-fluid">
                        <div className="title text-center col-12">
                            <h2>ARTICLE NAME</h2>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-12 text-justify p-2">
                               <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. 
                                Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. 
                                Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. 
                               </p>
                               <button onClick={()=>props.dispatch(addOne())}>Add One</button>
                               <button onClick={()=>props.dispatch(subtractOne())}>Subtract One</button>
                               <button onClick={()=>props.dispatch(resetCounter())}>Reset</button>
                               <h1>Hola all from = {Number(props.counter)}</h1>
                            </div>
                            
                        </div>
                    </div>
                </section>

                {/*Media = Instagram and Facebook links*/}
                <Media/>

                {/*Newsletter*/}
                <Newsletter/>

                {/*Footer*/}
                <Footer/>
            </div>
        </div>
    </Fragment>
);

const mapStateToProps=(state)=>{
    return {
        counter:state.counter,
        filter:state.filter
    };
};
    


export default connect(mapStateToProps)(Home);