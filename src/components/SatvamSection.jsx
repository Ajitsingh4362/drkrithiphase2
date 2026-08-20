import { Link } from 'react-router-dom'
import satvamLotusImg from '../assets/satvam-lotus.png'

const PILLARS = [
  {
    title: 'Purpose',
    desc: 'To support people undergoing chemotherapy toward better health, better vitals, and a better quality of life — alongside faster, more resilient recovery.',
  },
  {
    title: 'Methodology',
    desc: 'A personalised, curated homeopathic approach combined with structured nutritional support — working in tandem with conventional oncology care, never in place of it.',
  },
  {
    title: 'What We Provide',
    desc: 'Individualised care plans built around each patient\u2019s treatment stage, vitals, and tolerance — with ongoing monitoring and adjustment through the course of chemotherapy.',
  },
  {
    title: 'How We\u2019re Different',
    desc: 'Most supportive-care approaches are generic. SATVAM is built on personalisation — every protocol is curated to the individual, not applied as a one-size-fits-all template.',
  },
]

export default function SatvamSection() {
  return (
    <section style={{ padding: '90px 0', background: 'linear-gradient(160deg, #faf7f0 0%, #eef4ee 55%, #faf7f0 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '220px', height: '220px',
        background: 'radial-gradient(circle, rgba(47,111,90,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, right: 0, width: '260px', height: '260px',
        background: 'radial-gradient(circle, rgba(199,166,106,0.16) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
          gap: '10px', marginBottom: '20px', textAlign: 'center',
        }}>
          <span style={{
            fontSize: '12px', fontFamily: 'var(--font-body)', fontWeight: 700,
            color: '#4b7c5d', letterSpacing: '2.5px', textTransform: 'uppercase',
          }}>
            Featuring
          </span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '14px', marginBottom: '18px',
          }}>
            <img src={satvamLotusImg} alt="Satvam" style={{ height: '46px', width: 'auto', objectFit: 'contain' }} />
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 700, color: '#1f3d2b', margin: 0, letterSpacing: '0.5px',
            }}>
              SATVAM
            </h2>
          </div>
          <div style={{
            fontSize: '14px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
            color: '#9c7a3c', marginBottom: '16px',
          }}>
            Integrative Oncology
          </div>
          <div style={{ width: '60px', height: '2px', background: 'var(--gold)', margin: '0 auto 22px' }} />
          <p style={{
            maxWidth: '680px', margin: '0 auto', fontSize: '16px', lineHeight: '1.9',
            color: 'rgba(31,61,43,0.8)', fontWeight: 400,
          }}>
            Our main aim at <strong style={{ color: '#1f3d2b', fontWeight: 700 }}>SATVAM Integrative Oncology</strong> is
            to manage people under chemotherapy into better health — better vitals, better quality of life, and faster
            recovery, built on nutrition and a personalised, curated homeopathic approach.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '22px',
          maxWidth: '1040px', margin: '0 auto 44px',
        }}>
          {PILLARS.map((item, i) => (
            <div key={i} style={{
              background: '#ffffff', borderRadius: '12px', padding: '28px 24px',
              border: '1px solid rgba(199,166,106,0.3)',
              boxShadow: '0 8px 24px rgba(31,61,43,0.06)',
            }}>
              <div style={{
                width: '36px', height: '3px', background: 'var(--gold)',
                marginBottom: '16px',
              }} />
              <h4 style={{
                fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700,
                color: '#1f3d2b', marginBottom: '10px',
              }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '14px', color: 'rgba(31,61,43,0.72)', lineHeight: '1.75', margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/contact">
            <button
              style={{
                background: 'var(--gold)', color: '#1f3d2b', border: 'none',
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
