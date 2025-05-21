import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import '../styles/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="#" className="logo">Meu Portfólio</a>
          
          <div className="header-actions">
            <ThemeToggle />
            <button 
              className={`hamburger ${isOpen ? 'open' : ''}`} 
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          <nav className={`nav ${isOpen ? 'open' : ''}`}>
            <ul>
              <li><a href="#about" onClick={toggleMenu}>Sobre</a></li>
              <li><a href="#skills" onClick={toggleMenu}>Habilidades</a></li>
              <li><a href="#projects" onClick={toggleMenu}>Projetos</a></li>
              <li><a href="#contact" onClick={toggleMenu}>Contato</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;