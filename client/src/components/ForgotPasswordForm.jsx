import styles from './ForgotPasswordForm.module.css';
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { RESET_PASSWORD_REQUEST } from "../queries";
import { SEND_RESET_PASSWORD_EMAIL } from "../mutations";

const ForgotPasswordForm = ({ switchToLogin }) => {
    const [formState, setFormState] = useState({
        email: '',
    });
    
    const resetPasswordData = useQuery(RESET_PASSWORD_REQUEST, {
        variables: { ...formState }
    });
    const [sendResetPasswordEmail] = useMutation(SEND_RESET_PASSWORD_EMAIL);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const emailFound = resetPasswordData.data?.resetPasswordRequest.email;

            if(!emailFound) {
                throw new Error("No email found");
            }

            await sendResetPasswordEmail({
                variables: {
                    email: emailFound,
                }
            });

            navigate("/resetPassword");
        } catch (e) {
            console.error(e);
        }
    };

    return (
    <section className={styles.forgotPasswordForm__section}>
        <form onSubmit={handleFormSubmit} className={styles.forgotPasswordForm__form}>
            <input 
                type="email" 
                id="forgotEmail" 
                name="email" 
                placeholder="Email" 
                onChange={handleInputChange} 
                required 
                className={styles.forgotPasswordForm__inputEmail}
            />
            <h6 className={styles.forgotPasswordForm__backToLogin}>
                {/*  eslint-disable-next-line */}
                <a href="#" onClick={switchToLogin} className={styles.forgotPasswordForm__backLinkAnchor}>
                    Back to login
                </a>
            </h6>
            <button 
                type="submit" 
                className={styles.forgotPasswordForm__resetPasswordBtn}
            >
                Reset Password
            </button>
        </form>
    </section>
    );
};

export default ForgotPasswordForm;