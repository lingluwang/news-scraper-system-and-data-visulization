import React, {PropTypes} from 'react';
import SignupForm from './SignupForm.js';

class SignupPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            error: {
                
            },
            user: {
                email: '',
                password:'',
                psw_confirm:''
            }
        };

        this.inputChange = this.inputChange.bind(this);
        this.processForm = this.processForm.bind(this);
    }

    //TODO: send current email and password to server for authentication
    processForm(event) {
        event.preventDefault();
        
        const email = this.state.user.email;
        const password = this.state.user.password;
        const psw_confirm = this.state.user.psw_confirm;
        
        
        if (password !== psw_confirm) {
            console.log(password + '   ' + psw_confirm);
            const error = this.state.error;
            error.summary = 'Passwords you input do not match!';
            this.setState({error});
            return;
        } else {
            const error = this.state.error;
            error.summary = "";
            this.setState({error});
        }
        //TODO : send to server side for authentication
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

        console.log('~~~~~~~~~~ http request from singup page');

        fetch('http://localhost:3000/auth/signup',myInit)
            .then(response => {
                ////////////////////////////////////
                

                if (response.status === 200) {
                    
                    this.setState({error:{}});
                    //response.json is an async function, so need a callback
                    response.json().then(function(json){
                        console.log(json);
                        this.context.router.replace('/login'); //singup success, then redirect to login page
                    }.bind(this));
                } else {
                    console.log("Error~~~~~~~~~~~ Signup Failed!");
                    //same, asyn function which needs a callback
                    response.json().then(function(jason){
                        const error = jason.error ? jason.error : {};
                        error.summary = jason.message;
                        this.setState({
                            error: error
                        });
                    }.bind(this));
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
        //user['psw_confirm'] = '123'
        
        //once get it, setState 
        this.setState({user});
        
    }

    //render 
    render() {
        return(
            <SignupForm 
                onSubmission = {this.processForm}
                onChange = {this.inputChange}
                user = {this.state.user}
                error = {this.state.error}
            />
        );

    }
}



SignupPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignupPage;