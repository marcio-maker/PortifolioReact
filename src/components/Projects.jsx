import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'E-commerce Premium',
    description: 'Plataforma completa com carrinho, checkout e integração com Stripe.',
    technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
  },
  {
    id: 2,
    title: 'Rede Social Educativa',
    description: 'Plataforma de compartilhamento de conhecimento com fóruns e videoaulas.',
    technologies: ['React', 'Firebase', 'WebRTC', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
  },
  {
    id: 3,
    title: 'App de Finanças Pessoais',
    description: 'Controle financeiro com gráficos interativos e relatórios mensais.',
    technologies: ['React Native', 'TypeScript', 'D3.js', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1511&q=80'
  },
  {
    id: 4,
    title: 'Sistema de Agendamentos',
    description: 'Gestão de agendamentos com calendário integrado e notificações.',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'WebSockets'],
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1412&q=80'
  },
  {
    id: 5,
    title: 'Marketplace de Artesanato',
    description: 'Plataforma para artesãos venderem seus produtos com sistema de avaliações.',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 6,
    title: 'App de Receitas Saudáveis',
    description: 'Catálogo de receitas com filtros por dieta e tempo de preparo.',
    technologies: ['Flutter', 'Firebase', 'Google ML Kit'],
    image: 'https://plus.unsplash.com/premium_photo-1743169049314-0666e8e35ca3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 7,
    title: 'Plataforma de Cursos Online',
    description: 'Sistema de ensino com videoaulas, exercícios e certificados.',
    technologies: ['React', 'Django', 'PostgreSQL', 'FFmpeg'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1522&q=80'
  },
  {
    id: 8,
    title: 'Sistema de Monitoramento IoT',
    description: 'Dashboard para visualização de dados de sensores em tempo real.',
    technologies: ['React', 'MQTT', 'WebSockets', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 9,
    title: 'App de Meditação Guiada',
    description: 'Aplicativo com programas de meditação e acompanhamento de progresso.',
    technologies: ['Swift', 'AVFoundation', 'HealthKit'],
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 10,
    title: 'Sistema de Gestão Hospitalar',
    description: 'Solução completa para gestão de pacientes, consultas e prontuários.',
    technologies: ['Angular', 'NestJS', 'PostgreSQL', 'Docker'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  }
];

const ProjectsCarousel = () => {
  const carouselRef = useRef(null);
  const cardsRef = useRef([]);
  const imagesRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayInterval = useRef(null);
  const isInteracting = useRef(false);
  const parallaxTween = useRef(null);

  // Inicializa as refs
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, projects.length);
    imagesRef.current = imagesRef.current.slice(0, projects.length);
  }, []);

  // Efeito 3D e Parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação principal dos cards
      gsap.to(cardsRef.current, {
        x: (i) => (i - currentIndex) * 320,
        z: (i) => -Math.abs(i - currentIndex) * 100,
        scale: (i) => (i === currentIndex ? 1.1 : 0.9),
        opacity: (i) => (i === currentIndex ? 1 : 0.7),
        rotationY: (i) => (i - currentIndex) * 10,
        duration: 1.5,
        ease: "power3.out"
      });

      // Efeito Parallax avançado
      parallaxTween.current = gsap.to(imagesRef.current, {
        y: (i) => (i === currentIndex ? -30 : 20),
        duration: 1.8,
        ease: "sine.out",
        stagger: 0.1
      });

      // ScrollTrigger para ativar quando entrar na viewport
      ScrollTrigger.create({
        trigger: carouselRef.current,
        start: "top 70%",
        onEnter: () => !isInteracting.current && startAutoPlay(),
        onLeaveBack: () => pauseAutoPlay(),
        onEnterBack: () => !isInteracting.current && startAutoPlay()
      });

    }, carouselRef);

    return () => {
      ctx.revert();
      pauseAutoPlay();
    };
  }, [currentIndex]);

  // AutoPlay controlado
  const startAutoPlay = () => {
    pauseAutoPlay();
    autoPlayInterval.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % projects.length);
    }, 3000);
  };

  const pauseAutoPlay = () => {
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
      autoPlayInterval.current = null;
    }
    if (parallaxTween.current) {
      parallaxTween.current.kill();
    }
  };

  // Navegação manual
  const navigate = (direction) => {
    isInteracting.current = true;
    pauseAutoPlay();
    
    setCurrentIndex(prev => {
      const newIndex = direction === 'next' 
        ? (prev + 1) % projects.length 
        : (prev - 1 + projects.length) % projects.length;
      return newIndex;
    });

    setTimeout(() => {
      isInteracting.current = false;
      startAutoPlay();
    }, 2000);
  };

  // Limpeza ao desmontar
  useEffect(() => {
    return () => pauseAutoPlay();
  }, []);

  return (
    <section id="projects" className="projects-section" ref={carouselRef}>
      <div className="container">
        <h2 className="section-title">
          <span className="highlight">Projetos</span> em Destaque
        </h2>

        <div className="carousel-3d-container">
          <div className="carousel-track">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={el => cardsRef.current[index] = el}
                className={`project-card ${index === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  setCurrentIndex(index);
                  pauseAutoPlay();
                }}
                aria-label={`Ver projeto: ${project.title}`}
              >
                <div className="card-image-container">
                  <div className="card-image">
                    <img
                      ref={el => imagesRef.current[index] = el}
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="card-overlay" />
                </div>

                <div className="card-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-tags">
                    {project.technologies.map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-controls">
          <button 
            onClick={() => navigate('prev')}
            className="control-btn"
            aria-label="Projeto anterior"
          >
            <svg viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
            </svg>
          </button>

          <div className="pagination-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  setCurrentIndex(i);
                  pauseAutoPlay();
                }}
                aria-label={`Ir para projeto ${i + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={() => navigate('next')}
            className="control-btn"
            aria-label="Próximo projeto"
          >
            <svg viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;