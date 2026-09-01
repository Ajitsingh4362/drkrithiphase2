import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

// Old/legacy patients live in the same `patients` table as everyone else — they're
// just tagged 'Old Patient'. That way they automatically get the full profile
// (Medical History, Consultations, Billing with a backdated invoice date, etc.)
// instead of a separate, limited form.
function initials(name) {
  return (name || '').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function AdminOldPatients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => { fetchPatients() }, [])

  async function fetchPatients() {
    setLoading(true)
    const { data } = await supabase.from('patients').select('*').order('registered_on', { ascending: false, nullsFirst: false })
    setPatients((data || []).filter(p => (p.tags || []).includes('Old Patient')))
    setLoading(false)
  }

  function exportCSV() {
    const rows = filtered.length ? filtered : patients
    if (!rows.length) { alert('No patients to export'); return }
    const headers = ['Name', 'Address', 'Age', 'Phone', 'Registered On']
    const csvRows = rows.map(p => [
      p.name, p.address || '', p.age || '', p.phone,
      p.registered_on ? new Date(p.registered_on).toLocaleDateString('en-IN') : '',
    ])
    const csv = [headers, ...csvRows]
      .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `old_patients_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = patients.filter(p => {
    const q = search.toLowerCase()
    return !q || p.name.toLowerCase().includes(q) || (p.phone || '').includes(search) || (p.address || '').toLowerCase().includes(q)
  })

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h1>Old Patients</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="admin-btn-outline" onClick={exportCSV}>⬇️ Export CSV</button>
          <button className="admin-btn-primary" onClick={() => navigate('/admin/patients/new?tag=Old Patient')}>+ Add Old Patient</button>
        </div>
      </div>

      <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', margin: '-8px 0 20px' }}>
        These are full patient profiles tagged "Old Patient" — you get the same Medical History and Billing tabs as any
        other patient, so you can enter their past records and raise invoices dated in the past.
      </p>

      <input
        placeholder="Search name, phone, address..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: '9px 14px', border: '1px solid rgba(15,39,68,0.12)', borderRadius: '2px', fontSize: '0.88rem', fontFamily: 'var(--font-body)', outline: 'none', width: '100%', marginBottom: '20px' }}
      />

      {loading ? <p className="admin-empty">Loading...</p> : filtered.length === 0 ? (
        <p className="admin-empty">No old patients found yet. Click "+ Add Old Patient" to start entering past records.</p>
      ) : (
        <div style={{ background: 'var(--white)', border: '1px solid rgba(15,39,68,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
          {filtered.map((p, i) => (
            <Link to={`/admin/patients/${p.id}`} key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 20px', borderBottom: i < filtered.length - 1 ? '1px solid rgba(15,39,68,0.06)' : 'none', flexWrap: 'wrap', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: p.avatar_color || '#b9914f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-display)', flexShrink: 0 }}>
                {initials(p.name)}
              </div>
              <div style={{ flex: 1, minWidth: '180px' }}>
                <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--navy-800)', margin: 0, fontFamily: 'var(--font-body)' }}>
                  {p.name} {p.age ? <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>· {p.age}y</span> : ''}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '3px 0 0', fontFamily: 'var(--font-body)' }}>
                  📱 {p.phone} {p.address ? `· 📍 ${p.address}` : ''}
                </p>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-light)', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                {p.registered_on ? `Since ${new Date(p.registered_on).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
