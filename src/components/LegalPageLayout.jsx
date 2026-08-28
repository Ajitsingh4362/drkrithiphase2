import React, { useEffect, useRef } from 'react'

export default function LegalPageLayout({ tag, title, subtitle, updated, children }) {
  const ref = useRef(null)
  useEffect(() => { if (ref.current) ref.current.classList.add('page-enter') }, [])

  return (
    <div ref={ref} style={{ overflowX: 'hidden' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(160deg, var(--ivory) 0%, #eef6f3 100%)', padding: '140px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(30,111,106,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div style={{ position: 'absolute', top: '100px', right: '80px', width: '220px', height: '220px', border: '1px solid rgba(199,166,106,0.12)', transform: 'rotate(45deg)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--gold)' }} />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-body)', fontWeight: 600, color: '#9c7a3c', letterSpacing: '2.5px', textTransform: 'uppercase' }}>{tag}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 54px)', color: 'var(--navy-800)', fontWeight: 600, marginBottom: '14px' }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: '16px', color: 'var(--teal)', maxWidth: '600px', lineHeight: '1.8' }}>{subtitle}</p>
          )}
          {updated && (
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '14px' }}>Last updated: {updated}</p>
          )}
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: '60px 0 100px', background: 'var(--ivory)' }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ background: 'var(--white)', borderRadius: '4px', boxShadow: 'var(--shadow-sm)', padding: 'clamp(28px, 5vw, 56px)', border: '1px solid rgba(15,39,68,0.06)' }}>
            {children}
          </div>
        </div>
      </section>
    </div>
  )
}

export function LegalSection({ heading, children }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      {heading && (
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--navy-800)', fontWeight: 600, marginBottom: '12px' }}>
          {heading}
        </h2>
      )}
      <div style={{ fontSize: '15.5px', color: 'var(--text-muted)', lineHeight: '1.85', fontWeight: 400 }}>
        {children}
      </div>
    </div>
  )
}
