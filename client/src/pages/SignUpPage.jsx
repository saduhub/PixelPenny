import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LogInForm";
import SignUpLogInBanner from "../components/SignUpLogInBanner";
import './SignUpPage.css'

const SignUpPage = () => {
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <div className='landingPageUnAuth'>
            <SignUpLogInBanner />
            {showSignUp ? <SignUpForm switchToLogin={() => setShowSignUp(false)} /> : <LoginForm switchToSignUp={() => setShowSignUp(true)} />}
        </div>
    );
};

export default SignUpPage;