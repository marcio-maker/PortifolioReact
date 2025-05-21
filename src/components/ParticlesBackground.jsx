import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log("Initializing particles...");
    try {
      await loadSlim(engine);
      console.log("Particles initialized successfully");
    } catch (error) {
      console.error("Error initializing particles:", error);
    }
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "transparent",
        },
        fullScreen: {
          enable: false,
          zIndex: -1
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
              parallax: {
                enable: true,
                force: 30,
                smooth: 10
              }
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: {
              enable: true
            }
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
              speed: 1
            },
            push: {
              quantity: 4,
              particles_nb: 2
            },
          },
        },
        particles: {
          color: {
          value: "#00f0ff", // Ciano neon (funciona bem em ambos os temas)
          complement: "#ff00f0", // Rosa neon (destaque vibrante)
          shadow: "#9d00ff" // Roxo elétrico (sombra profunda)
  },
          links: {
            color: "#0066ff", // Alterado para rosa neon futurista
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
            consent: true,
            blink: false,
            warp: false
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          },
          number: {
            value: 180,
            density: {
              enable: true,
              value_area: 800
            }
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 5
            }
          },
          size: {
            value: { min: 1, max: 3 },
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
        },
        detectRetina: true,
        smooth: true
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        backgroundColor: "transparent",
        pointerEvents: "none"
      }}
    />
  );
};

export default ParticlesBackground;