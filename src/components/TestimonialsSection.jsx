import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function initials(name) {
  return (name || '').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function StarRating({ value }) {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} style={{ fontSize: '14px', color: s <= value ? '#C7A66A' : 'rgba(199,166,106,0.25)' }}>★</span>
      ))}
    </div>
  )
}

function TestimonialCard({ t }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div
      style={{
        background: 'var(--white)',
        border: '1px solid rgba(15,39,68,0.08)',
        borderRadius: '10px',
        padding: '26px 24px',
        boxShadow: '0 2px 14px rgba(15,39,68,0.05)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(15,39,68,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 14px rgba(15,39,68,0.05)' }}
    >
      {/* Header: avatar + name + rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: t.avatar_color || '#C7A66A', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(199,166,106,0.25)' }}>
          {t.photo_url
            ? <img src={t.photo_url} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ color: '#fff', fontWeight: 700, fontSize: '15px', fontFamily: 'var(--font-display)' }}>{initials(t.name)}</span>
          }
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--navy-800)', margin: 0 }}>{t.name}</p>
          <p style={{ fontSize: '11px', color: 'var(--text-light)', fontFamily: 'var(--font-body)', margin: 0 }}>
            {t.program}{t.location ? ` · ${t.location}` : ''}
          </p>
        </div>
      </div>

      <StarRating value={t.rating} />

      {t.title && (
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-800)', margin: '0 0 8px', lineHeight: 1.3 }}>
          {t.title}
        </p>
      )}

      {t.review && (
        <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', lineHeight: 1.7, fontStyle: 'italic', margin: '0 0 12px', flex: 1 }}>
          "{t.review}"
        </p>
      )}

      {t.audio_url && (
        <div style={{ marginTop: 'auto', marginBottom: t.screenshot_url ? '12px' : 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--teal)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.5px' }}>🎤 VOICE THANK-YOU</span>
          </div>
          <audio controls src={t.audio_url} style={{ width: '100%', height: '34px' }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
        </div>
      )}

      {t.screenshot_url && (
        <div style={{ marginTop: t.audio_url ? 0 : 'auto' }}>
          <span style={{ fontSize: '11px', color: 'var(--teal)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>📷 SENT VIA MESSAGE</span>
          <a href={t.screenshot_url} target="_blank" rel="noopener noreferrer">
            <img src={t.screenshot_url} alt="Patient message" style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(15,39,68,0.08)', display: 'block' }} />
          </a>
        </div>
      )}
    </div>
  )
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    supabase.from('testimonials').select('*')
      .eq('visible', true).eq('featured', true)
      .order('sort_order').limit(9)
      .then(({ data }) => setTestimonials(data || []))
  }, [])

  if (!testimonials.length) return null

  const avgRating = (testimonials.reduce((s, t) => s + (t.rating || 0), 0) / testimonials.length).toFixed(1)

  return (
    <section style={{ padding: '90px 0', background: 'var(--ivory)', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--gold)' }} />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--gold-deep, #9c7a3c)', letterSpacing: '2.5px', textTransform: 'uppercase' }}>Patient Stories</span>
            <div style={{ width: '32px', height: '1px', background: 'var(--gold)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--navy-800)', fontWeight: 600, margin: '0 0 12px', letterSpacing: '0.02em' }}>Real People. Real Transformations.</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 300, marginBottom: '10px' }}>Every healing journey is unique.</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#C7A66A', fontSize: '15px' }}>{'★'.repeat(Math.round(avgRating))}</span>
            <span style={{ fontSize: '13px', color: 'var(--navy-800)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{avgRating} / 5</span>
            <span style={{ fontSize: '12px', color: 'var(--text-light)', fontFamily: 'var(--font-body)' }}>from {testimonials.length} patients</span>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '22px' }}>
          {testimonials.map(t => <TestimonialCard key={t.id} t={t} />)}
        </div>
      </div>
    </section>
  )
}
