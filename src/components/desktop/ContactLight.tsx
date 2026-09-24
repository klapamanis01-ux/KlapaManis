'use client'
import ContactUs from '../ContactUs'
import LightHeader, { SearchReservasiButtons } from './LightHeader'
import type { DesktopTab } from './DesktopTopBar'
import type { SearchItem } from './OneScreenShell'
import type { UiLabels, DesktopFonts } from '@/lib/siteInfo'

// Halaman contact desktop terang: tombol kontak + info kiri, peta diagonal kanan.
export default function ContactLight({ brandTitle, brandSub, brandTagline, bg, eyebrow, title1, title2, titleFallback, contact, mapsUrl, address, hours, location, searchItems, reservasiHref, ui, fonts, logoUrl }: {
  brandTitle: string
  brandSub: string
  brandTagline: string
  bg: string
  eyebrow: string
  title1: string
  title2: string
  titleFallback: string
  contact: { whatsapp: string; instagram: string; tiktok: string; title?: string; subtitle?: string; whatsappDisplay: string; instagramDisplay: string; tiktokDisplay: string }
  mapsUrl: string
  address: string
  hours: string
  location: string
  searchItems: SearchItem[]
  reservasiHref: string
  ui: UiLabels
  fonts: DesktopFonts
  logoUrl: string
}) {
  const mapSrc = mapsUrl || (address ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed` : '')
  return (
    <div data-device="desktop" className={`h-[100dvh] w-full overflow-hidden relative flex ${fonts.sans}`} style={{ background: bg }}>
      <div className="w-[66%] h-full flex flex-col pl-[5%] pr-4 pt-5 pb-5">
        <LightHeader brandTitle={brandTitle} brandSub={brandSub} active="contact" searchItems={searchItems} reservasiHref={reservasiHref} ui={ui} fonts={fonts} logoUrl={logoUrl} actions={false} />

        <div className="flex-1 min-h-0 flex flex-col pt-12 overflow-y-auto">
          <div className="text-[12px] font-bold tracking-[0.35em] shrink-0" style={{ color: '#B98A2F' }}>{eyebrow}</div>
          {(title1 || title2) ? (
            <h1 className={`${fonts.serif} font-bold leading-[1.12] mt-2 shrink-0`} style={{ fontSize: 'clamp(18px, 2.4vw, 34px)', textShadow: '0 1px 2px rgba(30,49,36,0.14)' }}>
              {title1 && <span className="block text-[#1E3124]">{title1}</span>}
              {title2 && <span className="block" style={{ color: '#8A5A2B' }}>{title2}</span>}
            </h1>
          ) : (
            <h1 className={`${fonts.serif} font-bold text-[#1E3124] leading-none mt-2 shrink-0`} style={{ fontSize: 'clamp(18px, 2.4vw, 34px)', textShadow: '0 1px 2px rgba(30,49,36,0.14)' }}>
              {titleFallback}
            </h1>
          )}

          <div className="mt-3 grid grid-cols-2 gap-4 items-start">
            <div className="rounded-2xl px-3 py-1" style={{ backgroundColor: 'rgba(255,255,255,0.75)', border: '1px solid #EFE7D3' }}>
              <ContactUs settings={contact} />
            </div>
            <div className="rounded-2xl p-4 space-y-3" style={{ backgroundColor: '#FCF6E8', border: '1px solid #EFE7D3' }}>
              <h3 className={`${fonts.serif} text-lg font-bold text-[#1E3124]`}>{ui.visitInfo}</h3>
              {address && (
                <div className="flex gap-2.5">
                  <span>📍</span>
                  <p className="text-[13px] text-[#1E3124]/80">{address}</p>
                </div>
              )}
              {hours && (
                <div className="flex gap-2.5">
                  <span>🕒</span>
                  <p className="text-[13px] text-[#1E3124]/80">{ui.hoursPrefix} {hours}</p>
                </div>
              )}
              {!address && !hours && (
                <p className="text-xs text-[#9A8B7A]">Alamat & jam buka bisa diisi di Setting → Umum.</p>
              )}
            </div>
          </div>

          <div className="flex-1 min-h-0" />

          <div className="flex items-center gap-4 pt-2 shrink-0">
            {location && (
              <span className="flex items-center gap-1.5 font-semibold" style={{ fontSize: 14, color: 'rgba(30,49,36,0.7)' }}>
                <span style={{ color: '#C08A3E' }}>📍</span> {location}
              </span>
            )}
            <span className="h-px w-16 shrink-0" style={{ backgroundColor: '#C08A3E' }} />
            <span>
              <span className="block text-[12px] font-bold" style={{ color: '#B98A2F' }}>{brandTitle || 'Klapa Manis'}</span>
              {brandTagline && <span className="block text-[12px]" style={{ color: 'rgba(30,49,36,0.6)' }}>{brandTagline}</span>}
            </span>
          </div>
        </div>
      </div>

      <div className="w-[34%] h-full relative">
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'polygon(14% 0, 100% 0, 100% 100%, 0% 100%)' }}>
          {mapSrc ? (
            <iframe title="Peta lokasi" src={mapSrc} className="w-full h-full" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <div className="w-full h-full grid place-items-center bg-stone-200 text-stone-400 text-sm p-6 text-center">Isi alamat di Setting → Umum untuk tampilkan peta</div>
          )}
        </div>
        <div className="absolute top-5 right-6 flex items-center gap-3 z-10">
          <SearchReservasiButtons searchItems={searchItems} reservasiHref={reservasiHref} ui={ui} />
        </div>
      </div>
    </div>
  )
}
