import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import './LoginForm.css';

const LoginForm = ({
    onSubmission,
    onChange,
    user,
    error
})=>(
    <div className='container'>
        <div className='card-panel login-panel'>
            <form className='col s12' action='/' onSubmit={onSubmission}>
                <h4 className='LoginTitle'>Login</h4>  
                {error.summary && <div className='row'><p className='error-message'>{error.summary} </p></div>} 
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" name="email" className="validate" onChange={onChange}/>
                        <label htmlFor="email" data-error="Invalid Email Format: you must contain @">Email</label>
                    </div>
                </div>
                {error.email && <div className='row'><p className='error-message'>{error.email} </p></div>} 
                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" type="password" name="password" className="validate" onChange={onChange}/>
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <a className="text pswReset" href="./passwordReset">Forget Password?</a>
                </div>
                {error.password && <div className='row'><p className='error-message'>{error.password} </p></div>} 
                <div className="row right-align">
                    <input type="submit" className="waves-effect waves-light btn" value="login"/>
                </div>
                
                <div className="row">
                    <p className="right-align text">New to popular news? <Link to={'/signup'}>Sign Up </Link></p>
                </div>
            </form>
        </div>
    </div>
);

export default LoginForm;

