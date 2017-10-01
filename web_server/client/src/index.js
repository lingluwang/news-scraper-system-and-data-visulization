

// import App from './App/App.js';
// import LoginPage from './Login/LoginPage.js';
// import SignupPage from './Signup/SignupPage.js';
import routes from './routes.js';

//React Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import './index.css';

// ReactDOM.render(   
//     <SignupPage />,
//     document.getElementById('root')
// )

ReactDOM.render(   
    <Router history = {browserHistory} routes = {routes}/>,
    document.getElementById('root')
)