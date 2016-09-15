// React
import React from 'react';

//Components
// UnauthHeader is shown in the welcome, signin and signup pages
import UnauthHeader from '../../headers/unauthorized_header.jsx';
import LoginForm from './loginForm_component.jsx';

const Login = () => {
    return (
        <div>
            <UnauthHeader />
            <main className="logoBg">
                 <div className="authWrapper loginFormWrapper">
                    <h1>Legit</h1>
                    <LoginForm />
                    <p>Not a member? <a href="/signup">Sign Up!</a></p>
                </div>
            </main>
        </div>
    );
};

export default Login;

