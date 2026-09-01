import { ADMIN_PASSWORD } from './supabase'

// Same URL as in AdminWhatsApp.jsx — update both when you have your real Render URL.
const NOTIFIER_URL = 'https://mmm-whatsapp-bridge.onrender.com'

export function cleanPhone(phone) {
  let p = (phone || '').replace(/[^\d]/g, '')
  if (p.length === 10) p = '91' + p
  return p
}

// Tries to send automatically through the WhatsApp bridge server. If it's not reachable
// (not deployed yet, asleep, etc.) for any reason, falls back to opening a wa.me link with
// the message pre-filled, so the admin can just hit send manually.
export async function sendOrOpenWhatsApp(phone, message) {
  const number = cleanPhone(phone)

  try {
    const res = await fetch(`${NOTIFIER_URL}/notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ADMIN_PASSWORD}` },
      body: JSON.stringify({ number, message }),
    })
    const data = await res.json()
    if (data.ok) return { ok: true, method: 'auto' }
  } catch (e) {
    // fall through to manual link below
  }

  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank')
  return { ok: true, method: 'manual' }
}
