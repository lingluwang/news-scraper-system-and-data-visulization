import React, {PropTypes} from 'react';
import Auth from '../Auth/Auth.js';
import LoginForm from './LoginForm.js';

class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            error: {},
            user: {
                email: '',
                password:''
            }
        };

        this.inputChange = this.inputChange.bind(this);
        this.processForm = this.processForm.bind(this);
    }

    //send current email and password to server for authentication
    processForm(event) {
        event.preventDefault();
        
        const email = this.state.user.email;
        const password = this.state.user.password;

        //send to server side for authentication
        var myHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        var myInit = {
            method: "POST",
            cache: "false",
            headers: myHeaders,
            body: JSON.stringify({
                email:email,
                password:password
            })
        };

        console.log(myInit);

        fetch('http://localhost:3000/auth/login',myInit)
            .then(response => {
                
                if (response.status === 200) {
        
                    this.setState({error:{}});
                    //response.json is an async function, so need a callback
                    response.json().then(function(json){
                        console.log(json);
                        //save token and email to browser local storage
                        Auth.authenticateUser(json.token, email);
                        this.context.router.replace('/');
                    }.bind(this));
                } else {
                    console.log("Error~~~~~~~~~~~ Login Failed!");
                    //same, asyn function which needs a callback
                    response.json().then(function(jason){
                        const error = jason.error ? jason.error : {};
                        error.summary = jason.message;
                        this.setState({
                            error: error
                        });
                    }.bind(this))
                }
            });
    }

    //get current input and setState to store data and update the display on GUI
    inputChange(event) {
        //get the value of current input tag
        const inputField = event.target.name;
        const user = this.state.user;
        user[inputField] = event.target.value;
        //user['email'] = 'bella@brown.edu'
        //user['password'] = '123456789'
        
        //once get it, setState 
        this.setState({user});
        console.log(user);
    }

    //render 
    render() {
        return(
            <LoginForm 
                onSubmission = {this.processForm}
                onChange = {this.inputChange}
                user = {this.state.user}
                error = {this.state.error}
            />
        );

    }
}

export default LoginPage;

LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
};
