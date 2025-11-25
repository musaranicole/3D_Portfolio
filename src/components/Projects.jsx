import React from 'react';

const Projects = () => {
  const projects = [
    { name: '3D E-Commerce Platform', tech: 'React • Three.js • Node.js' },
    { name: 'Virtual Reality Gallery', tech: 'A-Frame • WebGL • MongoDB' },
    { name: 'Interactive Portfolio', tech: 'React • Framer Motion • GSAP' }
  ];

  return (
    <div style={styles.container}>
      {projects.map((project, index) => (
        <div key={index} style={styles.projectCard}>
          <h3 style={styles.projectName}>{project.name}</h3>
          <p style={styles.projectTech}>{project.tech}</p>
          <button style={styles.viewButton}>View Project</button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  projectCard: {
    padding: '30px',
    backgroundColor: '#1e293b',
    borderRadius: '15px',
    border: '1px solid #334155',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  },
  projectName: {
    fontSize: '1.5rem',
    margin: '0 0 15px 0',
    color: '#e2e8f0'
  },
  projectTech: {
    color: '#94a3b8',
    marginBottom: '20px'
  },
  viewButton: {
    padding: '10px 25px',
    backgroundColor: '#06b6d4',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default Projects;