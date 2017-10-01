import Auth from '../Auth/Auth.js';
import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import './base.css';

const Base = ({children}) => (
    <div>
        <nav className="nav-bar indigo lighten-1">
            <div className="nav-wrapper">
            <a href="#" className="brand-logo">TODAY'S NEWS</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {
                    (Auth.isUserAuthenticated()) ? 
                        (
                            <div>
                                <li> Hello, {Auth.getEmail()} </li>
                                <li> <Link to= {'/logout'}> Log out </Link></li>
                            </div>
                        )
                        :
                        (
                            <div>
                                <li> <Link to= {'/login'}> Login </Link></li>
                                <li> <Link to= {'/signup'}> Sign Up </Link></li>
                            </div>
                        )
                }
            </ul>
            </div>
        </nav>
        <br/>
        {children}
    </div>
);

export default Base;

Base.PropTypes = {
    children: PropTypes.object.isRequired
};


