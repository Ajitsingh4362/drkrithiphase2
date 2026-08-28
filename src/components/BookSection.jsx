import bookCoverImg from '../assets/book-journey-to-motherhood.png'

export default function BookSection() {
  return (
    <section style={{ padding: '0', background: 'var(--ivory)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '-60px', left: '-60px', width: '260px', height: '260px',
        background: 'radial-gradient(circle, rgba(199,166,106,0.14) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-tag">From The Author</span>
          <div className="gold-line center" />
          <h2 className="section-title">Dr. Kirthi's Book</h2>
        </div>

        <div
          className="book-section-grid"
          style={{
            display: 'grid', gridTemplateColumns: '260px 1fr', gap: '48px',
            alignItems: 'center', maxWidth: '920px', margin: '0 auto',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div className="book-cover-wrap" style={{ position: 'relative', display: 'inline-block', maxWidth: '240px', width: '100%', perspective: '1000px' }}>
              <img
                src={bookCoverImg}
                alt="Journey to Motherhood: 10 Holistic Strategies to Healthy Pregnancy — book cover by Dr. Kirthi Jawalkar"
                style={{
                  width: '100%', height: 'auto', display: 'block', margin: '0 auto',
                  borderRadius: '6px', boxShadow: '0 16px 40px rgba(15,39,68,0.18)',
                  border: '1px solid rgba(15,39,68,0.08)',
                }}
              />
              <div className="book-page-corner" />
            </div>
          </div>

          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 30px)',
              fontWeight: 600, color: 'var(--navy-800)', marginBottom: '8px', lineHeight: 1.25,
            }}>
              Journey to Motherhood
            </h3>
            <p style={{
              fontSize: '14px', fontWeight: 600, color: 'var(--teal)', letterSpacing: '0.3px',
              marginBottom: '18px', fontFamily: 'var(--font-body)',
            }}>
              10 Holistic Strategies to Healthy Pregnancy
            </p>
            <p style={{
              fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.85',
              marginBottom: '28px', fontFamily: 'var(--font-body)', fontWeight: 400,
            }}>
              Drawing from her own journey, Dr. Kirthi Kakade shares ten holistic strategies for nurturing
              body and spirit through pregnancy — blending homeopathy, acupuncture, energy medicine, mindful
              nutrition, and emotional well-being into a compassionate, practical guide for every trimester.
            </p>
            <a
              href="https://amzn.in/d/09RUtL2G"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'var(--gold)', color: 'var(--navy-800)', border: 'none',
                padding: '14px 32px', borderRadius: '4px', fontSize: '13px',
                fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'background 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-light)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)' }}
            >
              Buy on Amazon
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .book-page-corner {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 46px;
          height: 46px;
          background: linear-gradient(135deg, #1c3d6a 42%, #163257 55%, #0F2744 100%);
          clip-path: polygon(100% 0, 0 0, 100% 100%);
          transform-origin: 100% 0%;
          border-radius: 0 5px 0 8px;
          box-shadow: -3px 3px 8px rgba(15,39,68,0.35);
          animation: bookPageFlip 4.5s ease-in-out infinite;
          backface-visibility: visible;
        }
        @keyframes bookPageFlip {
          0%, 12%   { transform: rotateY(0deg); }
          45%       { transform: rotateY(-165deg); }
          78%, 100% { transform: rotateY(0deg); }
        }
        @media (max-width: 640px) {
          .book-section-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 28px !important;
          }
        }
      `}</style>
    </section>
  )
}
