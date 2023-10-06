import './LogInForm.css';
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
        <section className='formSection'>
            <form onSubmit={handleFormSubmit}>   
                <input type="username" id="username" name="userName" placeholder="Username" onChange={handleInputChange} required />
                <input type="password" id="loginPassword" name="password" placeholder="Password" onChange={handleInputChange} required />
                {/*  eslint-disable-next-line */}
                <h6><a href="#" onClick={switchToForgot}>Forgot Password?</a></h6>
                <div className='buttonDiv'>
                    <button type="submit">Log In</button>
                    <h6>or</h6>
                    <button type="button" onClick={switchToSignUp}>Sign Up</button>
                </div>
            </form>
        </section>
    );
};

export default LoginForm;