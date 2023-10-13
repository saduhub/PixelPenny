import styles from './SignUpForm.module.css';
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { SIGN_UP } from "../utils/mutations";

const SignUpForm = ({ switchToLogin }) => {
    const [formState, setFormState] = useState({
        userName: '',
        email: '',
        password: '',
    });
    const [ signUp ] = useMutation(SIGN_UP);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await signUp({
                variables: {
                    ...formState
                }
            });
            Auth.login(data.signUp.token);
            navigate("/dashboard");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <section className={styles.signUpForm__section}>
            <form onSubmit={handleFormSubmit} className={styles.signUpForm__form}>   
                <input 
                    type="text" 
                    id="username" 
                    name="userName" 
                    placeholder="Username" 
                    required 
                    onChange={handleInputChange} 
                    className={styles.signUpForm__inputUsername}
                />
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Email" 
                    required 
                    onChange={handleInputChange} 
                    className={styles.signUpForm__inputEmail}
                />
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Password" 
                    required 
                    onChange={handleInputChange} 
                    className={styles.signUpForm__inputPassword}
                />
                <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    placeholder="Confirm Password" 
                    required 
                    onChange={handleInputChange} 
                    className={styles.signUpForm__inputPasswordConfirm}
                />
                <div className={styles.signUpForm__buttonDiv}>
                    <button 
                        type="submit" 
                        className={styles.signUpForm__signUpButton}
                    >
                        Sign Up
                    </button>
                    <h6 className={styles.signUpForm__orText}>or</h6>
                    <button 
                        type="button" 
                        onClick={switchToLogin} 
                        className={styles.signUpForm__loginButton}
                    >
                        Log In
                    </button>
                </div>
            </form>
        </section>
    );
};

export default SignUpForm;