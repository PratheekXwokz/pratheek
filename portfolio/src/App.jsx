import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const themes = [
  {
    id: 'aurora',
    name: 'Aurora',
    desc: 'Luminous teal + deep navy',
  },
  {
    id: 'ember',
    name: 'Ember',
    desc: 'Warm copper + charcoal',
  },
  {
    id: 'coastal',
    name: 'Coastal',
    desc: 'Ocean blue + sand',
  },
  {
    id: 'noir',
    name: 'Noir',
    desc: 'High-contrast mono',
  },
]

const highlights = [
  {
    title: 'RxDx Streamline — Healthcare & AI Platform',
    focus: 'Next.js · React · RAG · ABHA/ICD/LOINC',
    description:
      'Built core hospital modules, patient monitoring, and AI-assisted insights across structured and unstructured clinical data.',
    outcomes: [
      'RAG layer for clinical query + reasoning',
      'Faster order creation and patient lookup',
      'Deep collaboration with doctors and admins',
    ],
  },
  {
    title: 'AI Purchase Request Automation — Fine Dining',
    focus: 'Node.js · Random Forest · Inventory',
    description:
      'Designed an AI-driven PR system to forecast stock, recommend vendors, and prevent over-ordering.',
    outcomes: [
      'Smarter stock prediction and vendor suggestions',
      'PR approval workflows with audit trails',
      'Dashboards for low-stock alerts and KPIs',
    ],
  },
  {
    title: 'AI Image Analysis & Agentic Workflows',
    focus: 'Python · OpenCV · PyTorch · Flask',
    description:
      'Built imaging pipelines for skin and radiology analysis with explainable UI overlays.',
    outcomes: [
      'Preprocessing + inference APIs for imaging',
      'Prediction scores and heatmap overlays',
      'Agentic patterns for multi-step tasks',
    ],
  },
]

const skills = [
  {
    title: 'Frontend & UI',
    items: ['Next.js', 'React.js', 'JavaScript', 'Tailwind CSS', 'Shadcn UI', 'React Hook Form', 'Zod'],
  },
  {
    title: 'Backend & APIs',
    items: ['Node.js', 'Express.js', 'Java', 'Spring Boot', 'REST APIs', 'Microservice basics'],
  },
  {
    title: 'Data & Tools',
    items: ['MySQL', 'MongoDB', 'Git/GitHub', 'JIRA', 'Postman'],
  },
  {
    title: 'AI & Automation',
    items: ['LLMs', 'Embeddings & Vector Search', 'RAG', 'Image Analysis', 'Agentic Workflows'],
  },
]

function App() {
  const [theme, setTheme] = useState(themes[0].id)
  const [active, setActive] = useState(0)
  const [themeOpen, setThemeOpen] = useState(false)
  const themeRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const cursorRef = useRef({ x: 0, y: 0, fx: 0, fy: 0, raf: 0 })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % highlights.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const state = cursorRef.current

    const onMove = (event) => {
      state.x = event.clientX
      state.y = event.clientY
      if (!state.raf) {
        state.raf = requestAnimationFrame(tick)
      }
    }

    const tick = () => {
      const dx = state.x - state.fx
      const dy = state.y - state.fy
      state.fx += dx * 0.12
      state.fy += dy * 0.12
      root.style.setProperty('--cursor-x', `${state.x}px`)
      root.style.setProperty('--cursor-y', `${state.y}px`)
      root.style.setProperty('--follower-x', `${state.fx}px`)
      root.style.setProperty('--follower-y', `${state.fy}px`)
      if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
        state.raf = requestAnimationFrame(tick)
      } else {
        state.raf = 0
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (state.raf) cancelAnimationFrame(state.raf)
    }
  }, [])


  useEffect(() => {
    if (!themeOpen) return

    const handleClick = (event) => {
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setThemeOpen(false)
      }
    }

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setThemeOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [themeOpen])

  const activeHighlight = useMemo(() => highlights[active], [active])

  return (
    <div className="app">
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-follower" aria-hidden="true" />
      <div className="motion-bg" aria-hidden="true">
        <span className="motion-orb orb-a" />
        <span className="motion-orb orb-b" />
        <span className="motion-orb orb-c" />
        <div className="atom">
          <span className="ring ring-1" />
          <span className="ring ring-2" />
          <span className="ring ring-3" />
          <span className="orbit orbit-1">
            <span className="particle" />
          </span>
          <span className="orbit orbit-2">
            <span className="particle" />
          </span>
        </div>
        <div className="atom atom-sm">
          <span className="ring ring-1" />
          <span className="ring ring-2" />
          <span className="orbit orbit-1">
            <span className="particle" />
          </span>
        </div>
        <div className="atom atom-lg">
          <span className="ring ring-1" />
          <span className="ring ring-2" />
          <span className="ring ring-3" />
          <span className="orbit orbit-1">
            <span className="particle" />
          </span>
          <span className="orbit orbit-2">
            <span className="particle" />
          </span>
          <span className="orbit orbit-3">
            <span className="particle" />
          </span>
        </div>
      </div>
      <div className="sticky-header">
        <nav className={isScrolled ? 'nav scrolled' : 'nav'}>
          <div className="logo">PP</div>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-actions">
            <a className="ghost-btn" href="/Pratheek_Resume.pdf" download>
              Download Resume
            </a>
          </div>
        </nav>
      </div>

      <header className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Software Engineer · Bengaluru</p>
            <h1>
              Pratheek Palangappa
              <span>AI-driven web systems, built for clarity and speed.</span>
            </h1>
            <p className="hero-body">
              Software Engineer with 2.5 years of experience building healthcare and inventory platforms,
              AI-enabled automation, and agentic workflows. Specialized in Next.js, React, Node.js, Java,
              and production AI integrations.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#projects">
                View Featured Work
              </a>
              <a className="secondary-btn" href="#contact">
                Let’s Collaborate
              </a>
            </div>
            <div className="stats">
              <div>
                <h3>2.5+</h3>
                <p>Years Experience</p>
              </div>
              <div>
                <h3>3</h3>
                <p>Production AI Systems</p>
              </div>
              <div>
                <h3>5+</h3>
                <p>Healthcare Modules</p>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="quick-tiles">
              <div>
                <h4>Domain Focus</h4>
                <p>Healthcare, Inventory, AI Automation</p>
              </div>
              <div>
                <h4>Core Stack</h4>
                <p>Next.js, React, Node.js, Java, Python</p>
              </div>
              <div>
                <h4>AI Toolbox</h4>
                <p>LLMs, RAG, embeddings, vector search</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="work">
        <div className="section-heading">
          <h2>Experience Snapshot</h2>
          <p>What I bring to teams building high-impact software.</p>
        </div>
        <div className="grid-2">
          <div className="card">
            <h3>Experience Summary</h3>
            <ul>
              <li>Proficient in Next.js, React.js, Node.js, Java, Python, and REST APIs.</li>
              <li>Built AI-enabled features using LLMs, embeddings, and vector search.</li>
              <li>Hands-on with EMR, inventory, patient monitoring, and clinical code mapping.</li>
              <li>Developed AI purchase automation for fine dining inventory management.</li>
              <li>Created imaging pipelines for skin and radiology anomaly detection.</li>
            </ul>
          </div>
          <div className="card">
            <h3>Roles & Responsibilities</h3>
            <ul>
              <li>Own end-to-end feature lifecycle across frontend, backend, and AI.</li>
              <li>Translate clinical and business requirements into clean UX flows.</li>
              <li>Implement secure-by-default patterns for healthcare data.</li>
              <li>Optimize data access with caching and async processing.</li>
              <li>Support production with monitoring and troubleshooting.</li>
            </ul>
          </div>
        </div>
        <div className="timeline card">
          <div>
            <h3>Software Engineer · GyrIT Solutions</h3>
            <p>Aug 2023 – Present · Bengaluru</p>
          </div>
          <div className="timeline-content">
            <ul>
              <li>Developed hospital modules: Drugs & Consumables, Inventory, HR, Masters.</li>
              <li>Built responsive workflows for requests and tracking across departments.</li>
              <li>Integrated REST APIs for billing, EMR, TPA, and dashboards.</li>
              <li>Designed RAG layer for structured + unstructured clinical data.</li>
              <li>Improved usability through feedback loops with clinicians.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <h2>Featured Projects</h2>
          <p>Multi-domain builds with measurable outcomes.</p>
        </div>
        <div className="carousel">
          <div className="carousel-panel">
            <div className="carousel-left">
              <p className="tag">{activeHighlight.focus}</p>
              <h3>{activeHighlight.title}</h3>
              <p>{activeHighlight.description}</p>
              <ul>
                {activeHighlight.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="carousel-right">
              <div className="meter">
                <span>System Impact</span>
                <div className="meter-bar">
                  <div style={{ width: `${80 + active * 5}%` }} />
                </div>
              </div>
              <div className="metric-grid">
                <div>
                  <h4>AI + UX</h4>
                  <p>Productionized workflows</p>
                </div>
                <div>
                  <h4>Reliability</h4>
                  <p>Audit-ready pipelines</p>
                </div>
                <div>
                  <h4>Velocity</h4>
                  <p>Faster clinical flows</p>
                </div>
                <div>
                  <h4>Accuracy</h4>
                  <p>Iterative model tuning</p>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-controls">
            <button type="button" onClick={() => setActive((prev) => (prev - 1 + highlights.length) % highlights.length)}>
              Prev
            </button>
            <div className="dots">
              {highlights.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={index === active ? 'dot active' : 'dot'}
                  onClick={() => setActive(index)}
                />
              ))}
            </div>
            <button type="button" onClick={() => setActive((prev) => (prev + 1) % highlights.length)}>
              Next
            </button>
          </div>
        </div>
      </section>

      <section className="section" id="skills">
        <div className="section-heading">
          <h2>Skills & Tooling</h2>
          <p>Full-stack engineering with applied AI systems.</p>
        </div>
        <div className="skills-grid">
          {skills.map((group) => (
            <div className="card" key={group.title}>
              <h3>{group.title}</h3>
              <div className="pill-grid">
                {group.items.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="education">
        <div className="section-heading">
          <h2>Education</h2>
          <p>Academic foundation with applied engineering focus.</p>
        </div>
        <div className="card education">
          <div>
            <h3>Bachelor of Engineering (ECE)</h3>
            <p>AMC Engineering College, Bengaluru (VTU)</p>
          </div>
          <span className="badge">2019</span>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="section-heading">
          <h2>Let’s Build Together</h2>
          <p>Open to opportunities in full-stack engineering and AI products.</p>
        </div>
        <div className="contact-card">
          <div>
            <h3>Contact</h3>
            <p>Email: palangappa8@gmail.com</p>
            <p>Phone: +91-9008164388</p>
            <p>Location: Bengaluru</p>
          </div>
          <div className="contact-actions">
            <a className="primary-btn" href="mailto:palangappa8@gmail.com">
              Email Me
            </a>
            <a className="ghost-btn" href="/Pratheek_Resume.pdf" download>
              Download Resume
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Pratheek Palangappa · Crafted with React</p>
        <a href="#top">Back to top</a>
      </footer>

      <div className={themeOpen ? 'theme-fab open' : 'theme-fab'} ref={themeRef}>
        <button
          className="theme-toggle"
          type="button"
          aria-label="Open theme selector"
          aria-expanded={themeOpen}
          onClick={() => setThemeOpen((prev) => !prev)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5A2.5 2.5 0 0 1 18 14.5h-1a3.5 3.5 0 0 0-3.5 3.5v1A2.5 2.5 0 0 1 11 21.5 8.5 8.5 0 0 1 12 3.5Zm-4 9a1.5 1.5 0 1 0-1.5-1.5A1.5 1.5 0 0 0 8 12.5Zm4-3a1.5 1.5 0 1 0-1.5-1.5A1.5 1.5 0 0 0 12 9.5Zm4 3a1.5 1.5 0 1 0-1.5-1.5A1.5 1.5 0 0 0 16 12.5Z" />
          </svg>
        </button>
        <div className="theme-menu" role="menu">
          {themes.map((item) => (
            <button
              key={item.id}
              className={theme === item.id ? 'theme-btn active' : 'theme-btn'}
              onClick={() => {
                setTheme(item.id)
                setThemeOpen(false)
              }}
              type="button"
              role="menuitem"
            >
              <span className={`swatch swatch-${item.id}`} />
              <span>
                <strong>{item.name}</strong>
                <small>{item.desc}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
