import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

function initials(name) {
  return (name || '').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

const EMPTY = { name: '', designation: '', qualification: '', bio: '', photo_url: '', visible: true }

export default function AdminDoctors() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null | 'new' | id
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => { fetchList() }, [])

  async function fetchList() {
    const { data } = await supabase.from('doctors').select('*').order('sort_order').order('created_at')
    setList(data || [])
    setLoading(false)
  }

  function openNew() { setForm(EMPTY); setMsg(''); setEditing('new') }
  function openEdit(d) { setForm({ ...d }); setMsg(''); setEditing(d.id) }
  function closeForm() { setEditing(null); setForm(EMPTY) }
  function setF(key, val) { setForm(f => ({ ...f, [key]: val })) }

  async function save() {
    if (!form.name) { setMsg('Doctor name is required'); return }
    if (!form.qualification) { setMsg('Qualification is required'); return }
    setSaving(true)
    if (editing === 'new') {
      await supabase.from('doctors').insert({ ...form, sort_order: list.length })
    } else {
      await supabase.from('doctors').update(form).eq('id', editing)
    }
    setSaving(false)
    closeForm()
    fetchList()
  }

  async function remove(id) {
    if (!confirm('Remove this doctor from the team section?')) return
    await supabase.from('doctors').delete().eq('id', id)
    fetchList()
  }

  async function toggleVisible(id, val) {
    await supabase.from('doctors').update({ visible: val }).eq('id', id)
    setList(prev => prev.map(d => d.id === id ? { ...d, visible: val } : d))
  }

  async function moveUp(i) {
    if (i === 0) return
    const updated = [...list]
    ;[updated[i - 1], updated[i]] = [updated[i], updated[i - 1]]
    setList(updated)
    await Promise.all(updated.map((d, idx) => supabase.from('doctors').update({ sort_order: idx }).eq('id', d.id)))
  }

  async function moveDown(i) {
    if (i === list.length - 1) return
    const updated = [...list]
    ;[updated[i], updated[i + 1]] = [updated[i + 1], updated[i]]
    setList(updated)
    await Promise.all(updated.map((d, idx) => supabase.from('doctors').update({ sort_order: idx }).eq('id', d.id)))
  }

  async function uploadPhoto(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const path = `doctors/${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('gallery-images').upload(path, file)
    if (!error) {
      const { data } = supabase.storage.from('gallery-images').getPublicUrl(path)
      setF('photo_url', data.publicUrl)
    } else {
      setMsg('Upload failed: ' + error.message)
    }
    setUploading(false)
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h1>Doctor's Team</h1>
        <button className="admin-btn-primary" onClick={openNew}>+ Add Doctor</button>
      </div>

      <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>
        Shown on the home page above "Healing Areas" · ⬆⬇ arrows to reorder · 👁 = visible on website
      </p>

      {/* ADD / EDIT FORM */}
      {editing && (
        <div style={{ background: 'var(--ivory)', border: '1px solid rgba(15,39,68,0.1)', borderRadius: '2px', padding: '24px', marginBottom: '24px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--gold)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--navy-800)', margin: 0 }}>
              {editing === 'new' ? 'Add Doctor' : 'Edit Doctor'}
            </p>
            <button onClick={closeForm} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
          </div>

          {/* Preview */}
          <div style={{ background: 'var(--white)', border: '1px solid rgba(15,39,68,0.08)', borderRadius: '2px', padding: '16px', marginBottom: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--gold)', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {form.photo_url
                ? <img src={form.photo_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ color: '#fff', fontWeight: 700, fontSize: '18px', fontFamily: 'var(--font-display)' }}>{initials(form.name || 'Dr')}</span>}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-800)', margin: '0 0 2px' }}>{form.name || 'Doctor Name'}</p>
              <p style={{ fontSize: '12px', color: 'var(--gold-deep, #9c7a3c)', fontFamily: 'var(--font-body)', fontWeight: 600, margin: '0 0 4px' }}>{form.designation || 'Designation'}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', margin: 0 }}>{form.qualification || 'Qualification'}</p>
              {form.bio && <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic', lineHeight: 1.6, margin: '8px 0 0' }}>{form.bio}</p>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Name *</label>
              <input value={form.name} onChange={e => setF('name', e.target.value)} placeholder="Dr. Kirthi Jawalkar" style={{ width: '100%', padding: '9px 12px', border: '1px solid rgba(15,39,68,0.12)', borderRadius: '2px', fontSize: '0.88rem', fontFamily: 'var(--font-body)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Designation</label>
              <input value={form.designation} onChange={e => setF('designation', e.target.value)} placeholder="Founder & Chief Physician" style={{ width: '100%', padding: '9px 12px', border: '1px solid rgba(15,39,68,0.12)', borderRadius: '2px', fontSize: '0.88rem', fontFamily: 'var(--font-body)', outline: 'none' }} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Qualification *</label>
              <input value={form.qualification} onChange={e => setF('qualification', e.target.value)} placeholder="BHMS, MD (Homeopathy), Certified Psychotherapist" style={{ width: '100%', padding: '9px 12px', border: '1px solid rgba(15,39,68,0.12)', borderRadius: '2px', fontSize: '0.88rem', fontFamily: 'var(--font-body)', outline: 'none' }} />
            </div>
          </div>

          <div style={{ marginTop: '14px' }}>
            <label style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Short Bio (optional)</label>
            <textarea value={form.bio} onChange={e => setF('bio', e.target.value)} rows={3} placeholder="One or two lines about their expertise and approach..." style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(15,39,68,0.12)', borderRadius: '2px', fontSize: '0.88rem', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical' }} />
          </div>

          <div style={{ marginTop: '14px' }}>
            <label style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Photo</label>
            <label className="admin-file-btn" style={{ fontSize: '12px', padding: '7px 14px' }}>
              {uploading ? 'Uploading...' : form.photo_url ? 'Change Photo' : 'Upload Photo'}
              <input type="file" accept="image/*" onChange={uploadPhoto} hidden />
            </label>
            {form.photo_url && <button onClick={() => setF('photo_url', '')} style={{ marginLeft: '8px', background: 'none', border: 'none', color: '#c0392b', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Remove</button>}
          </div>

          <div style={{ marginTop: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--font-body)', color: 'var(--navy-800)' }}>
              <input type="checkbox" checked={form.visible} onChange={e => setF('visible', e.target.checked)} />
              Visible on website
            </label>
          </div>

          {msg && <p style={{ color: '#c0392b', fontSize: '12px', fontFamily: 'var(--font-body)', marginTop: '10px' }}>{msg}</p>}

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button className="admin-btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : editing === 'new' ? 'Add Doctor' : 'Save Changes'}</button>
            <button className="admin-btn-outline" onClick={closeForm}>Cancel</button>
          </div>
        </div>
      )}

      {/* LIST */}
      {loading ? <p className="admin-empty">Loading...</p> : list.length === 0 ? (
        <p className="admin-empty">No doctors added yet. Add your first team member!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {list.map((d, i) => (
            <div key={d.id} style={{ background: 'var(--white)', border: '1px solid rgba(15,39,68,0.08)', borderRadius: '2px', padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start', opacity: d.visible ? 1 : 0.55 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gold)', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {d.photo_url ? <img src={d.photo_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ color: '#fff', fontWeight: 700, fontSize: '15px', fontFamily: 'var(--font-display)' }}>{initials(d.name)}</span>}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--navy-800)', fontFamily: 'var(--font-body)' }}>{d.name}</span>
                  {!d.visible && <span style={{ fontSize: '10px', padding: '1px 8px', borderRadius: '100px', background: 'rgba(15,39,68,0.06)', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Hidden</span>}
                </div>
                {d.designation && <p style={{ fontSize: '11px', color: 'var(--gold-deep, #9c7a3c)', fontFamily: 'var(--font-body)', margin: '0 0 4px', fontWeight: 600 }}>{d.designation}</p>}
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', margin: 0 }}>{d.qualification}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button onClick={() => moveUp(i)} disabled={i === 0} style={{ width: '28px', height: '28px', border: '1px solid rgba(15,39,68,0.12)', borderRadius: '2px', cursor: i === 0 ? 'default' : 'pointer', background: 'var(--white)', fontSize: '12px', opacity: i === 0 ? 0.3 : 1 }}>↑</button>
                  <button onClick={() => moveDown(i)} disabled={i === list.length - 1} style={{ width: '28px', height: '28px', border: '1px solid rgba(15,39,68,0.12)', borderRadius: '2px', cursor: i === list.length - 1 ? 'default' : 'pointer', background: 'var(--white)', fontSize: '12px', opacity: i === list.length - 1 ? 0.3 : 1 }}>↓</button>
                </div>
                <button onClick={() => toggleVisible(d.id, !d.visible)} style={{ padding: '4px 8px', fontSize: '11px', border: '1px solid rgba(15,39,68,0.12)', borderRadius: '2px', cursor: 'pointer', background: 'var(--white)', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }} title="Toggle visibility">{d.visible ? '👁' : '🚫'}</button>
                <button onClick={() => openEdit(d)} className="admin-btn-outline admin-btn-sm">Edit</button>
                <button onClick={() => remove(d.id)} className="admin-btn-danger admin-btn-sm">Del</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
