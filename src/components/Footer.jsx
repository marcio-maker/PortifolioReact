import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import SocialLinks from './SocialLinks';
import '../styles/Footer.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Footer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const footerRef = useRef();
  const headingRef = useRef();
  const mirrorCardsRef = useRef([]);
  const bottomRef = useRef();
  const splitTextRef = useRef(null);

  useEffect(() => {
    console.log('Footer component mounted');

    // Initialize SplitText for the heading
    const heading = headingRef.current;
    splitTextRef.current = new SplitText(heading, { type: 'chars', charsClass: 'letter' });
    const letters = splitTextRef.current.chars;

    const timer = setTimeout(() => {
      setIsLoaded(true);
      console.log('Footer loaded');
    }, 100);

    // Wave effect on title with mouse hover
    const handleMouseEnter = () => {
      gsap.fromTo(
        letters,
        {
          y: 50,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
          stagger: {
            each: 0.05,
            from: 'center',
          },
        }
      );
    };

    const handleMouseLeave = () => {
      gsap.to(letters, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
        stagger: 0.03,
      });
    };

    heading.addEventListener('mouseenter', handleMouseEnter);
    heading.addEventListener('mouseleave', handleMouseLeave);

    // Animation for mirror cards with 3D effect
    mirrorCardsRef.current.forEach((card, i) => {
      gsap.from(card, {
        y: 30,
        opacity: 0,
        rotationY: 10,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          gsap.set(card, { opacity: 1 });
        },
      });

      // 3D effect with mouse movement
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;

        gsap.to(card, {
          rotationY: rotateY,
          rotationX: rotateX,
          transformPerspective: 800,
          transformOrigin: 'center center',
          ease: 'power1.out',
          duration: 0.8,
        });

        gsap.to(card.querySelector('.card-reflection'), {
          opacity: 0.3 + (Math.abs(rotateY) + Math.abs(rotateX)) / 20,
          duration: 0.3,
        });
      };

      const handleMouseLeaveCard = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        });
        gsap.to(card.querySelector('.card-reflection'), {
          opacity: 0.2,
          duration: 0.5,
        });
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeaveCard);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeaveCard);
      };
    });

    // Animation for footer bottom
    gsap.from(bottomRef.current, {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom',
        toggleActions: 'play none none none',
      },
      onComplete: () => {
        gsap.set(bottomRef.current, { opacity: 1 });
      },
    });

    // Cleanup
    return () => {
      clearTimeout(timer);
      heading.removeEventListener('mouseenter', handleMouseEnter);
      heading.removeEventListener('mouseleave', handleMouseLeave);
      splitTextRef.current.revert(); // Revert SplitText to original state
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Kill all ScrollTriggers
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !mirrorCardsRef.current.includes(el)) {
      mirrorCardsRef.current.push(el);
    }
  };

  return (
    <footer className={`footer ${isLoaded ? 'loaded' : ''}`} ref={footerRef}>
      <div className="footer-container">
        <h2 className="footer-heading" ref={headingRef}>
          Vamos trabalhar juntos em seu próximo projeto
        </h2>

        <div className="footer-content">
          <div className="mirror-card" ref={addToRefs}>
            <div className="card-content">
              <h3>Marcio Maker</h3>
              <p>Desenvolvedor Front-end especializado em criar experiências digitais excepcionais</p>
            </div>
            <div className="card-reflection"></div>
          </div>

          <div className="mirror-card" ref={addToRefs}>
            <div className="card-content">
              <h4>Navegação</h4>
              <ul>
                <li><a href="#about">Sobre Mim</a></li>
                <li><a href="#skills">Habilidades</a></li>
                <li><a href="#projects">Portfólio</a></li>
                <li><a href="#contact">Contato</a></li>
              </ul>
            </div>
            <div className="card-reflection"></div>
          </div>

          <div className="mirror-card" ref={addToRefs}>
            <div className="card-content">
              <h4>Redes Sociais</h4>
              <SocialLinks />
              <h4>Contato Direto</h4>
              <p>email@exemplo.com</p>
              <p>+55 (11) 99999-9999</p>
            </div>
            <div className="card-reflection"></div>
          </div>
        </div>

        <div className="footer-bottom" ref={bottomRef}>
          <p>© {new Date().getFullYear()} Marcio Maker. Todos os direitos reservados.</p>
          <p>Desenvolvido com React e <span className="coffee">☕</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;