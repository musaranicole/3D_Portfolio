import React from 'react';

const Experience = () => {
  const experiences = [
    { title: 'Senior 3D Developer', company: 'Tech Corp', period: '2022-Present' },
    { title: 'Frontend Developer', company: 'Web Solutions', period: '2020-2022' },
    { title: 'UI/UX Designer', company: 'Creative Agency', period: '2018-2020' }
  ];

  return (
    <div style={styles.container}>
      {experiences.map((exp, index) => (
        <div key={index} style={styles.experienceItem}>
          <h3 style={styles.title}>{exp.title}</h3>
          <p style={styles.company}>{exp.company}</p>
          <p style={styles.period}>{exp.period}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  experienceItem: {
    padding: '25px',
    backgroundColor: '#334155',
    borderRadius: '12px',
    borderLeft: '4px solid #3b82f6'
  },
  title: {
    fontSize: '1.5rem',
    margin: '0 0 10px 0',
    color: '#f1f5f9'
  },
  company: {
    fontSize: '1.1rem',
    color: '#cbd5e1',
    margin: '0 0 5px 0'
  },
  period: {
    color: '#94a3b8',
    margin: 0
  }
};

export default Experience;