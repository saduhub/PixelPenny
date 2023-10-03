import './SignUpForm.css';

const SignUpForm = () => {
    return (
        <section className='formSection'>
            <form>
                <div className='inputGroup'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required />
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </section>
    );
};

export default SignUpForm;