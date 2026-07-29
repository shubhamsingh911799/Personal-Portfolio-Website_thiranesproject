import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- Hero Component ---
const Hero = () => {
  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div className="animate-fade-in" style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', lineHeight: '1.1' }}>
            Hi, I'm <span className="text-gradient">Kumar Shubham</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#9ca3af', maxWidth: '600px', margin: '0 auto 2rem' }}>
            I build visually stunning, performant, and scalable full-stack applications.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn glass-panel" style={{ color: 'white' }}>Contact Me</a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Projects Component ---
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects from backend API
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Fallback dummy data if backend is offline
        setProjects([
          {
            _id: '1',
            title: 'Dynamic Web App',
            description: 'A responsive full-stack platform built with modern technologies.',
            technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
            liveUrl: '#',
            githubUrl: '#'
          },
          {
            _id: '2',
            title: 'Portfolio Design',
            description: 'Premium UI/UX design featuring glassmorphism and modern aesthetics.',
            technologies: ['CSS', 'Framer Motion', 'React'],
            imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
            liveUrl: '#',
            githubUrl: '#'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Featured <span className="text-gradient">Projects</span></h2>
          <p style={{ color: '#9ca3af' }}>A collection of some of my recent work.</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading projects...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {projects.map(project => (
              <div key={project._id} className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column' }}
                   onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                   onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p style={{ color: '#9ca3af', marginBottom: '1.5rem', flexGrow: 1 }}>{project.description}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {project.technologies?.map((tech, idx) => (
                      <span key={idx} style={{ fontSize: '0.8rem', padding: '0.2rem 0.8rem', background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary)', borderRadius: '99px' }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f3f4f6', transition: 'color 0.3s ease' }} onMouseEnter={e=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={e=>e.currentTarget.style.color='#f3f4f6'}>
                      <span>💻</span> Code
                    </a>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f3f4f6', transition: 'color 0.3s ease' }} onMouseEnter={e=>e.currentTarget.style.color='var(--primary)'} onMouseLeave={e=>e.currentTarget.style.color='#f3f4f6'}>
                      <span>🔗</span> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// --- Contact Component ---
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/contact', formData);
      if(res.data.success) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
    
    // Clear message after 5 seconds
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section id="contact">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Get In <span className="text-gradient">Touch</span></h2>
          <p style={{ color: '#9ca3af' }}>Have a project in mind? Let's talk.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2rem' }}>
          {status && (
            <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '8px', background: status.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: status.type === 'success' ? '#34d399' : '#f87171' }}>
              {status.message}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Name</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0 1rem' }}>
                <span style={{ color: '#9ca3af', marginRight: '0.5rem' }}>👤</span>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', padding: '0.8rem', outline: 'none' }} 
                  placeholder="Your Name"
                />
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email</label>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0 1rem' }}>
                <span style={{ color: '#9ca3af', marginRight: '0.5rem' }}>✉️</span>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', padding: '0.8rem', outline: 'none' }} 
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Message</label>
              <textarea 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                rows="5"
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', color: 'white', padding: '1rem', outline: 'none', borderRadius: '8px', resize: 'vertical' }} 
                placeholder="How can I help you?"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <span>🚀</span> Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// --- Main App Component ---
function App() {
  return (
    <>
      <header>
        <div className="container">
          <div className="logo text-gradient">KS.</div>
          <nav>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>

      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Kumar Shubham. Built with React & Node.js.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
