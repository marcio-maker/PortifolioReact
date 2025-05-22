import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/Global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Remova o basename ou corrija conforme necessário */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
