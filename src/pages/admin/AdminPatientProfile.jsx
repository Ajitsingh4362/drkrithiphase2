import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { generatePatientPDF, generatePatientPDFBlob } from '../../lib/generatePatientPDF'

const TABS = ['Overview', 'Medical History', 'Consultations', 'Notes', 'Documents', 'Appointments']
const TAGS = ['Cancer Support', 'Fertility', 'Chronic Illness', 'Psychotherapy', 'Allied Healing', 'VIP', 'Follow-up Due']
const AVATAR_COLORS = ['#b9914f', '#1e6f6a', '#4a3d8f', '#8f3d3d', '#3d6b8f', '#6b8f3d', '#8f6b3d']
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

function initials(name) {
  return (name || '').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function Field({ label, value, onChange, type = 'text', multiline, options }) {
  const style = { padding: '10px 14px', border: '1px solid rgba(15,39,68,0.12)', borderRadius: '2px', fontSize: '0.88rem', fontFamily: 'var(--font-body)', outline: 'none', width: '100%', background: 'var(--white)', resize: 'vertical' }
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>{label}</label>
      {options ? (
        <select value={value || ''} onChange={e => onChange(e.target.value)} style={style}>
          <option value="">Select...</option>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : multiline ? (
        <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={3} style={style} />
      ) : (
        <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} style={style} />
      )}
    </div>
  )
}

export default function AdminPatientProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const isNew = id === 'new'
  const [activeTab, setActiveTab] = useState('Overview')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(!isNew)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [showPdfDropdown, setShowPdfDropdown] = useState(false)

  async function downloadPDF() {
    setPdfLoading(true)
    setShowPdfDropdown(false)
    try {
      await generatePatientPDF({ patient, medical, consultations })
    } catch(e) {
      console.error(e)
    }
    setPdfLoading(false)
  }

  async function shareOnWhatsApp() {
    setPdfLoading(true)
    setShowPdfDropdown(false)
    try {
      // Generate PDF as blob, then share via WhatsApp
      const pdfBlob = await generatePatientPDFBlob({ patient, medical, consultations })
      const phone = (patient.phone || '').replace(/[^\d]/g, '')
      const msg = encodeURIComponent(
        `Dear ${patient.name}, please find your health report from Mind Motion Matrix attached.\n\nFor appointments: www.mindmotionmatrix.com\n\n— Dr. Kirthi Jawalkar`
      )
      // WhatsApp Web with pre-filled message (file sharing via web is not possible directly, so we open chat with message)
      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
    } catch(e) {
      console.error(e)
    }
    setPdfLoading(false)
  }

  async function printPDF() {
    setPdfLoading(true)
    setShowPdfDropdown(false)
    try {
      await generatePatientPDF({ patient, medical, consultations, autoPrint: true })
    } catch(e) {
      console.error(e)
    }
    setPdfLoading(false)
  }

  // Auto-fill from appointment data (query params)
  const prefill = isNew ? Object.fromEntries(new URLSearchParams(location.search)) : {}

  // Patient basic info
  const [patient, setPatient] = useState({
    name: prefill.name || '', phone: prefill.phone || '', email: prefill.email || '',
    age: '', gender: '', blood_group: '', address: '', occupation: '',
    referred_by: '', emergency_contact_name: '', emergency_contact_phone: '',
    avatar_color: '#b9914f', tags: prefill.service ? [prefill.service].filter(s => TAGS.includes(s)) : [], status: 'active'
  })

  // Medical history — pre-fill chief complaint from appointment message
  const [medical, setMedical] = useState({
    chief_complaint: prefill.message || '', past_medical_history: '', family_history: '',
    allergies: '', current_medications: '', lifestyle_notes: '',
    diet_type: '', sleep_pattern: '', stress_level: ''
  })
  const [medicalId, setMedicalId] = useState(null)

  // Consultations
  const [consultations, setConsultations] = useState([])
  const [showConsultForm, setShowConsultForm] = useState(false)
  const [newConsult, setNewConsult] = useState({ date: new Date().toISOString().split('T')[0], chief_complaint: '', observations: '', prescription: '', follow_up_date: '', follow_up_notes: '', consultation_type: 'in-person' })

  // Notes
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [noteType, setNoteType] = useState('general')

  // Documents
  const [docs, setDocs] = useState([])
  const [uploading, setUploading] = useState(false)

  // Appointments
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    if (!isNew) fetchAll()
  }, [id])

  async function fetchAll() {
    const [{ data: p }, { data: m }, { data: c }, { data: n }, { data: d }, { data: a }] = await Promise.all([
      supabase.from('patients').select('*').eq('id', id).single(),
      supabase.from('patient_medical_history').select('*').eq('patient_id', id).single(),
      supabase.from('patient_consultations').select('*').eq('patient_id', id).order('date', { ascending: false }),
      supabase.from('patient_notes').select('*').eq('patient_id', id).order('created_at', { ascending: false }),
      supabase.from('patient_documents').select('*').eq('patient_id', id).order('created_at', { ascending: false }),
      supabase.from('appointments').select('*').eq('patient_id', id).order('created_at', { ascending: false }),
    ])
    if (p) setPatient({ ...patient, ...p })
    if (m) { setMedical({ ...medical, ...m }); setMedicalId(m.id) }
    setConsultations(c || [])
    setNotes(n || [])
    setDocs(d || [])
    setAppointments(a || [])
    setLoading(false)
  }

  function setP(key, val) { setPatient(p => ({ ...p, [key]: val })) }
  function setM(key, val) { setMedical(m => ({ ...m, [key]: val })) }

  async function savePatient() {
    if (!patient.name || !patient.phone) { setMsg('Name and phone required'); return }
    setSaving(true)
    let patientId = id

    if (isNew) {
      const { data, error } = await supabase.from('patients').insert({ ...patient, age: patient.age ? parseInt(patient.age) : null }).select().single()
      if (error) { setMsg('Error: ' + error.message); setSaving(false); return }
      patientId = data.id
      navigate(`/admin/patients/${patientId}`, { replace: true })
    } else {
      await supabase.from('patients').update({ ...patient, age: patient.age ? parseInt(patient.age) : null }).eq('id', id)
    }

    // Save medical history
    if (medicalId) {
      await supabase.from('patient_medical_history').update(medical).eq('id', medicalId)
    } else {
      const { data } = await supabase.from('patient_medical_history').insert({ ...medical, patient_id: patientId }).select().single()
      if (data) setMedicalId(data.id)
    }

    setSaving(false)
    setMsg('Saved ✓')
    setTimeout(() => setMsg(''), 2000)
  }

  async function addConsultation() {
    if (!newConsult.chief_complaint) return
    await supabase.from('patient_consultations').insert({ ...newConsult, patient_id: id })
    setNewConsult({ date: new Date().toISOString().split('T')[0], chief_complaint: '', observations: '', prescription: '', follow_up_date: '', follow_up_notes: '', consultation_type: 'in-person' })
    setShowConsultForm(false)
    fetchAll()
  }

  async function deleteConsultation(cid) {
    if (!confirm('Delete this consultation record?')) return
    await supabase.from('patient_consultations').delete().eq('id', cid)
    fetchAll()
  }

  async function addNote() {
    if (!newNote.trim()) return
    await supabase.from('patient_notes').insert({ patient_id: id, note: newNote, note_type: noteType })
    setNewNote('')
    fetchAll()
  }

  async function deleteNote(nid) {
    await supabase.from('patient_notes').delete().eq('id', nid)
    fetchAll()
  }

  async function uploadDocument(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const path = `${id}/${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('patient-documents').upload(path, file)
    if (!error) {
      const { data } = supabase.storage.from('patient-documents').getPublicUrl(path)
      await supabase.from('patient_documents').insert({ patient_id: id, name: file.name, file_url: data.publicUrl, file_type: file.type })
      fetchAll()
    }
    setUploading(false)
  }

  async function deleteDoc(did) {
    if (!confirm('Delete this document?')) return
    await supabase.from('patient_documents').delete().eq('id', did)
    fetchAll()
  }

  function toggleTag(tag) {
    const tags = patient.tags || []
    setP('tags', tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag])
  }

  const fmtDate = d => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

  if (loading) return <div className="admin-panel"><p className="admin-empty">Loading...</p></div>

  return (
    <div className="admin-panel" style={{ maxWidth: '1000px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <button className="admin-back-link" onClick={() => navigate('/admin/patients')}>← All Patients</button>
        <div style={{ flex: 1 }} />
        {msg && <span className="admin-save-msg">{msg}</span>}
        <button className="admin-btn-outline admin-btn-sm" onClick={savePatient} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
        {!isNew && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowPdfDropdown(p => !p)}
              disabled={pdfLoading}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', border: '1px solid rgba(15,39,68,0.15)', borderRadius: '2px', background: 'var(--white)', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer', color: 'var(--navy-800)', letterSpacing: '0.5px' }}>
              {pdfLoading ? '⏳' : '📄'} {pdfLoading ? 'Generating...' : 'Report'} {!pdfLoading && '▾'}
            </button>

            {showPdfDropdown && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 98 }} onClick={() => setShowPdfDropdown(false)} />
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, background: 'var(--white)', border: '1px solid rgba(15,39,68,0.12)', borderRadius: '4px', boxShadow: '0 8px 28px rgba(7,15,28,0.12)', zIndex: 99, minWidth: '190px', overflow: 'hidden' }}>
                  
                  <button onClick={downloadPDF} style={{ width: '100%', padding: '11px 16px', border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontFamily: 'var(--font-body)', cursor: 'pointer', color: 'var(--navy-800)', textAlign: 'left', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--ivory)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                    <span style={{ fontSize: '16px' }}>⬇️</span>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: '12px' }}>Download PDF</p>
                      <p style={{ margin: 0, fontSize: '10px', color: 'var(--text-muted)' }}>Save to device</p>
                    </div>
                  </button>

                  <div style={{ height: '1px', background: 'rgba(15,39,68,0.06)' }} />

                  <button onClick={shareOnWhatsApp} style={{ width: '100%', padding: '11px 16px', border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontFamily: 'var(--font-body)', cursor: 'pointer', color: 'var(--navy-800)', textAlign: 'left', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--ivory)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                    <span style={{ fontSize: '16px' }}>💬</span>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: '12px' }}>Share on WhatsApp</p>
                      <p style={{ margin: 0, fontSize: '10px', color: 'var(--text-muted)' }}>Send to {patient.name?.split(' ')[0]}</p>
                    </div>
                  </button>

                  <div style={{ height: '1px', background: 'rgba(15,39,68,0.06)' }} />

                  <button onClick={printPDF} style={{ width: '100%', padding: '11px 16px', border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontFamily: 'var(--font-body)', cursor: 'pointer', color: 'var(--navy-800)', textAlign: 'left', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--ivory)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                    <span style={{ fontSize: '16px' }}>🖨️</span>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: '12px' }}>Print</p>
                      <p style={{ margin: 0, fontSize: '10px', color: 'var(--text-muted)' }}>Open print dialog</p>
                    </div>
                  </button>

                </div>
              </>
            )}
          </div>
        )}
        {!isNew && (
          <a href={`https://wa.me/${(patient.phone || '').replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" className="admin-btn-primary admin-btn-sm">WhatsApp</a>
        )}
      </div>

      {/* Patient Card */}
      <div style={{ background: 'var(--navy-800)', borderRadius: '2px', padding: '28px 24px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--gold)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {/* Avatar with color picker */}
          <div style={{ position: 'relative' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: patient.avatar_color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '22px', fontFamily: 'var(--font-display)', border: '3px solid rgba(199,166,106,0.4)' }}>
              {initials(patient.name || 'P')}
            </div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '8px', flexWrap: 'wrap', maxWidth: '80px' }}>
              {AVATAR_COLORS.map(c => (
                <div key={c} onClick={() => setP('avatar_color', c)} style={{ width: '16px', height: '16px', borderRadius: '50%', background: c, cursor: 'pointer', border: patient.avatar_color === c ? '2px solid var(--gold-pale)' : '2px solid transparent' }} />
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <input value={patient.name} onChange={e => setP('name', e.target.value)} placeholder="Patient Full Name" style={{ background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--gold-pale)', width: '100%', marginBottom: '8px' }} />
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {TAGS.map(tag => (
                <span key={tag} onClick={() => !isNew && toggleTag(tag)} style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '100px', cursor: isNew ? 'default' : 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.5px', background: (patient.tags || []).includes(tag) ? 'rgba(199,166,106,0.25)' : 'rgba(255,255,255,0.06)', color: (patient.tags || []).includes(tag) ? 'var(--gold-pale)' : 'rgba(255,255,255,0.4)', border: (patient.tags || []).includes(tag) ? '1px solid rgba(199,166,106,0.4)' : '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <select value={patient.status} onChange={e => setP('status', e.target.value)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(199,166,106,0.2)', borderRadius: '2px', padding: '8px 14px', color: 'var(--gold-pale)', fontFamily: 'var(--font-body)', fontSize: '0.85rem', outline: 'none' }}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '2px', marginBottom: '24px', borderBottom: '1px solid rgba(15,39,68,0.1)', overflowX: 'auto' }}>
        {(isNew ? ['Overview', 'Medical History'] : TABS).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: 'none', border: 'none', padding: '10px 18px', fontSize: '12px', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.5px', cursor: 'pointer', borderBottom: activeTab === tab ? '2px solid var(--gold)' : '2px solid transparent', color: activeTab === tab ? 'var(--navy-800)' : 'var(--text-muted)', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* TAB: Overview */}
      {activeTab === 'Overview' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Field label="Phone / WhatsApp *" value={patient.phone} onChange={v => setP('phone', v)} />
            <Field label="Email Address" value={patient.email} onChange={v => setP('email', v)} />
            <Field label="Age" value={patient.age} onChange={v => setP('age', v)} type="number" />
            <Field label="Gender" value={patient.gender} onChange={v => setP('gender', v)} options={['Female', 'Male', 'Non-binary', 'Prefer not to say']} />
            <Field label="Blood Group" value={patient.blood_group} onChange={v => setP('blood_group', v)} options={BLOOD_GROUPS} />
            <Field label="Occupation" value={patient.occupation} onChange={v => setP('occupation', v)} />
            <Field label="Referred By" value={patient.referred_by} onChange={v => setP('referred_by', v)} />
          </div>
          <Field label="Address" value={patient.address} onChange={v => setP('address', v)} multiline />
          <div style={{ borderTop: '1px solid rgba(15,39,68,0.08)', paddingTop: '16px', marginTop: '8px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: '12px' }}>Emergency Contact</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field label="Contact Name" value={patient.emergency_contact_name} onChange={v => setP('emergency_contact_name', v)} />
              <Field label="Contact Phone" value={patient.emergency_contact_phone} onChange={v => setP('emergency_contact_phone', v)} />
            </div>
          </div>
        </div>
      )}

      {/* TAB: Medical History */}
      {activeTab === 'Medical History' && (
        <div>
          <Field label="Chief Complaint / Primary Health Concern" value={medical.chief_complaint} onChange={v => setM('chief_complaint', v)} multiline />
          <Field label="Past Medical History" value={medical.past_medical_history} onChange={v => setM('past_medical_history', v)} multiline />
          <Field label="Family History" value={medical.family_history} onChange={v => setM('family_history', v)} multiline />
          <Field label="Known Allergies" value={medical.allergies} onChange={v => setM('allergies', v)} multiline />
          <Field label="Current Medications / Supplements" value={medical.current_medications} onChange={v => setM('current_medications', v)} multiline />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <Field label="Diet Type" value={medical.diet_type} onChange={v => setM('diet_type', v)} options={['Vegetarian', 'Vegan', 'Non-vegetarian', 'Jain', 'Other']} />
            <Field label="Sleep Pattern" value={medical.sleep_pattern} onChange={v => setM('sleep_pattern', v)} options={['Good (7-9 hrs)', 'Poor (<6 hrs)', 'Irregular', 'Insomnia']} />
            <Field label="Stress Level" value={medical.stress_level} onChange={v => setM('stress_level', v)} options={['Low', 'Moderate', 'High', 'Very High']} />
          </div>
          <Field label="Lifestyle Notes" value={medical.lifestyle_notes} onChange={v => setM('lifestyle_notes', v)} multiline />
        </div>
      )}

      {/* TAB: Consultations */}
      {activeTab === 'Consultations' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--navy-800)', margin: 0 }}>{consultations.length} Consultation{consultations.length !== 1 ? 's' : ''}</p>
            <button className="admin-btn-primary admin-btn-sm" onClick={() => setShowConsultForm(p => !p)}>+ New Consultation</button>
          </div>

          {showConsultForm && (
            <div style={{ background: 'var(--ivory)', border: '1px solid rgba(15,39,68,0.08)', borderRadius: '2px', padding: '20px', marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="Date" value={newConsult.date} onChange={v => setNewConsult(c => ({ ...c, date: v }))} type="date" />
                <Field label="Type" value={newConsult.consultation_type} onChange={v => setNewConsult(c => ({ ...c, consultation_type: v }))} options={['in-person', 'video-call', 'phone-call', 'whatsapp']} />
              </div>
              <Field label="Chief Complaint" value={newConsult.chief_complaint} onChange={v => setNewConsult(c => ({ ...c, chief_complaint: v }))} multiline />
              <Field label="Observations / Findings" value={newConsult.observations} onChange={v => setNewConsult(c => ({ ...c, observations: v }))} multiline />
              <Field label="Prescription / Treatment Plan" value={newConsult.prescription} onChange={v => setNewConsult(c => ({ ...c, prescription: v }))} multiline />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Field label="Follow-up Date" value={newConsult.follow_up_date} onChange={v => setNewConsult(c => ({ ...c, follow_up_date: v }))} type="date" />
                <Field label="Follow-up Notes" value={newConsult.follow_up_notes} onChange={v => setNewConsult(c => ({ ...c, follow_up_notes: v }))} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="admin-btn-primary admin-btn-sm" onClick={addConsultation}>Save Consultation</button>
                <button className="admin-btn-outline admin-btn-sm" onClick={() => setShowConsultForm(false)}>Cancel</button>
              </div>
            </div>
          )}

          {consultations.length === 0 ? <p className="admin-empty">No consultations recorded yet.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {consultations.map(c => (
                <div key={c.id} style={{ background: 'var(--white)', border: '1px solid rgba(15,39,68,0.08)', borderRadius: '2px', padding: '18px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy-800)', fontFamily: 'var(--font-body)' }}>{fmtDate(c.date)}</span>
                      <span style={{ marginLeft: '10px', fontSize: '10px', padding: '2px 8px', borderRadius: '100px', background: 'rgba(15,39,68,0.06)', color: 'var(--navy-800)', fontFamily: 'var(--font-body)' }}>{c.consultation_type}</span>
                      {c.follow_up_date && <span style={{ marginLeft: '8px', fontSize: '11px', color: 'var(--gold-deep)', fontFamily: 'var(--font-body)' }}>Follow-up: {fmtDate(c.follow_up_date)}</span>}
                    </div>
                    <button className="admin-btn-danger admin-btn-sm" onClick={() => deleteConsultation(c.id)}>Delete</button>
                  </div>
                  {c.chief_complaint && <p style={{ fontSize: '13px', color: 'var(--navy-800)', marginBottom: '6px', fontFamily: 'var(--font-body)' }}><strong>Complaint:</strong> {c.chief_complaint}</p>}
                  {c.observations && <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-body)' }}><strong>Observations:</strong> {c.observations}</p>}
                  {c.prescription && (
                    <div style={{ background: 'rgba(30,111,106,0.06)', border: '1px solid rgba(30,111,106,0.15)', borderRadius: '2px', padding: '10px 14px', marginTop: '10px' }}>
                      <p style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#1e6f6a', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: '4px' }}>Prescription</p>
                      <p style={{ fontSize: '13px', color: 'var(--charcoal)', margin: 0, fontFamily: 'var(--font-body)', whiteSpace: 'pre-wrap' }}>{c.prescription}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB: Notes */}
      {activeTab === 'Notes' && (
        <div>
          <div style={{ background: 'var(--ivory)', border: '1px solid rgba(15,39,68,0.08)', borderRadius: '2px', padding: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              {['general', 'important', 'follow-up', 'personal'].map(t => (
                <button key={t} onClick={() => setNoteType(t)} style={{ background: noteType === t ? 'var(--navy-800)' : 'var(--white)', color: noteType === t ? 'var(--gold-pale)' : 'var(--text-muted)', border: '1px solid rgba(15,39,68,0.12)', borderRadius: '100px', padding: '4px 14px', fontSize: '11px', fontFamily: 'var(--font-body)', cursor: 'pointer' }}>{t}</button>
              ))}
            </div>
            <textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Add a quick note about this patient..." rows={3} style={{ width: '100%', padding: '10px 14px', border: '1px solid rgba(15,39,68,0.12)', borderRadius: '2px', fontSize: '0.88rem', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical' }} />
            <button className="admin-btn-primary admin-btn-sm" style={{ marginTop: '10px' }} onClick={addNote}>Add Note</button>
          </div>

          {notes.length === 0 ? <p className="admin-empty">No notes yet.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {notes.map(n => (
                <div key={n.id} style={{ background: 'var(--white)', border: '1px solid rgba(15,39,68,0.08)', borderRadius: '2px', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '100px', background: n.note_type === 'important' ? 'rgba(192,57,43,0.1)' : 'rgba(15,39,68,0.06)', color: n.note_type === 'important' ? '#c0392b' : 'var(--navy-800)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{n.note_type}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-light)', fontFamily: 'var(--font-body)' }}>{new Date(n.created_at).toLocaleString('en-IN')}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--charcoal)', margin: 0, fontFamily: 'var(--font-body)', lineHeight: '1.6' }}>{n.note}</p>
                  </div>
                  <button className="admin-btn-danger admin-btn-sm" onClick={() => deleteNote(n.id)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB: Documents */}
      {activeTab === 'Documents' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--navy-800)', margin: 0 }}>{docs.length} Document{docs.length !== 1 ? 's' : ''}</p>
            <label className="admin-btn-primary admin-upload-label">
              {uploading ? 'Uploading...' : '+ Upload Document'}
              <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={uploadDocument} hidden />
            </label>
          </div>

          {docs.length === 0 ? <p className="admin-empty">No documents uploaded. Upload lab reports, prescriptions, or any relevant files.</p> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {docs.map(d => (
                <div key={d.id} style={{ background: 'var(--white)', border: '1px solid rgba(15,39,68,0.08)', borderRadius: '2px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '28px', textAlign: 'center' }}>{d.file_type?.includes('pdf') ? '📄' : d.file_type?.includes('image') ? '🖼️' : '📎'}</div>
                  <p style={{ fontSize: '12px', color: 'var(--navy-800)', fontFamily: 'var(--font-body)', fontWeight: 600, margin: 0, textAlign: 'center', wordBreak: 'break-all' }}>{d.name}</p>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', margin: 0, textAlign: 'center' }}>{new Date(d.created_at).toLocaleDateString('en-IN')}</p>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <a href={d.file_url} target="_blank" rel="noreferrer" className="admin-btn-outline admin-btn-sm" style={{ flex: 1, textAlign: 'center' }}>View</a>
                    <button className="admin-btn-danger admin-btn-sm" onClick={() => deleteDoc(d.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB: Appointments */}
      {activeTab === 'Appointments' && (
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--navy-800)', marginBottom: '16px' }}>{appointments.length} Appointment{appointments.length !== 1 ? 's' : ''}</p>
          {appointments.length === 0 ? <p className="admin-empty">No appointments linked to this patient yet.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {appointments.map(a => (
                <div key={a.id} style={{ background: 'var(--white)', border: '1px solid rgba(15,39,68,0.08)', borderRadius: '2px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy-800)', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>{a.service || 'General Consultation'}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, fontFamily: 'var(--font-body)' }}>
                      {fmtDate(a.preferred_date)} {a.preferred_time ? `· ${a.preferred_time}` : ''} · {new Date(a.created_at).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <span style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '100px', fontFamily: 'var(--font-body)', fontWeight: 600, background: a.status === 'confirmed' ? 'rgba(30,111,106,0.12)' : a.status === 'cancelled' ? 'rgba(192,57,43,0.1)' : 'rgba(199,166,106,0.15)', color: a.status === 'confirmed' ? '#1e6f6a' : a.status === 'cancelled' ? '#c0392b' : '#9c7a3c' }}>{a.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 700px) {
          .admin-panel > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          .admin-panel > div > div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
