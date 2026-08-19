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
                    Dr. Kirthi
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
                <span style={{ color: 'var(--teal)', fontStyle: 'italic', display: 'block' }}>
                  and Healing Becomes<br />Transformation
                </span>
              </h1>

              <p style={{
                fontSize: '15px', color: 'var(--text-muted)',
                lineHeight: '1.85', maxWidth: '520px', marginBottom: '14px',
                fontFamily: 'var(--font-body)', fontWeight: 300,
              }}>
                Combining 15+ years of expertise in Homeopathy, Psychotherapy, Women's Health,
                and Integrative Healing Sciences — helping individuals reclaim health and vitality
                even when conventional pathways seem exhausted.
              </p>
              <p style={{
                fontSize: '13px', color: 'var(--text-light)',
                lineHeight: '1.7', maxWidth: '480px', marginBottom: '36px',
                fontFamily: 'var(--font-body)',
              }}>
                From cancer support and chronic disorders to emotional resilience and fertility —
                each healing pathway is deeply personalised.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}>
                <Link to="/contact"><button className="btn-primary">Book a Consultation</button></Link>
                <Link to="/programs"><button className="btn-outline-dark">Explore Programs</button></Link>
              </div>

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
                alt="Dr Krithi"
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
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--navy-800)' }}>Dr. Kirthi</div>
                <div style={{ fontSize: '13px', color: 'var(--text-light)', marginTop: '4px', letterSpacing: '0.5px' }}>C-Suite Mind Body Specialist</div>
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

      {/* DOCTOR'S TEAM */}
      <DoctorsTeamSection />

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
                <p style={{ fontSize: '13px', color: h.highlight ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)', lineHeight: '1.8' }}>{h.desc}</p>
                {h.highlight && (
                  <div style={{ marginTop: '20px', fontSize: '11px', color: 'var(--gold)', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                    Core Specialty →
                  </div>
                )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/specializations"><button className="btn-outline-dark">Explore All Specializations</button></Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section style={{ padding: '50px 0 100px', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px', marginLeft: 0, marginRight: 0 }}>
            <img
              src={whyChooseBannerImg}
              alt="Why Dr. Kirthi"
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
              <span className="section-tag">Why Dr. Kirthi</span>
              <div className="gold-line" />
              <h2 className="section-title">A Different Kind of Healthcare Experience</h2>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.85', marginBottom: '32px', fontWeight: 300 }}>
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
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6', fontFamily: 'var(--font-body)' }}>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: '100px 0', background: 'var(--ivory)' }}>
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
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.8' }}>{step.desc}</p>
              </div>
            ))}
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
            <span className="section-tag" style={{ color: 'var(--gold)' }}>Explore Healing Areas</span>
            <div className="gold-line center" />
            <h2 className="section-title light">Interactive Healing Map</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', margin: '0 auto', lineHeight: '1.85', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              Tap any glowing point to explore how Dr. Kirthi's integrative approach addresses each area of health.
            </p>
          </div>
          <HealingMap />
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <BlogPreview />

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-visual-wrapper {
            max-width: 340px !important;
            margin: 0 auto !important;
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