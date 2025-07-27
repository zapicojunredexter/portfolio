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
  const [currentCheckpoint, setCurrentCheckpoint] = useState<number>(0);


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
      
      // Determine checkpoint based on scroll progress - each section is 2 browser widths
      let newCheckpoint = 0;
      if (scrollPercent >= 0.2) newCheckpoint = 1;      // First checkpoint at 20%
      if (scrollPercent >= 0.4) newCheckpoint = 2;      // Second checkpoint at 40%
      if (scrollPercent >= 0.6) newCheckpoint = 3;      // Third checkpoint at 60%
      if (scrollPercent >= 0.8) newCheckpoint = 4;      // Final checkpoint at 80%
      
      if (newCheckpoint !== currentCheckpoint && newCheckpoint <= 4) {
        setCurrentCheckpoint(newCheckpoint);
      }
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
      const worldOffset = scrollProgress * -8000; // Background moves across longer sections (2 browser widths each)
  const characterJump = Math.sin(scrollProgress * 20) * 5; // Bouncing effect
  const isRunning = scrollProgress > 0;
  


  return (
      <div className="App">
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
           <div className="content-card about-card">
             <h3>About Me</h3>
             <p>Full-Stack Developer & Tech Leader</p>
             <p>5+ years engineering experience</p>
            </div>
            
           <div className="content-card projects-card">
             <h3>🛠️ Projects</h3>
             <div>🛒 E-Commerce Platform</div>
             <div>🤖 AI Analytics Dashboard</div>
             <div>🏗️ Microservices Platform</div>
              </div>
              
           <div className="content-card skills-card">
             <h3>⭐ Skills</h3>
             <div>React • TypeScript • Node.js</div>
             <div>Python • AWS • Docker</div>
             <div>PostgreSQL • CI/CD</div>
              </div>
              
           <div className="content-card contact-card">
             <h3>🏁 Contact</h3>
             <div>📧 your.email@example.com</div>
             <div>💼 LinkedIn Profile</div>
             <div>🐙 GitHub Profile</div>
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
                  
         {/* Game UI */}
         <div className="game-ui">
                    <div className="score-display">
           <span className="progress-display">Progress: {Math.round(scrollProgress * 100)}%</span>
         </div>
           <div className="checkpoint-indicator">
             Checkpoint {currentCheckpoint + 1} of 5
                  </div>
                  

                    </div>
                  </div>
                  




       {/* Spacer div to enable scrolling - each section is 2 browser widths */}
       <div style={{ height: '1000vh' }}></div>
      </div>
  );
}

export default App;
