import { useEffect, useRef, useState } from "react";

const skillsToolkit = {
  frontend: [
    { name: "React.js", icon: "fa-brands fa-react" },
    { name: "JavaScript", icon: "fa-brands fa-js" },
    { name: "HTML & CSS", icon: "fa-solid fa-code" },
    { name: "Tailwind CSS", icon: "fa-brands fa-css3-alt" }
  ],
  backend: [
    { name: "Node.js", icon: "fa-brands fa-node-js" },
    { name: "Express", icon: "fa-solid fa-server" },
    { name: "Java", icon: "fa-brands fa-java" },
    { name: "C", icon: "fa-solid fa-code" },
    { name: "OOP", icon: "fa-solid fa-cubes" }
  ],
  database: [
    { name: "SQL", icon: "fa-solid fa-database" },
    { name: "MongoDB", icon: "fa-solid fa-leaf" }
  ],
  tools: [
    { name: "Git & GitHub", icon: "fa-brands fa-github" },
    { name: "VS Code", icon: "fa-solid fa-laptop-code" }
  ],
  aiDataScience: [
    { name: "Data Science", icon: "fa-solid fa-chart-simple" },
    { name: "Prompt Engineering", icon: "fa-solid fa-microchip" },
    { name: "Prompt Engineering Applications", icon: "fa-solid fa-brain" }
  ],
  aiTools: [
    { name: "Google Antigravity", icon: "fa-solid fa-wand-magic-sparkles" },
    { name: "Cursor", icon: "fa-solid fa-paper-plane" },
    { name: "Codex", icon: "fa-solid fa-terminal" },
    { name: "Lovable", icon: "fa-solid fa-heart" },
    { name: "Claude Code", icon: "fa-solid fa-robot" }
  ]
};

const projectsList = [
  {
    title: "UniHack CatalogIQ",
    description: "An intelligent e-commerce catalog management and analytics dashboard designed and built for the Unilog UniHack competition.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    codeUrl: "https://github.com/PruthviRajG25/UniHack-CatalogIQ-by-Unilog",
    liveUrl: "https://unihack-catalogiq.vercel.app/",
    previewType: "catalog"
  },
  {
    title: "SwiftBytes",
    description: "Smart Canteen Management System with a secure atomic wallet-deposit ledger, simulated UPI payment generation, dynamic order status queues, and real-time Socket.io updates.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
    codeUrl: "https://github.com/PruthviRajG25/Swift-bytes",
    liveUrl: "https://swift-bytes-pruthvirajg25s-projects.vercel.app/",
    previewType: "canteen"
  },
  {
    title: "AttendSync",
    description: "A premium college attendance planner to track class schedules, monitor safe/critical subject statuses, and calculate bunk limits using a smart bunk planner.",
    tags: ["Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    codeUrl: "https://github.com/PruthviRajG25/AttendSync",
    liveUrl: "https://drive.google.com/file/d/1Qb7B5BHG9P95WFtmTn0xXpfpfNulheHk/view?usp=drivesdk",
    previewType: "attendance"
  },
  {
    title: "FinTrack-Pro",
    description: "A personal budget and expense tracking system with secure JWT authentication, category budgets, transaction logs, and analytical dashboard reports.",
    tags: ["Node.js", "Express", "MySQL", "JWT", "HTML/CSS/JS"],
    codeUrl: "https://github.com/PruthviRajG25/FinTrack-Pro",
    liveUrl: "https://fin-track-pro-zevt.vercel.app/",
    previewType: "finance"
  },
  {
    title: "TravelNest",
    description: "A travel listings reservation app supporting user authentication, review ratings, list creations, and interactive maps.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    codeUrl: "https://github.com/PruthviRajG25/TravelNest",
    liveUrl: "https://travel-nest-2kys.vercel.app/listings",
    previewType: "travel"
  },
  {
    title: "Tiny Cut",
    description: "A URL shortening utility providing secured fast link redirections and redirection statistics.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    codeUrl: "https://github.com/PruthviRajG25/TinyCut",
    liveUrl: "https://tiny-cut-three.vercel.app/tinycut",
    previewType: "url"
  },
  {
    title: "Mini Projects",
    description: "A collection of front-end logic exercises, including a full Amazon landing page clone, Tic-Tac-Toe game, and real-time currency converters.",
    tags: ["React", "JavaScript", "HTML", "CSS"],
    codeUrl: "https://github.com/PruthviRajG25/projects-demo",
    previewType: "mini"
  }
];

const certificationsList = [
  {
    title: "ISRO Space Hackathon Participation",
    issuer: "Indian Space Research Organisation (ISRO)",
    date: "Aug 2025",
    description: "Successfully participated in the prestigious national ISRO Space Hackathon, solving complex challenges in space data analysis and satellite pipelines.",
    badge: "Hackathon Focus",
    icon: "fa-solid fa-user-astronaut",
    fileUrl: "/certificates/isro_hackathon_participation.pdf",
    previewImage: "/certificates/isro.png"
  },
  {
    title: "Foundations of Prompt Engineering",
    issuer: "Amazon Web Services (AWS)",
    date: "Feb 20, 2026",
    description: "Earned completion credential in AWS generative AI prompt engineering guidelines, foundational design, and engineering patterns.",
    badge: "AI & Prompt Engineering",
    icon: "fa-solid fa-award",
    fileUrl: "/certificates/aws_prompt_engineering.jpg",
    previewImage: "/certificates/aws_prompt_engineering.jpg"
  },
  {
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata (via Forage)",
    date: "Aug 25, 2025",
    description: "Completed practical tasks in Identity and access management (IAM) fundamentals, IAM strategy assessment, and custom security integrations.",
    badge: "Cybersecurity Focus",
    icon: "fa-solid fa-award",
    fileUrl: "/certificates/tata_cybersecurity_simulation.pdf"
  },
  {
    title: "Data Science & Analytics",
    issuer: "HP LIFE / HP Foundation",
    date: "Mar 1, 2026",
    description: "Completed HP LIFE online course examining leading data science practices, methodologies, analytics tools, and business model evaluations.",
    badge: "Data Science Focus",
    icon: "fa-solid fa-award",
    fileUrl: "/certificates/hplife_data_science.pdf"
  },
  {
    title: "Cybersecurity Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "Aug 8, 2025",
    description: "Earned IBM verification validating knowledge in cybersecurity landscape, system defense frameworks, and security threat management.",
    badge: "Cybersecurity Focus",
    icon: "fa-solid fa-certificate",
    fileUrl: "/certificates/ibm_cybersecurity_fundamentals.pdf",
    link: "https://www.credly.com/badges/d6534c7b-cead-488f-bfa0-c09a93393b74"
  },
  {
    title: "AI Skills Passport",
    issuer: "EY and Microsoft",
    date: "Milestone",
    description: "Completed course sections covering Generative AI models, technology alignment, and employability skills.",
    badge: "AI & Machine Learning",
    icon: "fa-solid fa-certificate",
    fileUrl: "/certificates/microsoft_ey_ai_skills_passport.pdf"
  }
];

const educationList = [
  {
    college: "Dr. HN National College of Engineering",
    affiliation: "VTU Affiliated",
    degree: "B.E / B.Tech (Artificial Intelligence and Data Science)",
    date: "Sep 2024 - Sep 2028",
    cgpa: "9.05",
    location: "Bangalore, India",
    description: "Deep diving into computer science foundations, algorithms, object-oriented programming (OOP), data structures, and database systems."
  },
  {
    college: "Christ Academy Junior College",
    degree: "GRADE 11TH AND 12TH (CS Focus)",
    date: "July 2022 - May 2024",
    location: "Bangalore, India",
    description: "Completed pre-university education with primary focus on science, mathematics, and introductory computer programming logic."
  },
  {
    college: "De Sales Academy",
    degree: "PRIMARY AND HIGH SCHOOL EDUCATION",
    date: "September 2021 - June 2022",
    location: "Bangalore, India",
    description: "Completed secondary school education with high academic standing."
  }
];

const experienceList = [
  {
    role: "LeetCode Algorithmic Problem Solver",
    company: "LeetCode (Profile: PruthviProLeet)",
    date: "300+ Problems Solved",
    description: "Successfully resolved more than 300+ programming challenges across diverse topics including Arrays, Strings, Stack, Queue, Dynamic Programming, and Graph structures using Java.",
    tags: ["DSA", "Java", "Algorithms", "Problem Solving"]
  },
  {
    role: "Flipkart GRID 8.0 Hackathon Participant",
    company: "Flipkart",
    date: "Milestone",
    description: "Competed in Flipkart's premier national engineering hackathon, working on software development tracks and algorithmic problem-solving tasks.",
    tags: ["Hackathon", "System Design", "Algorithms"]
  },
  {
    role: "FLOWZINT AI Hackathon Winner",
    company: "FLOWZINT Hackathon",
    date: "Milestone",
    description: "Won the hackathon event by developing intelligent generative AI prompt-based workflows and custom data science modules.",
    tags: ["Hackathon", "AI Workflows", "Prompt Engineering"]
  }
];

function App() {
  const [activePage, setActivePage] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const navRef = useRef(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const percent = height > 0 ? Math.min(100, Math.max(0, (currentScroll / height) * 100)) : 0;
      setScrollProgress(percent);
      setShowBackToTop(currentScroll > 420);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("pruthvi250906@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`portfolio-app ${theme}`}>
      <div className="scroll-progress" aria-hidden="true">
        <span className="scroll-progress__bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className="navbar">
        <div className="container nav-content" ref={navRef}>
          <button className="logo-button" type="button" onClick={() => setActivePage("home")} aria-label="Home page" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <img src="/logo.png" alt="PR Logo" className="brand-logo" />
            <span>Pruthvi Raj</span>
          </button>

          <div className="nav-right">
            <button
              className="menu-toggle"
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation"
            >
              <i className="fa-solid fa-bars" />
            </button>

            <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
              <button
                type="button"
                className={activePage === "about" ? "active" : ""}
                onClick={() => setActivePage("about")}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/egmlnyku.json"
                  trigger="hover"
                  colors={theme === "dark" ? "primary:#f8fafc,secondary:#3b82f6" : "primary:#0f172a,secondary:#2563eb"}
                  style={{ width: "20px", height: "20px", verticalAlign: "middle", marginRight: "6px" }}
                />
                About
              </button>
              <button
                type="button"
                className={activePage === "skills" ? "active" : ""}
                onClick={() => setActivePage("skills")}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/bmlkvhui.json"
                  trigger="hover"
                  colors={theme === "dark" ? "primary:#f8fafc,secondary:#3b82f6" : "primary:#0f172a,secondary:#2563eb"}
                  style={{ width: "20px", height: "20px", verticalAlign: "middle", marginRight: "6px" }}
                />
                Skills
              </button>
              <button
                type="button"
                className={activePage === "certifications" ? "active" : ""}
                onClick={() => setActivePage("certifications")}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/surcxhka.json"
                  trigger="hover"
                  colors={theme === "dark" ? "primary:#f8fafc,secondary:#3b82f6" : "primary:#0f172a,secondary:#2563eb"}
                  style={{ width: "20px", height: "20px", verticalAlign: "middle", marginRight: "6px" }}
                />
                Certifications
              </button>
              <button
                type="button"
                className={activePage === "education" ? "active" : ""}
                onClick={() => setActivePage("education")}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/gdldyopn.json"
                  trigger="hover"
                  colors={theme === "dark" ? "primary:#f8fafc,secondary:#3b82f6" : "primary:#0f172a,secondary:#2563eb"}
                  style={{ width: "20px", height: "20px", verticalAlign: "middle", marginRight: "6px" }}
                />
                Education
              </button>
              <button
                type="button"
                className={activePage === "experience" ? "active" : ""}
                onClick={() => setActivePage("experience")}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/jjoolpwc.json"
                  trigger="hover"
                  colors={theme === "dark" ? "primary:#f8fafc,secondary:#3b82f6" : "primary:#0f172a,secondary:#2563eb"}
                  style={{ width: "20px", height: "20px", verticalAlign: "middle", marginRight: "6px" }}
                />
                Experience
              </button>
              <button
                type="button"
                className={activePage === "work" ? "active" : ""}
                onClick={() => setActivePage("work")}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/aqrzgjfy.json"
                  trigger="hover"
                  colors={theme === "dark" ? "primary:#f8fafc,secondary:#3b82f6" : "primary:#0f172a,secondary:#2563eb"}
                  style={{ width: "20px", height: "20px", verticalAlign: "middle", marginRight: "6px" }}
                />
                Projects
              </button>
              <button
                type="button"
                className={activePage === "contact" ? "active" : ""}
                onClick={() => setActivePage("contact")}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/nocovwne.json"
                  trigger="hover"
                  colors={theme === "dark" ? "primary:#f8fafc,secondary:#3b82f6" : "primary:#0f172a,secondary:#2563eb"}
                  style={{ width: "20px", height: "20px", verticalAlign: "middle", marginRight: "6px" }}
                />
                Contact
              </button>
            </nav>

            <div className="theme-switch-container">
              <button
                className="theme-switch"
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle Light/Dark Theme"
              >
                <div className="theme-switch-handle">
                  {theme === "dark" ? (
                    <i className="fa-solid fa-moon" style={{ color: "#ffffff" }} />
                  ) : (
                    <i className="fa-solid fa-sun" style={{ color: "#ffffff" }} />
                  )}
                </div>
              </button>
            </div>

            <button className="cta-button" type="button" onClick={() => setActivePage("contact")}>
              Get in touch ↗
            </button>
          </div>
        </div>
      </header>

      <main className="main-content container">
        {/* HERO SECTION */}
        <div className={`section ${activePage === "home" ? "active" : ""}`} id="home">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="status-badge">
                <span className="status-dot" />
                Available for Internships
              </div>
              <h1 className="hero-title" style={{ display: "inline-flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <img src="/logo.png" alt="PR Logo" className="hero-logo" />
                <span>Hi I'm <span style={{ color: "var(--accent)" }}>Pruthvi Raj G</span> 👋</span>
              </h1>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", margin: "8px 0 16px", color: "var(--text)" }}>
                BTech AI &amp; Data Science Student | MERN Stack Developer | DSA in Java
              </h3>
              <p className="hero-subtitle">
                Passionate about Data Science, Machine Learning, and building real-world solutions using modern technologies.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" type="button" onClick={() => setActivePage("work")}>
                  <i className="fa-brands fa-github" /> View My Work
                </button>
                <a className="btn-secondary" href="/resume_final.pdf" target="_blank" rel="noreferrer">
                  <i className="fa-solid fa-file-lines" /> My Resume/CV
                </a>
              </div>
              <div className="hero-socials">
                <a
                  href="https://github.com/PruthviRajG25"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/pruthvi-raj-g-718380340/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                >
                  LinkedIn
                </a>
                <a href="mailto:pruthvi250906@gmail.com" className="social-link">
                  Email
                </a>
              </div>
            </div>
            <div className="hero-right">
              <div className="profile-card">
                <div className="profile-img-container">
                  <img src="/profile.png" alt="Pruthvi Raj G" className="profile-img" />
                </div>
                <div className="profile-details">
                  <div className="profile-location">
                    <lord-icon
                      src="https://cdn.lordicon.com/laqlvddb.json"
                      trigger="hover"
                      colors={theme === "dark" ? "primary:#3b82f6,secondary:#f8fafc" : "primary:#2563eb,secondary:#0f172a"}
                      style={{ width: "20px", height: "20px", verticalAlign: "middle", marginRight: "6px" }}
                    />
                    Bangalore, India
                  </div>
                  <div className="profile-email">
                    <lord-icon
                      src="https://cdn.lordicon.com/nocovwne.json"
                      trigger="hover"
                      colors={theme === "dark" ? "primary:#3b82f6,secondary:#f8fafc" : "primary:#2563eb,secondary:#0f172a"}
                      style={{ width: "20px", height: "20px", verticalAlign: "middle", marginRight: "6px" }}
                    />
                    pruthvi250906@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION */}
        <div className={`section ${activePage === "about" ? "active" : ""}`} id="about">
          <span className="section-pretitle">About</span>
          <h2 className="section-title">An engineer&apos;s mind, a builder&apos;s habits.</h2>
          <div className="about-grid">
            <div className="about-card-left">
              <p>
                I am a detail-oriented Artificial Intelligence and Data Science student with a deep interest in <strong>problem-solving</strong> and <strong>full-stack development</strong>. I enjoy diving into new challenges that expand my technical toolkit and allow me to apply algorithmic solutions in clean, user-centric ways.
              </p>
              <p>
                My work sits at the intersection of <strong>data science workflows</strong> and <strong>modern web engineering</strong>. I prototype rapidly, write scalable database schemas, and ensure that my projects are highly accessible, fast, and optimized.
              </p>
            </div>
            <div className="about-card-right">
              <div className="stat-box">
                <span className="stat-num">9.05</span>
                <span className="stat-lbl">BTech CGPA under VTU</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">3+</span>
                <span className="stat-lbl">Core Projects Deployed</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">5+</span>
                <span className="stat-lbl">Certifications Obtained</span>
              </div>

              <div style={{ marginTop: "28px", textAlign: "left", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: "800", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>
                  <i className="fa-solid fa-graduation-cap" style={{ marginRight: "8px", color: "var(--accent)" }} />
                  Education Details
                </h3>
                {educationList.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: "18px" }}>
                    <div style={{ fontWeight: "800", fontSize: "0.95rem", color: "var(--text)" }}>{edu.college}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: "600", marginTop: "2px" }}>{edu.degree}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "2px" }}>{edu.date} &bull; {edu.location}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SKILLS SECTION */}
        <div className={`section ${activePage === "skills" ? "active" : ""}`} id="skills">
          <span className="section-pretitle">Toolkit</span>
          <h2 className="section-title">Technologies I work with</h2>
          <p className="skills-intro">
            Structured layers of technologies, languages, and prompting tools I leverage to construct data pipelines and web products:
          </p>
          <div className="skills-deck">
            <div className="skills-group-card">
              <span className="skills-group-header">Frontend</span>
              <div className="skills-tags-wrap">
                {skillsToolkit.frontend.map((s) => (
                  <span className="skills-tag-item" key={s.name}>
                    <i className={s.icon} style={{ marginRight: "8px" }} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="skills-group-card">
              <span className="skills-group-header">Backend</span>
              <div className="skills-tags-wrap">
                {skillsToolkit.backend.map((s) => (
                  <span className="skills-tag-item" key={s.name}>
                    <i className={s.icon} style={{ marginRight: "8px" }} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="skills-group-card">
              <span className="skills-group-header">Database</span>
              <div className="skills-tags-wrap">
                {skillsToolkit.database.map((s) => (
                  <span className="skills-tag-item" key={s.name}>
                    <i className={s.icon} style={{ marginRight: "8px" }} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="skills-group-card">
              <span className="skills-group-header">Tools</span>
              <div className="skills-tags-wrap">
                {skillsToolkit.tools.map((s) => (
                  <span className="skills-tag-item" key={s.name}>
                    <i className={s.icon} style={{ marginRight: "8px" }} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="skills-group-card">
              <span className="skills-group-header">AI &amp; Data Science</span>
              <div className="skills-tags-wrap">
                {skillsToolkit.aiDataScience.map((s) => (
                  <span className="skills-tag-item" key={s.name}>
                    <i className={s.icon} style={{ marginRight: "8px" }} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="skills-group-card">
              <span className="skills-group-header">AI Tools</span>
              <div className="skills-tags-wrap">
                {skillsToolkit.aiTools.map((s) => (
                  <span className="skills-tag-item" key={s.name}>
                    <i className={s.icon} style={{ marginRight: "8px" }} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* WORK SECTION */}
        <div className={`section ${activePage === "work" ? "active" : ""}`} id="work">
          <span className="section-pretitle">Selected Work</span>
          <h2 className="section-title">Projects worth a closer look</h2>
          <p className="work-intro" style={{ marginBottom: "24px" }}>
            A selective collection of applications I&apos;ve designed, built end-to-end, and launched:
          </p>

          <div style={{ marginBottom: "36px", display: "flex", justifyContent: "flex-start" }}>
            <a
              href="https://github.com/PruthviRajG25?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 24px", fontSize: "0.95rem", borderRadius: "999px" }}
            >
              <i className="fa-brands fa-github" style={{ fontSize: "1.2rem" }} />
              Explore All My Repositories on GitHub ↗
            </a>
          </div>

          <div className="work-list">
            {projectsList.map((project) => (
              <div className="work-row-card" key={project.title}>
                <div className="work-preview-side">
                  {project.previewType === "catalog" && (
                    <div style={{ textAlign: "center", color: "var(--accent)" }}>
                      <i className="fa-solid fa-list-check" style={{ fontSize: "4rem" }} />
                      <div style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: "12px" }}>
                        UniHack CatalogIQ
                      </div>
                    </div>
                  )}
                  {project.previewType === "canteen" && (
                    <div style={{ textAlign: "center", color: "var(--accent)" }}>
                      <i className="fa-solid fa-utensils" style={{ fontSize: "4rem" }} />
                      <div style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: "12px" }}>
                        SwiftBytes Canteen
                      </div>
                    </div>
                  )}
                  {project.previewType === "attendance" && (
                    <div style={{ textAlign: "center", color: "var(--accent)" }}>
                      <i className="fa-solid fa-calendar-check" style={{ fontSize: "4rem" }} />
                      <div style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: "12px" }}>
                        AttendSync Planner
                      </div>
                    </div>
                  )}
                  {project.previewType === "finance" && (
                    <div style={{ textAlign: "center", color: "var(--accent)" }}>
                      <i className="fa-solid fa-wallet" style={{ fontSize: "4rem" }} />
                      <div style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: "12px" }}>
                        FinTrack-Pro
                      </div>
                    </div>
                  )}
                  {project.previewType === "travel" && (
                    <div style={{ textAlign: "center", color: "var(--accent)" }}>
                      <i className="fa-solid fa-plane-departure" style={{ fontSize: "4rem" }} />
                      <div style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: "12px" }}>
                        TravelNest Listings
                      </div>
                    </div>
                  )}
                  {project.previewType === "url" && (
                    <div style={{ textAlign: "center", color: "var(--accent)" }}>
                      <i className="fa-solid fa-link" style={{ fontSize: "4rem" }} />
                      <div style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: "12px" }}>
                        Tiny Cut Shortener
                      </div>
                    </div>
                  )}
                  {project.previewType === "mini" && (
                    <div style={{ textAlign: "center", color: "var(--accent)" }}>
                      <i className="fa-solid fa-cubes" style={{ fontSize: "4rem" }} />
                      <div style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: "12px" }}>
                        Learning Sandbox
                      </div>
                    </div>
                  )}
                </div>
                <div className="work-content-side">
                  <h3 className="work-title">{project.title}</h3>
                  <p className="work-desc">{project.description}</p>
                  <div className="work-tags-row">
                    {project.tags.map((t) => (
                      <span className="work-tag-pill" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="work-actions">
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                    >
                      <i className="fa-brands fa-github" style={{ marginRight: "6px" }} /> Source
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary"
                      >
                        <i className="fa-solid fa-globe" style={{ marginRight: "6px" }} /> Live demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICATIONS SECTION */}
        <div className={`section ${activePage === "certifications" ? "active" : ""}`} id="certifications">
          <span className="section-pretitle">Certifications</span>
          <h2 className="section-title">Verified Achievements &amp; Credentials</h2>
          <p className="work-intro" style={{ marginBottom: "24px" }}>
            Professional designations, academic achievements, and prompt engineering credentials validating skill sets:
          </p>

          <div style={{ marginBottom: "36px", display: "flex", justifyContent: "flex-start" }}>
            <a
              href="https://www.linkedin.com/in/pruthvi-raj-g-718380340/details/certifications/"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 24px", fontSize: "0.95rem", borderRadius: "999px" }}
            >
              <i className="fa-brands fa-linkedin" style={{ fontSize: "1.2rem" }} />
              View More Credentials on LinkedIn ↗
            </a>
          </div>

          <div className="skills-deck" style={{ marginBottom: "40px" }}>
            {certificationsList.map((cert, index) => (
              <div
                className="skills-group-card"
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "400px",
                }}
              >
                <div>
                  {cert.previewImage ? (
                    <div style={{ width: "100%", height: "160px", overflow: "hidden", borderRadius: "12px", marginBottom: "16px", border: "1px solid var(--border)" }}>
                      <img src={cert.previewImage} alt={cert.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ) : (
                    <div style={{ width: "100%", height: "160px", backgroundColor: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", marginBottom: "16px", border: "1px solid var(--border)" }}>
                      <i className="fa-regular fa-file-pdf" style={{ fontSize: "3rem", color: "var(--text-muted)" }} />
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <i className={cert.icon} style={{ fontSize: "1.25rem", color: "var(--accent)" }} />
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "800" }}>{cert.title}</h3>
                  </div>
                  <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--accent)", display: "block", marginBottom: "10px" }}>
                    {cert.issuer} &bull; {cert.date}
                  </span>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "16px" }}>
                    {cert.description}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                  <span className="skills-tag-item" style={{ fontSize: "0.75rem", padding: "4px 10px", fontWeight: "700" }}>
                    {cert.badge}
                  </span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary"
                        style={{ padding: "6px 14px", fontSize: "0.75rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "999px" }}
                      >
                        Verify
                      </a>
                    )}
                    {cert.fileUrl && (
                      <a
                        href={cert.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary"
                        style={{ padding: "6px 14px", fontSize: "0.75rem", borderRadius: "999px" }}
                      >
                        View ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EDUCATION SECTION */}
        <div className={`section ${activePage === "education" ? "active" : ""}`} id="education">
          <span className="section-pretitle">Learning</span>
          <h2 className="section-title">Education &amp; Academic Background</h2>
          <p className="work-intro" style={{ marginBottom: "36px" }}>
            My academic timeline, certifications, and educational milestones:
          </p>
          <div className="skills-deck" style={{ marginBottom: "40px" }}>
            {educationList.map((edu, index) => (
              <div
                className="skills-group-card"
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "240px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <i className="fa-solid fa-graduation-cap" style={{ fontSize: "1.4rem", color: "var(--accent)" }} />
                    <h3 style={{ fontSize: "1.15rem", fontWeight: "800" }}>{edu.college}</h3>
                  </div>
                  <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--accent)", display: "block", marginBottom: "10px" }}>
                    {edu.degree} {edu.affiliation ? `(${edu.affiliation})` : ""}
                  </span>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "16px" }}>
                    {edu.description}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                  <span className="skills-tag-item" style={{ fontSize: "0.75rem", padding: "4px 10px", fontWeight: "700" }}>
                    {edu.date}
                  </span>
                  {edu.cgpa && (
                    <span className="skills-tag-item" style={{ fontSize: "0.75rem", padding: "4px 10px", fontWeight: "700", backgroundColor: "var(--accent)", color: "#ffffff" }}>
                      CGPA: {edu.cgpa}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EXPERIENCE SECTION */}
        <div className={`section ${activePage === "experience" ? "active" : ""}`} id="experience">
          <span className="section-pretitle">Experience</span>
          <h2 className="section-title">Milestones, Hackathons &amp; Contests</h2>
          
          <div className="experience-columns-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", marginTop: "32px" }}>
            
            {/* HACKATHONS CARD */}
            <div className="skills-group-card" style={{ padding: "28px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "800", marginBottom: "24px", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fa-solid fa-trophy" />
                Hackathons &amp; Competitions
              </h3>
              <div className="timeline-container" style={{ paddingLeft: "8px" }}>
                
                {/* ISRO Hackathon */}
                <div style={{ marginBottom: "28px", borderLeft: "2px solid var(--border)", paddingLeft: "16px", position: "relative" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "var(--accent)", position: "absolute", left: "-7px", top: "6px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: "800" }}>ISRO Space Hackathon</h4>
                    <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--text-muted)" }}>Aug 2025</span>
                  </div>
                  <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "12px" }}>
                    Participated in the national space hackathon hosted by ISRO, focusing on spatial analysis, satellite imagery processing, and visualization modules.
                  </p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <span className="timeline-tag" style={{ padding: "3px 8px", fontSize: "0.75rem", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", fontWeight: "600" }}>ISRO</span>
                    <span className="timeline-tag" style={{ padding: "3px 8px", fontSize: "0.75rem", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", fontWeight: "600" }}>Geospatial</span>
                    <span className="timeline-tag" style={{ padding: "3px 8px", fontSize: "0.75rem", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", fontWeight: "600" }}>Hackathon</span>
                  </div>
                </div>

                {/* Flipkart GRID 8.0 */}
                <div style={{ marginBottom: "28px", borderLeft: "2px solid var(--border)", paddingLeft: "16px", position: "relative" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "var(--accent)", position: "absolute", left: "-7px", top: "6px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: "800" }}>Flipkart GRID 8.0</h4>
                    <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--text-muted)" }}>Milestone</span>
                  </div>
                  <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "12px" }}>
                    Competed in Flipkart's premier flagship national engineering hackathon, working on software development tracks and scalable design pipelines.
                  </p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <span className="timeline-tag" style={{ padding: "3px 8px", fontSize: "0.75rem", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", fontWeight: "600" }}>Flipkart</span>
                    <span className="timeline-tag" style={{ padding: "3px 8px", fontSize: "0.75rem", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", fontWeight: "600" }}>System Design</span>
                    <span className="timeline-tag" style={{ padding: "3px 8px", fontSize: "0.75rem", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", fontWeight: "600" }}>Algorithms</span>
                  </div>
                </div>

                {/* FLOWZINT */}
                <div style={{ borderLeft: "2px solid var(--border)", paddingLeft: "16px", position: "relative" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "var(--accent)", position: "absolute", left: "-7px", top: "6px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: "800" }}>FLOWZINT AI Hackathon</h4>
                    <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--accent)" }}>Winner</span>
                  </div>
                  <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "12px" }}>
                    Won the AI Hackathon event by building intelligent prompt workflows and automated data science models.
                  </p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <span className="timeline-tag" style={{ padding: "3px 8px", fontSize: "0.75rem", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", fontWeight: "600" }}>FLOWZINT</span>
                    <span className="timeline-tag" style={{ padding: "3px 8px", fontSize: "0.75rem", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", fontWeight: "600" }}>GenAI</span>
                    <span className="timeline-tag" style={{ padding: "3px 8px", fontSize: "0.75rem", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", fontWeight: "600" }}>LLMs</span>
                  </div>
                </div>

              </div>
            </div>

            {/* CONTESTS CARD */}
            <div className="skills-group-card" style={{ padding: "28px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "800", marginBottom: "24px", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="fa-solid fa-code" />
                Algorithmic Contests &amp; Profiles
              </h3>
              <div className="timeline-container" style={{ paddingLeft: "8px" }}>
                
                {/* LeetCode */}
                <div style={{ borderLeft: "2px solid var(--border)", paddingLeft: "16px", position: "relative" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "var(--accent)", position: "absolute", left: "-7px", top: "6px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: "800" }}>LeetCode Profile</h4>
                    <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "var(--text-muted)" }}>PruthviProLeet</span>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", margin: "14px 0" }}>
                    <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--text)", lineHeight: "1" }}>300+</span>
                    <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: "700" }}>Problems Solved</span>
                  </div>
                  
                  <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "16px" }}>
                    Actively resolving programming challenges across multiple data structures and algorithmic paradigms in Java (Arrays, DP, Stack, Tree, Graphs).
                  </p>
                  
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
                    <span className="timeline-tag" style={{ padding: "3px 8px", fontSize: "0.75rem", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", fontWeight: "600" }}>DSA</span>
                    <span className="timeline-tag" style={{ padding: "3px 8px", fontSize: "0.75rem", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", fontWeight: "600" }}>Java</span>
                    <span className="timeline-tag" style={{ padding: "3px 8px", fontSize: "0.75rem", borderRadius: "4px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", fontWeight: "600" }}>Algorithms</span>
                  </div>
                  
                  <a
                    href="https://leetcode.com/u/PruthviProLeet/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{ padding: "8px 20px", fontSize: "0.8rem", borderRadius: "999px", display: "inline-block" }}
                  >
                    Explore Profile ↗
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className={`section ${activePage === "contact" ? "active" : ""}`} id="contact">
          <div className="contact-hero-card">
            <span className="section-pretitle">Contact</span>
            <h2 className="contact-title">Let&apos;s build something great together.</h2>
            <p className="contact-subtitle">
              Have a project in mind, or just want to say hello? My inbox is always open, and I will get back to you as soon as possible.
            </p>
            <div className="contact-grid">
              <div className="contact-card" onClick={handleCopyEmail} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleCopyEmail()} aria-label="Copy email">
                <lord-icon
                  src="https://cdn.lordicon.com/nocovwne.json"
                  trigger="hover"
                  colors={theme === "dark" ? "primary:#3b82f6,secondary:#f8fafc" : "primary:#2563eb,secondary:#0f172a"}
                  style={{ width: "42px", height: "42px" }}
                />
                <span className="contact-card-title">Email (Click to Copy)</span>
                <span className="contact-card-desc">pruthvi250906@gmail.com</span>
                {copied && <span className="copy-toast" style={{ position: "relative", bottom: "0", marginTop: "8px", animation: "none" }}>Copied!</span>}
              </div>

              <a
                href="https://www.linkedin.com/in/pruthvi-raj-g-718380340/"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <i className="fa-brands fa-linkedin-in contact-card-icon" />
                <span className="contact-card-title">LinkedIn</span>
                <span className="contact-card-desc">Connect on LinkedIn</span>
              </a>

              <a
                href="https://github.com/PruthviRajG25"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <i className="fa-brands fa-github contact-card-icon" />
                <span className="contact-card-title">GitHub</span>
                <span className="contact-card-desc">Check my code repositories</span>
              </a>

              <a
                href="https://leetcode.com/u/PruthviProLeet/"
                target="_blank"
                rel="noreferrer"
                className="contact-card"
              >
                <i className="fa-solid fa-code contact-card-icon" />
                <span className="contact-card-title">LeetCode</span>
                <span className="contact-card-desc">Solve DSA challenges</span>
              </a>

              <div className="contact-card">
                <i className="fa-brands fa-whatsapp contact-card-icon" style={{ color: "#25D366" }} />
                <span className="contact-card-title">WhatsApp</span>
                <span className="contact-card-desc">@PruthviRaj259</span>
              </div>

              <div className="contact-card">
                <i className="fa-brands fa-discord contact-card-icon" style={{ color: "#5865F2" }} />
                <span className="contact-card-title">Discord</span>
                <span className="contact-card-desc">pruthvirajgisro_50964</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
          <img src="/logo.png" alt="PR Logo" style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid var(--border)" }} />
          <p style={{ margin: "0" }}>&copy; {new Date().getFullYear()} pruthvi raj g. Built with passion &amp; Lottie animations.</p>
        </div>
      </footer>

      <button
        className={`back-to-top ${showBackToTop ? "show" : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fa-solid fa-arrow-up" />
      </button>
    </div>
  );
}

export default App;
