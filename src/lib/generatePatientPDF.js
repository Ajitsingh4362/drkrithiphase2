// Patient Report PDF Generator using jsPDF (loaded dynamically)
// No server needed — generates directly in browser

export async function generatePatientPDF({ patient, medical, consultations }) {
  // Load jsPDF dynamically
  if (!window.jsPDF) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
      script.onload = resolve
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  const { jsPDF } = window.jspdf
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const W = 210  // A4 width mm
  const H = 297  // A4 height mm
  const margin = 16
  const contentW = W - margin * 2

  // ─── COLOR PALETTE ───────────────────────────────────────
  const NAVY   = [15, 39, 68]
  const GOLD   = [185, 145, 79]
  const TEAL   = [30, 111, 106]
  const LIGHT  = [245, 242, 237]
  const WHITE  = [255, 255, 255]
  const GREY   = [120, 120, 120]
  const DARK   = [40, 40, 40]

  // ─── HELPERS ──────────────────────────────────────────────
  function setFont(style = 'normal', size = 10) {
    doc.setFontSize(size)
    if (style === 'bold') doc.setFont('helvetica', 'bold')
    else if (style === 'italic') doc.setFont('helvetica', 'italic')
    else doc.setFont('helvetica', 'normal')
  }

  function setColor(rgb) { doc.setTextColor(...rgb) }
  function setFill(rgb) { doc.setFillColor(...rgb) }
  function setDraw(rgb) { doc.setDrawColor(...rgb) }

  function text(str, x, y, opts = {}) {
    if (!str) return
    doc.text(String(str), x, y, opts)
  }

  function line(x1, y1, x2, y2, width = 0.3) {
    doc.setLineWidth(width)
    doc.line(x1, y1, x2, y2)
  }

  function rect(x, y, w, h, fill = true) {
    if (fill) doc.rect(x, y, w, h, 'F')
    else doc.rect(x, y, w, h, 'S')
  }

  function wrap(str, x, y, maxW, lineH = 5) {
    if (!str) return y
    const lines = doc.splitTextToSize(String(str), maxW)
    doc.text(lines, x, y)
    return y + lines.length * lineH
  }

  // ─── HEADER / LETTERHEAD ──────────────────────────────────
  // Navy background top banner
  setFill(NAVY)
  rect(0, 0, W, 44)

  // Gold accent line
  setFill(GOLD)
  rect(0, 44, W, 1.5)

  // Left: Logo placeholder with M monogram
  setFill([255, 255, 255, 0.1])
  doc.setFillColor(255, 255, 255, 0.08)
  doc.circle(margin + 14, 22, 13, 'F')
  setFill(GOLD)
  doc.circle(margin + 14, 22, 11, 'F')
  setColor(NAVY)
  setFont('bold', 16)
  text('M', margin + 14, 26.5, { align: 'center' })

  // Clinic name
  setColor(WHITE)
  setFont('bold', 15)
  text('Mind Motion Matrix', margin + 32, 15)

  setColor([220, 195, 140])
  setFont('normal', 8)
  text('Dr. Kirthi Jawalkar  ·  C-Suite Mind Body Specialist', margin + 32, 21)

  setColor([180, 160, 120])
  setFont('normal', 7.5)
  text('Homeopathy  ·  Psychotherapy  ·  Integrative Healing', margin + 32, 27)
  text('Bangalore, India', margin + 32, 33)

  // Right: Report label
  setFill([255, 255, 255, 0.06])
  doc.setFillColor(255, 255, 255)
  doc.setGlobalAlpha?.(0.06)
  setColor([199, 166, 106])
  setFont('bold', 9)
  text('PATIENT REPORT', W - margin, 18, { align: 'right' })
  setColor([160, 140, 100])
  setFont('normal', 7.5)
  text(`Generated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, W - margin, 25, { align: 'right' })
  text(`Report ID: MMM-${Date.now().toString().slice(-6)}`, W - margin, 31, { align: 'right' })

  // ─── PATIENT INFO SECTION ─────────────────────────────────
  let y = 54

  // Section bg
  setFill(LIGHT)
  rect(margin, y, contentW, 38)

  // Gold left border
  setFill(GOLD)
  rect(margin, y, 3, 38)

  // Patient name
  setColor(NAVY)
  setFont('bold', 14)
  text(patient.name || '—', margin + 8, y + 9)

  // Tags/status
  if (patient.status) {
    setFill(TEAL)
    rect(margin + 8, y + 11, 22, 5)
    setColor(WHITE)
    setFont('bold', 6.5)
    text((patient.status || '').toUpperCase(), margin + 8 + 11, y + 15, { align: 'center' })
  }

  // Patient details grid
  const col1 = margin + 8
  const col2 = margin + 70
  const col3 = margin + 130

  setColor(GREY)
  setFont('normal', 7.5)
  const details = [
    ['Phone', patient.phone],
    ['Email', patient.email],
    ['Age / Gender', [patient.age, patient.gender].filter(Boolean).join(' / ')],
    ['Blood Group', patient.blood_group],
    ['Occupation', patient.occupation],
    ['Referred By', patient.referred_by],
  ]

  let dy = y + 20
  details.slice(0, 3).forEach(([label, val]) => {
    setColor(GREY); setFont('normal', 7)
    text(label, col1, dy)
    setColor(DARK); setFont('bold', 7.5)
    text(val || '—', col1, dy + 4)
    dy += 0
  })

  dy = y + 20
  let dcol = col1
  details.forEach(([label, val], i) => {
    const cx = i < 2 ? col1 : i < 4 ? col2 : col3
    const cy = i % 2 === 0 ? y + 20 : y + 28
    setColor(GREY); setFont('normal', 7)
    text(label, cx, cy)
    setColor(DARK); setFont('bold', 7.5)
    text(val || '—', cx, cy + 4.5)
  })

  y += 44

  // ─── CHIEF COMPLAINT ──────────────────────────────────────
  if (medical?.chief_complaint) {
    setFill(NAVY)
    rect(margin, y, contentW, 7)
    setColor(WHITE); setFont('bold', 8)
    text('CHIEF COMPLAINT / PRIMARY HEALTH CONCERN', margin + 4, y + 5)
    y += 10

    setColor(DARK); setFont('normal', 9)
    y = wrap(medical.chief_complaint, margin + 2, y, contentW - 4, 5.5) + 4
  }

  // ─── MEDICAL HISTORY ──────────────────────────────────────
  const medFields = [
    ['Past Medical History', medical?.past_medical_history],
    ['Family History', medical?.family_history],
    ['Known Allergies', medical?.allergies],
    ['Current Medications / Supplements', medical?.current_medications],
  ].filter(([, v]) => v)

  if (medFields.length) {
    setFill(NAVY)
    rect(margin, y, contentW, 7)
    setColor(WHITE); setFont('bold', 8)
    text('MEDICAL HISTORY', margin + 4, y + 5)
    y += 10

    medFields.forEach(([label, val]) => {
      setColor(GOLD[0] > 0 ? GOLD : GOLD)
      doc.setTextColor(...GOLD)
      setFont('bold', 8)
      text(label, margin + 2, y)
      y += 5
      doc.setTextColor(...DARK)
      setFont('normal', 8.5)
      y = wrap(val, margin + 2, y, contentW - 4, 5) + 3
    })
  }

  // Lifestyle row
  const lifestyle = [
    ['Diet', medical?.diet_type],
    ['Sleep', medical?.sleep_pattern],
    ['Stress', medical?.stress_level],
  ].filter(([, v]) => v)

  if (lifestyle.length) {
    setFill(LIGHT)
    rect(margin, y, contentW, 12)
    setFill(TEAL)
    rect(margin, y, 3, 12)
    lifestyle.forEach(([label, val], i) => {
      const lx = margin + 8 + i * 58
      doc.setTextColor(...GREY)
      setFont('normal', 7)
      text(label, lx, y + 4.5)
      doc.setTextColor(...DARK)
      setFont('bold', 8)
      text(val, lx, y + 9)
    })
    y += 16
  }

  // ─── CONSULTATION HISTORY ─────────────────────────────────
  if (consultations?.length) {
    // New page if running low
    if (y > H - 80) { doc.addPage(); y = margin }

    setFill(NAVY)
    rect(margin, y, contentW, 7)
    setColor(WHITE); setFont('bold', 8)
    text(`CONSULTATION HISTORY  (${consultations.length} records)`, margin + 4, y + 5)
    y += 10

    consultations.slice(0, 8).forEach((c, i) => {
      if (y > H - 50) { doc.addPage(); y = margin + 10 }

      // Consultation card
      const cardH = 8 +
        (c.chief_complaint ? Math.ceil(doc.splitTextToSize(c.chief_complaint, contentW - 40).length) * 4.5 : 0) +
        (c.observations ? Math.ceil(doc.splitTextToSize(c.observations, contentW - 40).length) * 4.5 + 4 : 0) +
        (c.prescription ? Math.ceil(doc.splitTextToSize(c.prescription, contentW - 40).length) * 4.5 + 8 : 0) +
        (c.follow_up_date ? 10 : 0)

      // Card bg alternating
      setFill(i % 2 === 0 ? WHITE : LIGHT)
      rect(margin, y, contentW, Math.max(cardH, 18))

      // Left accent
      setFill(i === 0 ? GOLD : TEAL)
      rect(margin, y, 3, Math.max(cardH, 18))

      // Date + type badge
      doc.setTextColor(...NAVY)
      setFont('bold', 8.5)
      const dateStr = c.date ? new Date(c.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
      text(dateStr, margin + 8, y + 6)

      if (c.consultation_type) {
        doc.setTextColor(...GREY)
        setFont('normal', 7)
        text(`[${c.consultation_type}]`, margin + 8 + 28, y + 6)
      }

      if (c.follow_up_date) {
        doc.setTextColor(...TEAL)
        setFont('bold', 7)
        text(`Follow-up: ${new Date(c.follow_up_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`, W - margin, y + 6, { align: 'right' })
      }

      let cy = y + 11

      if (c.chief_complaint) {
        doc.setTextColor(...DARK)
        setFont('normal', 8)
        cy = wrap(c.chief_complaint, margin + 8, cy, contentW - 12, 4.5)
      }

      if (c.observations) {
        cy += 2
        doc.setTextColor(...GREY)
        setFont('italic', 7.5)
        cy = wrap(`Observations: ${c.observations}`, margin + 8, cy, contentW - 12, 4.5)
      }

      if (c.prescription) {
        cy += 3
        setFill([240, 248, 245])
        rect(margin + 6, cy - 3, contentW - 8, Math.ceil(doc.splitTextToSize(c.prescription, contentW - 20).length) * 4.5 + 6)
        doc.setTextColor(...TEAL)
        setFont('bold', 7)
        text('Rx  PRESCRIPTION', margin + 10, cy + 1)
        cy += 5
        doc.setTextColor(...DARK)
        setFont('normal', 8)
        cy = wrap(c.prescription, margin + 10, cy, contentW - 16, 4.5)
        cy += 2
      }

      y += Math.max(cardH, 18) + 4
    })

    if (consultations.length > 8) {
      doc.setTextColor(...GREY)
      setFont('italic', 8)
      text(`... and ${consultations.length - 8} more consultation records`, margin + 4, y)
      y += 8
    }
  }

  // ─── FOOTER (every page) ──────────────────────────────────
  const totalPages = doc.getNumberOfPages()
  for (let pg = 1; pg <= totalPages; pg++) {
    doc.setPage(pg)

    // Gold line above footer
    setDraw(GOLD)
    doc.setDrawColor(...GOLD)
    doc.setLineWidth(0.5)
    doc.line(margin, H - 18, W - margin, H - 18)

    // Footer content
    doc.setTextColor(...NAVY)
    setFont('bold', 7.5)
    text('Mind Motion Matrix  ·  Dr. Kirthi Jawalkar', margin, H - 12)
    doc.setTextColor(...GREY)
    setFont('normal', 7)
    text('Bangalore, India  ·  This report is confidential and intended for medical use only.', margin, H - 7)
    doc.setTextColor(...GOLD)
    setFont('bold', 7.5)
    text(`Page ${pg} of ${totalPages}`, W - margin, H - 10, { align: 'right' })

    // Watermark diagonal text (light)
    doc.setTextColor(200, 200, 200)
    doc.setFontSize(55)
    doc.setFont('helvetica', 'bold')
    doc.setGlobalAlpha?.(0.04)
    doc.text('CONFIDENTIAL', W / 2, H / 2, { align: 'center', angle: 45 })
    doc.setGlobalAlpha?.(1)
  }

  // ─── SAVE ────────────────────────────────────────────────
  const filename = `MMM-Report-${(patient.name || 'Patient').replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(filename)
}
