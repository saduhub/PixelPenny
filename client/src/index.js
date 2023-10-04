import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import SignUpPage from './pages/SignUpPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SignUpPage />
  </React.StrictMode>
);
