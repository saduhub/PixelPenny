import './SignUpForm.css';

const SignUpForm = () => {
    return (
        <section className='formSection'>
            <form>   
                <input type="text" id="username" name="username" placeholder="Username" required />
                <input type="email" id="email" name="email" placeholder="Email" required />
                <input type="password" id="password" name="password" placeholder="Password" required />
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required />
                <h6><a href="/forgot-password">Forgot Password?</a></h6>
                <div className='buttonDiv'>
                    <button type="submit">Sign Up</button>
                    <h6>or</h6>
                    <button type="submit">Log In</button>
                </div>
            </form>
        </section>
    );
};

export default SignUpForm;