
// a helper class to manage token in browser local storage
// 5 methods
class Auth {
    //1. record received token and email to browser/s local storage
    static authenticateUser(token, email) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    }

    //2. check if the user already login; True: authenticated, False: not authenticated
    static isUserAuthenticated() {
        return localStorage.getItem('token') != null;
    }

    //3. user logout: remove token and email
    static deauthenticate() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }

    //4. get token: with Token would call this function
    static getToken() {
        return localStorage.getItem('token');
    }

    //5. get email: display on the nav bar
    static getEmail() {
        return localStorage.getItem('email');
    }
}

export default Auth;