import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
// eslint-disable-next-line
import { BrowserRouter, Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ResetPasswordPage from './pages/ResetPasswordPage';


const httpLink = createHttpLink({
    uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("id_token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

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

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
