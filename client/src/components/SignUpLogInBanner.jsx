import './SignUpLogInBanner.css';
import bitcoin from '../assets/images/cent.svg'

const SignUpLogInBanner = () => {
    return (
        <section className='banner'>
            <div className='bannerImage'>
                <img src={bitcoin} alt="Coin Graphic" />
            </div>
            <div className='bannerText'>
                <h1>PixelPenny</h1>
                <p>Every PixelPenny Counts!</p>
            </div>
        </section>
    );
};

export default SignUpLogInBanner;