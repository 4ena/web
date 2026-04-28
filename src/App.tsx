import { useState, useEffect } from 'react'
import { Mail, Linkedin, Github, ExternalLink, Cpu, CircuitBoard, ArrowRight } from 'lucide-react'

// Simple smooth scroll helper
function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top: y, behavior: 'smooth' })
}

// Animated scroll reveal hook
function useScrollReveal() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (el.id) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (id: string) => revealed.has(id) ? 'revealed' : ''
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const getReveal = useScrollReveal()

  // Close menu on resize above mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'News', id: 'news' },
    { label: 'Projects', id: 'projects' },
    { label: 'Art', id: 'art' },
    { label: 'Photography', id: 'photography' },
  ]

  const newsItems = [
    { date: 'Apr 2026', text: 'Started research assistant position in computational imaging lab.' },
    { date: 'Mar 2026', text: 'Presented ASL real-time translator prototype at UC Engineering Expo.' },
    { date: 'Jan 2026', text: 'Began co-op rotation focusing on signal processing and optical systems.' },
  ]

  const portfolioItems = [
    {
      title: 'Research Projects',
      subtitle: 'Computational Imaging · Signal Processing',
      href: '#projects',
      id: 'projects',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    },
    {
      title: 'Art',
      subtitle: 'Digital · Traditional',
      href: '#art',
      id: 'art',
      image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80',
    },
    {
      title: 'Photography',
      subtitle: 'Film · Digital',
      href: '#photography',
      id: 'photography',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
    },
  ]

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-sans selection:bg-[#c4a574] selection:text-white">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/90 backdrop-blur-xl border-b border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto px-5 h-16 flex items-center justify-between">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="text-sm font-medium tracking-[0.12em] uppercase text-[#1a1a1a] hover:opacity-60 transition-opacity"
          >
            Nick Foran
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollToId(link.id) }}
                className="px-3 py-1.5 text-xs tracking-[0.08em] uppercase text-[#666] hover:text-[#1a1a1a] hover:bg-[#f0f0f0] rounded-md transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#1a1a1a] hover:bg-[#f0f0f0] rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-[#fafafa] border-b border-[#e5e5e5] px-5 py-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollToId(link.id); setMenuOpen(false) }}
                className="block py-2.5 text-sm tracking-[0.06em] uppercase text-[#666] hover:text-[#1a1a1a] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section 
          id="about" 
          data-reveal 
          className={`max-w-[1000px] mx-auto px-5 py-20 md:py-32 transition-all duration-700 ${getReveal('about')}`}
        >
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-start">
            {/* Left: Intro */}
            <div className="space-y-6">
              {/* EE Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] text-white text-[10px] tracking-[0.15em] uppercase rounded-full">
                <Cpu size={12} />
                <span>Electrical Engineering</span>
              </div>

              <div className="space-y-1">
                <h1 className="text-[2.5rem] md:text-[3.2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-[#1a1a1a]">
                  Nicholas<br />Foran
                </h1>
                <p className="font-mono text-sm text-[#999] tracking-wide pt-2">
                  B.S. Electrical Engineering · 2028
                </p>
              </div>

              <div className="h-px w-12 bg-[#c4a574]" />

              <p className="text-[0.95rem] leading-[1.7] text-[#555] max-w-[50ch]">
                Working on computational imaging that conveys complex imaging ability through 
                domains like biological computing, medical imaging, and optical signals, advancing 
                robustness throughout intelligent systems that face real-world challenges.
              </p>

              <p className="text-[0.95rem] leading-[1.7] text-[#555] max-w-[50ch]">
                Based at the <span className="text-[#1a1a1a] font-medium">University of Cincinnati</span>.
              </p>

              {/* Contact */}
              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="mailto:foranns@mail.uc.edu" 
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] text-white text-sm rounded-lg hover:bg-[#333] transition-colors"
                >
                  <Mail size={15} />
                  <span>Email</span>
                </a>
                <a 
                  href="https://linkedin.com/in/nicholas-foran" 
                  target="_blank" 
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#ddd] text-[#555] text-sm rounded-lg hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-all"
                >
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Right: Decorative EE visual */}
            <div className="relative hidden md:block">
              <div className="relative aspect-square max-w-[420px] ml-auto">
                {/* Circuit board pattern background */}
                <div className="absolute inset-0 rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5] overflow-hidden">
                  {/* Horizontal traces */}
                  <div className="absolute top-[20%] left-0 right-0 h-px bg-[#ddd]" />
                  <div className="absolute top-[40%] left-[15%] right-0 h-px bg-[#ddd]" />
                  <div className="absolute top-[60%] left-0 right-[20%] h-px bg-[#ddd]" />
                  <div className="absolute top-[80%] left-[30%] right-0 h-px bg-[#ddd]" />
                  
                  {/* Vertical traces */}
                  <div className="absolute left-[25%] top-0 bottom-[30%] w-px bg-[#ddd]" />
                  <div className="absolute left-[50%] top-[20%] bottom-0 w-px bg-[#ddd]" />
                  <div className="absolute left-[75%] top-0 bottom-[50%] w-px bg-[#ddd]" />

                  {/* Nodes */}
                  <div className="absolute top-[20%] left-[25%] w-2.5 h-2.5 bg-[#c4a574] rounded-full -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-[40%] left-[25%] w-2 h-2 bg-[#1a1a1a] rounded-full -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-[20%] left-[50%] w-2 h-2 bg-[#1a1a1a] rounded-full -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-[60%] left-[50%] w-2.5 h-2.5 bg-[#c4a574] rounded-full -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-[40%] left-[75%] w-2 h-2 bg-[#1a1a1a] rounded-full -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-[80%] left-[50%] w-2 h-2 bg-[#1a1a1a] rounded-full -translate-x-1/2 -translate-y-1/2" />

                  {/* IC symbol */}
                  <div className="absolute top-[45%] left-[45%] w-[60px] h-[40px] border-2 border-[#1a1a1a] bg-[#fafafa] rounded-sm">
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-[#1a1a1a] rounded-sm" />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-[#1a1a1a] rounded-sm" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CircuitBoard size={16} className="text-[#c4a574]" />
                    </div>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 text-[10px] font-mono text-[#bbb] tracking-wider">
                    EE_2028
                  </div>
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono text-[#bbb] tracking-wider">
                    39.1329° N
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="h-px bg-[#e5e5e5]" />
        </div>

        {/* News Section */}
        <section 
          id="news" 
          data-reveal 
          className={`max-w-[1000px] mx-auto px-5 py-16 md:py-24 transition-all duration-700 delay-100 ${getReveal('news')}`}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-1.5 bg-[#c4a574] rounded-full" />
            <h2 className="text-xs tracking-[0.15em] uppercase text-[#999] font-medium">News</h2>
          </div>

          <div className="space-y-0">
            {newsItems.map((item, i) => (
              <div 
                key={i} 
                className="group grid md:grid-cols-[120px_1fr] gap-3 md:gap-6 py-5 border-t border-[#eee] first:border-t-0"
              >
                <span className="font-mono text-xs text-[#bbb] tracking-wider pt-0.5">{item.date}</span>
                <p className="text-[0.92rem] leading-[1.6] text-[#444] group-hover:text-[#1a1a1a] transition-colors">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="h-px bg-[#e5e5e5]" />
        </div>

        {/* Portfolio Cards */}
        <section className="max-w-[1000px] mx-auto px-5 py-16 md:py-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-1.5 bg-[#c4a574] rounded-full" />
            <h2 className="text-xs tracking-[0.15em] uppercase text-[#999] font-medium">Portfolio</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {portfolioItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToId(item.id) }}
                className="group relative block bg-[#fff] border border-[#e5e5e5] rounded-xl overflow-hidden hover:border-[#ccc] transition-all duration-300 hover:shadow-lg"
                data-reveal
                id={`card-${item.id}`}
              >
                <div 
                  className={`transition-all duration-700 ${getReveal(`card-${item.id}`)}`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#f5f5f5]">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-[#1a1a1a] tracking-[-0.01em]">{item.title}</h3>
                      <ArrowRight size={14} className="text-[#bbb] group-hover:text-[#1a1a1a] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-[#aaa] tracking-[0.02em]">{item.subtitle}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Featured Project Detail (placeholder for actual content) */}
        <section 
          id="projects" 
          data-reveal 
          className={`max-w-[1000px] mx-auto px-5 py-16 md:py-24 transition-all duration-700 ${getReveal('projects')}`}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-1.5 bg-[#c4a574] rounded-full" />
            <h2 className="text-xs tracking-[0.15em] uppercase text-[#999] font-medium">Featured Research</h2>
          </div>

          <div className="bg-[#fff] border border-[#e5e5e5] rounded-xl p-6 md:p-8">
            <div className="grid md:grid-cols-[1fr_1.3fr] gap-8 items-center">
              <div className="space-y-4">
                <span className="inline-block px-2.5 py-1 bg-[#f5f5f5] text-[10px] tracking-[0.1em] uppercase text-[#888] rounded-md font-mono">
                  Signal Processing
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] tracking-[-0.02em] leading-tight">
                  ASL Real-Time Translator
                </h3>
                <p className="text-sm leading-[1.7] text-[#666]">
                  A prototype system for real-time American Sign Language translation using 
                  computer vision and signal processing techniques. Presented at the UC Engineering Expo 2026.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-sm text-[#1a1a1a] hover:text-[#c4a574] transition-colors group"
                >
                  <span className="font-medium">View Project</span>
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
              <div className="aspect-video bg-[#f5f5f5] rounded-lg border border-[#eee] flex items-center justify-center">
                <div className="text-center">
                  <CircuitBoard size={40} className="text-[#ddd] mx-auto mb-2" />
                  <span className="text-xs text-[#bbb] font-mono">Project imagery</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#e5e5e5] mt-16">
          <div className="max-w-[1000px] mx-auto px-5 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#bbb] tracking-wider font-mono">
              © 2026 Nick Foran
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:foranns@mail.uc.edu" className="text-[#bbb] hover:text-[#1a1a1a] transition-colors">
                <Mail size={16} />
              </a>
              <a href="https://linkedin.com/in/nicholas-foran" target="_blank" rel="noopener" className="text-[#bbb] hover:text-[#1a1a1a] transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="https://github.com/4ena" target="_blank" rel="noopener" className="text-[#bbb] hover:text-[#1a1a1a] transition-colors">
                <Github size={16} />
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* CSS for scroll reveal animations */}
      <style>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
        }
        [data-reveal].revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}
