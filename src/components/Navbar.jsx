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

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed', inset: 0, background: 'var(--navy-800)',
        zIndex: 999, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        transition: 'opacity 0.3s, visibility 0.3s',
        opacity: menuOpen ? 1 : 0, visibility: menuOpen ? 'visible' : 'hidden',
      }}>
        {/* Mobile Logo */}
        <img
          src="/mind_motion_matrix_navbar_logo.png"
          alt="Mind Motion Matrix"
          style={{ height: '72px', width: 'auto', marginBottom: '18px' }}
        />

        <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.3)', marginBottom: '6px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {links.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600,
                color: isActive ? 'var(--gold-pale)' : 'rgba(255,255,255,0.9)',
                letterSpacing: '0.5px',
                padding: '10px 0',
              })}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <NavLink to="/contact" style={{ marginTop: '20px' }}>
          <button className="btn-primary cta-blink">Book Consultation</button>
        </NavLink>
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