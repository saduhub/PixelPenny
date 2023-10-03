import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import SignUpForm from './components/SignUpForm.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SignUpForm />
  </React.StrictMode>
);
