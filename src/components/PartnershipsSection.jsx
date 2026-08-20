import satvamLotusImg from '../assets/satvam-lotus.png'

// Add new partners/collaborations here — the grid grows automatically as you add entries.
// logo: path to logo image (import it above and reference here) — leave null for a placeholder.
// url: partner's website — "View More" opens this in a new tab.
const PARTNERS = [
  {
    name: 'Partner Name',
    logo: satvamLotusImg,
    description: 'A short line about this partnership or collaboration goes here.',
    url: '#',
  },
  // { name: 'Another Partner', logo: anotherLogoImg, description: '...', url: 'https://...' },
]

export default function PartnershipsSection() {
  return (
    <section style={{ padding: '90px 0', background: 'var(--beige-light)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '-60px', right: '-60px', width: '260px', height: '260px',
        background: 'radial-gradient(circle, rgba(212,160,23,0.10) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '20px',
          }}>
            <span style={{ fontSize: '26px', lineHeight: 1, color: 'var(--gold-yellow)' }}>&#10022;</span>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.6vw, 38px)',
              fontWeight: 700, color: '#1a1a1a', margin: 0, letterSpacing: '0.5px',
            }}>
              Collaboration and Partnership
            </h2>
            <span style={{ fontSize: '26px', lineHeight: 1, color: 'var(--gold-yellow)' }}>&#10022;</span>
          </div>
          <div style={{ width: '60px', height: '2px', background: 'var(--gold-yellow)', margin: '0 auto 18px' }} />
          <p style={{
            maxWidth: '600px', margin: '0 auto', fontSize: '14px', lineHeight: '1.8',
            color: '#3a3a3a', fontWeight: 300,
          }}>
            Working alongside trusted organisations and specialists to extend the reach and depth of integrative care.
          </p>
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '28px',
          maxWidth: '1080px', margin: '0 auto',
        }}>
          {PARTNERS.map((partner, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: '12px', padding: '32px 26px',
              textAlign: 'center', border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              transition: 'transform 0.25s, box-shadow 0.25s',
              width: '280px', flex: '0 1 280px',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,0,0,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)' }}
            >
              <div style={{
                width: '84px', height: '84px', borderRadius: '50%',
                background: 'var(--pista-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '18px', overflow: 'hidden',
              }}>
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: 'var(--pista-dark)' }}>
                    {partner.name.charAt(0)}
                  </span>
                )}
              </div>
              <h4 style={{
                fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600,
                color: '#1a1a1a', marginBottom: '10px',
              }}>
                {partner.name}
              </h4>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.7', margin: '0 0 20px', flex: 1 }}>
                {partner.description}
              </p>
              <a href={partner.url} target="_blank" rel="noopener noreferrer"
                style={{
                  fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
                  color: 'var(--pista-dark)', textDecoration: 'none', borderBottom: '1px solid var(--pista-dark)',
                  paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold-yellow)'; e.currentTarget.style.borderColor = 'var(--gold-yellow)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--pista-dark)'; e.currentTarget.style.borderColor = 'var(--pista-dark)' }}
              >
                View More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
