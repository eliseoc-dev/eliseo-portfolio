import {
  FaPython,
  FaDatabase,
  FaReact,
  FaShieldAlt,
  FaBrain,
  FaChartBar,
} from "react-icons/fa";

import {
  SiFastapi,
  SiTypescript,
} from "react-icons/si";

import { useEffect, useRef, useState } from "react";
import "./App.css";

import retailSalesImg from "./assets/projects/retail-sales.png";
import churnImg from "./assets/projects/customer-churn.png";
import pharmacyImg from "./assets/projects/pharmacy.png";
import secureApiImg from "./assets/projects/secure-api.png";
import codeReviewImg from "./assets/projects/code-review.png";
import financialImg from "./assets/projects/financial-manager.png";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  image: string;
  className: string;
};

const projects: Project[] = [
  {
    title: "Retail Sales Analytics Dashboard",
    description:
      "End-to-end retail analytics project with SQL analysis, KPIs, Excel, Power BI and Streamlit.",
    technologies: ["Python", "SQL", "Power BI", "DAX"],
    github:
      "https://github.com/eliseoc-dev/retail-sales-analytics-dashboard",
    image: retailSalesImg,
    className: "project-retail",
  },
  {
    title: "Customer Churn ML",
    description:
      "Machine learning classification workflow with feature engineering, model comparison and evaluation.",
    technologies: ["Python", "Pandas", "scikit-learn", "ML"],
    github: "https://github.com/eliseoc-dev/customer-churn-ml",
    image: churnImg,
    className: "project-churn",
  },
  {
    title: "Pharmacy Management System",
    description:
      "Full-stack management system with inventory, categories, suppliers and stock monitoring.",
    technologies: ["React", "FastAPI", "TypeScript", "MySQL"],
    github:
      "https://github.com/eliseoc-dev/pharmacy-management-system",
    image: pharmacyImg,
    className: "project-pharmacy",
  },
  {
    title: "Secure API Lab",
    description:
      "Defensive API security project with authentication, authorization, JWT and automated tests.",
    technologies: ["FastAPI", "Python", "JWT", "Security"],
    github: "https://github.com/eliseoc-dev/secure-api-lab",
    image: secureApiImg,
    className: "project-security",
  },
  {
    title: "AI Code Review Assistant",
    description:
      "Static Python analyzer that detects risky patterns, maintainability issues and common mistakes.",
    technologies: ["Python", "AST", "Regex", "Streamlit"],
    github:
      "https://github.com/eliseoc-dev/ai-code-review-assistant",
    image: codeReviewImg,
    className: "project-code",
  },
  {
    title: "Financial Manager",
    description:
      "Python and SQLite personal finance application with transactions, filters and automated tests.",
    technologies: ["Python", "SQLite", "pytest"],
    github: "https://github.com/eliseoc-dev/financial-manager",
    image: financialImg,
    className: "project-finance",
  },
];

const skills = [
  { icon: <FaPython />, name: "Python" },
  { icon: <FaDatabase />, name: "SQL" },
  { icon: <SiFastapi />, name: "FastAPI" },
  { icon: <FaReact />, name: "React" },
  { icon: <SiTypescript />, name: "TypeScript" },
  { icon: <FaChartBar />, name: "Power BI" },
  { icon: <FaBrain />, name: "Machine Learning" },
  { icon: <FaShieldAlt />, name: "Cybersecurity" },
];

/*
  IMPORTANT:
  This order matches the REAL vertical order of the page.

  Home
  Projects
  Skills + Contact
  About
*/
const sectionIds = ["home", "projects", "skills", "contact", "about"];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navbarRef = useRef<HTMLElement | null>(null);
  const wheelLocked = useRef(false);

  /*
    Detect page scroll:
    - changes navbar appearance
    - determines active navigation link
  */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const marker =
        window.scrollY + Math.min(window.innerHeight * 0.35, 300);

      let current = "home";

      for (const id of sectionIds) {
        const element = document.getElementById(id);

        if (!element) continue;

        const absoluteTop =
          element.getBoundingClientRect().top + window.scrollY;

        if (absoluteTop <= marker) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
    Wheel navigation ONLY while pointer is over navbar.

    Native listener is intentionally used with passive:false,
    because React/browser passive wheel handling can prevent
    preventDefault() from actually stopping normal page scroll.
  */
  useEffect(() => {
    const navbar = navbarRef.current;

    if (!navbar) return;

    const handleNavbarWheel = (event: WheelEvent) => {
      /*
        Do not hijack browser zoom gestures.
      */
      if (event.ctrlKey) return;

      /*
        On touchpads tiny wheel movements are frequent.
        Ignore very small values.
      */
      if (Math.abs(event.deltaY) < 8) return;

      event.preventDefault();

      if (wheelLocked.current) return;

      wheelLocked.current = true;

      const currentIndex = Math.max(
        0,
        sectionIds.indexOf(activeSection),
      );

      let nextIndex = currentIndex;

      if (event.deltaY > 0) {
        nextIndex = Math.min(
          currentIndex + 1,
          sectionIds.length - 1,
        );
      } else {
        nextIndex = Math.max(currentIndex - 1, 0);
      }

      const nextId = sectionIds[nextIndex];
      const target = document.getElementById(nextId);

      if (target && nextId !== activeSection) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setActiveSection(nextId);
      }

      window.setTimeout(() => {
        wheelLocked.current = false;
      }, 750);
    };

    navbar.addEventListener("wheel", handleNavbarWheel, {
      passive: false,
    });

    return () => {
      navbar.removeEventListener("wheel", handleNavbarWheel);
    };
  }, [activeSection]);

  const navClass = (section: string) =>
    activeSection === section ? "active" : "";

  return (
    <div className="portfolio">
      <div className="scanline" />

      <div className="background-grid" />
      <div className="background-circuit circuit-one" />
      <div className="background-circuit circuit-two" />

      <div className="energy-glow cyan-glow" />
      <div className="energy-glow orange-glow" />

      <header
        ref={navbarRef}
        className={`topbar hud-panel ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <a href="#home" className="identity">
          <div className="logo-frame">
            <span>EC</span>
          </div>

          <div className="identity-text">
            <strong>ELISEO CANALES</strong>
            <small>AI // DATA // SOFTWARE</small>
          </div>
        </a>

        <nav className="navigation">
          <a className={navClass("home")} href="#home">
            Home
          </a>

          <a
            className={navClass("projects")}
            href="#projects"
          >
            Projects
          </a>

          <a className={navClass("skills")} href="#skills">
            Skills
          </a>

          <a
            className={navClass("contact")}
            href="#contact"
          >
            Contact
          </a>

          <a className={navClass("about")} href="#about">
            About
          </a>
        </nav>

        <div className="nav-signal">
          <span className="signal-dot" />
          TURN IDEAS INTO SYSTEMS
        </div>
      </header>

      <main>
        {/* =========================
            HERO
        ========================== */}

        <section id="home" className="hero scroll-section">
          <div className="hero-copy">
            <div className="system-label">
              DEVELOPER // ANALYTICS // AI
            </div>

            <h1>
              <span className="name-white">ELISEO</span>
              <span className="name-cyan">CANALES</span>
            </h1>

            <h2>AI, Data & Full-Stack Developer</h2>

            <p>
              Building practical systems with Python, data
              analytics, machine learning and modern web
              technologies.
            </p>

            <div className="hero-actions">
              <a
                href="#projects"
                className="neon-button primary"
              >
                <span>VIEW PROJECTS</span>
                <strong>≫</strong>
              </a>

              <a
                href="#contact"
                className="neon-button secondary"
              >
                CONTACT
              </a>
            </div>
          </div>

          <div className="hero-core">
            <div className="core-frame">
              <div className="core-circle outer" />

              <div className="core-circle middle" />

              <div className="core-circle inner">
                <span>EC</span>
              </div>

              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />

              <div className="core-label label-ai">AI</div>

              <div className="core-label label-data">
                DATA
              </div>

              <div className="core-label label-code">
                CODE
              </div>
            </div>

            <div className="mission-card glass-panel">
              <span className="orange-dash" />

              <p>CLEAN CODE</p>
              <p>MEANINGFUL DATA</p>
              <p>REAL SOLUTIONS</p>
            </div>
          </div>

          <div className="hero-footer-line">
            <span>SYS.01</span>

            <div />

            <span>PORTFOLIO ONLINE</span>
          </div>
        </section>

        {/* =========================
            PROJECTS
        ========================== */}

        <section
          id="projects"
          className="projects section-frame scroll-section"
        >
          <div className="section-heading">
            <div>
              <span className="orange-dash" />

              <h2>FEATURED PROJECTS</h2>
            </div>

            <p>
              SOLVING REAL PROBLEMS
              <span>•</span>
              ONE PROJECT AT A TIME
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className={`project-card ${project.className}`}
              >
                <div className="project-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="project-visual">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="project-image"
                    loading="lazy"
                  />

                  <div className="project-image-overlay" />
                </div>

                <div className="project-body">
                  <div className="project-title-row">
                    <h3>{project.title}</h3>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} on GitHub`}
                    >
                      ↗
                    </a>
                  </div>

                  <p>{project.description}</p>

                  <div className="tech-list">
                    {project.technologies.map(
                      (technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =========================
            SKILLS + CONTACT
        ========================== */}

        <section className="lower-grid">
          <section
            id="skills"
            className="skills section-frame scroll-section"
          >
            <div className="section-heading compact">
              <div>
                <span className="orange-dash" />

                <h2>TECH STACK & SKILLS</h2>
              </div>
            </div>

            <div className="skills-grid">
              {skills.map((skill) => (
                <article className="skill-card" key={skill.name}>
                  <div className="skill-icon-wrap">
                    <span className="skill-icon">{skill.icon}</span>
                  </div>
                  <p className="skill-name">{skill.name}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            id="contact"
            className="contact section-frame scroll-section"
          >
            <div className="section-heading compact">
              <div>
                <span className="orange-dash" />

                <h2>LET'S CONNECT</h2>
              </div>

              <p className="open-status">
                <span />
                OPEN TO OPPORTUNITIES
              </p>
            </div>

            <p className="contact-copy">
              Interested in Data, AI, Python, backend and
              hybrid technical opportunities.
            </p>

            <div className="contact-links">
              <a
                href="https://github.com/eliseoc-dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <small>GITHUB</small>
                <strong>eliseoc-dev</strong>
              </a>

              <a
                href="https://www.linkedin.com/in/eliseo-canales-m124447/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <small>LINKEDIN</small>
                <strong>Eliseo Canales</strong>
              </a>

              <a href="mailto:eliseoc.dev@gmail.com">
                <small>EMAIL</small>
                <strong>eliseoc.dev@gmail.com</strong>
              </a>

              <a
                href="mailto:eliseoc.dev@gmail.com"
                className="neon-button primary contact-button"
              >
                GET IN TOUCH
                <strong>→</strong>
              </a>
            </div>
          </section>
        </section>

        {/* =========================
            ABOUT
        ========================== */}

        <section
          id="about"
          className="about-section section-frame scroll-section"
        >
          <div className="about-header">
            <span className="orange-dash" />

            <div>
              <span className="system-label">
                ABOUT // PROFILE
              </span>

              <h2>BUILDING ACROSS DISCIPLINES</h2>
            </div>
          </div>

          <div className="about-grid">
            <div className="about-main">
              <p>
                I’m Eliseo Canales, an Artificial
                Intelligence and Data Science student focused
                on building practical solutions across Data
                Analytics, Machine Learning, Backend
                Development and Cybersecurity.
              </p>

              <p>
                I enjoy connecting different technical areas
                instead of treating them as isolated
                disciplines — from analyzing data and
                creating predictive models to building APIs,
                full-stack applications and secure systems.
              </p>

              <div className="about-actions">
                <a
                  href="/Eliseo_Canales_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-button primary"
                >
                  VIEW CV
                  <strong>↗</strong>
                </a>

                <a
                  href="https://github.com/eliseoc-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-button secondary"
                >
                  GITHUB
                </a>
              </div>
            </div>

            <div className="about-data">
              <div>
                <small>STATUS</small>
                <strong>Open to Opportunities</strong>
              </div>

              <div>
                <small>EDUCATION</small>
                <strong>AI & Data Science</strong>
              </div>

              <div>
                <small>LOCATION</small>
                <strong>Ecuador</strong>
              </div>

              <div>
                <small>FOCUS</small>
                <strong>AI // Data // Backend</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 ELISEO CANALES</span>

        <span>PORTFOLIO SYSTEM // ONLINE</span>
      </footer>
    </div>
  );
}

export default App;