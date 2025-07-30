import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";

interface Section {
  id: string;
  title: string;
  active: boolean;
}

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeSection, setActiveSection] = useState<string>("about");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sections] = useState<Section[]>([
    { id: "about", title: "About", active: true },
    { id: "projects", title: "Projects", active: false },
    { id: "skills", title: "Skills", active: false },
    { id: "contact", title: "Contact", active: false },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [typedText, setTypedText] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTyping, setIsTyping] = useState(true);

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentPersonFrame, setCurrentPersonFrame] = useState<number>(1);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [scrollEventCounter, setScrollEventCounter] = useState<number>(0);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  // Chat bubble state
  const [showChatBubble, setShowChatBubble] = useState<boolean>(false);
  const [currentChatIndex, setCurrentChatIndex] = useState<number>(0);
  
  // Jump animation state
  const [isJumping, setIsJumping] = useState<boolean>(false);

  const chatMessages = useMemo(() => [
    "Hey there! I'm Junre, welcome to my interactive portfolio! 🌟",
    "Scroll around to explore different sections and discover my journey! 🚀",
    "I love building scalable systems and leading amazing teams! 💼",
    "Born and raised in beautiful Cebu City, Philippines! 🇵🇭",
    "From BSIT student at University of Cebu to CTO - what a journey! 🎓",
    "Currently CTO at Vananaz Technologies Inc. - living the dream! 🚀",
    "June 17, 1997 - that's when the adventure began! 🎂",
    "Cebu City shaped me, but technology gave me wings! ✈️",
    "University of Cebu taught me the basics, experience taught me everything else! 📚",
    "From island life in Cebu to leading tech teams - the journey continues! 🏝️",
    "CTO by day, lifelong learner by night! Never stop growing! 🌱",
    "Building the future, one line of code at a time! 💻",
    "Proud Cebuano techie making waves in the digital world! 🌊",
    "Leadership isn't about being in charge, it's about taking care of those in your charge! 👥",
    "Every bug is a lesson, every feature is an opportunity! 🐛➡️✨",
    "From junior developer to CTO - proof that persistence pays off! 💪",
    "Technology changes, but passion for innovation remains constant! 🔥",
    "Cebu City will always be home, but the cloud is my office! ☁️",
    "Click me to see more of my thoughts! 💭",
  ], []);
  const [pausedElements, setPausedElements] = useState<Set<string>>(new Set());

  // Auto-scroll for content cards
  useEffect(() => {
    const scrollableElements = [
      { selector: ".projects-list", speed: 1 },
      { selector: ".skills-categories", speed: 0.8 },
      { selector: ".timeline", speed: 0.6 },
    ];

    // Add hover event listeners to each scrollable element
    const eventListeners: Array<{
      element: HTMLElement;
      enter: () => void;
      leave: () => void;
    }> = [];

    scrollableElements.forEach(({ selector }) => {
      const element = document.querySelector(selector) as HTMLElement;
      const parentCard = element?.closest(".content-card") as HTMLElement;

      if (element && parentCard) {
        const handleMouseEnter = () => {
          setPausedElements((prev) => new Set(prev).add(selector));
        };

        const handleMouseLeave = () => {
          setPausedElements((prev) => {
            const newSet = new Set(prev);
            newSet.delete(selector);
            return newSet;
          });
        };

        parentCard.addEventListener("mouseenter", handleMouseEnter);
        parentCard.addEventListener("mouseleave", handleMouseLeave);

        eventListeners.push({
          element: parentCard,
          enter: handleMouseEnter,
          leave: handleMouseLeave,
        });
      }
    });

    const autoScrollCards = () => {
      scrollableElements.forEach(({ selector, speed }) => {
        const element = document.querySelector(selector) as HTMLElement;

        // Skip if this element is paused (hovered)
        if (element && !pausedElements.has(selector)) {
          const scrollStep = speed; // pixels per step
          const maxScroll = element.scrollHeight - element.clientHeight;

          if (maxScroll <= 0) return; // Skip if no scrollable content

          if (element.scrollTop >= maxScroll) {
            // Pause at bottom for 2 seconds, then reset
            setTimeout(() => {
              if (!pausedElements.has(selector)) {
                element.scrollTop = 0;
              }
            }, 2000);
          } else {
            // Scroll down gradually
            element.scrollTop += scrollStep;
          }
        }
      });
    };

    // Auto-scroll every 50ms (20 FPS for smooth animation)
    const interval = setInterval(autoScrollCards, 50);

    return () => {
      clearInterval(interval);
      // Clean up hover listeners
      eventListeners.forEach(({ element, enter, leave }) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
    };
  }, [pausedElements]);

  // Contact form submission handler
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const message = formData.get("message");

    // Simple success message for now
    alert(
      `Thanks ${name}! Your message about "${subject}" has been received. I'll get back to you at ${email} soon!`
    );

    // Reset form
    e.currentTarget.reset();
  };

  const textsToType = useMemo(() => [
    "Building scalable systems and guiding technical teams",
    "Software Development Manager with extensive experience in system architecture and solution management.",
    "I view myself as a work in progress at all times. My main objective is to never stop learning.",
  ], []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  // Random message picker function
  const getRandomMessage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * chatMessages.length);
    setCurrentChatIndex(randomIndex);
  }, [chatMessages]);

  // Handle background click to make character jump
  const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
    // Only trigger if clicking on the background (not on cards or UI elements)
    if (e.target === e.currentTarget && !isJumping) {
      setIsJumping(true);
      // Reset jump state after animation completes
      setTimeout(() => {
        setIsJumping(false);
      }, 600); // Jump animation duration
    }
  }, [isJumping]);

  // Preload person images
  useEffect(() => {
    const preloadImages = () => {
      for (let i = 1; i <= 6; i++) {
        const img = new Image();
        img.src = `${process.env.PUBLIC_URL}/person/person${i}.png`;
        console.log(`Preloading person${i}.png`);
      }
    };
    
    preloadImages();
  }, []);

  // Show initial chat bubble on page load
  useEffect(() => {
    const initialChatTimeout = setTimeout(() => {
      getRandomMessage(); // Pick random message
      setShowChatBubble(true);
    }, 2000); // Show initial chat bubble after 2 seconds

    return () => clearTimeout(initialChatTimeout);
  }, [getRandomMessage]);

  // Handle viewport height for mobile browsers (Safari toolbar issue)
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial viewport height
    setViewportHeight();

    // Update on resize (handles Safari toolbar show/hide)
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  // Mouse tracking and scroll-based 3D animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = (): void => {
      const scrollTop: number = window.pageYOffset;
      const docHeight: number =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent: number = scrollTop / docHeight;

      setScrollProgress(scrollPercent);

      // Detect scroll direction
      const direction = scrollTop > lastScrollTop ? "down" : "up";
      setScrollDirection(direction);
      setLastScrollTop(scrollTop);

      // Walking animation logic
      setIsScrolling(true);

      // Hide chat bubble when scrolling starts
      setShowChatBubble(false);

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Increment scroll counter and update frame
      setScrollEventCounter((prev) => {
        const newCounter = prev + 1;
        
        // Only change frame every 8 scroll events (adjust this number to make walking faster/slower)
        if (newCounter % 8 === 0) {
          setCurrentPersonFrame((currentFrame) => {
            if (currentFrame === 1) return 2; // Start walking from frame 2
            if (currentFrame >= 6) return 2; // Reset to frame 2 after frame 6
            return currentFrame + 1;
          });
        }
        
        return newCounter;
      });

      // Set timeout to stop walking animation
      const newTimeout = setTimeout(() => {
        setIsScrolling(false);
        setCurrentPersonFrame(1); // Reset to idle frame
        setScrollEventCounter(0); // Reset counter when stopping

        // Show chat bubble when character becomes idle
        setTimeout(() => {
          getRandomMessage(); // Pick random message
          setShowChatBubble(true);
        }, 500); // Show chat bubble 500ms after stopping
      }, 800); // Stop animation 800ms after scrolling stops (longer delay)

      setScrollTimeout(newTimeout);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollTimeout, scrollEventCounter, lastScrollTop, getRandomMessage]);

  // Typewriter effect
  useEffect(() => {
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let completedTexts: string[] = [];
    let timeoutId: NodeJS.Timeout;

    const typeText = () => {
      const currentText = textsToType[currentTextIndex];

      if (currentCharIndex <= currentText.length) {
        const displayText =
          completedTexts.join("\n\n") +
          (completedTexts.length > 0 ? "\n\n" : "") +
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
  }, [textsToType]);

  // Calculate game elements based on scroll with device-specific coefficients
  const getWorldOffsetCoefficient = () => {
    // if (typeof window !== 'undefined') {
    //   const width = window.innerWidth;
    //   // Tablet range: 768px to 1024px
    //   if (width <= 768) {
    //     return -5000; // Tablet coefficient
    //   }
    //   if (width <= 1024) {
    //     return -6500; // Tablet coefficient
    //   }
    // }
    return -10500; // Default coefficient for desktop and mobile
  };
  
  const worldOffset = scrollProgress * getWorldOffsetCoefficient();
  const characterJump = Math.sin(scrollProgress * 20) * 5; // Bouncing effect

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
      <div className="mario-game-scene" onClick={handleBackgroundClick}>
        {/* Forest Parallax Background Layers */}
                 <div
           className="parallax-layer sky-layer"
           style={{ transform: `translateX(${worldOffset * 0.05}px)` }}
         >
           <img
             src={`${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_sky.png`}
             alt="Sky"
             className="forest-sky"
           />

           <img
             src={`${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_sun.png`}
             alt="Sun"
             className="forest-sun"
           />
         </div>

                 <div
           className="parallax-layer clouds-layer"
           style={{ transform: `translateX(${worldOffset * 0.1}px)` }}
         >
           <div
             className="forest-clouds"
             style={{
               backgroundImage: `url(${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_clouds.png)`,
             }}
           ></div>

         </div>

                 <div
           className="parallax-layer mountains-layer-3"
           style={{ transform: `translateX(${worldOffset * 0.2}px)` }}
         >
           <div
             className="forest-mountains-3"
             style={{
               backgroundImage: `url(${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_mountains_3.png)`,
             }}
           ></div>

         </div>

                 <div
           className="parallax-layer mountains-layer-2"
           style={{ transform: `translateX(${worldOffset * 0.3}px)` }}
         >
           <div
             className="forest-mountains-2"
             style={{
               backgroundImage: `url(${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_mountains_2.png)`,
             }}
           ></div>

         </div>

                 <div
           className="parallax-layer mountains-layer-1"
           style={{ transform: `translateX(${worldOffset * 0.4}px)` }}
         >
           <div
             className="forest-mountains-1"
             style={{
               backgroundImage: `url(${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_mountains_1.png)`,
             }}
           ></div>

         </div>

                 <div
           className="parallax-layer trees-layer"
           style={{ transform: `translateX(${worldOffset * 0.6}px)` }}
         >
           <div
             className="forest-trees"
             style={{
               backgroundImage: `url(${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_trees.png)`,
             }}
           ></div>

         </div>

                 <div
           className="parallax-layer rocks-layer"
           style={{ transform: `translateX(${worldOffset * 0.8}px)` }}
         >
           <div
             className="forest-rocks"
             style={{
               backgroundImage: `url(${process.env.PUBLIC_URL}/parallax_background_forest/forest_background_rocks.png)`,
             }}
           ></div>

         </div>

        <div
          className="parallax-layer ground-layer"
          style={{ transform: `translateX(${worldOffset}px)` }}
        >
          {/* Portfolio Content Cards - standing cardboard style */}

          {/* Welcome/Instructions Card */}
          <div className="content-card welcome-card">
            <div className="card-header">
              <div className="card-icon">🌟</div>
              <h3>Welcome to My Digital Forest</h3>
            </div>
            <div className="card-content">
              <div className="instruction-list">
                <div className="instruction-item">
                  <span className="instruction-icon">🎮</span>
                  <div>
                    <strong>Scroll to explore</strong>
                    <p>Navigate through my interactive portfolio</p>
                  </div>
                </div>
                <div className="instruction-item">
                  <span className="instruction-icon">📖</span>
                  <div>
                    <strong>Discover my story</strong>
                    <p>Each card reveals different aspects of my journey</p>
                  </div>
                </div>
                <div className="instruction-item">
                  <span className="instruction-icon">💡</span>
                  <div>
                    <strong>See my passion</strong>
                    <p>Skills, projects, and innovation in action</p>
                  </div>
                </div>
              </div>
              <div className="adventure-banner">
                <span className="adventure-text">
                  🚀 Ready for the adventure?
                </span>
              </div>
            </div>
          </div>

          {/* About Me Card - Enhanced */}
          <div className="content-card about-card">
            <div className="card-header">
              <div className="card-icon rotating">👨‍💻</div>
              <h3>About Me</h3>
            </div>
            <div className="card-content">
              <div className="about-intro">
                <h4>Software Development Manager</h4>
                <div className="experience-badge">Vananaz Technologies</div>
              </div>
              <div className="qualities-grid">
                <div className="quality-item">
                  <span className="quality-icon">🏗️</span>
                  <div>
                    <strong>System Architecture</strong>
                    <p>Designing scalable software solutions</p>
                  </div>
                </div>
                <div className="quality-item">
                  <span className="quality-icon">⚙️</span>
                  <div>
                    <strong>Solution Management</strong>
                    <p>End-to-end software solution oversight</p>
                  </div>
                </div>
                <div className="quality-item">
                  <span className="quality-icon">🔄</span>
                  <div>
                    <strong>CI/CD Expert</strong>
                    <p>Continuous integration & delivery practices</p>
                  </div>
                </div>
                <div className="quality-item">
                  <span className="quality-icon">👥</span>
                  <div>
                    <strong>Team Leadership</strong>
                    <p>From Software Engineer to Development Manager</p>
                  </div>
                </div>
              </div>
              <div className="quote-section">
                <div className="quote-mark">"</div>
                <p className="quote-text">
                  Never stop learning - always work in progress
                </p>
                <div className="quote-mark">"</div>
              </div>
            </div>
          </div>

          {/* Projects Card - Enhanced */}
          <div className="content-card projects-card">
            <div className="card-header">
              <div className="card-icon pulse">🛠️</div>
              <h3>Featured Projects</h3>
            </div>
            <div className="card-content">
              <div className="projects-list">
                <div className="project-item">
                  <div className="project-header">
                    <span className="project-icon">🏢</span>
                    <h4>Enterprise Web Application</h4>
                    <div className="project-status success">Production</div>
                  </div>
                  <div className="project-details">
                    <div className="tech-stack">
                      <span className="tech-tag">React.js</span>
                      <span className="tech-tag">Node.js</span>
                      <span className="tech-tag">MySQL</span>
                    </div>
                    <div className="project-metrics">
                      <span className="metric">🏗️ Scalable architecture</span>
                      <span className="metric">⚡ High performance</span>
                    </div>
                  </div>
                </div>

                <div className="project-item">
                  <div className="project-header">
                    <span className="project-icon">☁️</span>
                    <h4>Cloud Infrastructure System</h4>
                    <div className="project-status success">Live</div>
                  </div>
                  <div className="project-details">
                    <div className="tech-stack">
                      <span className="tech-tag">AWS</span>
                      <span className="tech-tag">Firebase</span>
                      <span className="tech-tag">Cloud Firestore</span>
                    </div>
                    <div className="project-metrics">
                      <span className="metric">🔄 CI/CD pipeline</span>
                      <span className="metric">📊 Real-time data</span>
                    </div>
                  </div>
                </div>

                <div className="project-item">
                  <div className="project-header">
                    <span className="project-icon">🔧</span>
                    <h4>REST API Framework</h4>
                    <div className="project-status success">Production</div>
                  </div>
                  <div className="project-details">
                    <div className="tech-stack">
                      <span className="tech-tag">Django REST</span>
                      <span className="tech-tag">Express.js</span>
                      <span className="tech-tag">Spring Framework</span>
                    </div>
                    <div className="project-metrics">
                      <span className="metric">🔌 RESTful APIs</span>
                      <span className="metric">⚡ Optimized performance</span>
                    </div>
                  </div>
                </div>

                <div className="project-item">
                  <div className="project-header">
                    <span className="project-icon">📱</span>
                    <h4>Cross-Platform Mobile App</h4>
                    <div className="project-status success">Live</div>
                  </div>
                  <div className="project-details">
                    <div className="tech-stack">
                      <span className="tech-tag">React Native</span>
                      <span className="tech-tag">TypeScript</span>
                      <span className="tech-tag">Firebase</span>
                    </div>
                    <div className="project-metrics">
                      <span className="metric">📲 Cross-platform</span>
                      <span className="metric">⚡ Native performance</span>
                    </div>
                  </div>
                </div>

                <div className="project-item">
                  <div className="project-header">
                    <span className="project-icon">🌐</span>
                    <h4>Full-Stack Web Platform</h4>
                    <div className="project-status beta">Development</div>
                  </div>
                  <div className="project-details">
                    <div className="tech-stack">
                      <span className="tech-tag">Vue.js</span>
                      <span className="tech-tag">PHP</span>
                      <span className="tech-tag">Laravel</span>
                    </div>
                    <div className="project-metrics">
                      <span className="metric">🔧 Full-stack solution</span>
                      <span className="metric">⚡ Modern framework</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Card - Enhanced */}
          <div className="content-card skills-card">
            <div className="card-header">
              <div className="card-icon sparkle">⭐</div>
              <h3>Technical Arsenal</h3>
            </div>
            <div className="card-content">
              <div className="skills-categories">
                <div className="skill-category">
                  <div className="category-header">
                    <span className="category-icon">💼</span>
                    <h4>Leadership & Management</h4>
                  </div>
                  <div className="skill-tags">
                    <span className="skill-tag management">
                      Solution Management
                    </span>
                    <span className="skill-tag architecture">
                      System Architecture
                    </span>
                    <span className="skill-tag cicd">CI/CD</span>
                  </div>
                </div>

                <div className="skill-category">
                  <div className="category-header">
                    <span className="category-icon">🎨</span>
                    <h4>Frontend</h4>
                  </div>
                  <div className="skill-tags">
                    <span className="skill-tag react">React.js</span>
                    <span className="skill-tag reactnative">React Native</span>
                    <span className="skill-tag vue">Vue.js</span>
                    <span className="skill-tag angular">AngularJS</span>
                    <span className="skill-tag ts">TypeScript</span>
                  </div>
                </div>

                <div className="skill-category">
                  <div className="category-header">
                    <span className="category-icon">⚙️</span>
                    <h4>Backend</h4>
                  </div>
                  <div className="skill-tags">
                    <span className="skill-tag node">Node.js</span>
                    <span className="skill-tag php">PHP</span>
                    <span className="skill-tag laravel">Laravel</span>
                    <span className="skill-tag django">Django REST</span>
                    <span className="skill-tag express">Express.js</span>
                    <span className="skill-tag spring">Spring Framework</span>
                    <span className="skill-tag java">Java</span>
                  </div>
                </div>

                <div className="skill-category">
                  <div className="category-header">
                    <span className="category-icon">☁️</span>
                    <h4>Cloud & DevOps</h4>
                  </div>
                  <div className="skill-tags">
                    <span className="skill-tag aws">AWS</span>
                    <span className="skill-tag firebase">Firebase</span>
                    <span className="skill-tag firestore">Cloud Firestore</span>
                    <span className="skill-tag git">Git</span>
                  </div>
                </div>

                <div className="skill-category">
                  <div className="category-header">
                    <span className="category-icon">💾</span>
                    <h4>Database & Tools</h4>
                  </div>
                  <div className="skill-tags">
                    <span className="skill-tag mysql">MySQL</span>
                    <span className="skill-tag sql">SQL</span>
                    <span className="skill-tag scripts">
                      Google Apps Script
                    </span>
                  </div>
                </div>
              </div>
              <div className="expanding-note">
                <span className="growth-icon">📈</span>
                <p>Always expanding this toolkit!</p>
              </div>
            </div>
          </div>

          {/* Experience Card - New */}
          <div className="content-card experience-card">
            <div className="card-header">
              <div className="card-icon bounce">💼</div>
              <h3>Professional Journey</h3>
            </div>
            <div className="card-content">
              <div className="timeline">
                <div className="timeline-item current">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="job-header">
                      <h4>Software Development Manager</h4>
                      <span className="company">@ Vananaz Technologies</span>
                      <span className="duration">Present</span>
                    </div>
                    <div className="achievements">
                      <div className="achievement">
                        🏗️ System architecture & solution management
                      </div>
                      <div className="achievement">
                        🔄 CI/CD implementation & optimization
                      </div>
                      <div className="achievement">
                        👥 Leading development teams
                      </div>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="job-header">
                      <h4>Development Lead Supervisor</h4>
                      <span className="company">@ Vananaz Technologies</span>
                      <span className="duration">Previous Role</span>
                    </div>
                    <div className="achievements">
                      <div className="achievement">
                        ☁️ AWS & cloud infrastructure
                      </div>
                      <div className="achievement">
                        🔧 Technical leadership & mentoring
                      </div>
                      <div className="achievement">
                        📊 Project oversight & delivery
                      </div>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="job-header">
                      <h4>Senior Development Leader</h4>
                      <span className="company">@ Vananaz Technologies</span>
                      <span className="duration">Previous Role</span>
                    </div>
                    <div className="achievements">
                      <div className="achievement">
                        🌐 Full-stack development (PHP, Laravel)
                      </div>
                      <div className="achievement">
                        💾 Database design & optimization (MySQL)
                      </div>
                      <div className="achievement">
                        🔌 REST API development & integration
                      </div>
                    </div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="job-header">
                      <h4>Software Engineer</h4>
                      <span className="company">@ Vananaz Technologies</span>
                      <span className="duration">Started Career</span>
                    </div>
                    <div className="achievements">
                      <div className="achievement">
                        📱 Mobile app development (React Native)
                      </div>
                      <div className="achievement">
                        🔧 Version control & collaboration (Git)
                      </div>
                      <div className="achievement">
                        📝 Google Apps Script automation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Contact Card */}
          <div className="content-card final-contact-card">
            <div className="card-header">
              <div className="card-icon wave">🚀</div>
              <h3>Let's Connect!</h3>
            </div>
            <div className="card-content">
              <div className="contact-intro">
                <h4>Ready to collaborate?</h4>
                <p>Let's build something amazing together!</p>
              </div>
              <div className="contact-methods-grid">
                <div className="contact-method">
                  <span className="contact-icon">📧</span>
                  <div className="contact-info">
                    <strong>Email</strong>
                    <p>your.email@example.com</p>
                  </div>
                </div>
                <div className="contact-method">
                  <span className="contact-icon">💼</span>
                  <div className="contact-info">
                    <strong>LinkedIn</strong>
                    <p>linkedin.com/in/yourprofile</p>
                  </div>
                </div>
                <div className="contact-method">
                  <span className="contact-icon">🐙</span>
                  <div className="contact-info">
                    <strong>GitHub</strong>
                    <p>github.com/yourusername</p>
                  </div>
                </div>
                <div className="contact-method">
                  <span className="contact-icon">🌐</span>
                  <div className="contact-info">
                    <strong>Portfolio</strong>
                    <p>yourportfolio.dev</p>
                  </div>
                </div>
                <div className="contact-method">
                  <span className="contact-icon">📱</span>
                  <div className="contact-info">
                    <strong>Phone</strong>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
              <div className="opportunities-section">
                <div className="opportunities-header">
                  <span className="opportunity-icon">💡</span>
                  <h4>Open to Opportunities</h4>
                </div>
                <div className="opportunity-types">
                  <span className="opportunity-tag">☕ Coffee Chats</span>
                  <span className="opportunity-tag">🚀 Project Ideas</span>
                  <span className="opportunity-tag">💼 Job Opportunities</span>
                  <span className="opportunity-tag">🤝 Collaborations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="content-card contact-form-card">
            <div className="card-header">
              <div className="card-icon float">📧</div>
              <h3>Send Me a Message</h3>
            </div>
            <div className="card-content">
              <div className="form-intro">
                <p>
                  Have a project in mind? Let's discuss how we can work
                  together!
                </p>
              </div>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      <span className="label-icon">👤</span>
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <span className="label-icon">📧</span>
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">
                    <span className="label-icon">💼</span>
                    Subject
                  </label>
                  <select id="subject" name="subject" required>
                    <option value="">What would you like to discuss?</option>
                    <option value="collaboration">
                      🤝 Collaboration Opportunity
                    </option>
                    <option value="job">💼 Job Opportunity</option>
                    <option value="project">🚀 Project Discussion</option>
                    <option value="consultation">💡 Consultation</option>
                    <option value="other">💬 Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">
                    <span className="label-icon">✍️</span>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell me about your project, opportunity, or any questions you have..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  <span className="btn-icon">🚀</span>
                  Send Message
                  <div className="btn-ripple"></div>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Person Character - stays in center */}
        <div
          className={`person-character ${isScrolling ? "walking" : "idle"} ${isJumping ? "jumping" : ""}`}
          style={{
            transform: `translateY(${characterJump}px) ${
              scrollDirection === "up" ? "scaleX(-1)" : ""
            }`,
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/person/person${currentPersonFrame}.png`}
            alt="Person Character"
            className="person-sprite"
          />
        </div>

        {/* Chat Bubble - positioned independently */}
        {showChatBubble && !isScrolling && (
          <div className="chat-bubble" onClick={getRandomMessage}>
            <div className="chat-bubble-content">
              {chatMessages[currentChatIndex]}
            </div>
            <div className="chat-bubble-tail"></div>
            <div className="chat-bubble-hint">Click to change message</div>
          </div>
        )}
      </div>

      {/* Spacer div to enable scrolling - 7 sections including contact form */}
      <div style={{ height: "1000vh" }}></div>
    </div>
  );
}

export default App;
