import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';
import Header from './Header';
import Newsletter from './Newsletter';
import Media from './Media';
import Footer from './Footer';

const Contact = () => (
    <Fragment>
        <div>
            <script type="text/javascript">
                $(document).ready(function () => $("input.input-validation-error").addClass("has-danger"););
            </script>
            <div className="big-section">

                {/*Top Header*/}
                <Header/>

                {/* Navigation*/}
                <Navigation activeRoute="/contact"/>

                {/*Sections*/}
                <section>
                    <div className="container-fluid">
                        <div className="title text-center col-md-12">
                            <h2>Contact Us</h2>
                        </div>
                        <p className="text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id diam vel quam. Scelerisque purus semper eget duis. Molestie ac feugiat sed lectus. Pulvinar neque laoreet suspendisse interdum consectetur libero. Orci ac auctor augue mauris. Sed pulvinar proin gravida hendrerit. Sit amet mauris commodo quis imperdiet massa tincidunt. Elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Congue nisi vitae suscipit tellus mauris a diam maecenas. Amet purus gravida quis blandit turpis.
                            Enim sit amet venenatis urna. Faucibus pulvinar elementum integer enim neque volutpat ac. Donec massa sapien faucibus et molestie ac feugiat sed lectus. Etiam non quam lacus suspendisse faucibus interdum posuere lorem. Sit amet consectetur adipiscing elit. Vulputate enim nulla aliquet porttitor lacus luctus accumsan. Donec adipiscing tristique risus nec feugiat in. Ut aliquam purus sit amet. Vulputate ut pharetra sit amet. Consequat interdum varius sit amet. Tellus id interdum velit laoreet id. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Eu nisl nunc mi ipsum faucibus. Odio ut sem nulla pharetra diam. Arcu dui vivamus arcu felis bibendum. Vitae semper quis lectus nulla. Habitant morbi tristique senectus et netus et malesuada. Augue ut lectus arcu bibendum at. Habitant morbi tristique senectus et netus et malesuada fames ac.
                            Id neque aliquam vestibulum morbi. Sit amet nulla facilisi morbi tempus iaculis urna id. Tincidunt tortor aliquam nulla facilisi cras. Enim ut tellus elementum sagittis vitae et. Proin nibh nisl condimentum id. Aliquam sem et tortor consequat id porta nibh venenatis. Eu sem integer vitae justo eget magna fermentum. Nunc congue nisi vitae suscipit tellus mauris a diam. Risus feugiat in ante metus dictum at tempor. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Placerat duis ultricies lacus sed turpis tincidunt.
                            Cras ornare arcu dui vivamus arcu. Iaculis nunc sed augue lacus viverra vitae congue. In nisl nisi scelerisque eu ultrices vitae auctor. Dui ut ornare lectus sit amet. Mattis vulputate enim nulla aliquet porttitor lacus. Tellus integer feugiat scelerisque varius morbi enim. Viverra vitae congue eu consequat ac felis donec. Phasellus vestibulum lorem sed risus ultricies. Diam donec adipiscing tristique risus nec feugiat. Turpis tincidunt id aliquet risus feugiat in ante metus dictum. Orci ac auctor augue mauris augue.
                            Urna porttitor rhoncus dolor purus non enim. Pulvinar etiam non quam lacus suspendisse faucibus interdum. Congue mauris rhoncus aenean vel. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Metus aliquam eleifend mi in. Dolor magna eget est lorem ipsum dolor. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Eget dolor morbi non arcu risus quis varius. Mattis nunc sed blandit libero. At ultrices mi tempus imperdiet nulla. Augue lacus viverra vitae congue eu consequat. Lorem donec massa sapien faucibus et molestie ac.
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

export default Contact;