import React, { useState, useEffect } from 'react';
import './App.css';

interface Section {
  id: string;
  title: string;
  active: boolean;
}

const NODE_ORDER = [
  'node-react', 'node-nodejs', 'node-aws', 'node-docker', 'node-kubernetes',
  'node-python', 'node-microservices', 'node-cicd', 'node-leadership',
  'node-architecture', 'node-devops', 'node-analytics', 'node-scalability',
  'node-apis', 'node-postgresql'
];

function App() {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [sections] = useState<Section[]>([
    { id: 'about', title: 'About', active: true },
    { id: 'projects', title: 'Projects', active: false },
    { id: 'skills', title: 'Skills', active: false },
    { id: 'contact', title: 'Contact', active: false }
  ]);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [neuralNetworkLoaded, setNeuralNetworkLoaded] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState<string[]>([]);

  const textsToType = [
    "Building scalable systems and guiding technical teams",
    "Full-stack developer with a passion for system architecture and team leadership.",
    "Currently scaling technology as CTO while staying hands-on with code."
  ];



  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  // Simple mouse tracking for subtle effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Staggered node appearance
  useEffect(() => {
    let currentIndex = 0;
    
    const addNode = () => {
      if (currentIndex < NODE_ORDER.length) {
        setVisibleNodes(prev => [...prev, NODE_ORDER[currentIndex]]);
        currentIndex++;
      }
    };

    // Start neural network loading immediately on page load
    setNeuralNetworkLoaded(true);
    
    // Add first node almost immediately
    const firstNodeTimer = setTimeout(() => {
      addNode();
    }, 100);
    
    // Add remaining nodes every 2 seconds starting from 2.1 seconds
    const subsequentTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < NODE_ORDER.length) {
          addNode();
        } else {
          clearInterval(interval);
        }
      }, 2000);

      return () => clearInterval(interval);
    }, 2100);

    return () => {
      clearTimeout(firstNodeTimer);
      clearTimeout(subsequentTimer);
    };
  }, []); // Remove dependency to prevent re-runs

  // Neural Network connections management
  useEffect(() => {
    const createConnections = () => {
      const svg = document.querySelector('.network-connections-svg');
      if (!svg) return;

      // Clear existing connections
      const existingLines = svg.querySelectorAll('.dynamic-connection');
      existingLines.forEach(line => line.remove());

      // Only create connections for visible nodes
      const visibleNodeElements = document.querySelectorAll('.network-node.visible');
      
      visibleNodeElements.forEach(node => {
        const connections = (node as HTMLElement).dataset.connections?.split(',') || [];
        
        connections.forEach(targetClass => {
          const targetNode = document.querySelector(`.${targetClass.trim()}.visible`);
          if (targetNode) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.classList.add('dynamic-connection');
            
            // Get node positions
            const nodeRect = node.getBoundingClientRect();
            const targetRect = targetNode.getBoundingClientRect();
            const svgRect = svg.getBoundingClientRect();
            
            // Calculate relative positions within SVG
            const x1 = ((nodeRect.left + nodeRect.width / 2 - svgRect.left) / svgRect.width) * 100;
            const y1 = ((nodeRect.top + nodeRect.height / 2 - svgRect.top) / svgRect.height) * 100;
            const x2 = ((targetRect.left + targetRect.width / 2 - svgRect.left) / svgRect.width) * 100;
            const y2 = ((targetRect.top + targetRect.height / 2 - svgRect.top) / svgRect.height) * 100;
            
            line.setAttribute('x1', `${x1}%`);
            line.setAttribute('y1', `${y1}%`);
            line.setAttribute('x2', `${x2}%`);
            line.setAttribute('y2', `${y2}%`);
            line.setAttribute('stroke', 'url(#connectionGradient)');
            line.setAttribute('stroke-width', '0.1');
            line.setAttribute('stroke-dasharray', '2,4');
            line.classList.add('connection-flow');
            
            svg.appendChild(line);
          }
        });
      });
    };

    // Update connections when visible nodes change
    if (visibleNodes.length > 0) {
      const timer = setTimeout(createConnections, 500);
      const interval = setInterval(createConnections, 3000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [visibleNodes]);

  // Typewriter effect
  useEffect(() => {
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let completedTexts: string[] = [];
    let timeoutId: NodeJS.Timeout;

    const typeText = () => {
      const currentText = textsToType[currentTextIndex];
      
      if (currentCharIndex <= currentText.length) {
        const displayText = completedTexts.join('\n\n') + 
          (completedTexts.length > 0 ? '\n\n' : '') + 
          currentText.substring(0, currentCharIndex);
        setTypedText(displayText);
        currentCharIndex++;
        timeoutId = setTimeout(typeText, 50); // Typing speed
      } else {
        // Finished typing current text
        completedTexts.push(currentText);
        currentTextIndex++;
        currentCharIndex = 0;
        
        if (currentTextIndex < textsToType.length) {
          timeoutId = setTimeout(typeText, 800); // Pause between sentences
        } else {
          setIsTyping(false); // Finished all texts
        }
      }
    };

    const initialTimer = setTimeout(() => {
      typeText();
    }, 1000); // Delay before starting to type

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
      <div className="App">
      {/* Neural Network Background - Full Page */}
      <div className={`neural-network-fullpage ${neuralNetworkLoaded ? 'loaded' : ''}`}>
        {/* Render only visible nodes */}
        {visibleNodes.includes('node-react') && (
          <div className="network-node node-react visible" data-connections="node-nodejs,node-apis,node-cicd">React</div>
        )}
        {visibleNodes.includes('node-nodejs') && (
          <div className="network-node node-nodejs visible" data-connections="node-react,node-postgresql,node-apis">Node.js</div>
        )}
        {visibleNodes.includes('node-aws') && (
          <div className="network-node node-aws visible" data-connections="node-docker,node-kubernetes,node-devops">AWS</div>
        )}
        {visibleNodes.includes('node-docker') && (
          <div className="network-node node-docker visible" data-connections="node-aws,node-kubernetes,node-cicd">Docker</div>
        )}
        {visibleNodes.includes('node-kubernetes') && (
          <div className="network-node node-kubernetes visible" data-connections="node-aws,node-docker,node-devops">K8s</div>
        )}
        {visibleNodes.includes('node-python') && (
          <div className="network-node node-python visible" data-connections="node-analytics,node-postgresql,node-apis">Python</div>
        )}
        {visibleNodes.includes('node-microservices') && (
          <div className="network-node node-microservices visible" data-connections="node-architecture,node-apis,node-scalability">Microservices</div>
        )}
        {visibleNodes.includes('node-cicd') && (
          <div className="network-node node-cicd visible" data-connections="node-react,node-docker,node-devops">CI/CD</div>
        )}
        {visibleNodes.includes('node-leadership') && (
          <div className="network-node node-leadership visible" data-connections="node-architecture,node-devops,node-scalability">Leadership</div>
        )}
        {visibleNodes.includes('node-architecture') && (
          <div className="network-node node-architecture visible" data-connections="node-microservices,node-leadership,node-scalability">Architecture</div>
        )}
        {visibleNodes.includes('node-devops') && (
          <div className="network-node node-devops visible" data-connections="node-aws,node-kubernetes,node-cicd">DevOps</div>
        )}
        {visibleNodes.includes('node-analytics') && (
          <div className="network-node node-analytics visible" data-connections="node-python,node-postgresql,node-scalability">Analytics</div>
        )}
        {visibleNodes.includes('node-scalability') && (
          <div className="network-node node-scalability visible" data-connections="node-microservices,node-architecture,node-analytics">Scalability</div>
        )}
        {visibleNodes.includes('node-apis') && (
          <div className="network-node node-apis visible" data-connections="node-react,node-nodejs,node-python">APIs</div>
        )}
        {visibleNodes.includes('node-postgresql') && (
          <div className="network-node node-postgresql visible" data-connections="node-nodejs,node-python,node-analytics">PostgreSQL</div>
        )}
        
        <svg className="network-connections-svg">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: 'rgba(0, 217, 255, 0.1)', stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: 'rgba(0, 217, 255, 0.4)', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: 'rgba(0, 217, 255, 0.1)', stopOpacity: 1}} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Simple Cursor Effect */}
      <div 
        className="cursor-glow"
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      />

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <div className="brand-logo">
            <div className="logo-icon">⚡</div>
            <h2>Tech Leadership</h2>
          </div>
        </div>
        <ul className="nav-links">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => handleSectionChange(section.id)}
              >
                <span className="nav-text">{section.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section - Always Visible */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-avatar">
              <div className="avatar-container">
                <div className="avatar-image">
                  <img src="/avatar.png" alt="Avatar" className="avatar-photo" />
                </div>
                <div className="avatar-ring"></div>
                <div className="tech-orbit">
                  <div className="tech-icon tech-1">⚛️</div>
                  <div className="tech-icon tech-2">🐍</div>
                  <div className="tech-icon tech-3">🔧</div>
                  <div className="tech-icon tech-4">☁️</div>
                </div>
              </div>
            </div>
            
            <h1 className="hero-title">Software Engineer & Tech Lead</h1>
            <div className="hero-description">
              <p className="typewriter-text">
                {typedText}
                {isTyping && <span className="cursor">|</span>}
              </p>
            </div>
          </div>
        </section>

        {/* Tabbed Content Area */}
        <div className="content-sections">

        {/* About Section */}
        <section id="about" className={`portfolio-section about-section ${activeSection === 'about' ? 'active' : ''}`}>
          <div className="section-content">
            <h2>About Me</h2>
            <div className="about-grid">
              <div className="about-text">
                <div className="personal-intro">
                  <div className="intro-image">
                    <div className="profile-card">
                      <div className="profile-image">
                        <div className="profile-placeholder">🧑‍💼</div>
                      </div>
                      <div className="profile-info">
                        <h4>28 years old</h4>
                        <p>📍 Based in [Your City]</p>
                        <p>🎯 CTO at Growing Startup</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="intro-text">
                    <p>I'm a 28-year-old software engineer and CTO leading technical strategy at a growing company. I bridge the gap between hands-on development and strategic technology leadership.</p>
                    <p>My experience spans system design, architecture planning, and full-stack development. I believe in building robust, scalable solutions while fostering a culture of technical excellence and continuous learning.</p>
                    <p>When I'm not architecting systems or coding, I'm mentoring developers, optimizing CI/CD pipelines, and staying current with emerging technologies that can drive business value.</p>
                  </div>
                </div>
                
                {/* Tech Stack Visual */}
                <div className="tech-stack-visual">
                  <h4>Current Tech Stack</h4>
                  <div className="tech-icons-grid">
                    <div className="tech-item">
                      <div className="tech-logo">⚛️</div>
                      <span>React</span>
                    </div>
                    <div className="tech-item">
                      <div className="tech-logo">📦</div>
                      <span>Node.js</span>
                    </div>
                    <div className="tech-item">
                      <div className="tech-logo">🐍</div>
                      <span>Python</span>
                    </div>
                    <div className="tech-item">
                      <div className="tech-logo">🐳</div>
                      <span>Docker</span>
                    </div>
                    <div className="tech-item">
                      <div className="tech-logo">☁️</div>
                      <span>AWS</span>
                    </div>
                    <div className="tech-item">
                      <div className="tech-logo">🔧</div>
                      <span>K8s</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-icon">🚀</div>
                  <h3>5+</h3>
                  <p>Years Engineering</p>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">👨‍💼</div>
                  <h3>2+</h3>
                  <p>Years CTO Experience</p>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">🏗️</div>
                  <h3>20+</h3>
                  <p>Systems Architected</p>
                </div>
                
                {/* Company/Achievement Badges */}
                <div className="achievement-badges">
                  <div className="badge">
                    <div className="badge-icon">🎖️</div>
                    <span>AWS Certified</span>
                  </div>
                  <div className="badge">
                    <div className="badge-icon">🥇</div>
                    <span>Startup CTO</span>
                  </div>
                  <div className="badge">
                    <div className="badge-icon">📈</div>
                    <span>Scale Expert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`portfolio-section projects-section ${activeSection === 'projects' ? 'active' : ''}`}>
          <div className="section-content">
            <h2>Key Projects & Achievements</h2>
            <div className="projects-grid">
              <div className="project-card">
                <div className="project-image">
                  <div className="project-mockup">
                    <div className="mockup-screen">
                      <div className="mockup-header">
                        <div className="mockup-dots">
                          <span></span><span></span><span></span>
                        </div>
                        <div className="mockup-title">Microservices Dashboard</div>
                      </div>
                      <div className="mockup-content">
                        <div className="mockup-sidebar">
                          <div className="service-item active">🎯 API Gateway</div>
                          <div className="service-item">👤 Auth Service</div>
                          <div className="service-item">💳 Payment Service</div>
                          <div className="service-item">📊 Analytics</div>
                        </div>
                        <div className="mockup-main">
                          <div className="metrics-grid">
                            <div className="metric-card">
                              <div className="metric-value">99.9%</div>
                              <div className="metric-label">Uptime</div>
                            </div>
                            <div className="metric-card">
                              <div className="metric-value">2.3s</div>
                              <div className="metric-label">Response</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="project-social">
                    <a href="https://github.com/yourproject" target="_blank" rel="noopener noreferrer" className="project-link">
                      <span>💻</span>
                    </a>
                    <a href="https://demo.yourproject.com" target="_blank" rel="noopener noreferrer" className="project-link">
                      <span>🚀</span>
                    </a>
                  </div>
                </div>
                <h3>Microservices Architecture Migration</h3>
                <p>Led the migration from monolith to microservices architecture, improving system scalability by 300% and reducing deployment time from hours to minutes.</p>
                <div className="project-tech">
                  <span>Docker</span>
                  <span>Kubernetes</span>
                  <span>AWS</span>
                  <span>Node.js</span>
                </div>
                <div className="project-metrics">
                  <div className="metric">
                    <span className="metric-icon">⚡</span>
                    <span>300% faster</span>
                  </div>
                  <div className="metric">
                    <span className="metric-icon">👥</span>
                    <span>10+ devs impacted</span>
                  </div>
                </div>
              </div>
              
              <div className="project-card">
                <div className="project-image">
                  <div className="project-mockup">
                    <div className="ci-cd-flow">
                      <div className="flow-step">
                        <div className="step-icon">📝</div>
                        <div className="step-label">Code</div>
                      </div>
                      <div className="flow-arrow">→</div>
                      <div className="flow-step active">
                        <div className="step-icon">🔍</div>
                        <div className="step-label">Test</div>
                      </div>
                      <div className="flow-arrow">→</div>
                      <div className="flow-step">
                        <div className="step-icon">🚀</div>
                        <div className="step-label">Deploy</div>
                      </div>
                    </div>
                  </div>
                  <div className="project-social">
                    <a href="https://github.com/yourproject" target="_blank" rel="noopener noreferrer" className="project-link">
                      <span>💻</span>
                    </a>
                    <a href="https://blog.com/ci-cd-story" target="_blank" rel="noopener noreferrer" className="project-link">
                      <span>📝</span>
                    </a>
                  </div>
                </div>
                <h3>CI/CD Pipeline Optimization</h3>
                <p>Designed and implemented automated deployment pipelines that reduced release cycles from weekly to daily, with zero-downtime deployments and automated rollbacks.</p>
                <div className="project-tech">
                  <span>GitHub Actions</span>
                  <span>Jenkins</span>
                  <span>Terraform</span>
                  <span>AWS ECS</span>
                </div>
                <div className="project-metrics">
                  <div className="metric">
                    <span className="metric-icon">📈</span>
                    <span>7x faster releases</span>
                  </div>
                  <div className="metric">
                    <span className="metric-icon">🎯</span>
                    <span>99.9% uptime</span>
                  </div>
                </div>
              </div>
              
              <div className="project-card">
                <div className="project-image">
                  <div className="project-mockup">
                    <div className="analytics-dashboard">
                      <div className="dashboard-header">
                        <h4>Real-time Analytics</h4>
                        <div className="live-indicator">🔴 LIVE</div>
                      </div>
                      <div className="dashboard-charts">
                        <div className="chart-container">
                          <div className="chart-bars">
                            <div className="bar" style={{height: '60%'}}></div>
                            <div className="bar" style={{height: '80%'}}></div>
                            <div className="bar" style={{height: '100%'}}></div>
                            <div className="bar" style={{height: '70%'}}></div>
                            <div className="bar" style={{height: '90%'}}></div>
                          </div>
                        </div>
                        <div className="events-counter">
                          <div className="counter-value">10,247,891</div>
                          <div className="counter-label">Events Today</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="project-social">
                    <a href="https://github.com/yourproject" target="_blank" rel="noopener noreferrer" className="project-link">
                      <span>💻</span>
                    </a>
                    <a href="https://analytics-demo.com" target="_blank" rel="noopener noreferrer" className="project-link">
                      <span>📊</span>
                    </a>
                  </div>
                </div>
                <h3>Real-time Analytics Platform</h3>
                <p>Built a distributed analytics platform processing 10M+ events daily, enabling real-time business intelligence and automated decision-making capabilities.</p>
                <div className="project-tech">
                  <span>Apache Kafka</span>
                  <span>Redis</span>
                  <span>PostgreSQL</span>
                  <span>React</span>
                </div>
                <div className="project-metrics">
                  <div className="metric">
                    <span className="metric-icon">🔥</span>
                    <span>10M+ events/day</span>
                  </div>
                  <div className="metric">
                    <span className="metric-icon">💡</span>
                    <span>Real-time insights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`portfolio-section skills-section ${activeSection === 'skills' ? 'active' : ''}`}>
          <div className="section-content">
            <h2>Technical Expertise</h2>
            
            {/* Technology Logos Section */}
            <div className="tech-showcase">
              <h3>Technologies I Work With</h3>
              <div className="tech-logos-grid">
                <div className="tech-logo-item">
                  <div className="tech-visual">⚛️</div>
                  <span>React</span>
                </div>
                <div className="tech-logo-item">
                  <div className="tech-visual">📦</div>
                  <span>Node.js</span>
                </div>
                <div className="tech-logo-item">
                  <div className="tech-visual">🐍</div>
                  <span>Python</span>
                </div>
                <div className="tech-logo-item">
                  <div className="tech-visual">🐳</div>
                  <span>Docker</span>
                </div>
                <div className="tech-logo-item">
                  <div className="tech-visual">☁️</div>
                  <span>AWS</span>
                </div>
                <div className="tech-logo-item">
                  <div className="tech-visual">🔧</div>
                  <span>Kubernetes</span>
                </div>
                <div className="tech-logo-item">
                  <div className="tech-visual">🗄️</div>
                  <span>PostgreSQL</span>
                </div>
                <div className="tech-logo-item">
                  <div className="tech-visual">📊</div>
                  <span>Redis</span>
                </div>
              </div>
            </div>
            
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Architecture & Design</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <span className="skill-name">System Architecture</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Microservices Design</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Database Design</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '88%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Development Stack</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <span className="skill-name">Node.js / JavaScript</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">React / TypeScript</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '88%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Python / Go</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '82%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>DevOps & Infrastructure</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <span className="skill-name">AWS / Cloud Architecture</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Docker / Kubernetes</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">CI/CD Pipelines</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '93%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Leadership & Strategy</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <span className="skill-name">Technical Strategy</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '88%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Team Leadership</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Agile / Scrum</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '90%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`portfolio-section contact-section ${activeSection === 'contact' ? 'active' : ''}`}>
          <div className="section-content">
            <h2>Let's Build Something Great</h2>
            <div className="contact-grid">
              <div className="contact-info">
                <h3>Ready to Collaborate?</h3>
                <p>Whether you're looking for technical leadership, system architecture consultation, or hands-on development expertise, I'm always interested in challenging projects and innovative opportunities.</p>
                
                <div className="contact-methods">
                  <div className="contact-method">
                    <span className="contact-icon">📧</span>
                    <div>
                      <h4>Email</h4>
                      <p>your.email@example.com</p>
                    </div>
                  </div>
                  
                  <div className="contact-method">
                    <span className="contact-icon">💼</span>
                    <div>
                      <h4>LinkedIn</h4>
                      <p>linkedin.com/in/yourprofile</p>
                    </div>
                  </div>
                  
                  <div className="contact-method">
                    <span className="contact-icon">💻</span>
                    <div>
                      <h4>GitHub</h4>
                      <p>github.com/yourusername</p>
                    </div>
                  </div>
                  
                  <div className="contact-method">
                    <span className="contact-icon">📱</span>
                    <div>
                      <h4>Schedule a Call</h4>
                      <p>calendly.com/yourname</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="contact-form">
                <h3>Start a Conversation</h3>
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Your Email" required />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Company / Project" />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Tell me about your project or opportunity..." rows={5} required></textarea>
                  </div>
                  <button type="submit" className="submit-btn">Let's Connect</button>
                </form>
                
                {/* Quick Connect */}
                <div className="quick-connect">
                  <p>Or connect instantly:</p>
                  <div className="quick-links">
                    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="quick-link linkedin">
                      <span>💼</span>
                    </a>
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="quick-link github">
                      <span>💻</span>
                    </a>
                    <a href="mailto:your.email@example.com" className="quick-link email">
                      <span>📧</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
      </main>
      </div>
  );
}

export default App;
