import styles from './SignUpForm.module.css';
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Auth from "../auth";
import { SIGN_UP } from "../mutations";

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
        <section className={styles.formSection}>
            <form onSubmit={handleFormSubmit}>   
                <input type="text" id="username" name="userName" placeholder="Username" required onChange={handleInputChange} />
                <input type="email" id="email" name="email" placeholder="Email" required onChange={handleInputChange} />
                <input type="password" id="password" name="password" placeholder="Password" required onChange={handleInputChange} />
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required onChange={handleInputChange} />
                <div className={styles.buttonDiv}>
                    <button type="submit">Sign Up</button>
                    <h6>or</h6>
                    <button type="button" onClick={switchToLogin}>Log In</button>
                </div>
            </form>
        </section>
    );
};

export default SignUpForm;