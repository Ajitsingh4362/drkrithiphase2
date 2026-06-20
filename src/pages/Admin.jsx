import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, Link, Navigate, useNavigate } from 'react-router-dom'
import { ADMIN_PASSWORD, supabase } from '../lib/supabase'
import AdminBlogList from './admin/AdminBlogList'
import AdminBlogEditor from './admin/AdminBlogEditor'
import AdminGallery from './admin/AdminGallery'
import AdminAppointments from './admin/AdminAppointments'
import AdminSettings from './admin/AdminSettings'
import AdminNotes from './admin/AdminNotes'
import AdminPatients from './admin/AdminPatients'
import AdminPatientProfile from './admin/AdminPatientProfile'
import AdminAnalytics from './admin/AdminAnalytics'
import AdminCalendar from './admin/AdminCalendar'
import AdminTestimonials from './admin/AdminTestimonials'
import NotificationBell from '../components/NotificationBell'

const AUTH_KEY = 'mmm_admin_authed'

function AdminHeader() {
  const [pending, setPending] = useState(0)
  const [showToast, setShowToast] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPending()
    const channel = supabase
      .channel('admin-header-notif')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'appointments' }, (payload) => {
        fetchPending()
        setShowToast({ name: payload.new.name, service: payload.new.service || 'General Consultation' })
        setTimeout(() => setShowToast(null), 6000)
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'appointments' }, () => {
        fetchPending()
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  async function fetchPending() {
    const { count } = await supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('status', 'pending')
    setPending(count || 0)
  }

  return (
    <>
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid rgba(15,39,68,0.08)' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </span>

        {/* Notification Bell */}
        <button onClick={() => navigate('/admin/appointments')} style={{ position: 'relative', background: pending > 0 ? 'rgba(192,57,43,0.08)' : 'var(--white)', border: `1px solid ${pending > 0 ? 'rgba(192,57,43,0.25)' : 'rgba(15,39,68,0.12)'}`, borderRadius: '2px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
          <span style={{ fontSize: '18px' }}>🔔</span>
          {pending > 0 && (
            <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#c0392b', color: '#fff', fontSize: '9px', fontWeight: 700, minWidth: '18px', height: '18px', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', padding: '0 4px' }}>
              {pending > 9 ? '9+' : pending}
            </span>
          )}
        </button>

        {/* View Site */}
        <a href="/" target="_blank" rel="noreferrer" style={{ background: 'var(--white)', border: '1px solid rgba(15,39,68,0.12)', borderRadius: '2px', padding: '8px 14px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          🌐 View Site
        </a>
      </div>

      {/* Toast popup */}
      {showToast && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: 'var(--navy-800)', border: '1px solid rgba(199,166,106,0.3)', borderRadius: '4px', padding: '16px 20px', zIndex: 9999, boxShadow: '0 8px 32px rgba(7,15,28,0.35)', maxWidth: '320px', animation: 'popIn 0.3s ease' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--gold)', borderRadius: '4px 4px 0 0' }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '22px', flexShrink: 0 }}>🌿</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--gold-pale)', margin: '0 0 4px' }}>New Appointment!</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', margin: '0 0 10px', lineHeight: 1.5 }}>
                <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{showToast.name}</strong> — {showToast.service}
              </p>
              <button onClick={() => { navigate('/admin/appointments'); setShowToast(null) }} style={{ fontSize: '11px', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0, letterSpacing: '0.5px' }}>
                View Appointment →
              </button>
            </div>
            <button onClick={() => setShowToast(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '14px', padding: 0, flexShrink: 0 }}>✕</button>
          </div>
        </div>
      )}
    </>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) === 'true') setAuthed(true)
    setChecked(true)
  }, [])

  function login() {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true)
      setError(false)
      sessionStorage.setItem(AUTH_KEY, 'true')
    } else {
      setError(true)
    }
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY)
    setAuthed(false)
    setPw('')
  }

  if (!checked) return null

  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <p className="admin-login-logo">Mind Motion Matrix</p>
          <h2>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            className={error ? 'error' : ''}
            autoFocus
          />
          {error && <p className="admin-error-text">Incorrect password</p>}
          <button className="admin-btn-primary admin-login-btn" onClick={login}>Login</button>
          <Link to="/" className="admin-back-to-site">← Back to website</Link>
        </div>
      </div>
    )
  }

  const navItems = [
    { to: '/admin/analytics', label: 'Analytics', icon: '📈' },
    { to: '/admin/calendar', label: 'Calendar', icon: '📅' },
    { to: '/admin/patients', label: 'Patients', icon: '👥' },
    { to: '/admin/appointments', label: 'Appointments', icon: '📋' },
    { to: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
    { to: '/admin/posts', label: 'Blog Posts', icon: '📝' },
    { to: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
    { to: '/admin/settings', label: 'Popup Settings', icon: '⚙️' },
    { to: '/admin/notes', label: 'My Notes', icon: '🗒️' },
  ]

  return (
    <div className="admin-shell">
      <button className="admin-mobile-toggle" onClick={() => setSidebarOpen(p => !p)}>
        {sidebarOpen ? '✕' : '☰'} Menu
      </button>

      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <p className="admin-sidebar-logo">Mind Motion Matrix</p>
        <nav className="admin-nav">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
              <span className="admin-nav-icon">{item.icon}</span> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <button className="admin-nav-link" onClick={logout}>🚪 Logout</button>
        </div>
      </aside>

      <main className="admin-main">
        <AdminHeader />
        <Routes>
          <Route index element={<Navigate to="analytics" replace />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="patients" element={<AdminPatients />} />
          <Route path="patients/:id" element={<AdminPatientProfile />} />
          <Route path="posts" element={<AdminBlogList />} />
          <Route path="posts/:id" element={<AdminBlogEditor />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="notes" element={<AdminNotes />} />
        </Routes>
      </main>
    </div>
  )
}
