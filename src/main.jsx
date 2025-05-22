import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/Global.css';

// Adicione isso para verificar se o CSS está carregando
console.log('Carregando Global.css'); 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/PortfolioReact"> {/* Use o nome correto aqui */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
