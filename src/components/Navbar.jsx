import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); window.scrollTo(0, 0) }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/specializations', label: 'Specializations' },
    { to: '/programs', label: 'Programs' },
    { to: '/blog', label: 'Blog' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(7,15,28,0.97)' : 'rgba(15,39,68,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(212,160,23,0.15)' : '1px solid rgba(212,160,23,0.25)',
        boxShadow: scrolled ? '0 2px 16px rgba(15,39,68,0.15)' : 'none',
        padding: scrolled ? '10px 0' : '14px 0',
        transition: 'all 0.4s ease',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo Only — No Text */}
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/mind_motion_matrix_navbar_logo.png"
              alt="Mind Motion Matrix"
              style={{
                height: scrolled ? '52px' : '64px',
                width: 'auto',
                transition: 'height 0.4s ease',
                objectFit: 'contain',
              }}
            />
          </NavLink>

          {/* Desktop Links */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            {links.map(link => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'}
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px', fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--gold-pale)' : 'rgba(255,255,255,0.85)',
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                  paddingBottom: '3px',
                  borderBottom: isActive ? '1px solid var(--gold)' : '1px solid transparent',
                  transition: 'all 0.25s',
                })}>
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/contact">
              <button className="btn-primary cta-blink" style={{ padding: '10px 20px', fontSize: '11px' }}>
                Book Consultation
              </button>
            </NavLink>
          </div>

          {/* Mobile Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger"
            style={{ display: 'none', background: 'none', border: 'none', flexDirection: 'column', gap: '5px', padding: '4px', cursor: 'pointer' }}
            aria-label="Toggle menu">
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: '22px', height: '2px',
                background: 'var(--gold-yellow)', borderRadius: '2px', transition: 'var(--transition)',
                transform: menuOpen
                  ? (i===0 ? 'translateY(7px) rotate(45deg)' : i===2 ? 'translateY(-7px) rotate(-45deg)' : 'scaleX(0)')
                  : 'none',
                opacity: menuOpen && i===1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(7,15,28,0.6)',
          backdropFilter: 'blur(3px)', zIndex: 998,
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.35s ease, visibility 0.35s ease',
        }}
      />

      {/* Mobile Menu Drawer */}
      <div className="mobile-drawer" style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(86vw, 380px)',
        background: 'linear-gradient(160deg, var(--navy-800) 0%, var(--navy-900) 100%)',
        zIndex: 999,
        display: 'flex', flexDirection: 'column',
        boxShadow: '-12px 0 40px rgba(0,0,0,0.35)',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '22px 24px', borderBottom: '1px solid rgba(199,166,106,0.15)',
        }}>
          <img
            src="/mind_motion_matrix_navbar_logo.png"
            alt="Mind Motion Matrix"
            style={{ height: '46px', width: 'auto' }}
          />
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu"
            style={{
              width: '38px', height: '38px', borderRadius: '2px',
              background: 'rgba(199,166,106,0.12)', border: '1px solid rgba(199,166,106,0.3)',
              color: 'var(--gold)', fontSize: '18px', display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'var(--transition)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(199,166,106,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(199,166,106,0.12)'}
          >
            ✕
          </button>
        </div>

        {/* Nav Links */}
        <div style={{ flex: 1, padding: '18px 12px', display: 'flex', flexDirection: 'column' }}>
          {links.map((link, i) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '14px',
                fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 600,
                color: isActive ? 'var(--gold-pale)' : 'rgba(255,255,255,0.88)',
                letterSpacing: '0.3px',
                padding: '15px 14px',
                borderRadius: '2px',
                borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                background: isActive ? 'rgba(199,166,106,0.08)' : 'transparent',
                transition: 'all 0.2s',
              })}>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
                color: 'rgba(199,166,106,0.55)', minWidth: '20px',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Footer: CTA + Social */}
        <div style={{ padding: '20px 24px 28px', borderTop: '1px solid rgba(199,166,106,0.15)' }}>
          <NavLink to="/contact" style={{ display: 'block', marginBottom: '18px' }}>
            <button className="btn-primary cta-blink" style={{ width: '100%', justifyContent: 'center' }}>
              Book Consultation
            </button>
          </NavLink>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <a href="https://www.instagram.com/executive_healthcare.drkirthi" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              style={{ width: '36px', height: '36px', borderRadius: '2px', background: 'rgba(30,111,106,0.18)', border: '1px solid rgba(30,111,106,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#4CBFB8"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.facebook.com/share/19Ka85NcXn/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              style={{ width: '36px', height: '36px', borderRadius: '2px', background: 'rgba(30,111,106,0.18)', border: '1px solid rgba(30,111,106,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#4CBFB8"><path d="M22 12.061C22 6.505 17.523 2 12 2S2 6.505 2 12.061c0 5.022 3.657 9.184 8.438 9.939v-7.03H7.898v-2.909h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.909h-2.33V22c4.78-.755 8.437-4.917 8.437-9.939z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/kirthi-kakade" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              style={{ width: '36px', height: '36px', borderRadius: '2px', background: 'rgba(30,111,106,0.18)', border: '1px solid rgba(30,111,106,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#4CBFB8"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}