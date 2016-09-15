//React
import React from 'react';

//Components
// UnauthHeader is shown in the welcome, signin and signup pages
import UnauthHeader from '../../headers/unauthorized_header.jsx';
import SignUpForm from './signupForm_component.jsx';

const SignUp = () => {
    return (
        <div>
            <UnauthHeader />
            <main className="logoBg">
                 <div className="authWrapper signUpFormWrapper">
                    <h1>Legit</h1>
                    <SignUpForm />
                    <p>Already a member? <a href="/signin">Log In!</a></p>
                </div>
            </main>
        </div>
    );
};

export default SignUp;