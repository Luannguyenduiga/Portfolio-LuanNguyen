import { useState, useEffect } from "react";
import { Mail, Github, Linkedin, ExternalLink, ArrowRight } from "lucide-react";

export default function Index() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      id: "gender-insights",
      title: "Gender Insights",
      role: "Backend Developer Intern",
      period: "10/2025 - 04/2026",
      description: "Built 15+ high-availability RESTful APIs with Fastify. Optimized PostgreSQL queries, reducing latency by 40%. Implemented strict 3NF normalization for data integrity.",
      highlights: ["Fastify", "PostgreSQL", "API Design", "Performance Optimization"],
      link: "https://genderinsights.vercel.app",
    },
  ];

  const skills = [
    "Backend Development",
    "RESTful APIs",
    "Node.js",
    "PostgreSQL",
    "Database Optimization",
    "System Design",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="/"
            className="text-lg font-bold tracking-wide hover:opacity-70 transition-opacity"
          >
            Luan
          </a>
          <div className="hidden md:flex gap-8 items-center text-sm">
            <a href="#about" className="hover:opacity-70 transition-opacity">
              about
            </a>
            <a href="#work" className="hover:opacity-70 transition-opacity">
              work
            </a>
            <a href="#contact" className="hover:opacity-70 transition-opacity">
              contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Canvas Background Effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background pointer-events-none"></div>
          <svg className="absolute inset-0 w-0 h-0">
            <defs>
              <filter id="glass-effect">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.005"
                  numOctaves="1"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="0.3"
                />
              </filter>
            </defs>
          </svg>
          {/* Animated Blobs */}
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <div className="mb-4 opacity-60 text-sm tracking-widest">
            Backend Developer
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-fade-in">
            Luan <br /> Nguyen
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            I build scalable backend systems and optimize database performance. Currently an intern crafting high-availability APIs with modern technologies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#work"
              className="px-6 py-3 border border-foreground rounded-sm text-foreground hover:bg-foreground hover:text-background transition-colors text-sm font-medium"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-foreground text-background rounded-sm hover:opacity-80 transition-opacity text-sm font-medium"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border border-muted-foreground rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 tracking-tight">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I'm a second-year IT student at Ho Chi Minh University of Natural Resources and Environment, passionate about building robust backend systems and optimizing database performance.
              </p>
              <p>
                Currently working as a Backend Developer Intern where I architect high-availability APIs, optimize database queries, and collaborate with cross-functional teams. I think in systems and obsess over clean architecture.
              </p>
              <p>
                When I'm not coding, you'll find me reading about system design, exploring new technologies, or contributing to the tech community.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground">Ho Chi Minh City, Vietnam</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Experience</h3>
                <p className="text-muted-foreground">Backend Developer Intern</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Education</h3>
                <p className="text-muted-foreground">
                  HCMUNRE - Information Technology (2024-2028)
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Born</h3>
                <p className="text-muted-foreground">2006</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 tracking-tight">
            Skills
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="px-4 py-3 border border-border rounded-sm hover:border-foreground transition-colors text-sm text-center"
              >
                {skill}
              </div>
            ))}
          </div>

          <div className="mt-12 pt-12 border-t border-border">
            <h3 className="text-lg font-semibold mb-6">Tech Stack</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground mb-2">Backend</p>
                <p>Java, Node.js, Fastify, Nestjs, RESTful APIs</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Database</p>
                <p>PostgreSQL, MongoDB, SQL Optimization</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Tools</p>
                <p>Git, GitHub, Docker, Postman</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 tracking-tight">
            Work
          </h2>

          {projects.map((project) => (
            <div
              key={project.id}
              className="mb-16 last:mb-0"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="border border-border rounded-sm p-6 sm:p-8 hover:border-foreground transition-colors bg-card">
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {project.role} • {project.period}
                    </p>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-foreground text-foreground rounded-sm hover:bg-foreground hover:text-background transition-colors text-sm font-medium whitespace-nowrap flex items-center gap-2"
                    >
                      Visit <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-background border border-border rounded-sm text-xs font-medium text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Let's Talk
          </h2>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm always interested in hearing about new opportunities and exciting projects. Feel free to reach out!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="mailto:nguyenthanhluan13022006@gmail.com"
              className="px-8 py-3 bg-foreground text-background rounded-sm hover:opacity-80 transition-opacity font-medium"
            >
              Send Email
            </a>
            <a
              href="tel:+84379912605"
              className="px-8 py-3 border border-foreground text-foreground rounded-sm hover:bg-foreground hover:text-background transition-colors font-medium"
            >
              Call Me
            </a>
          </div>

          <div className="flex justify-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:nguyenthanhluan13022006@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Luan Nguyen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
