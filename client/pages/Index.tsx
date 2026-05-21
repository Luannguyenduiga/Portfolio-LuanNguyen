import { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Terminal,
  Database,
  Server,
  Cpu,
  ChevronRight,
  Code2,
  GitBranch,
  Layers,
  Zap,
  MapPin,
  GraduationCap,
  Briefcase,
  Calendar,
  ArrowUpRight,
  Phone,
  Award,
  ShieldCheck,
  Trophy,
} from "lucide-react";

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }[] = [];
    const PARTICLE_COUNT = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(170, 100%, 50%, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(170, 100%, 50%, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}


function useTypingEffect(texts: string[], speed = 60, deleteSpeed = 30, pause = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentText.length) {
            setDisplayText(currentText.slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(currentText.slice(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            setIsDeleting(false);
            setTextIndex((textIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pause]);

  return displayText;
}

//Scroll Animation Hook 
function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// Terminal 
function TerminalHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(220,18%,8%)] border-b border-border">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[hsl(0,80%,55%)]" />
        <div className="w-3 h-3 rounded-full bg-[hsl(45,100%,55%)]" />
        <div className="w-3 h-3 rounded-full bg-[hsl(142,70%,50%)]" />
      </div>
      <span className="ml-2 text-xs font-mono text-muted-foreground">{title}</span>
    </div>
  );
}

// Section Title Component 
function SectionTitle({ icon: Icon, label, title }: { icon: any; label: string; title: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-[hsl(170,100%,50%)]" />
        <span className="font-mono text-sm text-[hsl(170,100%,50%)] tracking-wider uppercase">
          {label}
        </span>
      </div>
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">{title}</h2>
    </div>
  );
}

// Main  Component 
export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const typingText = useTypingEffect(
    [
      "Building scalable APIs",
      "Optimizing databases",
      "Designing system architecture",
      "Crafting clean code",
    ],
    55,
    30,
    2500
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section
      const sections = ["about", "skills", "work", "achievements", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  }, []);

  const navLinks = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "work", label: "Work" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" },
  ];

  const techStack = [
    {
      category: "Backend",
      icon: Server,
      color: "hsl(170,100%,50%)",
      items: [
        { name: "Java", level: 80 },
        { name: "Node.js", level: 85 },
        { name: "Fastify", level: 80 },
        { name: "NestJS", level: 75 },
        { name: "RESTful APIs", level: 90 },
      ],
    },
    {
      category: "Database",
      icon: Database,
      color: "hsl(210,100%,60%)",
      items: [
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 75 },
        { name: "SQL Optimization", level: 80 },
        { name: "Redis", level: 65 },
      ],
    },
    {
      category: "DevOps & Tools",
      icon: Cpu,
      color: "hsl(270,80%,65%)",
      items: [
        { name: "Git / GitHub", level: 85 },
        { name: "Docker", level: 70 },
        { name: "Postman", level: 85 },
        { name: "Linux", level: 70 },
      ],
    },
  ];

  const projects = [
    {
      id: "gender-insights",
      title: "Gender Insights",
      role: "Backend Developer Intern",
      period: "10/2025 - 04/2026",
      description:
        "Built 15+ high-availability RESTful APIs with Fastify. Optimized PostgreSQL queries, reducing latency by 40%. Implemented strict 3NF normalization for data integrity.",
      highlights: ["Fastify", "PostgreSQL", "API Design", "Performance Optimization","Postman"],
      link: "https://genderinsights.vercel.app",
      metrics: [
        { label: "APIs Built", value: "15+" },
        { label: "Latency Reduced", value: "40%" },
        { label: "Uptime", value: "99.9%" },
      ],
    },
  ];

  const codeSnippet = `// luan.config.ts
const developer = {
  name: "Luan Nguyen",
  role: "Backend Developer",
  location: "Ho Chi Minh City, VN",
  education: "HCMUNRE - IT (2024-2028)",
  
  passion: [
    "System Design",
    "Clean Architecture", 
    "Database Optimization",
    "API Engineering"
  ],
  
  currentFocus: "Building scalable 
    backend systems",
  openToWork: true,
};

export default developer;`;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <ParticleBackground />

      {/*Navigation*/}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[hsl(170,100%,50%)] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-background" />
            </div>
            <span className="font-mono text-sm font-semibold tracking-wide">
              <span className="text-[hsl(170,100%,50%)]">~/</span>Luan Nguyen
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-mono text-xs px-3 py-2 rounded-md transition-all duration-300 ${
                  activeSection === link.id
                    ? "text-[hsl(170,100%,50%)] bg-[hsl(170,100%,50%,0.1)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-5 h-0.5 bg-current transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-current transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-current transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border">
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="font-mono text-sm text-left px-3 py-2 text-muted-foreground hover:text-[hsl(170,100%,50%)] transition-colors"
                >
                  <ChevronRight className="w-3 h-3 inline mr-1" />
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-[hsl(170,100%,50%,0.04)] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-[hsl(210,100%,60%,0.04)] rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Info */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(170,100%,50%,0.08)] border border-[hsl(170,100%,50%,0.2)] mb-6">
                <span className="w-2 h-2 rounded-full bg-[hsl(142,70%,55%)] animate-pulse" />
                <span className="font-mono text-xs text-[hsl(170,100%,50%)]">
                  Available for opportunities
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-2 leading-[1.1]">
                <span className="text-foreground">Luan</span>
                <br />
                <span className="gradient-text-cyan">Nguyen</span>
              </h1>

              <div className="flex items-center gap-2 mt-4 mb-6">
                <Terminal className="w-4 h-4 text-[hsl(170,100%,50%)]" />
                <span className="font-mono text-base text-muted-foreground">
                  Backend Developer
                </span>
              </div>

              <div className="font-mono text-sm mb-8 h-6">
                <span className="text-muted-foreground">{">"} </span>
                <span className="text-[hsl(142,70%,55%)]">{typingText}</span>
                <span className="cursor-blink text-[hsl(170,100%,50%)]">▋</span>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-lg">
                I build scalable backend systems and optimize database performance. Currently an
                intern crafting high-availability APIs with modern technologies.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => scrollToSection("work")}
                  className="group px-6 py-3 bg-[hsl(170,100%,50%)] text-background rounded-lg font-medium text-sm hover:bg-[hsl(170,100%,55%)] transition-all duration-300 flex items-center justify-center gap-2 glow-cyan"
                >
                  <Code2 className="w-4 h-4" />
                  View My Work
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3 border border-border text-foreground rounded-lg font-medium text-sm hover:border-[hsl(170,100%,50%,0.5)] hover:bg-[hsl(170,100%,50%,0.05)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </button>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-8">
                <a
                  href="https://github.com/luannguyenduiga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-[hsl(170,100%,50%)] hover:border-[hsl(170,100%,50%,0.3)] transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-[hsl(210,100%,60%)] hover:border-[hsl(210,100%,60%,0.3)] transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:nguyenthanhluan13022006@gmail.com"
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-[hsl(270,80%,65%)] hover:border-[hsl(270,80%,65%,0.3)] transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: Avatar + Code Card */}
            <div className="order-1 lg:order-2 flex flex-col items-center gap-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-[hsl(170,100%,50%,0.3)] glow-cyan relative z-10">
                  <img
                    src="/images/avt.jpg"
                    alt="Luan Nguyen"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[hsl(170,100%,50%,0.4)] rounded-tr-lg" />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[hsl(170,100%,50%,0.4)] rounded-bl-lg" />
                <div className="absolute -inset-4 rounded-2xl border border-[hsl(170,100%,50%,0.08)] -z-10" />
              </div>

              {/* Code snippet card */}
              <div className="terminal-window w-full max-w-md hidden sm:block">
                <TerminalHeader title="luan.config.ts" />
                <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                  {codeSnippet.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-muted-foreground/40 select-none w-6 text-right mr-4 shrink-0">
                        {i + 1}
                      </span>
                      <span>
                        <CodeLine text={line} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
            SCROLL
          </span>
          <div className="w-5 h-8 border border-muted-foreground/30 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-[hsl(170,100%,50%)] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle icon={Terminal} label="whoami" title="About Me" />

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left: Terminal-style About */}
            <div className="lg:col-span-3">
              <AnimatedCard delay={0}>
                <div className="terminal-window">
                  <TerminalHeader title="~/about — bash" />
                  <div className="p-6 font-mono text-sm space-y-4">
                    <div>
                      <span className="text-[hsl(170,100%,50%)]">luan@dev</span>
                      <span className="text-muted-foreground">:</span>
                      <span className="text-[hsl(210,100%,60%)]">~</span>
                      <span className="text-muted-foreground">$ </span>
                      <span className="text-foreground">cat about.md</span>
                    </div>
                    <div className="text-muted-foreground leading-relaxed space-y-3 pl-0">
                      <p>
                        I'm a second-year IT student at{" "}
                        <span className="text-[hsl(170,100%,50%)]">
                          Ho Chi Minh University of Natural Resources and Environment
                        </span>
                        , passionate about building robust backend systems and optimizing database
                        performance.
                      </p>
                      <p>
                        Currently working as a{" "}
                        <span className="text-[hsl(142,70%,55%)]">Backend Developer Intern</span>{" "}
                        where I architect high-availability APIs, optimize database queries, and
                        collaborate with cross-functional teams.
                      </p>
                      <p>
                        I think in{" "}
                        <span className="text-[hsl(270,80%,65%)]">systems</span> and obsess over{" "}
                        <span className="text-[hsl(45,100%,65%)]">clean architecture</span>. When
                        I'm not coding, you'll find me reading about system design, exploring new
                        technologies, or contributing to the tech community.
                      </p>
                    </div>
                    <div>
                      <span className="text-[hsl(170,100%,50%)]">luan@dev</span>
                      <span className="text-muted-foreground">:</span>
                      <span className="text-[hsl(210,100%,60%)]">~</span>
                      <span className="text-muted-foreground">$ </span>
                      <span className="cursor-blink text-[hsl(170,100%,50%)]">▋</span>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>

            {/* Right: Info Cards */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatedCard delay={100}>
                <InfoCard
                  icon={MapPin}
                  label="Location"
                  value="Ho Chi Minh City, Vietnam"
                  color="hsl(170,100%,50%)"
                />
              </AnimatedCard>
              <AnimatedCard delay={200}>
                <InfoCard
                  icon={Briefcase}
                  label="Experience"
                  value="Backend Developer Intern"
                  color="hsl(142,70%,55%)"
                />
              </AnimatedCard>
              <AnimatedCard delay={300}>
                <InfoCard
                  icon={GraduationCap}
                  label="Education"
                  value="HCMUNRE - Information Technology"
                  sub="2024 - 2028"
                  color="hsl(210,100%,60%)"
                />
              </AnimatedCard>
              <AnimatedCard delay={400}>
                <InfoCard
                  icon={Calendar}
                  label="Born"
                  value="2006"
                  color="hsl(270,80%,65%)"
                />
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-border/50"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle icon={Layers} label="tech_stack" title="Skills & Tools" />

          <div className="grid md:grid-cols-3 gap-6">
            {techStack.map((category, ci) => (
              <AnimatedCard key={category.category} delay={ci * 150}>
                <div className="glass-card rounded-xl p-6 h-full hover:border-[hsl(170,100%,50%,0.2)] transition-all duration-500 group">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${category.color.replace(")", ",0.12)")}` }}
                    >
                      <category.icon className="w-5 h-5" style={{ color: category.color }} />
                    </div>
                    <h3 className="font-semibold text-foreground">{category.category}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-mono text-muted-foreground">{item.name}</span>
                          <span className="font-mono text-xs" style={{ color: category.color }}>
                            {item.level}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${item.level}%`,
                              background: `linear-gradient(90deg, ${category.color}, ${category.color.replace(")", ",0.6)")})`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* Skills Tags */}
          <AnimatedCard delay={500}>
            <div className="mt-12 flex flex-wrap gap-2 justify-center">
              {[
                "System Design",
                "RESTful APIs",
                "Microservices",
                "Clean Architecture",
                "Database Optimization",
                "CI/CD",
                "Unit Testing",
                "API Documentation",
                "Performance Tuning",
                "Agile/Scrum",
              ].map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs px-3 py-1.5 rounded-md border border-border bg-card/50 text-muted-foreground hover:text-[hsl(170,100%,50%)] hover:border-[hsl(170,100%,50%,0.3)] transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Work Section */}
      <section
        id="work"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-border/50"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle icon={GitBranch} label="git_log" title="Work Experience" />

          {projects.map((project) => (
            <AnimatedCard key={project.id} delay={0}>
              <div className="terminal-window group hover:border-[hsl(170,100%,50%,0.3)] transition-all duration-500">
                <TerminalHeader title={`~/projects/${project.id}`} />
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-[hsl(170,100%,50%)] font-mono">{project.role}</span>
                        <span>•</span>
                        <span className="font-mono">{project.period}</span>
                      </div>
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(170,100%,50%,0.1)] border border-[hsl(170,100%,50%,0.3)] text-[hsl(170,100%,50%)] rounded-lg hover:bg-[hsl(170,100%,50%,0.15)] transition-all text-sm font-mono shrink-0"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-8">{project.description}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="text-center p-4 rounded-lg bg-secondary/50 border border-border/50"
                      >
                        <div className="text-2xl sm:text-3xl font-bold text-[hsl(170,100%,50%)] font-mono">
                          {m.value}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 font-mono">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-md bg-card border border-border text-xs font-mono text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* ─── Certifications & Achievements Section ─────────────────── */}
      <section
        id="achievements"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-border/50"
      >
        <div className="absolute inset-0 bg-dots opacity-15" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle icon={Award} label="achievements" title="Certifications & Awards" />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Certifications */}
            <div>
              <AnimatedCard delay={0}>
                <div className="flex items-center gap-2 mb-6">
                  <ShieldCheck className="w-5 h-5 text-[hsl(210,100%,60%)]" />
                  <h3 className="text-lg font-semibold text-foreground">Certifications</h3>
                </div>

                <div className="space-y-4">
                  {/* Cert 1 */}
                  <div className="glass-card rounded-xl p-5 hover:border-[hsl(210,100%,60%,0.3)] transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(210,100%,60%,0.12)] flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-5 h-5 text-[hsl(210,100%,60%)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">
                          Road to Devfest 2025 Certificate
                        </h4>
                        <p className="text-xs text-muted-foreground font-mono mb-2">
                          GDG HCMC • 2025
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[hsl(210,100%,60%,0.1)] text-[hsl(210,100%,60%)] border border-[hsl(210,100%,60%,0.2)]">
                            Google Developer
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[hsl(142,70%,55%,0.1)] text-[hsl(142,70%,55%)] border border-[hsl(142,70%,55%,0.2)]">
                            DevFest
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cert 2 */}
                  <div className="glass-card rounded-xl p-5 hover:border-[hsl(270,80%,65%,0.3)] transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(270,80%,65%,0.12)] flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-5 h-5 text-[hsl(270,80%,65%)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">
                          AI Literacy Certification
                        </h4>
                        <p className="text-xs text-muted-foreground font-mono mb-2">
                          Ho Chi Minh Communist Youth Union • 2024
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[hsl(270,80%,65%,0.1)] text-[hsl(270,80%,65%)] border border-[hsl(270,80%,65%,0.2)]">
                            AI / ML
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[hsl(45,100%,60%,0.1)] text-[hsl(45,100%,60%)] border border-[hsl(45,100%,60%,0.2)]">
                            Youth Union
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>

            {/* Achievements */}
            <div>
              <AnimatedCard delay={200}>
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="w-5 h-5 text-[hsl(45,100%,60%)]" />
                  <h3 className="text-lg font-semibold text-foreground">Awards</h3>
                </div>

                <div className="terminal-window hover:border-[hsl(45,100%,60%,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(220,18%,8%)] border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[hsl(0,80%,55%)]" />
                      <div className="w-3 h-3 rounded-full bg-[hsl(45,100%,55%)]" />
                      <div className="w-3 h-3 rounded-full bg-[hsl(142,70%,50%)]" />
                    </div>
                    <span className="ml-2 text-xs font-mono text-muted-foreground">~/awards</span>
                  </div>
                  <div className="p-5">
                    {/* Trophy card */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(45,100%,55%,0.2)] to-[hsl(25,100%,55%,0.1)] flex items-center justify-center shrink-0 border border-[hsl(45,100%,55%,0.2)]">
                        <Trophy className="w-7 h-7 text-[hsl(45,100%,60%)]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">
                          The Journey to Conquer Technology
                        </h4>
                        <p className="text-sm text-muted-foreground mb-1">by HCMUNRE</p>
                      </div>
                    </div>

                    {/* Prize badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[hsl(45,100%,55%,0.1)] to-[hsl(25,100%,55%,0.05)] border border-[hsl(45,100%,55%,0.3)] mb-4">
                      <Award className="w-5 h-5 text-[hsl(45,100%,60%)]" />
                      <span className="font-bold text-[hsl(45,100%,60%)] text-sm">🥈 Second Prize</span>
                    </div>

                    {/* Terminal info */}
                    <div className="font-mono text-xs space-y-1.5 mt-4 pt-4 border-t border-border/50">
                      <div>
                        <span className="text-muted-foreground">date: </span>
                        <span className="text-[hsl(142,70%,55%)]">23/04 - 25/04/2026</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">organizer: </span>
                        <span className="text-[hsl(170,100%,50%)]">HCMUNRE</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">category: </span>
                        <span className="text-[hsl(210,100%,60%)]">Technology Competition</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-border/50"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <SectionTitle icon={Zap} label="connect" title="Let's Build Something" />

          <AnimatedCard delay={0}>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed -mt-8">
              I'm always interested in hearing about new opportunities and exciting projects. Whether
              you need a backend developer or want to discuss system architecture, feel free to reach
              out!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="mailto:nguyenthanhluan13022006@gmail.com"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[hsl(170,100%,50%)] text-background rounded-lg font-medium hover:bg-[hsl(170,100%,55%)] transition-all duration-300 glow-cyan"
              >
                <Mail className="w-4 h-4" />
                Send Email
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="tel:+84379912605"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-foreground rounded-lg font-medium hover:border-[hsl(170,100%,50%,0.5)] hover:bg-[hsl(170,100%,50%,0.05)] transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                Call Me
              </a>
            </div>

            {/* Contact terminal */}
            <div className="terminal-window max-w-md mx-auto text-left">
              <TerminalHeader title="contact.sh" />
              <div className="p-4 font-mono text-xs space-y-2">
                <div>
                  <span className="text-muted-foreground"># Reach me at</span>
                </div>
                <div>
                  <span className="text-[hsl(270,80%,65%)]">echo</span>{" "}
                  <span className="text-[hsl(142,70%,55%)]">
                    "nguyenthanhluan13022006@gmail.com"
                  </span>
                </div>
                <div>
                  <span className="text-[hsl(270,80%,65%)]">echo</span>{" "}
                  <span className="text-[hsl(142,70%,55%)]">"+84 379 912 605"</span>
                </div>
                <div className="pt-1">
                  <span className="text-muted-foreground"># Find me online</span>
                </div>
                <div>
                  <span className="text-[hsl(270,80%,65%)]">open</span>{" "}
                  <span className="text-[hsl(210,100%,60%)]">github.com/luannguyenduiga</span>
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex justify-center gap-4 mt-10">
              <a
                href="https://github.com/luannguyenduiga"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[hsl(170,100%,50%,0.5)] hover:bg-[hsl(170,100%,50%,0.05)] transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[hsl(210,100%,60%,0.5)] hover:bg-[hsl(210,100%,60%,0.05)] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:nguyenthanhluan13022006@gmail.com"
                className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[hsl(270,80%,65%,0.5)] hover:bg-[hsl(270,80%,65%,0.05)] transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-muted-foreground">
            <span className="text-[hsl(170,100%,50%)]">©</span> 2025 Luan Nguyen — Built with Luan Nguyen
          </div>
          <div className="font-mono text-xs text-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(142,70%,55%)] animate-pulse" />
            All systems operational
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Components
function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  sub?: string;
  color: string;
}) {
  return (
    <div className="glass-card rounded-xl p-4 flex items-center gap-4 hover:border-[hsl(170,100%,50%,0.2)] transition-all duration-300 group">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color.replace(")", ",0.12)")}` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <div className="text-xs font-mono text-muted-foreground mb-0.5">{label}</div>
        <div className="text-sm font-medium text-foreground">{value}</div>
        {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

function CodeLine({ text }: { text: string }) {
  // Simple syntax highlighting
  const highlighted = text
    .replace(
      /(\/\/.*)/g,
      '<span class="code-comment">$1</span>'
    )
    .replace(
      /\b(const|let|var|export|default|import|from|true|false)\b/g,
      '<span class="code-keyword">$1</span>'
    )
    .replace(
      /("[^"]*"|'[^']*')/g,
      '<span class="code-string">$1</span>'
    )
    .replace(
      /\b(developer|name|role|location|education|passion|currentFocus|openToWork)\b(?=:|\s*:)/g,
      '<span class="code-function">$1</span>'
    );

  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
}
