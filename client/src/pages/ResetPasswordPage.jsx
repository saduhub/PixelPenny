import styles from './ResetPasswordPage.module.css'
import SignUpLogInBanner from "../components/SignUpLogInBanner";

const ResetPasswordPage = () => {
    return (
        <section className={styles.resetPasswordPage__section}>
            <SignUpLogInBanner/>
            <form className={styles.resetPasswordPage__form}>
                <input 
                    type="password" 
                    id="newPassword" 
                    name="newPassword" 
                    placeholder="New Password" 
                    required 
                    className={styles.resetPasswordPage__inputNewPassword} 
                />
                <input 
                    type="password" 
                    id="confirmNewPassword" 
                    name="confirmNewPassword" 
                    placeholder="Confirm New Password" 
                    required 
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