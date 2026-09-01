import { supabase, ADMIN_PASSWORD } from './supabase'

let cachedUrl = null

async function getNotifierUrl() {
  if (cachedUrl !== null) return cachedUrl
  const { data } = await supabase.from('app_settings').select('value').eq('key', 'whatsapp_notifier_url').maybeSingle()
  cachedUrl = data?.value || ''
  return cachedUrl
}

export function cleanPhone(phone) {
  let p = (phone || '').replace(/[^\d]/g, '')
  if (p.length === 10) p = '91' + p
  return p
}

// Tries to send automatically through the WhatsApp bridge server (if one is configured
// and reachable). If it's not set up yet, or the request fails for any reason, falls back
// to opening a wa.me link with the message pre-filled, so admin can just hit send manually.
export async function sendOrOpenWhatsApp(phone, message) {
  const number = cleanPhone(phone)
  const url = await getNotifierUrl()

  if (url) {
    try {
      const res = await fetch(`${url}/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ADMIN_PASSWORD}` },
        body: JSON.stringify({ number, message }),
      })
      const data = await res.json()
      if (data.ok) return { ok: true, method: 'auto' }
    } catch (e) {
      // fall through to manual link below
    }
  }

  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank')
  return { ok: true, method: 'manual' }
}
