import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills'; // New import
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import { ParallaxProvider } from 'react-scroll-parallax';
import { InView } from 'react-intersection-observer';

function App() {
  return (
    <ParallaxProvider>
      <ParticlesBackground />
      <Header />
      <main>
        <InView triggerOnce threshold={0.25}>
          {({ inView, ref }) => (
            <div ref={ref} className={`section ${inView ? 'visible' : 'hidden'}`}>
              <Hero />
            </div>
          )}
        </InView>

         <InView triggerOnce threshold={0.25}>
          {({ inView, ref }) => (
            <div ref={ref} className={`section ${inView ? 'visible' : 'hidden'}`}>
              <Skills /> {/* New component */}
            </div>
          )}
        </InView>

        <InView triggerOnce threshold={0.25}>
          {({ inView, ref }) => (
            <div ref={ref} className={`section ${inView ? 'visible' : 'hidden'}`}>
              <Projects />
            </div>
          )}
        </InView>

        <InView triggerOnce threshold={0.25}>
          {({ inView, ref }) => (
            <div ref={ref} className={`section ${inView ? 'visible' : 'hidden'}`}>
              <Contact />
            </div>
          )}
        </InView>
      </main>
      <Footer />
    </ParallaxProvider>
  );
}

export default App;
