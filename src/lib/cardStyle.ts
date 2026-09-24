// Helper bersama: turunkan variabel gaya kartu dari settings promo_landing.
// Dipakai halaman kategori & gallery, versi mobile maupun desktop.
export type CardStyle = {
  bgColor: string
  cardBg: string
  cardShadow: string
  titleShadow: string
  descShadow: string
  isWhiteCard: boolean
  namaColor: string
  descColor: string
  cardShow: boolean
}

function hexToRgba(hex: string, a: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.length === 3 ? h[0] + h[0] : h.slice(0, 2), 16)
  const g = parseInt(h.length === 3 ? h[1] + h[1] : h.slice(2, 4), 16)
  const b = parseInt(h.length === 3 ? h[2] + h[2] : h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${a})`
}

export function getCardStyle(settings: Record<string, string>): CardStyle {
  const bgColor = settings['promo_landing.bg_color'] || '#FAF7F2'
  const rawCardBg = settings['promo_landing.menu_card_bg'] || '#FFFFFF'
  const overlay = Number(settings['promo_landing.menu_card_overlay'] || 0.45)
  const cardBg = rawCardBg.startsWith('#')
    ? hexToRgba(rawCardBg, overlay)
    : rawCardBg.includes('rgba')
      ? rawCardBg.replace(/rgba\(([^,]+,[^,]+,[^,]+,)[^)]+\)/, `rgba($1${overlay})`)
      : rawCardBg
  const isWhiteCard =
    rawCardBg.toLowerCase().includes('255,255,255') ||
    rawCardBg.toLowerCase() === '#ffffff' ||
    rawCardBg.toLowerCase() === '#fff' ||
    rawCardBg.toLowerCase() === 'white'
  return {
    bgColor,
    cardBg,
    cardShadow: settings['promo_landing.menu_card_shadow'] || '0 20px 40px rgba(0,0,0,0.35),0 8px 16px rgba(30,49,36,0.25)',
    titleShadow: settings['promo_landing.title_shadow'] || '0 3px 12px rgba(0,0,0,0.9)',
    descShadow: settings['promo_landing.desc_shadow'] || '0 2px 8px rgba(0,0,0,0.8)',
    isWhiteCard,
    namaColor: settings['promo_landing.menuCardTextColor'] || (isWhiteCard ? '#1E3124' : '#ffffff'),
    descColor: settings['promo_landing.menuDescColor'] || (isWhiteCard ? 'rgba(30,49,36,0.7)' : 'rgba(255,255,255,0.9)'),
    cardShow: settings['promo_landing.menu_card_show'] !== '0',
  }
}
