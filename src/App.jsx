import { useEffect, useRef } from "react";

const AVATAR_SRC = "/avatar.jpg";

/* ---------- shared icon set (inline SVG, stroke style) ---------- */
const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {path}
  </svg>
);
const icons = {
  cloud: <path d="M6 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 16 8.5a4.5 4.5 0 0 1 .5 9H6Z"/>,
  terminal: <><path d="M4 5h16v14H4z"/><path d="m7 9 3 3-3 3M13 15h4"/></>,
  shield: <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/>,
  chip: <><rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></>,
  box: <><path d="m3 8 9-5 9 5-9 5-9-5Z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"/>,
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>,
  link: <><path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/></>,
  code: <path d="m8 6-6 6 6 6M16 6l6 6-6 6"/>,
  spark: <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5 19 19M19 5l-2.5 2.5M7.5 16.5 5 19"/>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6"/>,
};
const Sticker = ({ color = "sticker-pink", rot = "-6deg", floatCls = "float-slow", children, className = "" }) => (
  <div style={{ "--r": rot }} className={`sticker ${color} ${floatCls} rounded-2xl px-3 py-2 inline-flex items-center gap-2 ${className}`}>
    {children}
  </div>
);

/* ---------- scroll reveal wrapper ---------- */
function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("show"); io.unobserve(el); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

/* ---------- section heading, bubble style ---------- */
function Bubble({ children, size = "text-6xl md:text-8xl" }) {
  return (
    <h2 className={`font-display font-800 ${size} outline-text tracking-wide`} style={{ WebkitTextStroke: "2px #2E2350" }}>
      {children}
    </h2>
  );
}

const NAV = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
      <div className="sticker sticker-yellow rounded-full px-4 py-2 flex items-center justify-between gap-2">
        <a href="#hero" className="font-display font-800 text-lg pl-1">JA</a>
        <nav className="flex gap-1 md:gap-3 text-xs md:text-sm font-mono">
          {NAV.map(n => (
            <a key={n.id} href={`#${n.id}`} className="px-2 py-1 rounded-full hover:bg-white/60 transition">{n.label}</a>
          ))}
        </nav>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="absolute top-24 left-[6%] hidden md:block"><Sticker color="sticker-blue" rot="-10deg"><Icon path={icons.cloud} />cloud</Sticker></div>
      <div className="absolute top-40 right-[8%] hidden md:block"><Sticker color="sticker-mint" rot="8deg" floatCls="float-slow2"><Icon path={icons.terminal} />devops</Sticker></div>
      <div className="absolute bottom-40 left-[10%] hidden md:block"><Sticker color="sticker-lilac" rot="6deg" floatCls="float-slow3"><Icon path={icons.chip} />AI/ML</Sticker></div>
      <div className="absolute bottom-24 right-[10%] hidden md:block"><Sticker color="sticker-pink" rot="-8deg"><Icon path={icons.shield} />cybersec</Sticker></div>

      <Reveal className="text-center">
        <div className="font-mono text-sm sticker sticker-mint inline-block rounded-full px-4 py-1 mb-6 rotate-[-2deg]">$ whoami</div>
        <h1 className="font-display font-800 text-5xl sm:text-7xl md:text-8xl leading-[0.95] outline-text" style={{ WebkitTextStroke: "3px #2E2350" }}>
          JANA<br/>AYMAN
        </h1>
        <p className="font-display text-2xl md:text-3xl mt-2" style={{ color: "#FF5FA8" }}>Class of 2028 ✦</p>
        <p className="max-w-xl mx-auto mt-6 text-ink/80 font-body text-base md:text-lg">
          Computer & Software Engineering student building toward Cloud Security Engineering —
          part DevOps pipelines, part AI models, part "why is this container not starting."
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#projects" className="sticker sticker-pink rounded-full px-6 py-3 font-mono text-sm font-medium hover:-translate-y-1 transition inline-flex items-center gap-2">
            See my projects <Icon path={icons.arrow} className="w-4 h-4" />
          </a>
          <a href="#contact" className="sticker rounded-full px-6 py-3 font-mono text-sm font-medium hover:-translate-y-1 transition">
            Get in touch
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-6 py-24 max-w-5xl mx-auto">
      <Reveal>
        <Bubble>heyaa 👋</Bubble>
      </Reveal>
      <div className="mt-10 grid md:grid-cols-[280px_1fr] gap-10 items-start">
        <Reveal>
          <div className="relative w-fit mx-auto md:mx-0">
            <div className="absolute -top-5 -left-5 z-10"><Sticker color="sticker-yellow" rot="-12deg"><Icon path={icons.spark} className="w-4 h-4"/></Sticker></div>
            <div className="absolute -bottom-5 -right-5 z-10"><Sticker color="sticker-blue" rot="10deg" floatCls="float-slow2"><Icon path={icons.code} className="w-4 h-4"/></Sticker></div>
            <div className="sticker rounded-3xl w-56 h-64 overflow-hidden bg-lilac">
              <img src={AVATAR_SRC} alt="Jana Ayman Mahmoud" className="w-full h-full object-cover" />
            </div>
          </div>
        </Reveal>
        <Reveal>
          <p className="font-body text-lg leading-relaxed text-ink/90">
            My name is Jana. I'm a Computer & Software Engineering student in Cairo with a soft spot for
            <span className="font-semibold"> DevOps, cloud computing, AI</span> and
            <span className="font-semibold"> cybersecurity</span>. I like systems that scale and pipelines that don't
            break at 2am — and when they do break, I actually enjoy the debugging. I've shipped a full-stack LMS,
            simulated an embedded parking system, and trained a deep learning model on CIFAR-10, mostly by refusing
            to close the terminal until it works.
          </p>
          <div className="mt-6 flex flex-col gap-3 font-mono text-sm">
            <a href="mailto:janaaymen944@gmail.com" className="flex items-center gap-3 hover:text-pink transition w-fit">
              <span className="sticker sticker-mint rounded-full p-2"><Icon path={icons.mail} className="w-4 h-4"/></span>
              janaaymen944@gmail.com
            </a>
            <a href="tel:01016577021" className="flex items-center gap-3 hover:text-pink transition w-fit">
              <span className="sticker sticker-blue rounded-full p-2"><Icon path={icons.phone} className="w-4 h-4"/></span>
              01016577021
            </a>
            <span className="flex items-center gap-3 w-fit">
              <span className="sticker sticker-pink rounded-full p-2"><Icon path={icons.pin} className="w-4 h-4"/></span>
              Cairo, Egypt
            </span>
            <span className="flex items-center gap-3 w-fit">
              <span className="sticker sticker-yellow rounded-full p-2"><Icon path={icons.link} className="w-4 h-4"/></span>
              LinkedIn — Jana Ayman Mahmoud
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const TAG_STYLES = ["sticker-pink", "sticker-blue", "sticker-mint", "sticker-yellow", "sticker-lilac"];
function Tag({ children, i = 0 }) {
  return <span className={`sticker ${TAG_STYLES[i % TAG_STYLES.length]} rounded-full px-3 py-1 text-xs font-mono inline-block m-1`}>{children}</span>;
}

function Resume() {
  const experience = [
    { t: "Front-End Diploma", org: "Space Code Academy", d: "Jun – Jul 2025", b: "Built and shipped a responsive personal portfolio with HTML, CSS & JavaScript." },
    { t: "Fundamentals of Deep Learning", org: "NVIDIA Workshop", d: "Aug 2025", b: "Trained image classification & NLP models in TensorFlow/Keras; applied transfer learning & data augmentation." },
    { t: "DevOps Foundations", org: "Sprints", d: "Aug 2025", b: "CI/CD, Git version control, SDLC, Linux basics and cloud computing concepts." },
  ];
  const skills = {
    "Programming": ["C++", "Python", "JavaScript", "React", "MATLAB"],
    "Cloud & DevOps": ["Docker", "Containerization", "Linux basics", "Git / GitHub"],
    "AI & ML": ["Transfer Learning", "TensorFlow", "Keras"],
    "Security": ["Network Security Fundamentals", "Autonomous Cyber Defence (research)"],
  };
  const soft = ["Communication & Presentation", "Team Collaboration", "Time Management", "Problem Solving", "Conflict Handling"];
  const langs = [["Arabic", "Native"], ["English", "Professional"], ["French", "Intermediate"], ["Japanese", "Beginner"]];
  const certs = ["SpaceCode — Front-End Diploma (2025)", "Sprints — DevOps Foundations (2025)", "NVIDIA — Fundamentals of Deep Learning (2025)"];

  return (
    <section id="resume" className="px-6 py-24 bg-white/60">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-14">
          <Bubble>resume ✧</Bubble>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-14">
          <div className="flex flex-col gap-12">
            <Reveal>
              <h3 className="font-display font-700 text-2xl mb-4" style={{ color: "#FF5FA8" }}>Education</h3>
              <div className="dashed-border rounded-2xl p-4 bg-white">
                <p className="font-semibold">BSc, Computer & Software Engineering</p>
                <p className="font-mono text-xs text-ink/60">Misr University for Science and Technology · Sep 2023 – Jun 2028</p>
                <p className="text-sm mt-2 text-ink/80">Focus: DevOps, cloud computing, AI-powered systems. Coursework: Computer Networks, Software Engineering, AI, Communication Systems, Cybersecurity Fundamentals.</p>
              </div>
            </Reveal>

            <Reveal>
              <h3 className="font-display font-700 text-2xl mb-4" style={{ color: "#FF5FA8" }}>Experience</h3>
              <div className="flex flex-col gap-4">
                {experience.map((e, i) => (
                  <div key={i} className="dashed-border rounded-2xl p-4 bg-white">
                    <p className="font-semibold">{e.t} <span className="font-mono text-xs text-ink/50">· {e.org}</span></p>
                    <p className="font-mono text-xs text-ink/50">{e.d}</p>
                    <p className="text-sm mt-2 text-ink/80">{e.b}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h3 className="font-display font-700 text-2xl mb-4" style={{ color: "#FF5FA8" }}>Certifications</h3>
              <ul className="flex flex-col gap-2 font-mono text-sm">
                {certs.map((c, i) => <li key={i} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{background:"#FF5FA8"}}></span>{c}</li>)}
              </ul>
            </Reveal>
          </div>

          <div className="flex flex-col gap-12">
            <Reveal>
              <h3 className="font-display font-700 text-2xl mb-4" style={{ color: "#FF5FA8" }}>Languages</h3>
              <div className="flex flex-col gap-2">
                {langs.map(([l, lvl], i) => (
                  <div key={i} className="flex justify-between items-center dashed-border rounded-xl px-4 py-2 bg-white">
                    <span className="font-semibold text-sm">{l}</span>
                    <span className="font-mono text-xs text-ink/60">{lvl}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h3 className="font-display font-700 text-2xl mb-4" style={{ color: "#FF5FA8" }}>Technical Skills</h3>
              <div className="flex flex-col gap-4">
                {Object.entries(skills).map(([cat, list], i) => (
                  <div key={cat}>
                    <p className="font-mono text-xs uppercase tracking-wide text-ink/50 mb-1">{cat}</p>
                    <div>{list.map((s, j) => <Tag key={s} i={i + j}>{s}</Tag>)}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h3 className="font-display font-700 text-2xl mb-4" style={{ color: "#FF5FA8" }}>Soft Skills</h3>
              <div>{soft.map((s, i) => <Tag key={s} i={i}>{s}</Tag>)}</div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, i }) {
  return (
    <Reveal>
      <div className="sticker rounded-3xl p-6 h-full flex flex-col bg-white hover:-translate-y-1 transition">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-display font-700 text-xl">{p.title}</h4>
          <span className={`sticker ${TAG_STYLES[i % TAG_STYLES.length]} rounded-full p-2 shrink-0`}>
            <Icon path={p.icon} className="w-4 h-4" />
          </span>
        </div>
        <p className="font-mono text-xs text-ink/50 mt-1">{p.meta}</p>
        <p className="text-sm text-ink/80 mt-3 leading-relaxed flex-1">{p.desc}</p>
        <div className="mt-4">{p.tags.map((t, j) => <Tag key={t} i={j}>{t}</Tag>)}</div>
        {p.link && (
          <a href={p.link} target="_blank" rel="noopener noreferrer" className="mt-4 font-mono text-xs inline-flex items-center gap-1 hover:text-pink transition w-fit">
            View on GitHub <Icon path={icons.arrow} className="w-3 h-3" />
          </a>
        )}
      </div>
    </Reveal>
  );
}

function Projects() {
  const projects = [
    {
      title: "Mini Learning Management System",
      meta: "Team project · CSE301 Database Course · Top 3 of all teams",
      desc: "Full-stack LMS from scratch: ERD design & normalization, Node.js/Express REST backend with JWT auth & role-based access, real-time messaging via Socket.io, and a React frontend with dark/light mode for students, instructors & assistants.",
      tags: ["React", "Node.js", "Express", "SQL Server", "Socket.io", "JWT"],
      icon: icons.box,
      link: "https://github.com/Abdelrahman-Noaman/Mini-LMS",
    },
    {
      title: "Smart Parking System",
      meta: "Team project · CSE 491 Computer Interface",
      desc: "Embedded parking assistant on a PIC16F877A microcontroller with an HC-SR04 ultrasonic sensor — real-time distance readout on LCD, LED safety indicators and automatic gate motor control.",
      tags: ["Embedded C", "MikroC", "Proteus", "PIC16F877A"],
      icon: icons.chip,
    },
    {
      title: "Analog Modulation & Demodulation Using AI",
      meta: "Team project · ECE342 Communication Systems",
      desc: "Implemented multiple modulation/demodulation techniques in MATLAB and applied AI models to improve signal demodulation accuracy.",
      tags: ["MATLAB", "AI/ML", "Signal Processing"],
      icon: icons.spark,
    },
    {
      title: "Animal Gallery",
      meta: "SpaceCode Academy — Front-End Diploma project",
      desc: "Interactive gallery web app with a responsive, modern layout, hover effects and animations, dark/light mode, form validation, local storage and a real-time clock.",
      tags: ["HTML", "CSS", "JavaScript"],
      icon: icons.terminal,
    },
    {
      title: "Simple Digital Library System",
      meta: "Team project · CSE 308 Computer Programming",
      desc: "Console-based library manager for adding, viewing, searching, updating and deleting books, built with vectors, structs, functions and conditionals.",
      tags: ["C++"],
      icon: icons.code,
    },
  ];
  return (
    <section id="projects" className="px-6 py-24 max-w-6xl mx-auto">
      <Reveal className="text-center mb-14">
        <Bubble>projects ✦</Bubble>
        <p className="font-mono text-sm text-ink/60 mt-3">$ ls ./projects</p>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 py-24 bg-white/60">
      <Reveal className="max-w-2xl mx-auto text-center">
        <Bubble size="text-5xl md:text-7xl">let's build{"\u00A0"}<br/>something ✧</Bubble>
        <p className="mt-6 text-ink/80">
          Open to internships and collaborations around DevOps, cloud & AI. Reach out any time.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="mailto:janaaymen944@gmail.com" className="sticker sticker-pink rounded-full px-6 py-3 font-mono text-sm inline-flex items-center gap-2">
            <Icon path={icons.mail} className="w-4 h-4"/> janaaymen944@gmail.com
          </a>
          <a href="tel:01016577021" className="sticker sticker-mint rounded-full px-6 py-3 font-mono text-sm inline-flex items-center gap-2">
            <Icon path={icons.phone} className="w-4 h-4"/> 01016577021
          </a>
        </div>
        <p className="font-mono text-xs text-ink/40 mt-14">Cairo, Egypt · built with React &amp; Tailwind</p>
      </Reveal>
    </section>
  );
}

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Resume />
      <Projects />
      <Contact />
    </div>
  );
}
