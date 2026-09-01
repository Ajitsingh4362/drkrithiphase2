import { useState, useEffect, useRef } from 'react'
import { supabase, ADMIN_PASSWORD } from '../../lib/supabase'

// The WhatsApp bridge (Baileys) server must be running and reachable at this address —
// its URL is stored in Supabase (`app_settings`, key `whatsapp_notifier_url`) instead of
// hardcoded, so it can be set/changed here whenever you deploy or redeploy the bridge
// (e.g. on Render — free tier spins down after inactivity, so the first request after
// idle time can take 20-40 seconds to wake up, that's normal, not a bug).
//
// This admin panel uses a single shared password rather than per-user Supabase Auth, so
// there's no login session token to send. Instead we send the admin password itself as a
// bearer token — your bridge server's /qr and /logout endpoints should check that the
// Authorization header matches this same password before responding.
function authHeaders() {
  return { Authorization: `Bearer ${ADMIN_PASSWORD}` }
}

export default function AdminWhatsApp() {
  const [notifierUrl, setNotifierUrl] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [savingUrl, setSavingUrl] = useState(false)
  const [connected, setConnected] = useState(false)
  const [qr, setQr] = useState(null)
  const [serverReachable, setServerReachable] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [checkedOnce, setCheckedOnce] = useState(false)
  const pollRef = useRef(null)

  useEffect(() => {
    loadUrl()
    return () => clearInterval(pollRef.current)
  }, [])

  async function loadUrl() {
    const { data } = await supabase.from('app_settings').select('value').eq('key', 'whatsapp_notifier_url').maybeSingle()
    const url = data?.value || ''
    setNotifierUrl(url)
    setUrlInput(url)
    if (url) checkStatus(url)
    else setCheckedOnce(true)
  }

  async function saveUrl() {
    setSavingUrl(true)
    const clean = urlInput.trim().replace(/\/+$/, '')
    await supabase.from('app_settings').upsert({ key: 'whatsapp_notifier_url', value: clean, updated_at: new Date().toISOString() })
    setNotifierUrl(clean)
    setSavingUrl(false)
    if (clean) checkStatus(clean)
  }

  async function checkStatus(url = notifierUrl) {
    if (!url) { setCheckedOnce(true); return }
    try {
      const res = await fetch(`${url}/status`)
      const data = await res.json()
      setServerReachable(true)
      setConnected(data.connected)
    } catch (e) {
      setServerReachable(false)
    }
    setCheckedOnce(true)
  }

  function handleGenerateQr() {
    setGenerating(true)
    setQr(null)
    pollQr()
    pollRef.current = setInterval(pollQr, 2000)
  }

  async function pollQr() {
    try {
      const res = await fetch(`${notifierUrl}/qr`, { headers: authHeaders() })
      const data = await res.json()
      setServerReachable(true)
      setConnected(data.connected)
      setQr(data.qr)
      if (data.connected) {
        clearInterval(pollRef.current)
        setGenerating(false)
      }
    } catch (e) {
      setServerReachable(false)
      clearInterval(pollRef.current)
      setGenerating(false)
    }
  }

  async function handleLogout() {
    if (!confirm('Disconnect WhatsApp? You will need to scan the QR again to reconnect.')) return
    setLoggingOut(true)
    try {
      await fetch(`${notifierUrl}/logout`, { method: 'POST', headers: authHeaders() })
    } catch (e) { /* ignore */ }
    setLoggingOut(false)
    setQr(null)
    setGenerating(false)
    clearInterval(pollRef.current)
    checkStatus()
  }

  return (
    <div className="admin-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--navy-800)', margin: 0 }}>WhatsApp Notifications</p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0', fontFamily: 'var(--font-body)' }}>
            Link a WhatsApp number to send automatic appointment / follow-up messages.
          </p>
        </div>
      </div>

      {/* Bridge server URL */}
      <div style={{ background: 'var(--ivory)', border: '1px solid rgba(15,39,68,0.08)', borderRadius: '2px', padding: '18px 20px', marginBottom: '20px' }}>
        <label style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
          WhatsApp Bridge Server URL
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <input
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            placeholder="https://your-service.onrender.com"
            style={{ flex: 1, minWidth: '220px', padding: '9px 12px', border: '1px solid rgba(15,39,68,0.12)', borderRadius: '2px', fontSize: '0.85rem', fontFamily: 'var(--font-body)', outline: 'none' }}
          />
          <button className="admin-btn-primary admin-btn-sm" onClick={saveUrl} disabled={savingUrl}>{savingUrl ? 'Saving...' : 'Save'}</button>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '8px 0 0', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          Paste the URL of your deployed Baileys bridge server here once it's live on Render (or wherever you host it).
          It's saved in Supabase, so you can update it any time without redeploying this site.
        </p>
      </div>

      {!notifierUrl && checkedOnce && (
        <p className="admin-empty">Add your bridge server URL above to get started.</p>
      )}

      {notifierUrl && !serverReachable && checkedOnce && (
        <div style={{ background: '#fdf1ef', border: '1px solid rgba(192,57,43,0.25)', borderRadius: '2px', padding: '18px 20px', marginBottom: '20px' }}>
          <p style={{ fontWeight: 600, fontSize: '13px', color: '#c0392b', margin: '0 0 6px', fontFamily: 'var(--font-body)' }}>WhatsApp service not reachable</p>
          <p style={{ fontSize: '12.5px', color: '#8a4a42', margin: 0, fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
            This can happen if the service was asleep and is still waking up (free hosting spins down after inactivity —
            can take 20-40 seconds on the first try). Wait a bit and click refresh below. If it still doesn't connect
            after a minute, double-check the URL above or check the service is deployed.
          </p>
          <button className="admin-btn-outline admin-btn-sm" style={{ marginTop: '12px' }} onClick={() => checkStatus()}>Retry</button>
        </div>
      )}

      {notifierUrl && serverReachable && connected && (
        <div className="admin-wa-card" style={{ background: '#eefaf3', border: '1px solid rgba(30,143,90,0.25)', borderRadius: '2px', padding: '28px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>✅</div>
          <p style={{ fontWeight: 600, fontSize: '15px', color: '#1e8f5a', margin: '0 0 6px', fontFamily: 'var(--font-body)' }}>WhatsApp Connected</p>
          <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: '0 0 18px', fontFamily: 'var(--font-body)' }}>
            Notifications will be sent from the linked number.
          </p>
          <button className="admin-btn-outline admin-btn-sm" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? 'Disconnecting...' : 'Disconnect'}
          </button>
        </div>
      )}

      {notifierUrl && serverReachable && !connected && checkedOnce && (
        <div className="admin-wa-card" style={{ background: 'var(--ivory)', border: '1px solid rgba(15,39,68,0.08)', borderRadius: '2px', padding: '28px', textAlign: 'center' }}>
          {!qr && !generating && (
            <>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 18px', fontFamily: 'var(--font-body)' }}>
                Not connected yet. Click below to generate a QR code.
              </p>
              <button className="admin-btn-primary admin-btn-sm" onClick={handleGenerateQr}>
                Generate QR
              </button>
            </>
          )}

          {generating && !qr && (
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>Generating QR code...</p>
          )}

          {qr && (
            <>
              <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--navy-800)', margin: '0 0 16px', fontFamily: 'var(--font-body)' }}>
                Scan with WhatsApp — Settings → Linked Devices → Link a Device
              </p>
              <img src={qr} alt="WhatsApp QR code" style={{ width: '260px', maxWidth: '100%', height: 'auto', border: '8px solid white', borderRadius: '4px', boxShadow: '0 4px 16px rgba(15,39,68,0.12)' }} />
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '14px', fontFamily: 'var(--font-body)' }}>
                QR refreshes automatically — keep this page open while scanning.
              </p>
            </>
          )}
        </div>
      )}
      <style>{`
        @media (max-width: 420px) {
          .admin-wa-card { padding: 18px !important; }
        }
      `}</style>
    </div>
  )
}
