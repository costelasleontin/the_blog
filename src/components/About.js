import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';
import Header from './Header';
import Newsletter from './Newsletter';
import Media from './Media';
import Footer from './Footer';

const About = () => (
    <Fragment>
        <div>
            <script type="text/javascript">
                $(document).ready(function () => $("input.input-validation-error").addClass("has-danger"););
            </script>
            <div className="big-section">

                {/*Top Header*/}
                <Header/>

                {/* Navigation*/}
                <Navigation activeRoute="/about"/>

                {/*Sections*/}
                <section>
                    <div className="container-fluid">
                        <div className="title text-center col-md-12">
                            <h2>About Us</h2>
                        </div>
                        <p className="text-justify">
                            The Costelos Company was founded in 2019 by Costelas Leontin.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Aliquet sagittis id consectetur purus ut faucibus pulvinar. Ac felis donec et odio pellentesque. Eget egestas purus viverra accumsan. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor. Volutpat commodo sed egestas egestas fringilla phasellus faucibus. Id ornare arcu odio ut sem nulla pharetra. Morbi non arcu risus quis. Sollicitudin ac orci phasellus egestas tellus rutrum. At urna condimentum mattis pellentesque id nibh tortor. Ultrices neque ornare aenean euismod elementum nisi quis eleifend quam. Sit amet volutpat consequat mauris nunc congue. Nunc sed velit dignissim sodales ut eu sem integer vitae. Vulputate dignissim suspendisse in est ante in nibh. Facilisis volutpat est velit egestas dui id ornare arcu. Molestie nunc non blandit massa enim nec dui nunc. Senectus et netus et malesuada fames ac turpis.
                            At lectus urna duis convallis convallis tellus id interdum. Neque convallis a cras semper. Sem nulla pharetra diam sit. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Neque gravida in fermentum et sollicitudin ac orci. Orci porta non pulvinar neque laoreet suspendisse. Aliquam eleifend mi in nulla posuere sollicitudin. Cras ornare arcu dui vivamus arcu felis bibendum. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Turpis egestas sed tempus urna. Et netus et malesuada fames ac turpis. Cursus turpis massa tincidunt dui ut ornare. Neque aliquam vestibulum morbi blandit cursus risus at ultrices. Fusce id velit ut tortor. Morbi quis commodo odio aenean sed adipiscing diam donec adipiscing.
                            Neque vitae tempus quam pellentesque nec nam aliquam sem et. Ornare quam viverra orci sagittis eu volutpat odio. Turpis egestas pretium aenean pharetra magna ac placerat. Sit amet consectetur adipiscing elit. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Nisl purus in mollis nunc sed id semper. Sem et tortor consequat id porta nibh venenatis cras. Turpis egestas pretium aenean pharetra. Arcu dui vivamus arcu felis bibendum ut tristique et. Quam viverra orci sagittis eu volutpat odio. Mauris nunc congue nisi vitae. Arcu vitae elementum curabitur vitae nunc sed velit. Vel eros donec ac odio tempor orci dapibus ultrices. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Sed sed risus pretium quam vulputate dignissim suspendisse. Aliquam ultrices sagittis orci a scelerisque purus semper eget. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis. Quam pellentesque nec nam aliquam.
                            Enim ut tellus elementum sagittis vitae et leo. Eu facilisis sed odio morbi quis commodo. Turpis egestas integer eget aliquet nibh praesent tristique. Eu consequat ac felis donec et odio pellentesque diam volutpat. Pharetra pharetra massa massa ultricies mi quis. Quam pellentesque nec nam aliquam sem et. Fermentum et sollicitudin ac orci phasellus. Quis enim lobortis scelerisque fermentum dui faucibus in ornare quam. Ut lectus arcu bibendum at varius vel pharetra vel. Tincidunt tortor aliquam nulla facilisi cras fermentum odio. Euismod lacinia at quis risus sed vulputate odio ut enim. Tellus id interdum velit laoreet id. Phasellus faucibus scelerisque eleifend donec pretium. Accumsan lacus vel facilisis volutpat est velit egestas dui id.
                            Dui id ornare arcu odio ut. Vulputate eu scelerisque felis imperdiet. A erat nam at lectus urna duis convallis convallis tellus. Id consectetur purus ut faucibus pulvinar elementum integer enim. Ac odio tempor orci dapibus. Massa sapien faucibus et molestie ac. Augue eget arcu dictum varius duis at. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Vestibulum sed arcu non odio euismod lacinia. Adipiscing enim eu turpis egestas pretium aenean pharetra. In hac habitasse platea dictumst quisque sagittis purus sit. Semper auctor neque vitae tempus quam pellentesque nec. Tortor at risus viverra adipiscing at in. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Nibh nisl condimentum id venenatis a.
                    </p>
                    </div>
                </section>

                {/*Media = Instagram and Facebook links*/}
                <Media />

                {/*Newsletter*/}
                <Newsletter/>

                {/*Footer*/}
                <Footer/>
            </div>
        </div>
    </Fragment>
);

export default About;