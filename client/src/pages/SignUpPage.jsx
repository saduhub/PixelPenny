import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LogInForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import SignUpLogInBanner from "../components/SignUpLogInBanner";
import styles from './SignUpPage.module.css'

const SignUpPage = () => {
    const [formToShow, setFormToShow] = useState("login");

    return (
        <div className={styles.landingPageUnAuth}>
            <SignUpLogInBanner />
            {formToShow === "login" && <LoginForm switchToSignUp={() => setFormToShow("signup")} switchToForgot={() => setFormToShow("forgot")} />}
            {formToShow === "signup" && <SignUpForm switchToLogin={() => setFormToShow("login")} />}
            {formToShow === "forgot" && <ForgotPasswordForm switchToLogin={() => setFormToShow("login")} />}
        </div>
    );
};

export default SignUpPage;