import React, {PropTypes} from 'react';
//import { Link } from 'react-router';
import './SignupForm.css';

const SignupForm = ({
    onSubmission,
    onChange,
    user,
    error
})=>(
    <div className='container'>
        <div className='card-panel Signup-panel'>
            <form className='col s12' action='/' onSubmit={onSubmission}>
                <h4 className='SignupTitle'>Sign Up</h4>  
                {error.summary && <div className='row'><p className='error-message'>{error.summary} </p></div>} 
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" name="email" className="validate" onChange={onChange}/>
                        <label htmlFor="email">Email</label>
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
                    <div className="input-field col s12">
                        <input id="psw_confirm" type="password" name="psw_confirm" className="validate" onChange={onChange}/>
                        <label htmlFor="password">Confirm Password</label>
                    </div>
                </div>
                
                {error.password && <div className='row'><p className='error-message'>{error.password} </p></div>} 
                <div className="row right-align">
                    <input type="submit" className="waves-effect waves-light btn" value="Sign Up"/>
                </div>
    
            </form>
        </div>
    </div>
);

export default SignupForm;

