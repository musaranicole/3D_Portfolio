import { useRef, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

export function Experience() {
  const globeRef = useRef();

  // textures
  const earthTexture = useMemo(() => new THREE.TextureLoader().load(
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg"
  ), []);

  const nightTexture = useMemo(() => new THREE.TextureLoader().load(
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png"
  ), []);

  // helper: lat/lon -> Vector3 on sphere radius 2
  const convert = (lat, lon, radius = 2) => {
    const φ = (lat * Math.PI) / 180;
    const λ = (lon * Math.PI) / 180;
    const x = radius * Math.cos(φ) * Math.cos(λ);
    const y = radius * Math.sin(φ);
    const z = radius * Math.cos(φ) * Math.sin(λ);
    return new THREE.Vector3(x, y, z);
  };

  // Major city points (used for lights if needed)
  const cities = useMemo(() => ([
    convert(40.7128, -74.0060),  // New York
    convert(34.0522, -118.2437), // Los Angeles
    convert(51.5074, -0.1278),   // London
    convert(48.8566, 2.3522),    // Paris
    convert(35.6895, 139.6917),  // Tokyo
    convert(31.2304, 121.4737),  // Shanghai
    convert(-33.8688, 151.2093), // Sydney
    convert(-23.5505, -46.6333), // Sao Paulo
    convert(30.0444, 31.2357),   // Cairo
    convert(-1.2921, 36.8219),   // Nairobi
  ]), []);

  // Minimal Elegant continent-to-continent connections (start/end as lat/lon converted)
  const elegantConnections = useMemo(() => {
    return [
      [ convert(-1.2921, 36.8219), convert(51.5074, -0.1278) ],   // Africa -> Europe
      [ convert(48.8566, 2.3522), convert(35.6895, 139.6917) ],   // Europe -> Asia
      [ convert(31.2304, 121.4737), convert(40.7128, -74.0060) ], // Asia -> North America
      [ convert(34.0522, -118.2437), convert(-23.5505, -46.6333) ], // NA -> SA
      [ convert(-23.5505, -46.6333), convert(-33.8688, 151.2093) ], // SA -> Oceania
      [ convert(-33.8688, 151.2093), convert(30.0444, 31.2357) ], // Oceania -> Africa
    ];
  }, []);

  // rotate globe
  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.08;
  });

  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[6, 6, 6]} intensity={1.2} />

      <OrbitControls enablePan={false} enableZoom={true} />

      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />

      {/* Earth */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial
          map={earthTexture}
          emissiveMap={nightTexture}
          emissive="#ffd27f"
          emissiveIntensity={1.5}
          roughness={0.6}
        />
      </mesh>

      {/* Minimal Elegant Connections (arced lines) */}
      {elegantConnections.map(([start, end], i) => {
        // compute elevated midpoint to form arc
        const mid = start.clone().lerp(end, 0.5);
        mid.setLength(2.6); // lift the midpoint outward (controls arc height)

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const curvePoints = curve.getPoints(120); // more points -> smoother curve

        return (
          <line key={`conn-${i}`}>
            <bufferGeometry setFromPoints={curvePoints} />
            <lineBasicMaterial
              color="#00eaff"
              transparent
              opacity={0.85}
              // linewidth is ignored in many browsers; for thick lines use fat lines / Line2 libs.
            />
          </line>
        );
      })}
    </>
  );
}

// ---------------------- Home Page ----------------------
function HomePage() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#0a0a0a' }}>
      <Canvas camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5] }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <color attach="background" args={['#0a0a0a']} />
        <Experience />
      </Canvas>

      {/* UI Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none', fontFamily: 'Times New Roman, serif'
      }}>
        {/* Resume Button Top Right */}
        <div style={{ position: 'absolute', top: '40px', right: '60px', pointerEvents: 'auto' }}>
          <a href="/resume" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'transparent', color: '#ffffff', padding: '14px 35px',
              borderRadius: '8px', fontWeight: 'bold', border: '1px solid #ffffff',
              fontSize: '15px', cursor: 'pointer', fontFamily: 'Times New Roman, serif',
              letterSpacing: '1.5px', transition: 'all 0.4s ease'
            }}
            onMouseOver={e => { e.target.style.background = '#ffffff'; e.target.style.color = '#000000'; e.target.style.transform = 'translateY(-2px)'; }}
            onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#ffffff'; e.target.style.transform = 'translateY(0)'; }}>
              VIEW RESUME
            </button>
          </a>
        </div>

        {/* Left side content */}
        <div style={{
          position: 'absolute', bottom: '80px', left: '60px', color: '#e0e0e0', pointerEvents: 'auto'
        }}>
          <h1 style={{ fontSize: '72px', fontWeight: 'normal', marginBottom: '10px', color: '#ffffff', letterSpacing: '2px' }}>
            NICOLE MUSARA
          </h1>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '25px', marginTop: '30px', alignItems: 'center' }}>
            <a href="https://www.linkedin.com/in/nicole-musara-362a60288/" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                   alt="LinkedIn" width="34"
                   style={{ filter: "drop-shadow(0 0 6px #0077B5)", transition: "0.3s ease" }}
                   onMouseOver={e => e.currentTarget.style.transform="scale(1.15)"}
                   onMouseOut={e => e.currentTarget.style.transform="scale(1)"}
              />
            </a>
            <a href="https://github.com/musaranicole" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                   alt="GitHub" width="34"
                   style={{ filter: "invert(1) drop-shadow(0 0 6px #ffffff)", transition: "0.3s ease" }}
                   onMouseOver={e => e.currentTarget.style.transform="scale(1.15)"}
                   onMouseOut={e => e.currentTarget.style.transform="scale(1)"}
              />
            </a>
            <a href="https://www.kaggle.com/nicolemusara" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/kaggle.svg" alt="Kaggle" width="34"
                   style={{ filter: "invert(1) sepia(1) saturate(10) hue-rotate(170deg) drop-shadow(0 0 6px #20BEFF)", transition: "0.3s ease" }}
                   onMouseOver={e => e.currentTarget.style.transform="scale(1.15)"}
                   onMouseOut={e => e.currentTarget.style.transform="scale(1)"}
              />
            </a>
            <a href="mailto:nicolemusara30@gmail.com">
              <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gmail.svg" alt="Email" width="34"
                   style={{ filter: "invert(1) sepia(1) saturate(10) hue-rotate(-10deg) drop-shadow(0 0 6px #EA4335)", transition: "0.3s ease" }}
                   onMouseOver={e => e.currentTarget.style.transform="scale(1.15)"}
                   onMouseOut={e => e.currentTarget.style.transform="scale(1)"}
              />
            </a>
          </div>

          <p style={{ fontSize: '20px', color: '#a0a0a0', marginBottom: '40px', fontStyle: 'italic' }}>
            Systems Engineer, FullStack Developer & Data Scientist
          </p>

          {/* View Work Button */}
          <button onClick={() => window.location.href = '/projects'}
                  style={{
                    backgroundColor: 'transparent', color: '#00d4ff', padding: '18px 45px',
                    borderRadius: '8px', fontWeight: 'bold', border: '2px solid #00d4ff',
                    fontSize: '18px', cursor: 'pointer', letterSpacing: '2px', marginBottom: '40px',
                    transition: 'all 0.4s ease'
                  }}
                  onMouseOver={e => { e.target.style.backgroundColor='#00d4ff'; e.target.style.color='#000'; e.target.style.transform='translateY(-3px)'; }}
                  onMouseOut={e => { e.target.style.backgroundColor='transparent'; e.target.style.color='#00d4ff'; e.target.style.transform='translateY(0)'; }}
          >
            EXPLORE MY WORK →
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------- Projects Page ----------------------
function ProjectsPage() {
  const projects = [
    {
      title: "AI CLUSTER",
      description: "High-performance computing cluster for AI research at ZCHPC",
      tech: ["JUPYTERHUB", "PYTHON", "DOCKER", "KUBERNETES", "GPU COMPUTING", "SLURM"],
      liveLink: "https://ai.zchpc.ac.zw",
      githubLink: "https://github.com/musaranicole/ai-cluster",
      images: [
        "/images/ai-cluster/cluster1.png",
        "/images/ai-cluster/cluster2.png",
        "/images/ai-cluster/cluster3.png"
      ]
    },
    {
      title: "SCHOOL WEBSITE",
      description: "Modern, responsive static website for educational institutions",
      tech: ["HTML5", "CSS3", "JAVASCRIPT", "RESPONSIVE DESIGN", "SEO OPTIMIZATION", "STATIC HOSTING"],
      liveLink: "https://dvc.co.zw",
      githubLink: "https://github.com/musaranicole/devine-visions",
      images: [
        "/images/devine-visions/dvc1.png",
        "/images/devine-visions/dvc2.png",
        "/images/devine-visions/dvc3.png"
      ]
    }
  ];

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      color: '#e0e0e0', fontFamily: 'Times New Roman, serif', padding: '40px'
    }}>
      <button onClick={() => window.history.back()}
              style={{
                background: 'transparent', color: '#00d4ff', border: '1px solid #00d4ff',
                padding: '12px 30px', fontSize: '14px', cursor: 'pointer', borderRadius: '8px',
                transition: 'all 0.3s ease', marginBottom: '40px'
              }}
              onMouseOver={e => { e.target.style.background='#00d4ff'; e.target.style.color='#000'; }}
              onMouseOut={e => { e.target.style.background='transparent'; e.target.style.color='#00d4ff'; }}
      >
        ← BACK TO HOME
      </button>

      <h1 style={{ fontSize:'3.5rem', marginBottom:'4rem', textAlign:'center', background:'linear-gradient(45deg, #00d4ff, #8b5cf6, #ec4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
        PROJECT PORTFOLIO
      </h1>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(500px, 1fr))', gap:'3rem' }}>
        {projects.map((project, idx) => (
          <div key={idx} style={{
            background:'rgba(255,255,255,0.05)', borderRadius:'25px', overflow:'hidden',
            border:'1px solid rgba(255,255,255,0.1)', transition:'all 0.4s ease', backdropFilter:'blur(15px)'
          }}
               onMouseOver={e => { e.currentTarget.style.transform='translateY(-10px)'; e.currentTarget.style.borderColor='rgba(0,212,255,0.3)'; e.currentTarget.style.boxShadow='0 20px 40px rgba(0,212,255,0.1)'; }}
               onMouseOut={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow='none'; }}
          >
            <div style={{ height:'280px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', background:'#1a1a1a' }}>
              <img src={project.images[0]} alt={project.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>e.target.style.display='none'} />
            </div>

            <div style={{ padding:'2.5rem' }}>
              <h2 style={{ fontSize:'1.8rem', marginBottom:'1rem', color:'#ffffff', fontWeight:'600' }}>{project.title}</h2>
              <p style={{ color:'#a0a0a0', marginBottom:'1.5rem', lineHeight:'1.7', fontSize:'1rem' }}>{project.description}</p>

              <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'2rem' }}>
                {project.tech.map((tech, tIdx) => (
                  <span key={tIdx} style={{
                    background:'rgba(0,212,255,0.1)', color:'#00d4ff', padding:'6px 12px', fontSize:'11px', fontWeight:'500',
                    borderRadius:'6px', border:'1px solid rgba(0,212,255,0.3)'
                  }}>{tech}</span>
                ))}
              </div>

              <div style={{ display:'flex', gap:'1rem' }}>
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" style={{
                  background:'#00d4ff', color:'#000', padding:'1rem 2rem', fontSize:'0.9rem',
                  textDecoration:'none', borderRadius:'12px', fontWeight:'600', flex:1, textAlign:'center', transition:'all 0.3s ease'
                }}
                   onMouseOver={e=>{ e.currentTarget.style.background='#fff'; e.currentTarget.style.transform='translateY(-2px)'; }}
                   onMouseOut={e=>{ e.currentTarget.style.background='#00d4ff'; e.currentTarget.style.transform='translateY(0)'; }}
                >
                  LIVE DEMO
                </a>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={{
                  background:'transparent', color:'#fff', border:'2px solid #fff', padding:'1rem 2rem',
                  fontSize:'0.9rem', textDecoration:'none', borderRadius:'12px', fontWeight:'600', flex:1, textAlign:'center', transition:'all 0.3s ease'
                }}
                   onMouseOver={e=>{ e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#000'; e.currentTarget.style.transform='translateY(-2px)'; }}
                   onMouseOut={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#fff'; e.currentTarget.style.transform='translateY(0)'; }}
                >
                  GITHUB
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResumePage() {
  // Path to your PDF in the public folder
  const resumePath = "/Nicole Musara- Systems Engineer Resume.pdf";

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#e0e0e0',
      fontFamily: 'Times New Roman, serif',
      padding: '60px 80px',
      position: 'relative'
    }}>
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        style={{
          position: 'absolute',
          top: '40px',
          left: '60px',
          background: 'transparent',
          color: '#00d4ff',
          border: '1px solid #00d4ff',
          padding: '12px 30px',
          fontSize: '14px',
          cursor: 'pointer',
          borderRadius: '8px',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => { e.target.style.background = '#00d4ff'; e.target.style.color = '#000'; }}
        onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#00d4ff'; }}
      >
        ← BACK TO HOME
      </button>

      {/* Download Button */}
      <a href={resumePath} download style={{ textDecoration: 'none' }}>
        <button style={{
          position: 'absolute',
          top: '40px',
          right: '60px',
          backgroundColor: '#00d4ff',
          color: '#000000',
          padding: '14px 35px',
          borderRadius: '8px',
          fontWeight: 'bold',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
          onMouseOver={(e) => { e.target.style.background = '#ffffff'; e.target.style.color = '#000'; e.target.style.transform = 'translateY(-2px)'; }}
          onMouseOut={(e) => { e.target.style.background = '#00d4ff'; e.target.style.color = '#000'; e.target.style.transform = 'translateY(0)'; }}
        >
          DOWNLOAD RESUME
        </button>
      </a>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #00d4ff, #8b5cf6, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          NICOLE MUSARA
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#a0a0a0', marginTop: '5px' }}>
          Systems Engineer
        </p>
      </div>

      {/* Resume Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '1.6' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', marginBottom: '10px' }}>PROFILE</h2>
        <p>
          Results-oriented IT professional with expertise in High Performance Computing, Cloud Infrastructure, and Network Systems, currently serving as a Systems Engineer and Business Development Officer at ZCHPC. I play a key role in HPC cloud deployment, infrastructure optimization, and capacity expansion initiatives, while driving client acquisition, onboarding, and technical solution alignment.
        </p>
        <p>
          I am deeply passionate about architecting advanced computing environments that power AI research, scientific computing, and data-intensive enterprise applications. My strength lies in combining technical execution with strategic thinking, delivering reliable systems, improving operational efficiency, and enabling technology adoption across institutions. Known for strong analytical abilities, effective communication, and the ability to drive complex technical projects from concept to deployment.
        </p>

        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', marginBottom: '10px' }}>EXPERIENCE</h2>

        <h3 style={{ fontWeight: 'bold' }}>SYSTEMS ENGINEER & BUSINESS DEVELOPMENT OFFICER</h3>
        <p>ZIMBABWE CENTRE FOR HIGH PERFORMANCE COMPUTING (ZCHPC) | NOVEMBER 2025-PRESENT | HARARE, ZIMBABWE</p>
        <ul>
          <li>Design, deploy, and manage HPC and cloud infrastructure supporting AI training, scientific research, and enterprise workloads.</li>
          <li>Configure and administer Linux-based server and cluster environments, ensuring high availability, performance, and system resilience.</li>
          <li>Implement and support virtualization, containerization, and resource management platforms for scalable computing services.</li>
          <li>Monitor system performance, storage, and network health, performing optimization and proactive troubleshooting to minimize downtime.</li>
          <li>Contribute to HPC capacity planning, infrastructure expansion, and system architecture improvements.</li>
          <li>Lead and support client engagement, onboarding, and solution mapping, translating user requirements into tailored HPC and cloud solutions.</li>
          <li>Provide technical pre-sales support, service demonstrations, and post-deployment consultation for institutional and enterprise partners.</li>
          <li>Develop and maintain comprehensive technical documentation, SOPs, and infrastructure guidelines.</li>
          <li>Support cybersecurity and access control implementation within the HPC environment.</li>
        </ul>

        <h3 style={{ fontWeight: 'bold' }}>RESIDENT INNOVATOR</h3>
        <p>ZIMBABWE CENTRE FOR HIGH PERFORMANCE COMPUTING (ZCHPC) | JULY 2025 – OCTOBER 2025 | HARARE, ZIMBABWE</p>
        <ul>
          <li>Supported the configuration, installation, and optimization of HPC servers and Linux systems within the national supercomputing environment.</li>
          <li>Assisted in deploying and testing elements of the HPC Cloud infrastructure, gaining hands-on experience in cluster architecture and system operations.</li>
          <li>Conducted system monitoring, issue diagnosis, and performance tuning to improve service reliability and uptime.</li>
          <li>Participated in developing system documentation, deployment procedures, and technical guidelines for Phase I & Phase II HPC infrastructure.</li>
          <li>Worked closely with senior engineers and architects to implement best practices in high performance systems administration and operations.</li>
          <li>Strengthened technical capabilities in enterprise infrastructure management, supercomputing technologies, and large-scale IT environments.</li>
        </ul>

        <h3 style={{ fontWeight: 'bold' }}>IT TECHNICIAN</h3>
        <p>WILDTECH SOLUTION | SEPTEMBER 2023 – AUGUST 2024 | HARARE, ZIMBABWE</p>
        <ul>
          <li>Delivered technical support across hardware, software, network, and systems environments for diverse clients in retail and pharmaceutical sectors.</li>
          <li>Performed system and server checks, security updates, and patching to enhance infrastructure reliability and cybersecurity posture.</li>
          <li>Assisted with server deployments, workstation configuration, and system troubleshooting, improving operational efficiency for clients.</li>
          <li>Diagnosed and resolved LAN/WAN connectivity issues, minimizing downtime and restoring critical network services.</li>
          <li>Participated in backup operations and disaster recovery testing, strengthening business continuity readiness.</li>
          <li>Maintained detailed incident logs and contributed to a technical knowledge base, improving service desk response times and resolution quality.</li>
          <li>Provided professional end-user support, improving customer satisfaction and long-term client relationships.</li>
        </ul>

        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', marginBottom: '10px' }}>EDUCATION</h2>
        <ul>
          <li>Bachelor of Science Honors Degree in Information, Chinhoyi University of Technology (Merit: 2.1: B+) 2021-2025</li>
          <li>Master of Technology Degree in Data Science and Analytics, Harare Institute of Technology, August 2025-Present</li>
          <li>Cambridge Ordinary Level & Advanced Level</li>
        </ul>

        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', marginBottom: '10px' }}>SKILLS</h2>
        <ul>
          <li>Linux Server Administration (Ubuntu, CentOS), Windows Server</li>
          <li>HPC & AI Cluster Development and Management</li>
          <li>Virtualization (VMware, Hyper-V, Proxmox)</li>
          <li>Microsoft Azure | AWS (Exposure)</li>
          <li>Docker | Kubernetes</li>
          <li>TCP/IP | LAN/WAN | DHCP | DNS</li>
          <li>Network Troubleshooting</li>
          <li>Firewall & VPN | Cybersecurity Fundamentals</li>
          <li>Backup & Disaster Recovery</li>
          <li>Python | Bash Scripting | R</li>
          <li>SQL (MySQL, SQL Server, PostgreSQL) | NoSQL (MongoDB, Cassandra)</li>
          <li>Data Analytics & Visualization (Pandas, NumPy, Matplotlib, Power BI, Tableau)</li>
          <li>Machine Learning & AI Workflows (scikit-learn, TensorFlow basics)</li>
          <li>System Monitoring & Performance Optimization</li>
          <li>Hardware & Systems Troubleshooting</li>
        </ul>

        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', marginBottom: '10px' }}>AWARDS</h2>
        <ul>
          <li>EC-Council Certified Cybersecurity Technician (C|CT)</li>
        </ul>

        <h2 style={{ fontSize: '1.8rem', color: '#00d4ff', marginBottom: '10px' }}>REFERENCES</h2>
        <ul>
          <li>Mitchell Ringoziwa – Helpdesk Administrator, WildTech Solutions, mringoziwa@wts.co.zw, +263 78 956 6715</li>
          <li>Raymond Zenda – Deputy Director, Applications, ZCHPC, +263 77 635 8507</li>
          <li>Marvellous Tshuma – Lecturer, Chinhoyi University of Technology, +263 78 409 9584</li>
        </ul>
      </div>
    </div>
  );
}

// ---------------------- Main App ----------------------
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </Router>
  );
}

export default App;


