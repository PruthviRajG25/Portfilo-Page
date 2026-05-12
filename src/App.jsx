import { useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const skills = [
  { icon: "fa-brands fa-python", label: "Python" },
  { icon: "fa-solid fa-chart-simple", label: "Data Science" },
  { icon: "fa-solid fa-microchip", label: "Prompt Engineering" },
  { icon: "fa-brands fa-node-js", label: "MERN" },
  { icon: "fa-brands fa-js", label: "JavaScript" },
  { icon: "fa-brands fa-java", label: "Java" },
  { icon: "fa-solid fa-code", label: "C" },
  { icon: "fa-solid fa-sitemap", label: "DSA" },
  { icon: "fa-brands fa-github", label: "Git and GitHub" },
  { icon: "fa-solid fa-database", label: "SQL" },
  { icon: "fa-solid fa-code", label: "HTML and CSS" },
];

const certifications = [
  {
    icon: "fa-solid fa-award",
    title: "IBM SkillsBuild",
    description: "Hands-on experience in Python, Data Structures, and Pandas.",
    badge: "Data Science Focus",
  },
  {
    icon: "fa-solid fa-award",
    title: "Microsoft and EY",
    description: "Training in prompt engineering and practical AI model usage.",
    badge: "Machine Learning",
  },
  {
    icon: "fa-solid fa-certificate",
    title: "Additional Credentials",
    description: "Technical certifications across full-stack development and prompt engineering.",
    badge: "Professional Growth",
  },
];

const projects = (config) => [
  {
    icon: "fa-solid fa-plane-departure",
    title: "TravelNest",
    description: "A full-stack MERN application for booking travel listings with dynamic CRUD features.",
    codeUrl: config.travelNestRepo,
    liveUrl: config.travelNestUrl,
    codeLabel: "Code",
  },
  {
    icon: "fa-solid fa-screwdriver-wrench",
    title: "Mini Projects",
    description: "A collection of learning builds including Tic Tac Toe, Amazon Clone, and Currency Converter.",
    codeUrl: config.miniProjectsRepo,
    codeLabel: "View Repository",
  },
];

const socialLinks = (config) => [
  {
    icon: "fa-solid fa-envelope",
    title: "Email",
    description: config.email,
    href: `mailto:${config.email}`,
  },
  {
    icon: "fa-brands fa-linkedin-in",
    title: "LinkedIn",
    description: "Connect on LinkedIn",
    href: config.linkedinUrl,
  },
  {
    icon: "fa-brands fa-github",
    title: "GitHub",
    description: "Check my code",
    href: config.githubUrl,
  },
];

function App() {
  const config = useMemo(
    () => ({
      siteTitle: import.meta.env.VITE_SITE_TITLE || "Pruthvi Raj G | Portfolio",
      email: import.meta.env.VITE_EMAIL || "pruthvi250906@gmail.com",
      linkedinUrl:
        import.meta.env.VITE_LINKEDIN_URL ||
        "https://www.linkedin.com/in/pruthvi-raj-g-718380340/",
      githubUrl: import.meta.env.VITE_GITHUB_URL || "https://github.com/PruthviRajG25",
      resumeUrl: import.meta.env.VITE_RESUME_URL || "/resume_final.pdf",
      travelNestUrl:
        import.meta.env.VITE_TRAVELNEST_URL || "https://travel-nest-2kys.vercel.app/listings",
      travelNestRepo:
        import.meta.env.VITE_TRAVELNEST_REPO || "https://github.com/PruthviRajG25/TravelNest",
      miniProjectsRepo:
        import.meta.env.VITE_MINI_PROJECTS_REPO || "https://github.com/PruthviRajG25/projects-demo",
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "/api",
    }),
    []
  );

  const [activePage, setActivePage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    document.title = config.siteTitle;
  }, [config.siteTitle]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && navItems.some((item) => item.id === hash)) {
      setActivePage(hash);
    }
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${activePage}`);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const percent = height > 0 ? Math.min(100, Math.max(0, (currentScroll / height) * 100)) : 0;
      setScrollProgress(percent);
      setShowBackToTop(currentScroll > 420);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".page.active .reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("show"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [activePage]);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span className="scroll-progress__bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="background-blobs" />

      <header className="navbar">
        <div className="container nav-content" ref={navRef}>
          <button className="logo-button" type="button" onClick={() => setActivePage("home")} aria-label="Go to home">
            <img src="/image.png" alt="PR" className="nav-logo" />
          </button>

          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <i className="fa-solid fa-bars" />
          </button>

          <nav className={`nav-links ${menuOpen ? "active" : ""}`} aria-label="Primary">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={activePage === item.id ? "active" : ""}
                onClick={() => setActivePage(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="glass-card">
          <div className={`page ${activePage === "home" ? "active" : ""}`} id="home">
            <span className="badge reveal">Available for Internships</span>
            <h1 className="reveal">
              Hi, I&apos;m <span className="highlight">Pruthvi Raj G</span>
            </h1>
            <div className="profile-container reveal">
              <img src="/profile.png" alt="Pruthvi Raj G" className="profile-pic" />
            </div>
            <h3 className="reveal">DSA in Java | Aspiring MERN Stack Developer | AI and Prompt Engineering</h3>
            <p className="hero-text reveal">
              Passionate about data science, machine learning, and building real-world solutions using modern technologies.
            </p>
            <div className="stats reveal">
              <div className="stat-item">
                <b>5+</b> Certifications
              </div>
              <div className="stat-item">
                <b>3+</b> Projects
              </div>
              <div className="stat-item">
                <b>Focus:</b> AI and Web Development
              </div>
            </div>
            <div className="hero-actions reveal">
              <button className="btn primary" type="button" onClick={() => setActivePage("projects")}>
                <i className="fa-brands fa-github" aria-hidden="true" />
                View My Work
              </button>
              <a className="btn secondary" href={config.resumeUrl} target="_blank" rel="noreferrer">
                <i className="fa-solid fa-file-lines" aria-hidden="true" />
                My Resume/CV
              </a>
            </div>
          </div>

          <div className={`page ${activePage === "about" ? "active" : ""}`} id="about">
            <h2>About Me</h2>
            <hr className="divider" />
            <div className="about-grid">
              <div className="about-text reveal">
                <p>
                  I am a computer science student specializing in AI and Data Science, dedicated to transforming complex data
                  into impactful, real-world solutions. I am currently bridging the gap between intelligent algorithms and
                  user-centric design by deep-diving into the MERN stack and exploring the frontier of generative AI.
                </p>
              </div>
              <div className="info-list reveal">
                <h3>Education Details</h3>
                <div className="info-item">
                  <i className="fa-solid fa-building-columns" />
                  DR HN National College of Engineering
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-location-dot" />
                  India, Bangalore
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-graduation-cap" />
                  B.E / B.Tech (AI and DS)
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-calendar-days" />
                  Expected Graduation: 2028
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-star" />
                  <b>CGPA: 9.05</b>
                </div>
              </div>
            </div>
          </div>

          <div className={`page ${activePage === "skills" ? "active" : ""}`} id="skills">
            <h2>Technical Skills</h2>
            <hr className="divider" />
            <div className="skills-grid">
              {skills.map((skill) => (
                <div className="skill-tag reveal" key={skill.label}>
                  <i className={skill.icon} />
                  {skill.label}
                </div>
              ))}
            </div>
            <p className="learning-text reveal">...and continuously learning new technologies.</p>
          </div>

          <div className={`page ${activePage === "projects" ? "active" : ""}`} id="projects">
            <h2>Featured Projects</h2>
            <div className="project-grid">
              {projects(config).map((project) => (
                <div className="project-card reveal" key={project.title}>
                  <div className="project-icon" aria-hidden="true">
                    <i className={project.icon} />
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-btns">
                    <a href={project.codeUrl} target="_blank" rel="noreferrer" className="btn secondary">
                      <i className="fa-brands fa-github" aria-hidden="true" />
                      {project.codeLabel}
                    </a>
                    {project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn primary">
                        Live Demo
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`page ${activePage === "certifications" ? "active" : ""}`} id="certifications">
            <h2>Certifications</h2>
            <hr className="divider" />
            <div className="certification-grid">
              {certifications.map((item) => (
                <div className="certification-card reveal" key={item.title}>
                  <div className="cert-header">
                    <i className={item.icon} />
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.description}</p>
                  <span className="cert-badge">{item.badge}</span>
                </div>
              ))}
              <div className="certification-card reveal">
                <div className="cert-header">
                  <i className="fa-solid fa-certificate" />
                  <h3>Find more here</h3>
                </div>
                <p>Explore the full list of certifications and achievements on LinkedIn.</p>
                <a
                  href={`${config.linkedinUrl}details/certifications/`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn primary"
                >
                  Open LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className={`page ${activePage === "contact" ? "active" : ""}`} id="contact">
            <h2>Get In Touch</h2>
            <hr className="divider" />
            <p className="contact-desc reveal">Let&apos;s connect. I&apos;m always open to discussing new projects or opportunities.</p>

            <div className="contact-grid">
              {socialLinks(config).map((link) => (
                <a
                  href={link.href}
                  className="social-card reveal"
                  key={link.title}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <i className={link.icon} />
                  <span>{link.title}</span>
                  <p>{link.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; Pruthvi Raj G | Built with Passion</p>
      </footer>

      <button
        className={`back-to-top ${showBackToTop ? "show" : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fa-solid fa-arrow-up" />
      </button>
    </>
  );
}

export default App;
