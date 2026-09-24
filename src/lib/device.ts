import { headers } from 'next/headers'

// Server-side: true = desktop/laptop, false = HP/tablet.
// iPadOS modern terbaca sebagai Macintosh -> ikut paket desktop (layar besar, wajar).
export function isDesktopRequest(): boolean {
  const ua = headers().get('user-agent') || ''
  if (/(mobi|android|iphone|ipod|ipad|blackberry|iemobile|opera mini|windows phone)/i.test(ua)) return false
  return true
}
