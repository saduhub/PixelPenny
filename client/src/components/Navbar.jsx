import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

function Navbar({ onClose, navbarVisible }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`${styles.navbar__navbarContainer} ${navbarVisible ? '' : styles.navbar__navbarContainerHidden}`}>
        <nav className={styles.navbar__nav}>
            <ul className={`${styles.navbar__ul} ${isMobile ? styles.navbar__ul_mobile : ''}`}>
                <li className={styles.navbar__li}>
                    <Link to="/" className={styles.navbar__linkLogout}>
                        Log Out
                    </Link>
                </li>
                {isMobile && (
                    <li className={styles.navbar__closeButtonLi}>
                        <button className={styles.navbar__closeButton} onClick={onClose}>
                            X
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    </div>
);
}

export default Navbar;