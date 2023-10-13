import React, { useState, useEffect } from 'react';
import styles from './DashboardPage.module.css'

const DashboardPage = ({ toggleNavbar }) => {
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
// 
    return (
        <div className={styles.landingPageUnAuth}>
            {isMobile && <button onClick={toggleNavbar} className={styles.buttonStyle}>=</button>}
            <img src="../assets/images/cent.svg" alt="svg of a cent" />
        </div>
    );
};

export default DashboardPage;