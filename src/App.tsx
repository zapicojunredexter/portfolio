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
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const [scrollProgress, setScrollProgress] = useState<number>(0);

  
  // Contact form submission handler
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple success message for now
    alert(`Thanks ${name}! Your message about "${subject}" has been received. I'll get back to you at ${email} soon!`);
    
    // Reset form
    e.currentTarget.reset();
  };


  const textsToType = [
    "Building scalable systems and guiding technical teams",
    "Full-stack developer with a passion for system architecture and team leadership.",
    "Currently scaling technology as CTO while staying hands-on with code."
  ];



  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  // Mouse tracking and scroll-based 3D animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = (): void => {
      const scrollTop: number = window.pageYOffset;
      const docHeight: number = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent: number = scrollTop / docHeight;
      
      setScrollProgress(scrollPercent);
      

    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);





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

  // Calculate game elements based on scroll
      const worldOffset = scrollProgress * -12000; // Background moves across 7 sections including contact form
  const characterJump = Math.sin(scrollProgress * 20) * 5; // Bouncing effect
  const isRunning = scrollProgress > 0;
  


  return (
      <div className="App">
        {/* Scroll Progress Bar */}
        <div className="scroll-progress-bar">
          <div 
            className="scroll-progress-fill" 
            style={{ width: `${scrollProgress * 100}%` }}
          ></div>
        </div>
        
             {/* Mario-style Game Scene */}
       <div className="mario-game-scene">
                  {/* Forest Parallax Background Layers */}
         <div className="parallax-layer sky-layer" style={{ transform: `translateX(${worldOffset * 0.05}px)` }}>
           <img src={`${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_sky.png`} alt="Sky" className="forest-sky" />
           <img src={`${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_sun.png`} alt="Sun" className="forest-sun" />
         </div>
         
         <div className="parallax-layer clouds-layer" style={{ transform: `translateX(${worldOffset * 0.1}px)` }}>
           <div className="forest-clouds" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_clouds.png)` }}></div>
         </div>
         
         <div className="parallax-layer mountains-layer-3" style={{ transform: `translateX(${worldOffset * 0.2}px)` }}>
           <div className="forest-mountains-3" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_mountains_3.png)` }}></div>
         </div>
         
         <div className="parallax-layer mountains-layer-2" style={{ transform: `translateX(${worldOffset * 0.3}px)` }}>
           <div className="forest-mountains-2" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_mountains_2.png)` }}></div>
         </div>
         
         <div className="parallax-layer mountains-layer-1" style={{ transform: `translateX(${worldOffset * 0.4}px)` }}>
           <div className="forest-mountains-1" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_mountains_1.png)` }}></div>
         </div>
         
         <div className="parallax-layer trees-layer" style={{ transform: `translateX(${worldOffset * 0.6}px)` }}>
           <div className="forest-trees" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_trees.png)` }}></div>
         </div>
         
         <div className="parallax-layer rocks-layer" style={{ transform: `translateX(${worldOffset * 0.8}px)` }}>
           <div className="forest-rocks" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_rocks.png)` }}></div>
         </div>
              
         <div className="parallax-layer ground-layer" style={{ transform: `translateX(${worldOffset}px)` }}>
           {/* Portfolio Content Cards - standing cardboard style */}
           
           {/* Welcome/Instructions Card */}
           <div className="content-card welcome-card">
             <h3>🌟 Welcome to My Journey</h3>
             <p><strong>How to navigate:</strong></p>
             <p>• Scroll to explore my forest portfolio</p>
             <p>• Each section reveals my story</p>
             <p>• Discover my skills, projects & passion</p>
             <p><em>Let the adventure begin!</em></p>
           </div>
           
           {/* About Me Card - Enhanced */}
           <div className="content-card about-card">
             <h3>👨‍💻 About Me</h3>
             <p><strong>Full-Stack Developer & Tech Leader</strong></p>
             <p>🎯 5+ years building scalable solutions</p>
             <p>🚀 Passionate about clean code & innovation</p>
             <p>🌱 Always learning cutting-edge technologies</p>
             <p>🎨 Love creating user-centered experiences</p>
             <p><em>"Code is poetry in motion"</em></p>
           </div>
            
           {/* Projects Card - Enhanced */}
           <div className="content-card projects-card">
             <h3>🛠️ Featured Projects</h3>
             <div><strong>🛒 E-Commerce Platform</strong></div>
             <div>→ React, Node.js, PostgreSQL</div>
             <div>→ 50K+ users, 99.9% uptime</div>
             <div><strong>🤖 AI Analytics Dashboard</strong></div>
             <div>→ Python, TensorFlow, AWS</div>
             <div>→ Real-time data visualization</div>
             <div><strong>🏗️ Microservices Platform</strong></div>
             <div>→ Docker, Kubernetes, API Gateway</div>
             <div>→ Scalable architecture for 10M+ requests</div>
           </div>
              
           {/* Skills Card - Enhanced */}
           <div className="content-card skills-card">
             <h3>⭐ Technical Arsenal</h3>
             <div><strong>Frontend:</strong> React, TypeScript, Next.js</div>
             <div><strong>Backend:</strong> Node.js, Python, Go</div>
             <div><strong>Cloud:</strong> AWS, Docker, Kubernetes</div>
             <div><strong>Database:</strong> PostgreSQL, MongoDB, Redis</div>
             <div><strong>DevOps:</strong> CI/CD, GitHub Actions, Terraform</div>
             <div><strong>Tools:</strong> VS Code, Git, Figma, Postman</div>
             <div><em>Always expanding this toolkit!</em></div>
           </div>
              
           {/* Experience Card - New */}
           <div className="content-card experience-card">
             <h3>💼 Professional Journey</h3>
             <div><strong>Senior Developer @ TechCorp</strong></div>
             <div>→ Led team of 5 developers</div>
             <div>→ Architected microservices platform</div>
             <div><strong>Full-Stack Engineer @ StartupX</strong></div>
             <div>→ Built MVP from scratch</div>
             <div>→ Scaled to 100K+ users</div>
             <div><strong>Software Engineer @ InnovateLab</strong></div>
             <div>→ Developed AI-powered features</div>
             <div>→ Mentored junior developers</div>
           </div>
              
           {/* Final Contact Card */}
           <div className="content-card final-contact-card">
             <h3>🚀 Let's Connect!</h3>
             <p><strong>Ready to collaborate?</strong></p>
             <div>📧 your.email@example.com</div>
             <div>💼 linkedin.com/in/yourprofile</div>
             <div>🐙 github.com/yourusername</div>
             <div>🌐 yourportfolio.dev</div>
             <div>📱 +1 (555) 123-4567</div>
             <p><em>Open to exciting opportunities!</em></p>
             <p>💡 Coffee chat? Project idea? Let's talk!</p>
           </div>
           
           {/* Contact Form Card */}
           <div className="content-card contact-form-card">
             <h3>📧 Send Me a Message</h3>
             <form className="contact-form" onSubmit={handleContactSubmit}>
               <div className="form-group">
                 <label htmlFor="name">Your Name</label>
                 <input type="text" id="name" name="name" placeholder="John Doe" required />
               </div>
               <div className="form-group">
                 <label htmlFor="email">Your Email</label>
                 <input type="email" id="email" name="email" placeholder="john@example.com" required />
               </div>
               <div className="form-group">
                 <label htmlFor="subject">Subject</label>
                 <select id="subject" name="subject" required>
                   <option value="">Select a topic</option>
                   <option value="collaboration">Collaboration Opportunity</option>
                   <option value="job">Job Opportunity</option>
                   <option value="project">Project Discussion</option>
                   <option value="consultation">Consultation</option>
                   <option value="other">Other</option>
                 </select>
               </div>
               <div className="form-group">
                 <label htmlFor="message">Your Message</label>
                 <textarea id="message" name="message" rows={4} placeholder="Tell me about your project or opportunity..." required></textarea>
               </div>
               <button type="submit" className="submit-btn">
                 🚀 Send Message
               </button>
             </form>
             <p className="form-note"><em>I'll get back to you within 24 hours!</em></p>
           </div>
         </div>
              
         {/* Mario Character - stays in center */}
         <div className={`mario-character ${isRunning ? 'running' : 'idle'}`}
              style={{ transform: `translateY(${characterJump}px)` }}>
           <div className="character-body">
             <div className="character-head">
               <img src="/avatar.png" alt="Mario Character" className="character-avatar" />
                    </div>
             <div className="character-torso"></div>
             <div className="character-arm character-arm-left"></div>
             <div className="character-arm character-arm-right"></div>
             <div className="character-leg character-leg-left"></div>
             <div className="character-leg character-leg-right"></div>
                    </div>
                  </div>
                  

                  </div>
                  




       {/* Spacer div to enable scrolling - 7 sections including contact form */}
       <div style={{ height: '1400vh' }}></div>
      </div>
  );
}

export default App;
