import styles from './ResetPasswordPage.module.css'
import SignUpLogInBanner from "../components/SignUpLogInBanner";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Auth from "../auth";
import { RESET_PASSWORD } from "../mutations";

const ResetPasswordPage = () => {
    const [formState, setFormState] = useState({
        newPassword: '',
        confirmNewPassword: '', 
    });
    const [ resetPassword ] = useMutation(RESET_PASSWORD);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await resetPassword({
                variables: {
                    ...formState
                }
            });
            Auth.login(data.resetPassword.token);
            navigate("/dashboard");
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <section className={styles.resetPasswordPage__section}>
            <SignUpLogInBanner/>
            <form className={styles.resetPasswordPage__form} onSubmit={ handleFormSubmit }>
                <input 
                    type="password" 
                    id="newPassword" 
                    name="newPassword" 
                    placeholder="New Password" 
                    required 
                    onChange={handleInputChange} 
                    className={styles.resetPasswordPage__inputNewPassword} 
                />
                <input 
                    type="password" 
                    id="confirmNewPassword" 
                    name="confirmNewPassword" 
                    placeholder="Confirm New Password" 
                    required 
                    onChange={handleInputChange} 
                    className={styles.resetPasswordPage__inputConfirmNewPassword} 
                />
                <button 
                    type="submit" 
                    className={styles.resetPasswordPage__resetPasswordButton}
                >
                    Save New Password
                </button>
            </form>
        </section>
    );
};

export default ResetPasswordPage;