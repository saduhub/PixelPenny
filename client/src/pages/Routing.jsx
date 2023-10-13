import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { BrowserRouter, Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import SignUpPage from './SignUpPage';
import DashboardPage from './DashboardPage';
import ResetPasswordPage from './ResetPasswordPage';
import useIsMobile from '../hooks/isMobile'
import useScrollDirection from '../hooks/scrollDirection';


const pagesWithNavbar = ["/dashboard"];

function Routing() {
    const location = useLocation();
    const isMobile = useIsMobile();
    const scrollDirection = useScrollDirection();
    
    const [navbarVisible, setNavbarVisible] = useState(pagesWithNavbar.includes(location.pathname));
  
    useEffect(() => {
      if (isMobile || scrollDirection === 'down' || !pagesWithNavbar.includes(location.pathname)) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
    }, [location.pathname, isMobile, scrollDirection]);
  
    // eslint-disable-next-line
    const toggleNavbar = () => {
      setNavbarVisible(prevVisible => !prevVisible);
    };
  
    return (
      <>
        <Navbar onClose={() => setNavbarVisible(false)} navbarVisible={navbarVisible} />
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashboardPage toggleNavbar={toggleNavbar}/>} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
        </Routes>
      </>
    );
  }
  
  export default Routing;