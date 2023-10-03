import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import SignUp from './components/signUp';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SignUp />
  </React.StrictMode>
);
