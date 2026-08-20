import { Link } from 'react-router-dom'
import satvamLotusImg from '../assets/satvam-lotus.png'

export default function SatvamSection() {
  return (
    <section style={{ padding: '90px 0', background: 'linear-gradient(160deg, var(--navy-900) 0%, var(--navy-800) 55%, var(--navy-700) 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* decorative corner accents */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '220px', height: '220px',
        background: 'radial-gradient(circle, rgba(199,166,106,0.14) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, right: 0, width: '260px', height: '260px',
        background: 'radial-gradient(circle, rgba(212,160,23,0.10) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
          gap: '10px', marginBottom: '20px', textAlign: 'center',
        }}>
          <span style={{
            fontSize: '11px', fontFamily: 'var(--font-body)', fontWeight: 600,
            color: 'var(--gold-light)', letterSpacing: '2.5px', textTransform: 'uppercase',
          }}>
            Featuring
          </span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '14px', marginBottom: '18px',
          }}>
            <img src={satvamLotusImg} alt="Satvam" style={{ height: '46px', width: 'auto', objectFit: 'contain' }} />
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '1px',
            }}>
              SATVAM
            </h2>
          </div>
          <div style={{
            fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--gold-light)', marginBottom: '14px',
          }}>
            Integrative Oncology
          </div>
          <div style={{ width: '60px', height: '2px', background: 'var(--gold)', margin: '0 auto 20px' }} />
          <p style={{
            maxWidth: '640px', margin: '0 auto', fontSize: '15px', lineHeight: '1.9',
            color: 'rgba(255,255,255,0.82)', fontWeight: 300,
          }}>
            A Centre of Excellence in <strong style={{ color: 'var(--gold-pale)', fontWeight: 600 }}>Integrative Cancer Care</strong> —
            bridging evidence-based oncology with holistic, mind-body support for complete healing during and beyond treatment.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px',
          maxWidth: '960px', margin: '0 auto 44px',
        }}>
          {[
            { label: 'Evidence-Informed', desc: 'Care grounded in clinical research' },
            { label: 'Holistic Support', desc: 'Mind, body & lifestyle integration' },
            { label: 'Compassionate Care', desc: 'Confidential, personalised journeys' },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '28px 22px',
              textAlign: 'center', border: '1px solid rgba(199,166,106,0.2)',
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{
                width: '36px', height: '3px', background: 'var(--gold)',
                margin: '0 auto 16px',
              }} />
              <h4 style={{
                fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600,
                color: '#fff', marginBottom: '8px',
              }}>
                {item.label}
              </h4>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.7', margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/contact">
            <button
              style={{
                background: 'var(--gold)', color: 'var(--navy-900)', border: 'none',
                padding: '14px 36px', borderRadius: '4px', fontSize: '13px',
                fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'background 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-light)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)' }}
            >
              Learn About Satvam
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
