import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { BrowserRouter, Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import SignUpPage from './SignUpPage';
import DashboardPage from './DashboardPage';
import ResetPasswordPage from './ResetPasswordPage';


const pagesWithNavbar = ["/dashboard"];

function Routing() {
  const location = useLocation();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(pagesWithNavbar.includes(location.pathname));
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

  useEffect(() => {
      const handleScroll = () => {
          const currentScrollTop = window.scrollY;
  
          if (currentScrollTop <= 0) {
              setNavbarVisible(true);
          } else if (currentScrollTop > lastScrollTop) {
              setNavbarVisible(false);
          } else {
              setNavbarVisible(true);
          }
  
          setLastScrollTop(currentScrollTop);
      };
  
      window.addEventListener('scroll', handleScroll, { passive: true });
  
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, [lastScrollTop]);

  useEffect(() => {
      if (isMobile) {
      setNavbarVisible(false);
      }
  }, [location.pathname, isMobile]);
  // eslint-disable-next-line
  const toggleNavbar = () => {
      setNavbarVisible(prevVisible => !prevVisible);
  };

  useEffect(() => {
    setNavbarVisible(pagesWithNavbar.includes(location.pathname));
  }, [location.pathname]);

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