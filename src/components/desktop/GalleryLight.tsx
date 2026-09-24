'use client'
import { useState } from 'react'
import DetailModal from '../DetailModal'
import LightHeader, { SearchReservasiButtons } from './LightHeader'
import type { DesktopTab } from './DesktopTopBar'
import type { SearchItem } from './OneScreenShell'
import type { UiLabels, DesktopFonts } from '@/lib/siteInfo'

export type GalleryPhoto = { id: number; imageUrl: string; title: string | null; deskripsi: string | null }

// Halaman gallery desktop terang: grid foto + panel diagonal foto unggulan + lightbox.
export default function GalleryLight({ brandTitle, brandSub, brandTagline, bg, eyebrow, title1, title2, titleFallback, description, items, location, searchItems, reservasiHref, ui, fonts, coverPhotoProp, logoUrl }: {
  brandTitle: string
  brandSub: string
  brandTagline: string
  bg: string
  eyebrow: string
  title1: string
  title2: string
  titleFallback: string
  description: string
  items: GalleryPhoto[]
  location: string
  searchItems: SearchItem[]
  reservasiHref: string
  ui: UiLabels
  fonts: DesktopFonts
  coverPhotoProp?: string
  logoUrl: string
}) {
  const [zoom, setZoom] = useState<GalleryPhoto | null>(null)

  // Maksimal 6 tampil (6 pertama sesuai urutan admin)
  const visible = items.slice(0, 6)
  const autoCover = visible.length > 0 ? visible[0] : null
  const cover: (GalleryPhoto & { imageUrl: string }) | null = coverPhotoProp
    ? { id: -1, imageUrl: coverPhotoProp, title: null, deskripsi: null }
    : autoCover

  return (
    <div data-device="desktop" className={`h-[100dvh] w-full overflow-hidden relative flex ${fonts.sans}`} style={{ background: bg }}>
      <div className="w-[66%] h-full flex flex-col pl-[5%] pr-4 pt-5 pb-5">
        <LightHeader brandTitle={brandTitle} brandSub={brandSub} active="gallery" searchItems={searchItems} reservasiHref={reservasiHref} ui={ui} fonts={fonts} logoUrl={logoUrl} actions={false} />

        <div className="flex-1 min-h-0 flex flex-col pt-12">
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
          {description && <p className="mt-2.5 leading-relaxed max-w-xl shrink-0" style={{ fontSize: 14, color: '#5B564C' }}>{description}</p>}

          <div className="mt-3 shrink-0">
            {items.length === 0 ? (
              <div className="rounded-2xl border bg-white/70 p-6 text-center text-sm text-[#9A8B7A]" style={{ borderColor: '#EEE8D8' }}>
                {ui.noResult}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {visible.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => setZoom(it)}
                    className="rounded-xl overflow-hidden border text-left transition-all hover:-translate-y-1 active:translate-y-[4px] relative h-36"
                    style={{ borderColor: '#EFE7D3', backgroundColor: '#FCF6E8', boxShadow: '0 5px 0 rgba(30,49,36,0.08), 0 18px 34px rgba(30,49,36,0.16), inset 0 1px 0 rgba(255,255,255,0.8)' }}
                  >
                    <img src={it.imageUrl} alt={it.title || ''} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    {it.title && (
                      <span className="absolute bottom-0 inset-x-0 p-2 pt-6 text-[12px] font-extrabold text-white truncate" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                        {it.title}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
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
          {cover ? (
            <button onClick={() => setZoom(cover)} className="w-full h-full block" aria-label="Perbesar foto">
              <img src={cover.imageUrl} alt={cover.title || ''} className="w-full h-full object-cover" />
            </button>
          ) : (
            <div className="w-full h-full grid place-items-center bg-stone-200 text-stone-400 text-sm p-6 text-center">Foto gallery tampil di sini</div>
          )}
        </div>
        <div className="absolute top-5 right-6 flex items-center gap-3 z-10">
          <SearchReservasiButtons searchItems={searchItems} reservasiHref={reservasiHref} ui={ui} />
        </div>
      </div>

      {zoom && (
        <DetailModal
          data={{ title: zoom.title || '', image: zoom.imageUrl, desc: zoom.deskripsi }}
          onClose={() => setZoom(null)}
          imageOnly
        />
      )}
    </div>
  )
}
