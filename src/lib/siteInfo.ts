import type { FooterInfo } from '@/components/DesktopFooter'
import type { SearchItem, RailContact } from '@/components/desktop/OneScreenShell'

// Bangun info footer/panel dari settings map (group promo_landing).
export function getFooterInfo(s: Record<string, string>): FooterInfo {
  return {
    siteTitle: s['site.title'] || 'Klapa Manis',
    description: s['site.description'] || '',
    address: s['contact_us.address'] || '',
    hours: s['contact_us.hours'] || '',
    whatsapp: s['promo_landing.whatsapp'] || '',
    whatsappDisplay: s['promo_landing.whatsapp_display'] || s['contact_us.whatsapp_display'] || '',
    instagram: s['promo_landing.instagram'] || '',
    instagramDisplay: s['promo_landing.instagram_display'] || s['contact_us.instagram_display'] || '',
    tiktok: s['promo_landing.tiktok'] || '',
    tiktokDisplay: s['promo_landing.tiktok_display'] || s['contact_us.tiktok_display'] || '',
  }
}

export function getContactMaps(s: Record<string, string>): { address: string; hours: string; mapsUrl: string } {
  return {
    address: s['contact_us.address'] || '',
    hours: s['contact_us.hours'] || '',
    mapsUrl: s['contact_us.maps_url'] || '',
  }
}

// Kontak untuk rel sosmed desktop (WA/IG/TikTok dari setting).
export function getRailContacts(s: Record<string, string>): RailContact[] {
  const list: RailContact[] = []
  const wa = s['promo_landing.whatsapp'] || ''
  if (wa) list.push({ href: `https://wa.me/${wa.replace(/[^0-9]/g, '')}`, label: 'WhatsApp', kind: 'wa' })
  const ig = s['promo_landing.instagram'] || ''
  if (ig) list.push({ href: ig, label: 'Instagram', kind: 'ig' })
  const tt = s['promo_landing.tiktok'] || ''
  if (tt) list.push({ href: tt, label: 'TikTok', kind: 'tt' })
  return list
}

// Background 1-layar desktop. Masing-masing menerima warna solid (#0D1410),
// gradasi CSS (linear-gradient(...)), atau URL gambar (upload / https://...).
// Kanan kosong = ikut bg_color.
export function getDesktopBg(s: Record<string, string>): { left: string; right: string } {
  const bgColor = s['promo_landing.bg_color'] || '#FAF7F2'
  return {
    left: s['desktop.bg_left'] || '#0D1410',
    right: s['desktop.bg_right'] || bgColor,
  }
}

// Panel terang (home kiri, halaman kategori): warna/gradasi/gambar.
export function getLightBg(s: Record<string, string>): string {
  return s['desktop.bg_light'] || '#FAF6EE'
}

// Font desktop (diisi dari next/font di page, diteruskan sebagai className).
export type DesktopFonts = { serif: string; sans: string }

// Semua label UI desktop yang bisa diedit dari admin (Setting → Umum).
export type UiLabels = {
  viewMenu: string
  videoBtn: string
  reservasi: string
  searchPh: string
  noResult: string
  prev: string
  next: string
  galleryEyebrow: string
  visitInfo: string
  hoursPrefix: string
}

export function getUiLabels(s: Record<string, string>): UiLabels {
  return {
    viewMenu: s['desktop.ui_view_menu'] || 'Lihat Makanan',
    videoBtn: s['desktop.ui_video_btn'] || 'Lihat Video',
    reservasi: s['desktop.ui_reservasi'] || 'Reservasi',
    searchPh: s['desktop.ui_search_ph'] || 'Cari menu...',
    noResult: s['desktop.ui_no_result'] || 'Tidak ada menu yang cocok.',
    prev: s['desktop.ui_prev'] || 'Prev',
    next: s['desktop.ui_next'] || 'Next',
    galleryEyebrow: s['desktop.ui_gallery_eyebrow'] || 'GALLERY',
    visitInfo: s['desktop.ui_visit_info'] || 'Info Kunjungan',
    hoursPrefix: s['desktop.ui_hours_prefix'] || 'Jam buka:',
  }
}

// Ubah nilai setting background jadi CSS background yang valid.
export function bgCss(v: string, fallback: string): string {
  const t = (v || '').trim()
  if (!t) return fallback
  if (/^(linear|radial|conic)-gradient\(/i.test(t)) return t
  if (/^(https?:\/\/|\/)/i.test(t) && !/\s/.test(t)) return `url("${t}") center / cover no-repeat`
  return t
}

// Menu -> item pencarian desktop (hanya yang aktif).
export function toSearchItems(menus: { id: number; nama: string; harga: number; diskon: number | null; kategori: string; photoUrl: string | null; desktopPhotoUrl?: string | null; aktif: number | null }[]): SearchItem[] {
  return menus
    .filter((m) => (m.aktif ?? 1) !== 0)
    .map((m) => ({ id: m.id, nama: m.nama, harga: m.harga, diskon: m.diskon, kategori: m.kategori, photoUrl: m.photoUrl, desktopPhotoUrl: m.desktopPhotoUrl || null }))
}

// Logo header desktop: setting khusus, fallback favicon situs.
export function getLogoUrl(s: Record<string, string>): string {
  return s['desktop.logo_url'] || s['site.favicon_url'] || ''
}

// Background per halaman desktop: kiri (fallback bg_light), kanan gambar (fallback '' = otomatis).
export function getPageBg(s: Record<string, string>, page: string): { left: string; right: string } {
  const fallback = s['desktop.bg_light'] || '#FAF6EE'
  return {
    left: s[`desktop.bg_${page}_left`] || fallback,
    right: s[`desktop.bg_${page}_right`] || '',
  }
}

// Ambil nilai setting hanya jika berupa URL gambar (untuk <img src>).
export function asImageUrl(v: string): string {
  const t = (v || '').trim()
  if (/^(https?:\/\/|\/)/i.test(t) && !/\s/.test(t)) return t
  return ''
}
