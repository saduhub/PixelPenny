import './ForgotPasswordForm.css';

const ForgotPasswordForm = ({ switchToLogin }) => {
    return (
        <section className='formSection'>
            <form>
                <input type="email" id="forgotEmail" name="email" placeholder="Email" required />
                {/*  eslint-disable-next-line */}
                <h6><a href="#" onClick={switchToLogin}>Back to login</a></h6>
                <button type="submit">Reset Password</button>
            </form>
        </section>
    );
};

export default ForgotPasswordForm;