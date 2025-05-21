import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SocialLinks from './SocialLinks';
import '../styles/Hero.css';
import perfilImg from '../assets/perfil.png';


const Hero = () => {
  const h1Ref = useRef(null);
  const cursorRef = useRef(null);
  const textContainerRef = useRef(null);
  const animationRef = useRef({ timers: [], animations: [] });

  useEffect(() => {
    const phrases = [
      "Desenvolvedor Front-end",
      "Especialista em React",
      "Criador de Interfaces Modernas",
      "Apaixonado por UX/UI",
      "Desenvolvedor JavaScript",
      "Focado em Performance Web"
    ];

    const h1Element = h1Ref.current;
    const cursorElement = cursorRef.current;
    const textContainer = textContainerRef.current;

    if (!h1Element || !cursorElement || !textContainer) return;

    // Limpa o container e cria elemento para o texto dinâmico
    textContainer.innerHTML = '';
    const dynamicText = document.createElement('span');
    dynamicText.className = 'dynamic-text';
    textContainer.appendChild(dynamicText);

    // Configurações de animação
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBetweenPhrases = 2000;
    const pauseBeforeStart = 500;

    let currentPhraseIndex = 0;
    let isDeleting = false;
    let text = '';

    // Animação do cursor piscando
    const cursorAnimation = gsap.to(cursorElement, {
      opacity: 0,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
    animationRef.current.animations.push(cursorAnimation);

    const typeWriter = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        // Modo apagar
        text = currentPhrase.substring(0, text.length - 1);
      } else {
        // Modo digitar
        text = currentPhrase.substring(0, text.length + 1);
      }

      dynamicText.textContent = text;

      // Determina velocidade baseado no estado atual
      const speed = isDeleting ? deletingSpeed : typingSpeed;

      // Lógica de transição entre estados
      if (!isDeleting && text === currentPhrase) {
        // Frase completa, pausa antes de apagar
        const timer = setTimeout(() => {
          isDeleting = true;
          typeWriter();
        }, pauseBetweenPhrases);
        animationRef.current.timers.push(timer);
      } else if (isDeleting && text === '') {
        // Texto apagado, vai para próxima frase
        const timer = setTimeout(() => {
          isDeleting = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
          typeWriter();
        }, pauseBeforeStart);
        animationRef.current.timers.push(timer);
      } else {
        // Continua digitando/apagando
        const timer = setTimeout(typeWriter, speed);
        animationRef.current.timers.push(timer);
      }
    };

    // Inicia a animação
    const initialTimer = setTimeout(typeWriter, 500);
    animationRef.current.timers.push(initialTimer);

    // Limpeza
    return () => {
      // Cancela todos os timeouts
      animationRef.current.timers.forEach(timer => clearTimeout(timer));
      // Mata todas as animações GSAP
      animationRef.current.animations.forEach(anim => anim.kill());
    };
  }, []);

  return (
    <section id="about" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 ref={h1Ref}>
              Olá, eu sou <span className="highlight">Marcio Maker</span>
              <br />
              <span ref={textContainerRef} className="typewriter-container"></span>
              <span ref={cursorRef} className="cursor"></span>
            </h1>
            <p>
              Sou um desenvolvedor apaixonado por criar experiências web incríveis 
              com React, JavaScript e tecnologias modernas.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn">Contate-me</a>
              <a href="#projects" className="btn btn-outline">Meus Projetos</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image">
             <img src={perfilImg} alt="Perfil de Marcio Maker" className="profile-img" />
            </div>
          </div>
        </div>
        <SocialLinks />
      </div>
    </section>
  );
};

export default Hero;
