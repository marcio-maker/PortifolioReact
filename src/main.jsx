import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/Global.css';

// Cria a raiz do React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza a aplicação
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/PortfolioReact">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
