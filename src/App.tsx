import React, { useState, useEffect } from 'react';
import './App.css';

interface Section {
  id: string;
  title: string;
  active: boolean;
}

function App() {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [sections] = useState<Section[]>([
    { id: 'about', title: 'About', active: true },
    { id: 'projects', title: 'Projects', active: false },
    { id: 'skills', title: 'Skills', active: false },
    { id: 'contact', title: 'Contact', active: false }
  ]);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  return (
    <div className="App">
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
          <h2>Tech Leadership</h2>
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
            <h1 className="hero-title">Software Engineer & Tech Lead</h1>
            <p className="hero-subtitle">Building scalable systems and guiding technical teams</p>
            <div className="hero-description">
              <p className="fade-in-text">Full-stack developer with a passion for system architecture and team leadership.</p>
              <p className="fade-in-text delay-1">Currently scaling technology as CTO while staying hands-on with code.</p>
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
                <p>I'm a 28-year-old software engineer and CTO leading technical strategy at a growing company. I bridge the gap between hands-on development and strategic technology leadership.</p>
                <p>My experience spans system design, architecture planning, and full-stack development. I believe in building robust, scalable solutions while fostering a culture of technical excellence and continuous learning.</p>
                <p>When I'm not architecting systems or coding, I'm mentoring developers, optimizing CI/CD pipelines, and staying current with emerging technologies that can drive business value.</p>
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
                  <div className="placeholder-image">🏗️</div>
                </div>
                <h3>Microservices Architecture Migration</h3>
                <p>Led the migration from monolith to microservices architecture, improving system scalability by 300% and reducing deployment time from hours to minutes.</p>
                <div className="project-tech">
                  <span>Docker</span>
                  <span>Kubernetes</span>
                  <span>AWS</span>
                  <span>Node.js</span>
                </div>
              </div>
              
              <div className="project-card">
                <div className="project-image">
                  <div className="placeholder-image">⚡</div>
                </div>
                <h3>CI/CD Pipeline Optimization</h3>
                <p>Designed and implemented automated deployment pipelines that reduced release cycles from weekly to daily, with zero-downtime deployments and automated rollbacks.</p>
                <div className="project-tech">
                  <span>GitHub Actions</span>
                  <span>Jenkins</span>
                  <span>Terraform</span>
                  <span>AWS ECS</span>
                </div>
              </div>
              
              <div className="project-card">
                <div className="project-image">
                  <div className="placeholder-image">📊</div>
                </div>
                <h3>Real-time Analytics Platform</h3>
                <p>Built a distributed analytics platform processing 10M+ events daily, enabling real-time business intelligence and automated decision-making capabilities.</p>
                <div className="project-tech">
                  <span>Apache Kafka</span>
                  <span>Redis</span>
                  <span>PostgreSQL</span>
                  <span>React</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`portfolio-section skills-section ${activeSection === 'skills' ? 'active' : ''}`}>
          <div className="section-content">
            <h2>Technical Expertise</h2>
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
