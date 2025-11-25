import React from 'react';
import Experience from '../components/Experience';
import Projects from '../components/Projects';

const HomePage = () => {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section id="hero" style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.name}>John Doe</h1>
          <p style={styles.title}>3D Developer & Designer</p>
          <div style={styles.links}>
            <a href="#projects" style={styles.primaryButton}>View My Work</a>
            <a href="#experience" style={styles.secondaryButton}>My Experience</a>
          </div>
        </div>
        
        {/* 3D Globe Placeholder */}
        <div style={styles.globe}>
          <div style={styles.globeSphere}></div>
          <div style={styles.globeStand}></div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={styles.section}>
        <h2 style={styles.sectionTitle}>Experience</h2>
        <Experience />
      </section>

      {/* Projects Section */}
      <section id="projects" style={styles.sectionDark}>
        <h2 style={styles.sectionTitle}>My Projects</h2>
        <Projects />
      </section>

      {/* Navigation */}
      <nav style={styles.nav}>
        <a href="#hero" style={styles.navLink}>Home</a>
        <a href="#experience" style={styles.navLink}>Experience</a>
        <a href="#projects" style={styles.navLink}>Projects</a>
      </nav>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: 'white',
    fontFamily: 'Arial, sans-serif'
  },
  hero: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 50px',
    position: 'relative'
  },
  heroContent: {
    maxWidth: '500px',
    zIndex: 2
  },
  name: {
    fontSize: '4rem',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    background: 'linear-gradient(45deg, #60a5fa, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  title: {
    fontSize: '1.5rem',
    color: '#cbd5e1',
    marginBottom: '30px'
  },
  links: {
    display: 'flex',
    gap: '15px'
  },
  primaryButton: {
    padding: '12px 30px',
    backgroundColor: '#3b82f6',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  },
  secondaryButton: {
    padding: '12px 30px',
    backgroundColor: 'transparent',
    color: '#3b82f6',
    textDecoration: 'none',
    border: '2px solid #3b82f6',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  },
  globe: {
    position: 'relative',
    width: '300px',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  globeSphere: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 30%, #1e40af, #1e3a8a)',
    boxShadow: '0 0 50px rgba(59, 130, 246, 0.5)',
    position: 'relative',
    zIndex: 1
  },
  globeStand: {
    position: 'absolute',
    bottom: '50px',
    width: '20px',
    height: '100px',
    backgroundColor: '#374151',
    transform: 'rotate(15deg)'
  },
  section: {
    minHeight: '100vh',
    padding: '80px 50px',
    backgroundColor: '#1e293b'
  },
  sectionDark: {
    minHeight: '100vh',
    padding: '80px 50px',
    backgroundColor: '#0f172a'
  },
  sectionTitle: {
    fontSize: '3rem',
    textAlign: 'center',
    marginBottom: '50px',
    color: '#e2e8f0'
  },
  nav: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    display: 'flex',
    gap: '20px',
    zIndex: 100
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.3s ease'
  }
};

export default HomePage;