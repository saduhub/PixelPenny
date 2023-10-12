import styles from './LogInForm.module.css';
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Auth from "../auth";
import { LOG_IN } from "../mutations";

const LoginForm = ({ switchToSignUp, switchToForgot }) => {
    const [formState, setFormState] = useState({
        userName: '',
        password: '',
    });
    const [ logIn ] = useMutation(LOG_IN);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await logIn({
                variables: {
                    ...formState
                }
            });
            Auth.login(data.logIn.token);
            navigate("/dashboard");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <section className={styles.loginForm__section}>
            <form onSubmit={handleFormSubmit} className={styles.loginForm__form}>   
                <input 
                    type="username" 
                    id="username" 
                    name="userName" 
                    placeholder="Username" 
                    onChange={handleInputChange} 
                    required 
                    className={styles.loginForm__inputUsername}
                />
                <input 
                    type="password" 
                    id="loginPassword" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleInputChange} 
                    required 
                    className={styles.loginForm__inputPassword}
                />
                <h6 className={styles.loginForm__forgotPassword}>
                    {/*  eslint-disable-next-line */}
                    <a href="#" onClick={switchToForgot} className={styles.loginForm__forgotPasswordAnchor}>
                        Forgot Password?
                    </a>
                </h6>
                <div className={styles.loginForm__buttonDiv}>
                    <button 
                        type="submit" 
                        className={styles.loginForm__loginButton}
                    >
                        Log In
                    </button>
                    <h6 className={styles.loginForm__orText}>or</h6>
                    <button 
                        type="button" 
                        onClick={switchToSignUp} 
                        className={styles.loginForm__signupButton}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </section>
    );
};

export default LoginForm;