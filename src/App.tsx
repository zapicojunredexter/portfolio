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

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <h2>Your Portfolio</h2>
        </div>
        <ul className="nav-links">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => handleSectionChange(section.id)}
                onMouseEnter={() => handleSectionChange(section.id)}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className={`hero-section ${activeSection === 'about' ? 'active' : ''}`}>
          <div className="hero-content">
            <h1 className="hero-title">Hello, I'm [Your Name]</h1>
            <p className="hero-subtitle">A passionate developer creating amazing digital experiences</p>
            <div className="hero-description">
              <p>Welcome to my interactive portfolio! Explore my work through the sections above.</p>
              <p>Each section reveals a different aspect of my journey as a developer.</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`portfolio-section about-section ${activeSection === 'about' ? 'active' : ''}`}>
          <div className="section-content">
            <h2>About Me</h2>
            <div className="about-grid">
              <div className="about-text">
                <p>I'm a creative developer with a passion for building interactive and engaging web experiences. I love combining technical skills with artistic vision to create something truly special.</p>
                <p>When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or creating digital art.</p>
              </div>
              <div className="about-stats">
                <div className="stat-item">
                  <h3>3+</h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat-item">
                  <h3>50+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat-item">
                  <h3>10+</h3>
                  <p>Technologies Mastered</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`portfolio-section projects-section ${activeSection === 'projects' ? 'active' : ''}`}>
          <div className="section-content">
            <h2>My Projects</h2>
            <div className="projects-grid">
              <div className="project-card">
                <div className="project-image">
                  <div className="placeholder-image">🎮</div>
                </div>
                <h3>Interactive Game Platform</h3>
                <p>A multiplayer gaming platform built with React and Node.js featuring real-time gameplay and chat.</p>
                <div className="project-tech">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>Socket.io</span>
                </div>
              </div>
              
              <div className="project-card">
                <div className="project-image">
                  <div className="placeholder-image">📱</div>
                </div>
                <h3>Mobile-First E-commerce</h3>
                <p>A responsive e-commerce application with advanced filtering, payment integration, and admin dashboard.</p>
                <div className="project-tech">
                  <span>Next.js</span>
                  <span>TypeScript</span>
                  <span>Stripe</span>
                </div>
              </div>
              
              <div className="project-card">
                <div className="project-image">
                  <div className="placeholder-image">🎨</div>
                </div>
                <h3>Creative Portfolio Site</h3>
                <p>An interactive portfolio featuring animated characters and immersive user experiences.</p>
                <div className="project-tech">
                  <span>React</span>
                  <span>CSS Animations</span>
                  <span>SVG</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`portfolio-section skills-section ${activeSection === 'skills' ? 'active' : ''}`}>
          <div className="section-content">
            <h2>Skills & Technologies</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Frontend</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <span className="skill-name">React</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">TypeScript</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">CSS/SCSS</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '88%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Backend</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <span className="skill-name">Node.js</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '80%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Python</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">PostgreSQL</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '70%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Tools & Design</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <span className="skill-name">Git</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Figma</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Docker</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{width: '65%'}}></div>
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
            <h2>Let's Connect</h2>
            <div className="contact-grid">
              <div className="contact-info">
                <h3>Get in Touch</h3>
                <p>I'm always interested in new opportunities and collaborations. Feel free to reach out!</p>
                
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
                </div>
              </div>
              
              <div className="contact-form">
                <h3>Send a Message</h3>
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Your Email" required />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Your Message" rows={5} required></textarea>
                  </div>
                  <button type="submit" className="submit-btn">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
