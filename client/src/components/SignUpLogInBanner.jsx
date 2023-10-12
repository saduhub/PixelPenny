import styles from './SignUpLogInBanner.module.css';
import bitcoin from '../assets/images/cent.svg'

const SignUpLogInBanner = () => {
    return (
        <section className={styles.signUpLogInBanner__section}>
            <div className={styles.signUpLogInBanner__imageContainer}>
                <img src={bitcoin} alt="Coin Graphic" className={styles.signUpLogInBanner__coinImage} />
            </div>
            <div className={styles.signUpLogInBanner__textContainer}>
                <h1 className={styles.signUpLogInBanner__title}>PixelPenny</h1>
                <p className={styles.signUpLogInBanner__subtitle}>Every PixelPenny Counts!</p>
            </div>
        </section>
    );
};

export default SignUpLogInBanner;