import styles from './SignUpLogInBanner.module.css';
import bitcoin from '../assets/images/cent.svg'

const SignUpLogInBanner = () => {
    return (
        <section className={styles.banner}>
            <div className={styles.bannerImage}>
                <img src={bitcoin} alt="Coin Graphic" />
            </div>
            <div className={styles.bannerText}>
                <h1>PixelPenny</h1>
                <p>Every PixelPenny Counts!</p>
            </div>
        </section>
    );
};

export default SignUpLogInBanner;