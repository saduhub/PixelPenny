import SignUpForm from "../components/SignUpForm";
import SignUpLogInBanner from "../components/SignUpLogInBanner";
import './SignUpPage.css'

const SignUpPage = () => {
    return (
        <div className='landingPageUnAuth'>
            <SignUpLogInBanner />
            <SignUpForm />
        </div>
    );
};

export default SignUpPage;