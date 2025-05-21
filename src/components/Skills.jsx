import React, { useRef, useEffect } from 'react';
import { useParallax } from 'react-scroll-parallax';
import { InView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Skills.css';

gsap.registerPlugin(ScrollTrigger);

function Skills() {
  const { ref: parallaxRef } = useParallax({ speed: 5 });
  const skillsRef = useRef(null);
  const skillItemsRef = useRef([]);
  const tabButtonsRef = useRef([]);
  const titleRef = useRef(null);
  const lettersRef = useRef([]);

  // Dados das habilidades
  const skillsData = {
    frontend: [
      { name: 'HTML5', level: 95, icon: '💻' },
      { name: 'CSS3', level: 90, icon: '🎨' },
      { name: 'JavaScript', level: 85, icon: '⚙️' },
      { name: 'React', level: 85, icon: '⚛️' },
      { name: 'Vite', level: 80, icon: '⚡' },
      { name: 'Tailwind', level: 85, icon: '🌀' },
      { name: 'GSAP', level: 80, icon: '🎬' },
      { name: 'Three.js', level: 70, icon: '✨' }
    ],
    backend: [
      { name: 'Firebase', level: 75, icon: '🔥' },
      { name: 'Python', level: 70, icon: '🐍' }
    ],
    design: [
      { name: 'UI/UX', level: 85, icon: '✏️' },
      { name: 'Figma', level: 80, icon: '🖥️' }
    ],
    tools: [
      { name: 'Git', level: 85, icon: '🐙' }
    ]
  };

  const [activeTab, setActiveTab] = React.useState('frontend');

  // Animação com GSAP
  useEffect(() => {
    gsap.core.globals("ScrollTrigger", ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animação do título
      gsap.from(lettersRef.current, {
        y: 100,
        opacity: 0,
        rotationX: 90,
        duration: 1,
        stagger: 0.08,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Animação dos botões de tab
      gsap.from(tabButtonsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Animação dos itens de skill
      skillItemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        gsap.fromTo(item, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );

        // Animação da barra de progresso
        gsap.fromTo(item.querySelector('.skill-progress-fill'),
          { width: 0 },
          {
            width: "100%",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, skillsRef);

    return () => ctx.revert();
  }, [activeTab]);

  // Renderização do título animado
  const renderAnimatedTitle = () => {
    return "Habilidades".split('').map((letter, i) => (
      <span 
        key={i} 
        ref={el => lettersRef.current[i] = el}
        className="skill-letter"
        style={{ display: letter === ' ' ? 'inline' : 'inline-block' }}
      >
        {letter}
      </span>
    ));
  };

  return (
    <InView triggerOnce threshold={0.25}>
      {({ inView, ref }) => (
        <div ref={ref} className={`skills-section ${inView ? 'visible' : 'hidden'}`} id="skills">
          <div ref={parallaxRef}>
            <div ref={skillsRef} className="skills-container">
              <div className="skills-header">
                <h2 ref={titleRef} className="skills-title">
                  {renderAnimatedTitle()}
                </h2>
                <p className="section-subtitle">
                  Minhas competências técnicas e ferramentas que utilizo para criar soluções incríveis.
                </p>
              </div>

              <div className="category-tabs">
                {Object.keys(skillsData).map((category, index) => (
                  <button
                    key={category}
                    ref={el => tabButtonsRef.current[index] = el}
                    className={`tab-btn ${activeTab === category ? 'active' : ''}`}
                    onClick={() => setActiveTab(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              <div className="skills-grid">
                {skillsData[activeTab].map((skill, index) => (
                  <div 
                    key={skill.name} 
                    ref={el => skillItemsRef.current[index] = el}
                    className="skill-item"
                  >
                    <div className="skill-sphere">
                      <span className="skill-icon">{skill.icon}</span>
                    </div>
                    <h3>{skill.name}</h3>
                    <div className="skill-progress">
                      <div 
                        className="skill-progress-fill" 
                        style={{ width: `${skill.level}%` }}
                        data-level={skill.level}
                      ></div>
                    </div>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </InView>
  );
}

export default Skills;