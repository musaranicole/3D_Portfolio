import { useState } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'

export function Interface({ onViewWorkClick }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      color: 'white',
      zIndex: 1000,
      pointerEvents: 'none'
    }}>
      <div style={{
        position: 'absolute',
        bottom: '100px',
        left: '30px',
        pointerEvents: 'auto'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
          Nicole Musara
        </h1>
        <p style={{ fontSize: '24px', color: '#ccc', marginBottom: '32px' }}>
          Systems Engineer & Data Scientist
        </p>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button 
            onClick={onViewWorkClick}
            style={{
              backgroundColor: '#8B5CF6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            View My Work
          </button>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <a href="https://github.com/musaranicole" target="_blank" rel="noopener noreferrer" 
               style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
              <Github size={24} style={{ cursor: 'pointer' }} />
            </a>
            
            <a href="https://www.linkedin.com/in/nicole-musara-362a60288" target="_blank" rel="noopener noreferrer" 
               style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
              <Linkedin size={24} style={{ cursor: 'pointer' }} />
            </a>
            
            <a href="mailto:nicolemusara@icloud.com" 
               style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
              <Mail size={24} style={{ cursor: 'pointer' }} />
            </a>
            
            <a href="https://kaggle.com/nicolemusara" target="_blank" rel="noopener noreferrer" 
               style={{ 
                 color: 'white', 
                 textDecoration: 'none',
                 background: '#20BEFF',
                 borderRadius: '4px',
                 padding: '4px 8px',
                 fontSize: '12px',
                 fontWeight: 'bold',
                 cursor: 'pointer'
               }}>
              K
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}