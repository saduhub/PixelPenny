import styles from './ResetPasswordPage.module.css'
import SignUpLogInBanner from "../components/SignUpLogInBanner";

const ResetPasswordPage = () => {
    return (
        <section className={styles.formSection}>
            <SignUpLogInBanner/>
            <form>
                <input type="password" id="newPassword" name="newPassword" placeholder="New Password" required />
                <input type="password" id="confirmNewPassword" name="confirmNewPassword" placeholder="Confirm New Password" required />
                {/*  eslint-disable-next-line */}
                <button type="submit" className='resetPasswordButton'>Save New Password</button>
            </form>
        </section>
    );
};

export default ResetPasswordPage;