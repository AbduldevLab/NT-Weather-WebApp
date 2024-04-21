import React from 'react';// Import React from the 'react' package to use JSX syntax.
import ReactDOM from 'react-dom/client';// Import ReactDOM from the 'react-dom' package to render the App component to the DOM.
import './index.css';// Import the 'index.css' file to apply global styles to the app.
import App from './App';// Import the App component from the 'App.js' file to render it to the DOM.


const root = ReactDOM.createRoot(document.getElementById('root'));// Create a root for the App component to render to the DOM.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


