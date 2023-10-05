import './LogInForm.css';

const LoginForm = ({ switchToSignUp, switchToForgot }) => {
    return (
        <section className='formSection'>
            <form>   
                <input type="email" id="loginEmail" name="email" placeholder="Email" required />
                <input type="password" id="loginPassword" name="password" placeholder="Password" required />
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