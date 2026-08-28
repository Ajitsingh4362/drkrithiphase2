import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import doctorHeroImg from '../assets/doctor-hero.jpg'
import healingCollageImg from '../assets/healing-collage.jpg'
import whyChooseBannerImg from '../assets/why-choose-banner.jpg'
import cancerRevivalImg from '../assets/specializations/cancer-revival.jpg'
import mindBodyMedicineImg from '../assets/specializations/mind-body-medicine.jpg'
import fertilityWellnessImg from '../assets/specializations/fertility-wellness.jpg'
import emotionalWellbeingImg from '../assets/specializations/emotional-wellbeing.jpg'
import chronicDisordersImg from '../assets/specializations/chronic-disorders.jpg'
import alliedHealingImg from '../assets/specializations/allied-healing.jpg'
import HealingMap from '../components/HealingMap'
import BlogPreview from '../components/BlogPreview'
import ConsultationPopup from '../components/ConsultationPopup'
import TestimonialsSection from '../components/TestimonialsSection'
import DoctorsTeamSection from '../components/DoctorsTeamSection'
import GalleryScroll from '../components/GalleryScroll'
import SatvamSection from '../components/SatvamSection'

const HIGHLIGHTS = [
  { icon: '🎗️', image: cancerRevivalImg, title: 'Cancer Revival & Support', desc: 'Integrative complementary support during treatment — rebuilding strength, resilience, and hope alongside your medical care.', highlight: true },
  { icon: '🧠', image: mindBodyMedicineImg, title: 'Mind-Body Medicine', desc: 'Understanding the deep connection between emotional states and physical health — addressing the root, not just the symptom.', highlight: true },
  { icon: '🌸', image: fertilityWellnessImg, title: 'Fertility & Women\'s Wellness', desc: 'Holistic, personalised support for the journey to motherhood — hormonal balance, emotional well-being, and mind-body fertility optimization.' },
  { icon: '💆', image: emotionalWellbeingImg, title: 'Emotional Well-being', desc: 'Sustainable resilience for modern professionals — moving beyond stress management to lasting emotional strength.' },
  { icon: '🔬', image: chronicDisordersImg, title: 'Chronic Systemic Disorders', desc: 'Comprehensive root-cause evaluation of long-term health challenges — autoimmune, metabolic, thyroid, digestive, and more.' },
  { icon: '🌿', image: alliedHealingImg, title: 'Allied Healing Sciences', desc: 'Homeopathy, Psychotherapy, Acupuncture, NLP, Mindfulness — multiple evidence-informed disciplines working together.' },
]

const WHY = [
  '15+ Years Clinical Experience',
  'International Training — India & Australia',
  'Homeopathy + Psychotherapy Integration',
  'Personalised Healing Roadmaps',
  'Cancer Support Specialist',
  'Mind-Body Health Expert',
  'Women\'s Health & Fertility Focus',
  'Compassionate, Confidential Care',
]

/* ---------- orbiting "solar system" visual (moved out of hero) ---------- */
function IntegrativeOrbitVisual() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '520px', flexShrink: 0 }}>
      <style>{`
        @keyframes orbitA {
          from { transform: rotate(0deg) translateX(130px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(130px) rotate(-360deg); }
        }
        @keyframes orbitB {
          from { transform: rotate(120deg) translateX(180px) rotate(-120deg); }
          to   { transform: rotate(480deg) translateX(180px) rotate(-480deg); }
        }
        @keyframes orbitC {
          from { transform: rotate(240deg) translateX(220px) rotate(-240deg); }
          to   { transform: rotate(600deg) translateX(220px) rotate(-600deg); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.9); opacity: 0.6; }
          50%  { transform: scale(1.05); opacity: 0.25; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
        @keyframes float-tag {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes drift1 {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          33%       { transform: translate(12px,-18px) rotate(12deg); }
          66%       { transform: translate(-8px,10px) rotate(-8deg); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          50%       { transform: translate(-14px,16px) rotate(-15deg); }
        }
        @keyframes shimmer {
          0%   { opacity: 0.3; }
          50%  { opacity: 0.8; }
          100% { opacity: 0.3; }
        }
      `}</style>

      {/* Centre glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '260px', height: '260px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(199,166,106,0.18) 0%, transparent 70%)',
        animation: 'pulse-ring 4s ease-in-out infinite',
      }} />

      {/* Orbit path rings — sized to match each dot's exact travel radius */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '440px', height: '440px', borderRadius: '50%',
        border: '1px solid rgba(128,0,32,0.4)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '360px', height: '360px', borderRadius: '50%',
        border: '1px solid rgba(128,0,32,0.4)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '260px', height: '260px', borderRadius: '50%',
        border: '1px solid rgba(128,0,32,0.4)',
      }} />

      {/* Centre card */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '170px', height: '170px', borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(199,166,106,0.18) 0%, rgba(30,111,106,0.14) 100%)',
        border: '1px solid rgba(30,111,106,0.3)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '20px',
      }}>
        <div style={{ fontSize: '32px', marginBottom: '6px' }}>⚕️</div>
        <div style={{ fontSize: '10px', color: 'var(--teal)', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>Integrative</div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Healing</div>
      </div>

      {/* Orbit dot A */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        animation: 'orbitA 8s linear infinite',
        marginTop: '-11px', marginLeft: '-11px',
      }}>
        <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--navy-800)', opacity: 0.9, boxShadow: '0 0 12px rgba(15,39,68,0.6)' }} />
      </div>

      {/* Orbit dot B */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        animation: 'orbitB 12s linear infinite',
        marginTop: '-9px', marginLeft: '-9px',
      }}>
        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--navy-800)', opacity: 0.85, boxShadow: '0 0 10px rgba(15,39,68,0.5)' }} />
      </div>

      {/* Orbit dot C */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        animation: 'orbitC 16s linear infinite',
        marginTop: '-7px', marginLeft: '-7px',
      }}>
        <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--navy-800)', opacity: 0.8, boxShadow: '0 0 8px rgba(15,39,68,0.45)' }} />
      </div>

      {/* Floating tag 1 — top left */}
      <div style={{
        position: 'absolute', top: '60px', left: '20px',
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(199,166,106,0.3)',
        boxShadow: '0 4px 16px rgba(15,39,68,0.08)',
        borderRadius: '8px', padding: '12px 16px',
        animation: 'float-tag 3.5s ease-in-out infinite',
        minWidth: '140px',
      }}>
        <div style={{ fontSize: '12px', color: '#9c7a3c', fontWeight: 700, letterSpacing: '0.6px', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>Cancer Support</div>
        <div style={{ fontSize: '9.5px', color: 'var(--text-light)', marginTop: '4px', fontFamily: 'var(--font-body)', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 500 }}>Core Specialty</div>
      </div>

      {/* Floating tag 2 — bottom right */}
      <div style={{
        position: 'absolute', bottom: '70px', right: '10px',
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(30,111,106,0.35)',
        boxShadow: '0 4px 16px rgba(15,39,68,0.08)',
        borderRadius: '8px', padding: '12px 16px',
        animation: 'float-tag 4.2s ease-in-out infinite 0.8s',
        minWidth: '145px',
      }}>
        <div style={{ fontSize: '12px', color: 'var(--teal)', fontWeight: 700, letterSpacing: '0.6px', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>Mind-Body</div>
        <div style={{ fontSize: '9.5px', color: 'var(--text-light)', marginTop: '4px', fontFamily: 'var(--font-body)', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 500 }}>Medicine</div>
      </div>

      {/* Floating tag 3 — mid right */}
      <div style={{
        position: 'absolute', top: '50%', right: '0px',
        transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(199,166,106,0.25)',
        boxShadow: '0 4px 16px rgba(15,39,68,0.08)',
        borderRadius: '8px', padding: '12px 16px',
        animation: 'float-tag 5s ease-in-out infinite 1.5s',
        minWidth: '130px',
      }}>
        <div style={{ fontSize: '12px', color: 'var(--navy-800)', fontWeight: 700, letterSpacing: '0.6px', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>Women's</div>
        <div style={{ fontSize: '9.5px', color: 'var(--text-light)', marginTop: '4px', fontFamily: 'var(--font-body)', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 500 }}>Wellness</div>
      </div>

      {/* Drifting geometric shapes */}
      <div style={{
        position: 'absolute', top: '30px', right: '60px',
        width: '60px', height: '60px',
        border: '1px solid rgba(199,166,106,0.15)',
        transform: 'rotate(45deg)',
        animation: 'drift1 7s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '40px', left: '30px',
        width: '40px', height: '40px',
        border: '1px solid rgba(30,111,106,0.2)',
        borderRadius: '50%',
        animation: 'drift2 5s ease-in-out infinite',
      }} />

      {/* Shimmer dots scattered */}
      {[
        { top: '15%', left: '10%', size: 3, delay: '0s' },
        { top: '80%', left: '25%', size: 2, delay: '0.7s' },
        { top: '25%', right: '15%', size: 4, delay: '1.2s' },
        { top: '70%', right: '30%', size: 2, delay: '0.4s' },
        { top: '45%', left: '5%', size: 3, delay: '1.8s' },
      ].map((d, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: d.top, left: d.left, right: d.right,
          width: `${d.size}px`, height: `${d.size}px`,
          borderRadius: '50%',
          background: 'var(--gold)',
          animation: `shimmer 3s ease-in-out infinite ${d.delay}`,
        }} />
      ))}
    </div>
  )
}

export default function Home() {
  const ref = useRef(null)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    if (ref.current) ref.current.classList.add('page-enter')
    const timer = setTimeout(() => setShowPopup(true), 3500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showPopup && <ConsultationPopup onClose={() => setShowPopup(false)} />}
      <div ref={ref} style={{ overflowX: 'hidden' }}>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(160deg, var(--ivory) 0%, #eef6f3 55%, var(--ivory) 100%)',
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        paddingTop: '100px', paddingBottom: '80px',
      }}>
        {/* Background decorative blobs */}
        <div style={{ position: 'absolute', top: '-5%', right: '-8%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,111,106,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(199,166,106,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Decorative pattern — desktop only, top-right corner */}
        <div className="hero-corner-pattern" style={{ position: 'absolute', top: '10px', right: '2%', zIndex: 1, pointerEvents: 'none' }}>
          <svg width="260" height="100" viewBox="0 0 260 100" xmlns="http://www.w3.org/2000/svg">
            {/* flourish outline diamonds */}
            <rect x="184" y="-6" width="22" height="22" transform="rotate(45 195 5)" fill="none" stroke="#800020" strokeWidth="1.4" opacity="0.35" />
            <rect x="142" y="37" width="16" height="16" transform="rotate(45 150 45)" fill="none" stroke="#800020" strokeWidth="1.2" opacity="0.22" />

            {/* filled diamond scatter — dense top-right, fading toward bottom-left */}
            <rect x="204" y="2" width="12" height="12" transform="rotate(45 210 8)" fill="#800020" opacity="0.85" />
            <rect x="221" y="24" width="8" height="8" transform="rotate(45 225 28)" fill="#800020" opacity="0.7" />
            <rect x="190" y="25" width="9" height="9" transform="rotate(48 195 30)" fill="#800020" opacity="0.6" />
            <rect x="229" y="46" width="6" height="6" transform="rotate(42 232 50)" fill="#800020" opacity="0.5" />
            <rect x="201" y="48" width="7" height="7" transform="rotate(45 205 52)" fill="#800020" opacity="0.55" />
            <rect x="174" y="11" width="7" height="7" transform="rotate(45 178 15)" fill="#800020" opacity="0.5" />
            <rect x="157" y="32" width="6" height="6" transform="rotate(50 160 35)" fill="#800020" opacity="0.4" />
            <rect x="211" y="66" width="8" height="8" transform="rotate(45 215 70)" fill="#800020" opacity="0.45" />
            <rect x="182" y="65" width="5" height="5" transform="rotate(40 185 68)" fill="#800020" opacity="0.35" />
            <rect x="142" y="52" width="5" height="5" transform="rotate(45 145 55)" fill="#800020" opacity="0.3" />
            <rect x="157" y="72" width="6" height="6" transform="rotate(45 160 75)" fill="#800020" opacity="0.28" />
            <rect x="127" y="27" width="5" height="5" transform="rotate(45 130 30)" fill="#800020" opacity="0.25" />
            <rect x="113" y="48" width="4" height="4" transform="rotate(45 115 50)" fill="#800020" opacity="0.2" />
            <rect x="98" y="68" width="4" height="4" transform="rotate(45 100 70)" fill="#800020" opacity="0.15" />
            <rect x="68" y="78" width="3" height="3" transform="rotate(45 70 80)" fill="#800020" opacity="0.12" />

            {/* dots — texture */}
            <circle cx="238" cy="15" r="3" fill="#800020" opacity="0.75" />
            <circle cx="170" cy="55" r="2.5" fill="#800020" opacity="0.4" />
            <circle cx="140" cy="75" r="2" fill="#800020" opacity="0.3" />
            <circle cx="125" cy="15" r="2" fill="#800020" opacity="0.35" />
            <circle cx="95" cy="40" r="2" fill="#800020" opacity="0.18" />
            <circle cx="75" cy="60" r="1.5" fill="#800020" opacity="0.12" />
          </svg>
        </div>

        <div className="container" style={{ width: '100%' }}>
          {/* Two-column hero layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 480px',
            gap: '60px',
            alignItems: 'center',
          }} className="hero-grid">

            {/* LEFT — text content */}
            <div style={{ paddingLeft: '0' }}>

              {/* Doctor name box — top of hero */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '16px',
                marginBottom: '32px',
                background: 'rgba(199,166,106,0.1)',
                border: '1px solid rgba(199,166,106,0.3)',
                borderLeft: '3px solid var(--gold)',
                borderRadius: '2px',
                padding: '14px 22px',
              }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px', fontWeight: 700,
                    color: '#9c7a3c',
                    letterSpacing: '0.5px',
                    lineHeight: 1.2,
                  }}>
                    Dr. Kirthi Kakade
                  </div>
                  <div style={{
                    fontSize: '10px', color: 'var(--text-muted)',
                    letterSpacing: '2px', textTransform: 'uppercase',
                    marginTop: '4px', fontFamily: 'var(--font-body)',
                  }}>
                    C-Suite Mind Body Specialist
                  </div>
                </div>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 4.5vw, 68px)',
                fontWeight: 600, color: 'var(--navy-800)',
                lineHeight: 1.1, marginBottom: '24px',
              }}>
                Where Medicine<br />Meets Mindset,{' '}
                <span style={{ color: '#800020', fontStyle: 'normal', display: 'block' }}>
                  and Healing Becomes<br />Transformation
                </span>
              </h1>

              <p style={{
                fontSize: '17px', color: '#2a2a2a',
                lineHeight: '1.85', maxWidth: '520px', marginBottom: '14px',
                fontFamily: 'var(--font-body)', fontWeight: 400,
              }}>
                Combining 15+ years of expertise in Homeopathy, Psychotherapy, Women's Health,
                and Integrative Healing Sciences — helping individuals reclaim health and vitality
                even when conventional pathways seem exhausted.
              </p>
              <p style={{
                fontSize: '15px', color: '#2a2a2a',
                lineHeight: '1.7', maxWidth: '480px', marginBottom: '36px',
                fontFamily: 'var(--font-body)',
              }}>
                From cancer support and chronic disorders to emotional resilience and fertility —
                each healing pathway is deeply personalised.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '14px' }}>
                <Link to="/contact"><button className="btn-primary">Book a Consultation</button></Link>
                <Link to="/programs"><button className="btn-outline-dark">Explore Programs</button></Link>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '34px', letterSpacing: '0.3px' }}>
                Enquiry call / consultation fee: <strong style={{ color: 'var(--navy-800)' }}>₹599</strong>
              </p>

              {/* Stats */}
              <div style={{
                display: 'flex', gap: '44px', flexWrap: 'wrap',
                paddingTop: '36px', borderTop: '1px solid rgba(30,111,106,0.2)',
              }}>
                {[
                  { num: '15+', label: 'Years Experience' },
                  { num: '1000+', label: 'Lives Impacted' },
                  { num: '6', label: 'Healing Disciplines' },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 700, color: 'var(--teal)', lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-light)', marginTop: '6px', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — doctor photo */}
            <div className="hero-visual-wrapper">
              <img
                src={doctorHeroImg}
                alt="Dr. Kirthi Kakade"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '520px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 20px 50px rgba(15,39,68,0.15)',
                }}
              />
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--navy-800)' }}>Dr. Kirthi Kakade</div>
                <div style={{ fontSize: '17px', color: 'var(--text-light)', marginTop: '4px', letterSpacing: '0.5px' }}>C-Suite Mind Body Specialist</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', animation: 'float 2.5s ease-in-out infinite' }}>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, var(--teal), transparent)' }} />
          <span style={{ fontSize: '10px', color: 'var(--text-light)', letterSpacing: '2px', textTransform: 'uppercase' }}>Scroll</span>
        </div>
      </section>

      {/* TAGLINE STRIP */}
      <section style={{ background: 'var(--teal)', padding: '20px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 2vw, 22px)', color: 'var(--gold-pale)', fontWeight: 600, margin: 0, fontStyle: 'italic', letterSpacing: '0.3px' }}>
            "Restoring Health. Renewing Hope. Transforming Lives."
          </p>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section style={{ background: 'var(--gold)', padding: '28px 0' }}>
        <div className="container">
          <div className="intro-strip-inner" style={{ display: 'flex', gap: '0', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', textAlign: 'center' }}>
            {['Homeopathic Physician', 'Psychotherapist', 'Mind-Body Specialist', 'Women\'s Health Expert', 'Holistic Health Educator'].map((t, i) => (
              <span key={t} style={{
                fontSize: '12px', fontFamily: 'var(--font-body)', fontWeight: 600,
                color: 'var(--navy-800)', letterSpacing: '1.5px', textTransform: 'uppercase',
                padding: '6px 20px',
                borderRight: i < 4 ? '1px solid rgba(15,39,68,0.3)' : 'none',
                lineHeight: '1.4',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIVE APPROACH — orbit visual */}
      <section style={{ padding: '90px 0', background: 'var(--white)', overflow: 'hidden' }}>
        <div className="container">
          <div className="orbit-section-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 460px', gap: '48px', alignItems: 'center' }}>
            <div>
              <span className="section-tag">Our Philosophy</span>
              <div className="gold-line" />
              <h2 className="section-title">One Integrative System, Many Healing Pathways</h2>
              <p style={{ fontSize: '17px', color: 'var(--text-muted)', lineHeight: '1.85', marginBottom: '32px', maxWidth: '480px' }}>
                Cancer support, mind-body medicine, and women's wellness aren't treated as separate silos here — each pathway orbits a single, personalised healing plan built around you.
              </p>
              <Link to="/contact"><button className="btn-primary">Book a Consultation</button></Link>
            </div>
            <div className="orbit-visual-outer">
              <div className="orbit-visual-scale">
                <IntegrativeOrbitVisual />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCTOR'S TEAM */}
      <DoctorsTeamSection />

      {/* SATVAM INTEGRATIVE ONCOLOGY */}
      <SatvamSection />

      {/* SPECIALIZATIONS PREVIEW */}
      <section style={{ padding: '100px 0', background: 'var(--ivory)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <img
              src={healingCollageImg}
              alt="Healing Areas"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 20px 50px rgba(15,39,68,0.12)',
                marginBottom: '48px',
              }}
            />
          </div>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Link to="/contact"><button className="btn-primary">Book a Consultation</button></Link>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="section-tag">Healing Areas</span>
            <div className="gold-line center" />
            <h2 className="section-title">Specialized Healing Pathways</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Each specialization addresses the complete individual — physical, emotional, and psychological — with evidence-informed integrative approaches.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', background: 'rgba(15,39,68,0.06)' }}>
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} style={{
                background: h.highlight ? 'var(--teal)' : 'var(--white)',
                padding: '0 0 36px',
                position: 'relative', overflow: 'hidden',
                transition: 'var(--transition)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = h.highlight ? 'var(--teal-light)' : 'var(--ivory-dark)' }}
              onMouseLeave={e => { e.currentTarget.style.background = h.highlight ? 'var(--teal)' : 'var(--white)' }}>
                {h.highlight && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--gold)', zIndex: 2 }} />
                )}
                {h.image && (
                  <div style={{ width: '100%', height: '200px', overflow: 'hidden', marginBottom: '24px' }}>
                    <img
                      src={h.image}
                      alt={h.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                    />
                  </div>
                )}
                <div style={{ padding: '28px 32px 0' }}>
                <div style={{ fontSize: '32px', marginBottom: '16px', lineHeight: 1.4 }}>{h.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px', fontWeight: 600,
                  color: h.highlight ? 'var(--gold-pale)' : 'var(--navy-800)',
                  marginBottom: '12px',
                }}>{h.title}</h3>
                <p style={{ fontSize: '17px', color: h.highlight ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)', lineHeight: '1.8' }}>{h.desc}</p>
                {h.highlight && (
                  <div style={{ marginTop: '20px', fontSize: '11px', color: 'var(--gold)', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                    Core Specialty →
                  </div>
                )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/specializations"><button className="btn-outline-dark">Explore All Specializations</button></Link>
            <Link to="/contact"><button className="btn-primary">Book a Consultation</button></Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section style={{ padding: '50px 0 100px', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px', marginLeft: 0, marginRight: 0 }}>
            <img
              src={whyChooseBannerImg}
              alt="Why Dr. Kirthi Kakade"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 20px 50px rgba(15,39,68,0.12)',
                marginLeft: 0,
                marginRight: 0,
              }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="two-col-grid">
            <div>
              <span className="section-tag">Why Dr. Kirthi Kakade</span>
              <div className="gold-line" />
              <h2 className="section-title">A Different Kind of Healthcare Experience</h2>
              <p style={{ fontSize: '17px', color: 'var(--text-muted)', lineHeight: '1.85', marginBottom: '32px', fontWeight: 400 }}>
                Not just a practitioner — a trusted health strategist who bridges medicine, psychology, and holistic healing for complete transformation.
              </p>
              <Link to="/contact"><button className="btn-primary">Begin Your Journey</button></Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
              {WHY.map((w, i) => (
                <div key={i} style={{
                  background: 'var(--ivory)',
                  border: '1px solid rgba(30,111,106,0.15)',
                  padding: '20px 18px',
                  display: 'flex', alignItems: 'flex-start', gap: '10px',
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--teal)', flexShrink: 0, marginTop: '5px' }} />
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', fontFamily: 'var(--font-body)' }}>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ paddingTop: '0', paddingBottom: '100px', background: 'var(--ivory)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="section-tag">The Process</span>
            <div className="gold-line center" />
            <h2 className="section-title">A Structured, Personalised Approach</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0' }}>
            {[
              { num: '01', title: 'Initial Consultation', desc: 'Deep understanding of your health condition, history, lifestyle, and recovery goals.' },
              { num: '02', title: 'Health Assessment', desc: 'Comprehensive review of physical patterns, emotional load, and recurring challenges.' },
              { num: '03', title: 'Personalised Plan', desc: 'A structured, multi-disciplinary healing roadmap tailored to your unique needs.' },
              { num: '04', title: 'Guided Support', desc: 'Ongoing therapies, monitoring, and adjustments through your healing journey.' },
              { num: '05', title: 'Long-Term Stability', desc: 'Sustainable health management — stronger, more resilient, more in control.' },
            ].map((step, i) => (
              <div key={i} style={{
                padding: '36px 28px',
                borderLeft: i === 0 ? 'none' : '1px solid rgba(15,39,68,0.08)',
                borderBottom: '3px solid transparent',
                transition: 'var(--transition)',
                background: 'var(--white)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderBottom = '3px solid var(--gold)'; e.currentTarget.style.background = 'var(--ivory)' }}
              onMouseLeave={e => { e.currentTarget.style.borderBottom = '3px solid transparent'; e.currentTarget.style.background = 'var(--white)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 700, color: 'rgb(7, 5, 14)', lineHeight: 1, marginBottom: '16px' }}>{step.num}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: 'var(--navy-800)', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.8' }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/contact"><button className="btn-primary">Book a Consultation</button></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--gold)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 600, color: 'var(--navy-800)', marginBottom: '16px' }}>
            Long-Term Health Requires More Than Temporary Relief
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(15,39,68,0.7)', marginBottom: '36px', maxWidth: '520px', margin: '0 auto 36px', lineHeight: '1.8' }}>
            Begin with a detailed assessment to understand the most suitable healing path forward for your health needs.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact">
              <button style={{ background: 'var(--navy-800)', color: 'var(--white)', border: 'none', padding: '14px 32px', borderRadius: '2px', fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', transition: 'var(--transition)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--navy-700)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--navy-800)'}>
                Apply for Consultation
              </button>
            </Link>
            <Link to="/programs">
              <button className="btn-outline-dark">View Programs</button>
            </Link>
          </div>
        </div>
      </section>

      {/* HEALING MAP — 3D interactive body */}
      <section className="healing-map-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="section-tag" style={{ color: 'var(--gold-yellow)' }}>Explore Healing Areas</span>
            <div className="gold-line center" />
            <h2 className="section-title">Interactive Healing Map</h2>
            <p style={{ fontSize: '16px', color: '#333', maxWidth: '480px', margin: '0 auto', lineHeight: '1.85', fontFamily: 'var(--font-body)', fontWeight: 400 }}>
              Tap any glowing point to explore how Dr. Kirthi Kakade's integrative approach addresses each area of health.
            </p>
          </div>
          <HealingMap />
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/contact"><button className="btn-primary">Book a Consultation</button></Link>
          </div>
        </div>
      </section>

      {/* GALLERY SCROLL */}
      <GalleryScroll />

      {/* BLOG PREVIEW */}
      <BlogPreview />

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* FINAL CTA */}
      <section style={{ background: 'var(--navy-800)', padding: '70px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 600, color: 'var(--gold-pale)', marginBottom: '24px' }}>
            Ready to Begin Your Healing Journey?
          </h2>
          <Link to="/contact"><button className="btn-primary">Book a Consultation</button></Link>
        </div>
      </section>

      {/* Responsive overrides */}
      <style>{`
        .orbit-visual-outer {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .orbit-visual-scale {
          transform: scale(1);
          transform-origin: top center;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-visual-wrapper {
            max-width: 340px !important;
            margin: 0 auto !important;
          }
          .hero-corner-pattern {
            display: none !important;
          }
          .orbit-section-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            text-align: center;
          }
          .orbit-section-grid p {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .orbit-visual-outer {
            height: 375px;
            overflow: hidden;
          }
          .orbit-visual-scale {
            transform: scale(0.72);
          }
        }
        @media (max-width: 480px) {
          .orbit-visual-outer {
            height: 265px;
          }
          .orbit-visual-scale {
            transform: scale(0.51);
          }
        }
        @media (max-width: 600px) {
          .intro-strip-inner span {
            border-right: none !important;
            border-bottom: 1px solid rgba(15,39,68,0.15) !important;
            width: 100% !important;
            text-align: center !important;
            padding: 10px 16px !important;
          }
          .intro-strip-inner span:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </div>
    </>
  )
}