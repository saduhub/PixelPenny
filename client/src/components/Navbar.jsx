import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import cent from '../assets/images/cent.svg'

function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  function toggleHidden() {
    setIsHidden(!isHidden);
  }
  return (
    <div className={`${styles.navbar__navbarContainer}`}>
        <div className={styles.navbar__imageAndButtonContainer}>
            <div className={styles.navbar__imageDiv}>
                <img src={cent} alt="Cent Icon" className={styles.navbar__img} />
            </div>
            <button className={styles.navbar__toggleButton} onClick={toggleHidden}>
                ☰
            </button>
        </div>
        <nav className={styles.navbar__nav}>
            <ul className={`${isHidden ? styles.navbar__ulHidden : styles.navbar__ul}`}>
                <li className={styles.navbar__li}>
                    <Link to="/" className={styles.navbar__linkLogout}>
                        Log Out
                    </Link>
                </li>
                <li className={styles.navbar__li}>
                    <Link to="/" className={styles.navbar__linkLogout}>
                        Log Out
                    </Link>
                </li>
                <li className={styles.navbar__li}>
                    <Link to="/" className={styles.navbar__linkLogout}>
                        Log Out
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
);
}

export default Navbar;