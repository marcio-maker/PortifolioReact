import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  // State Management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // References
  const formRef = useRef(null);
  const inputsRef = useRef([]);
  const titleRef = useRef(null);
  const contactRef = useRef(null);
  const infoTitleRef = useRef(null);
  const infoItemsRef = useRef([]);

  // GSAP Animations
  useEffect(() => {
    // Timeline for coordinated animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top 85%", // Trigger earlier for smoother visibility
        toggleActions: "play none none none" // Prevent reset on scroll
      }
    });

    // Section Title Animation
    tl.from(titleRef.current, {
      duration: 1.5,
      y: 100,
      autoAlpha: 0,
      skewY: 10,
      ease: "power4.out",
      overwrite: 'auto',
      clearProps: 'all' // Clear styles after animation
    });

    // Contact Info Animation
    tl.from(infoTitleRef.current, {
      duration: 1.2,
      y: 50,
      autoAlpha: 0,
      ease: "power3.out",
      overwrite: 'auto',
      clearProps: 'all'
    }, "-=1.0") // Overlap with section title
      .from(infoItemsRef.current, {
        duration: 0.8,
        x: -50,
        autoAlpha: 0,
        stagger: 0.2,
        ease: "power3.out",
        overwrite: 'auto',
        clearProps: 'all'
      }, "-=0.8"); // Stagger after title

    // Particle Animation
    gsap.to(".contact-particle", {
      duration: 20,
      x: "random(-100, 100)",
      y: "random(-50, 50)",
      rotation: "random(-30, 30)",
      ease: "none",
      repeat: -1,
      yoyo: true
    });

    // Holographic Glow Effect
    gsap.to(".contact-form", {
      duration: 5,
      boxShadow: "0 0 30px rgba(52, 152, 219, 0.3)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  // Input Animations
  useEffect(() => {
    inputsRef.current.forEach(input => {
      if (!input) return;

      const onFocus = () => {
        gsap.to(input, {
          duration: 0.5,
          borderColor: "#00f3ff",
          boxShadow: "0 0 15px rgba(0, 243, 255, 0.4)",
          backgroundColor: "rgba(0, 243, 255, 0.05)",
          ease: "power2.out"
        });

        // Wave Effect
        const wave = document.createElement('div');
        wave.className = 'input-wave';
        input.parentNode.appendChild(wave);

        gsap.to(wave, {
          scale: 20,
          opacity: 0,
          duration: 1,
          onComplete: () => wave.remove()
        });
      };

      const onBlur = () => {
        gsap.to(input, {
          duration: 0.5,
          borderColor: "#CFD8DC",
          boxShadow: "0 0 0 rgba(0, 243, 255, 0)",
          backgroundColor: "var(--input-bg)",
          ease: "power2.out"
        });
      };

      input.addEventListener("focus", onFocus);
      input.addEventListener("blur", onBlur);

      return () => {
        input.removeEventListener("focus", onFocus);
        input.removeEventListener("blur", onBlur);
      };
    });
  }, [submitted]);

  // Form Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    gsap.to(formRef.current, {
      duration: 0.5,
      opacity: 0,
      y: 50,
      ease: "power2.in",
      onComplete: () => {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });

        gsap.from(".success-message", {
          duration: 1,
          y: 50,
          opacity: 0,
          scale: 0.8,
          ease: "elastic.out(1, 0.5)"
        });
      }
    });
  };

  const addInputToRefs = (el) => {
    if (el && !inputsRef.current.includes(el)) {
      inputsRef.current.push(el);
    }
  };

  const addInfoItemToRefs = (el) => {
    if (el && !infoItemsRef.current.includes(el)) {
      infoItemsRef.current.push(el);
    }
  };

  // Render
  return (
    <section id="contact" className="contact" ref={contactRef}>
      {/* Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="contact-particle"
          style={{
            position: 'absolute',
            width: '5px',
            height: '5px',
            background: 'rgba(0, 243, 255, 0.5)',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
        />
      ))}

      <div className="container">
        <h2 className="section-title" ref={titleRef}>
          <span className="title-gradient">Entre em Contato</span>
        </h2>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <h3 className breeder="info-title" ref={infoTitleRef}>Informações de Contato</h3>
            <p className="info-text">
              Fique à vontade para entrar em contato comigo através dos canais abaixo:
            </p>

            <ul className="contact-details">
              {[
                { icon: 'fas fa-envelope', text: 'ma.gemelli2020@gmail.com' },
                { icon: 'fas fa-phone', text: '+55 (11) 914809693' },
                { icon: 'fas fa-map-marker-alt', text: 'São Paulo, Brasil' }
              ].map((item, i) => (
                <li key={i} className="detail-item" ref={addInfoItemToRefs}>
                  <i className={`${item.icon} detail-icon`}></i>
                  <span className="detail-text">{item.text}</span>
                  <div className="detail-line"></div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Form */}
          <div className="contact-form" ref={formRef}>
            {submitted ? (
              <div className="success-message">
                <h3>Obrigado pelo seu contato!</h3>
                <p>Responderei o mais breve possível.</p>
                <div className="success-particles"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="futuristic-form">
                <div className="form-group">
                  <label htmlFor="name" className="input-label">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="futuristic-input"
                    ref={addInputToRefs}
                  />
                  <div className="input-highlight"></div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="input-label">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="futuristic-input"
                    ref={addInputToRefs}
                  />
                  <div className="input-highlight"></div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="input-label">Mensagem</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="futuristic-textarea"
                    ref={addInputToRefs}
                  ></textarea>
                  <div className="input-highlight"></div>
                </div>

                <button type="submit" className="btn futuristic-btn">
                  <span>Enviar Mensagem</span>
                  <div className="btn-hover"></div>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;