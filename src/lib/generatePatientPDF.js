// Patient Report PDF Generator using jsPDF (loaded dynamically)
// No server needed — generates directly in browser

export async function generatePatientPDF({ patient, medical, consultations }) {
  // Load jsPDF dynamically
  if (!window.jspdf) {
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

  const W = 210
  const H = 297
  const margin = 16
  const contentW = W - margin * 2

  // Colors
  const NAVY  = [15, 39, 68]
  const GOLD  = [185, 145, 79]
  const TEAL  = [30, 111, 106]
  const LIGHT = [247, 244, 240]
  const WHITE = [255, 255, 255]
  const GREY  = [130, 130, 130]
  const DARK  = [35, 35, 35]

  // Helpers
  const setFont = (style = 'normal', size = 10) => {
    doc.setFontSize(size)
    doc.setFont('helvetica', style)
  }

  const drawRect = (x, y, w, h, color) => {
    doc.setFillColor(...color)
    doc.rect(x, y, w, h, 'F')
  }

  const drawLine = (x1, y1, x2, y2, color, width = 0.3) => {
    doc.setDrawColor(...color)
    doc.setLineWidth(width)
    doc.line(x1, y1, x2, y2)
  }

  const writeText = (str, x, y, color, style, size, opts = {}) => {
    if (!str && str !== 0) return
    doc.setTextColor(...color)
    setFont(style, size)
    doc.text(String(str), x, y, opts)
  }

  // Wrap text and return new Y position
  const wrapText = (str, x, y, maxW, color, style, size, lineH = 5) => {
    if (!str) return y
    doc.setTextColor(...color)
    setFont(style, size)
    const lines = doc.splitTextToSize(String(str), maxW)
    doc.text(lines, x, y)
    return y + lines.length * lineH
  }

  // ─── LOAD LOGO ───────────────────────────────────────────
  let logoDataUrl = null
  try {
    const response = await fetch('/mind_motion_matrix_navbar_logo.png')
    const blob = await response.blob()
    logoDataUrl = await new Promise(res => {
      const reader = new FileReader()
      reader.onload = () => res(reader.result)
      reader.readAsDataURL(blob)
    })
  } catch (_) {}

  // ─── HEADER ──────────────────────────────────────────────
  drawRect(0, 0, W, 46, NAVY)

  // Gold bottom line
  drawRect(0, 45, W, 1.5, GOLD)

  // Logo (left side)
  if (logoDataUrl) {
    doc.addImage(logoDataUrl, 'PNG', margin, 6, 32, 32)
  } else {
    // Fallback gold circle with M
    doc.setFillColor(...GOLD)
    doc.circle(margin + 12, 23, 11, 'F')
    doc.setTextColor(...NAVY)
    setFont('bold', 16)
    doc.text('M', margin + 12, 27.5, { align: 'center' })
  }

  // Clinic name & details (right of logo)
  const textX = logoDataUrl ? margin + 38 : margin + 28

  writeText('Mind Motion Matrix', textX, 14, WHITE, 'bold', 14)
  writeText('Dr. Kirthi Jawalkar', textX, 20, [220, 195, 140], 'normal', 8.5)
  writeText('C-Suite Mind Body Specialist', textX, 25.5, [180, 160, 120], 'normal', 7.5)
  writeText('Homeopathy  ·  Psychotherapy  ·  Integrative Healing', textX, 31, [160, 140, 100], 'normal', 7)
  writeText('Bangalore, India', textX, 36.5, [140, 120, 90], 'normal', 7)

  // Report label (top right)
  writeText('PATIENT REPORT', W - margin, 13, [199, 166, 106], 'bold', 8, { align: 'right' })
  writeText(`Generated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, W - margin, 20, [160, 140, 100], 'normal', 7, { align: 'right' })
  writeText(`Report ID: MMM-${Date.now().toString().slice(-6)}`, W - margin, 26, [140, 120, 90], 'normal', 7, { align: 'right' })

  // ─── PATIENT INFO ─────────────────────────────────────────
  let y = 53

  drawRect(margin, y, contentW, 42, LIGHT)
  drawRect(margin, y, 3, 42, GOLD)

  // Patient name
  writeText(patient.name || '—', margin + 8, y + 9, NAVY, 'bold', 15)

  // Status badge
  if (patient.status) {
    drawRect(margin + 8, y + 12, 24, 6, TEAL)
    writeText((patient.status || '').toUpperCase(), margin + 20, y + 16.5, WHITE, 'bold', 6.5, { align: 'center' })
  }

  // Details — 3 columns, clean layout
  const details = [
    ['Phone', patient.phone],
    ['Email', patient.email],
    ['Age / Gender', [patient.age, patient.gender].filter(Boolean).join(' / ') || '—'],
    ['Blood Group', patient.blood_group || '—'],
    ['Occupation', patient.occupation || '—'],
    ['Referred By', patient.referred_by || '—'],
  ]

  const cols = [margin + 8, margin + 70, margin + 135]
  const rows = [y + 26, y + 35]

  details.forEach(([label, val], i) => {
    const col = cols[i % 3]
    const row = rows[Math.floor(i / 3)]
    writeText(label, col, row, GREY, 'normal', 7)
    writeText(val || '—', col, row + 5, DARK, 'bold', 8)
  })

  y += 48

  // ─── SECTION HEADER HELPER ───────────────────────────────
  const sectionHeader = (title) => {
    drawRect(margin, y, contentW, 8, NAVY)
    writeText(title, margin + 5, y + 5.5, WHITE, 'bold', 8)
    y += 12
  }

  const fieldLabel = (label) => {
    writeText(label, margin + 4, y, GOLD, 'bold', 7.5)
    y += 5
  }

  // ─── CHIEF COMPLAINT ─────────────────────────────────────
  if (medical?.chief_complaint) {
    sectionHeader('CHIEF COMPLAINT / PRIMARY HEALTH CONCERN')
    y = wrapText(medical.chief_complaint, margin + 4, y, contentW - 8, DARK, 'normal', 9, 5.5)
    y += 6
  }

  // ─── MEDICAL HISTORY ─────────────────────────────────────
  const medFields = [
    ['Past Medical History', medical?.past_medical_history],
    ['Family History', medical?.family_history],
    ['Known Allergies', medical?.allergies],
    ['Current Medications / Supplements', medical?.current_medications],
    ['Lifestyle Notes', medical?.lifestyle_notes],
  ].filter(([, v]) => v)

  if (medFields.length) {
    sectionHeader('MEDICAL HISTORY')
    medFields.forEach(([label, val]) => {
      if (y > H - 40) { doc.addPage(); y = margin + 10 }
      fieldLabel(label)
      y = wrapText(val, margin + 4, y, contentW - 8, DARK, 'normal', 8.5, 5)
      y += 5
    })
  }

  // ─── LIFESTYLE ───────────────────────────────────────────
  const lifestyleItems = [
    ['Diet Type', medical?.diet_type],
    ['Sleep Pattern', medical?.sleep_pattern],
    ['Stress Level', medical?.stress_level],
  ].filter(([, v]) => v)

  if (lifestyleItems.length) {
    if (y > H - 30) { doc.addPage(); y = margin + 10 }
    drawRect(margin, y, contentW, 16, LIGHT)
    drawRect(margin, y, 3, 16, TEAL)
    lifestyleItems.forEach(([label, val], i) => {
      const lx = margin + 8 + i * 60
      writeText(label, lx, y + 5, GREY, 'normal', 7)
      writeText(val, lx, y + 11, DARK, 'bold', 8.5)
    })
    y += 22
  }

  // ─── CONSULTATIONS ───────────────────────────────────────
  if (consultations?.length) {
    if (y > H - 60) { doc.addPage(); y = margin + 10 }
    sectionHeader(`CONSULTATION HISTORY  (${consultations.length} records)`)

    consultations.slice(0, 10).forEach((c, i) => {
      if (y > H - 45) { doc.addPage(); y = margin + 10 }

      // Card background
      drawRect(margin, y, contentW, 2, i % 2 === 0 ? WHITE : LIGHT)
      const cardStartY = y

      // Left accent stripe
      drawRect(margin, y, 3, 2, i === 0 ? GOLD : TEAL)

      y += 3

      // Date + type
      const dateStr = c.date ? new Date(c.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
      writeText(dateStr, margin + 6, y + 3, NAVY, 'bold', 9)
      if (c.consultation_type) {
        writeText(`[${c.consultation_type}]`, margin + 45, y + 3, GREY, 'normal', 7)
      }
      if (c.follow_up_date) {
        writeText(`Follow-up: ${new Date(c.follow_up_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`, W - margin, y + 3, TEAL, 'bold', 7.5, { align: 'right' })
      }
      y += 8

      if (c.chief_complaint) {
        y = wrapText(c.chief_complaint, margin + 6, y, contentW - 10, DARK, 'normal', 8.5, 5)
        y += 3
      }

      if (c.observations) {
        y = wrapText(`Observations: ${c.observations}`, margin + 6, y, contentW - 10, GREY, 'italic', 8, 5)
        y += 3
      }

      if (c.prescription) {
        // Green prescription box
        const rxLines = doc.splitTextToSize(c.prescription, contentW - 16)
        const rxH = rxLines.length * 5 + 12
        drawRect(margin + 4, y, contentW - 8, rxH, [238, 248, 246])
        drawRect(margin + 4, y, 3, rxH, TEAL)
        writeText('Rx  PRESCRIPTION', margin + 10, y + 6, TEAL, 'bold', 7.5)
        y += 10
        y = wrapText(c.prescription, margin + 10, y, contentW - 18, DARK, 'normal', 8.5, 5)
        y += 5
      }

      if (c.follow_up_notes) {
        y = wrapText(`Note: ${c.follow_up_notes}`, margin + 6, y, contentW - 10, GREY, 'italic', 7.5, 4.5)
        y += 2
      }

      // Fix card height now that we know it
      const cardH = y - cardStartY
      drawRect(margin, cardStartY, contentW, cardH, i % 2 === 0 ? WHITE : LIGHT)
      drawRect(margin, cardStartY, 3, cardH, i === 0 ? GOLD : TEAL)

      // Re-draw content on top of background (since we drew bg after)
      writeText(dateStr, margin + 6, cardStartY + 6, NAVY, 'bold', 9)
      if (c.consultation_type) writeText(`[${c.consultation_type}]`, margin + 45, cardStartY + 6, GREY, 'normal', 7)
      if (c.follow_up_date) writeText(`Follow-up: ${new Date(c.follow_up_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`, W - margin, cardStartY + 6, TEAL, 'bold', 7.5, { align: 'right' })

      // Separator line
      drawLine(margin, y, W - margin, y, [220, 215, 210], 0.2)
      y += 5
    })

    if (consultations.length > 10) {
      writeText(`... and ${consultations.length - 10} more consultation records`, margin + 4, y, GREY, 'italic', 8)
      y += 8
    }
  }

  // ─── FOOTER (all pages) ──────────────────────────────────
  const totalPages = doc.getNumberOfPages()
  for (let pg = 1; pg <= totalPages; pg++) {
    doc.setPage(pg)
    drawLine(margin, H - 16, W - margin, H - 16, GOLD, 0.5)
    writeText('Mind Motion Matrix  ·  Dr. Kirthi Jawalkar', margin, H - 10, NAVY, 'bold', 7.5)
    writeText('Bangalore, India  ·  This report is confidential and intended for medical use only.', margin, H - 5.5, GREY, 'normal', 6.5)
    writeText(`Page ${pg} of ${totalPages}`, W - margin, H - 8, GOLD, 'bold', 7.5, { align: 'right' })
  }

  // ─── SAVE ────────────────────────────────────────────────
  const filename = `MMM-Report-${(patient.name || 'Patient').replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(filename)
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
