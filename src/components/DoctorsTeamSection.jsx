import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function initials(name) {
  return (name || '').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function DoctorsTeamSection() {
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    supabase.from('doctors').select('*')
      .eq('visible', true)
      .order('sort_order')
      .then(({ data }) => setDoctors(data || []))
  }, [])

  if (!doctors.length) return null

  return (
    <section style={{ padding: '45px 0', background: 'var(--white)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <span className="section-tag">Meet The Team</span>
          <div className="gold-line center" />
          <h2 className="section-title">The Doctors Behind Your Care</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Experienced practitioners committed to integrative, evidence-informed healing.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 300px))',
            gap: '28px',
            justifyContent: 'center',
          }}
        >
          {doctors.map(d => (
            <div
              key={d.id}
              style={{
                background: 'var(--ivory)',
                border: '1px solid rgba(15,39,68,0.08)',
                borderRadius: '10px',
                padding: '32px 24px',
                textAlign: 'center',
                minWidth: 0,
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(15,39,68,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{
                width: '100%', height: '220px', borderRadius: '10px', margin: '0 auto 18px',
                background: 'var(--gold)', overflow: 'hidden', display: 'flex',
                alignItems: 'center', justifyContent: 'center', border: '3px solid rgba(199,166,106,0.3)',
              }}>
                {d.photo_url
                  ? <img src={d.photo_url} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ color: '#fff', fontWeight: 700, fontSize: '28px', fontFamily: 'var(--font-display)' }}>{initials(d.name)}</span>
                }
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: '#0a0a0a', margin: '0 0 6px' }}>
                {d.name}
              </h3>

              {d.designation && (
                <p style={{ fontSize: '13px', color: 'var(--gold-deep, #9c7a3c)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.5px', margin: '0 0 8px', textTransform: 'uppercase' }}>
                  {d.designation}
                </p>
              )}

              {d.qualification && (
                <p style={{ fontSize: '18px', color: '#1a1a1a', fontFamily: 'var(--font-body)', fontWeight: 500, margin: '0 0 10px', lineHeight: 1.6 }}>
                  {d.qualification}
                </p>
              )}

              {d.bio && (
                <p style={{ fontSize: '13.5px', color: '#333', fontFamily: 'var(--font-body)', fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>
                  {d.bio}
                </p>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/contact"><button className="btn-primary">Book a Consultation</button></Link>
        </div>
      </div>
    </section>
  )
}
