import React from 'react';
import { Route, Link } from 'react-router';
import App from './App/App.js'
import Auth from './Auth/Auth.js';
import Base from './Base/base.js';
import LoginPage from './Login/LoginPage.js';
import SignupPage from './Signup/SignupPage.js';

const Router = {
    component: Base,
    childRoutes:[
        {
            path: '/',
            getComponent(location, callback) {
                if (Auth.isUserAuthenticated()) {
                    callback(null, App); //authenticated, then redirect to App
                } else {
                    callback(null, LoginPage); //unauthenticated, then redirect to LoginPage
                }
            }
        },
        {
            path: '/login',
            component: LoginPage
        }, 
        {
            path:'/signup',
            component: SignupPage
        },
        {
            path:'logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticate(),
                replace('/login')
            }
        }

    ]
}

export default Router;