import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function GalleryScroll() {
  const [items, setItems] = useState([])

  useEffect(() => {
    supabase
      .from('gallery')
      .select('*')
      .eq('visible', true)
      .order('sort_order')
      .then(({ data }) => setItems(data || []))
  }, [])

  if (!items.length) return null

  // Duplicate items so the scroll loop is seamless
  const loopItems = [...items, ...items]

  return (
    <section style={{ padding: '80px 0', background: 'var(--ivory)', overflow: 'hidden' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="section-tag">Gallery</span>
        <div className="gold-line center" />
        <h2 className="section-title">Moments of Healing & Transformation</h2>
      </div>

      <div className="gallery-scroll-wrap">
        <div className="gallery-scroll-track">
          {loopItems.map((item, i) => (
            <div className="gallery-scroll-item" key={`${item.id}-${i}`}>
              <img src={item.image_url} alt={item.title || ''} loading="lazy" />
              {item.title && <div className="gallery-scroll-caption">{item.title}</div>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <Link to="/gallery"><button className="btn-outline-dark">View Full Gallery</button></Link>
      </div>
    </section>
  )
}
