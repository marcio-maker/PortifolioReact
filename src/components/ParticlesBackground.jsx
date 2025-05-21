import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  const options = {
    background: { color: { value: "#0d1a26" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#3da6ff" },
      links: {
        color: "#4fc3f7",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 3,
        straight: false,
      },
      number: { density: { enable: true }, value: 100 },
      opacity: { value: 0.7 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 5 } },
      shadow: { blur: 5, color: { value: "#3da6ff" }, enable: true },
    },
    detectRetina: true,
  };

  return <Particles id="tsparticles" options={options} />;
}

export default ParticlesBackground;