'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DetailModal from '../DetailModal'
import { TABS, type DesktopTab } from './DesktopTopBar'
import MenuSearchOverlay from './MenuSearchOverlay'
import type { SearchItem } from './OneScreenShell'
import { type Dish, dishPhoto } from './DishCarousel'
import type { UiLabels, DesktopFonts } from '@/lib/siteInfo'

function finalPrice(d: Dish): number | null {
  if (Number(d.harga) === 0) return null
  const disc = Number(d.diskon) || 0
  return disc > 0 ? Math.round(Number(d.harga) * (1 - disc / 100)) : Number(d.harga)
}

// Halaman kategori desktop ala referensi: terang, grid kartu, foto diagonal.
export default function CategoryShowcase({ brandTitle, brandSub, brandTagline, active, bg, eyebrow, title1, title2, titleFallback, description, items, location, signature, scriptFont, fonts, searchItems, reservasiHref, ui, coverPhotoProp, logoUrl }: {
  brandTitle: string
  brandSub: string
  brandTagline: string
  active: DesktopTab
  bg: string
  eyebrow: string
  title1: string
  title2: string
  titleFallback: string
  description: string
  items: Dish[]
  location: string
  signature: string
  scriptFont: string
  fonts: DesktopFonts
  searchItems: SearchItem[]
  reservasiHref: string
  ui: UiLabels
  coverPhotoProp?: string
  logoUrl: string
}) {
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [detail, setDetail] = useState<{ title: string; image: string | null; images?: string[]; desc?: string | null; price?: string | null } | null>(null)

  const openDetail = (d: Dish) => {
    const p = finalPrice(d)
    setDetail({ title: d.nama, image: dishPhoto(d), images: d.photos, desc: d.deskripsi, price: p != null ? `Rp ${p.toLocaleString('id-ID')}` : undefined })
  }
  // Maksimal 6 tampil (6 pertama sesuai urutan admin)
  const visible = items.slice(0, 6)
  const autoCover = items.length > 0 ? dishPhoto(items[0]) : null
  const coverPhoto = coverPhotoProp || autoCover
  const coverName = coverPhotoProp ? '' : (items.length > 0 ? items[0].nama : '')

  return (
    <div data-device="desktop" className={`h-[100dvh] w-full overflow-hidden relative flex ${fonts.sans}`} style={{ background: bg }}>
      {/* kiri */}
      <div className="w-[66%] h-full flex flex-col pl-[5%] pr-4 pt-5 pb-5">
        <header className="flex items-center shrink-0">
          <span className="flex items-center gap-2.5 leading-none">
            {logoUrl && <img src={logoUrl} alt="Logo" className="w-10 h-10 rounded-full object-cover shadow" loading="lazy" />}
            <span>
              <button onClick={() => router.push('/home')} className={`${fonts.serif} text-[26px] font-bold text-[#1E3124] leading-none block text-left`}>
                {brandTitle || 'Klapa Manis'}
              </button>
              {brandSub && <span className="block text-[10px] font-bold tracking-[0.3em] mt-1" style={{ color: '#B98A2F' }}>{brandSub}</span>}
            </span>
          </span>
          <nav className="flex-1 flex items-center justify-center gap-6">
            {TABS.map((t) => (
              <button
                key={t.value}
                onClick={() => router.push(t.href)}
                className="text-[14px] font-semibold transition-colors"
                style={active === t.value
                  ? { color: '#1E3124', borderBottom: '2px solid #B98A2F', paddingBottom: 2 }
                  : { color: '#1E3124' }}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </header>

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
                    onClick={() => openDetail(it)}
                    className="rounded-xl overflow-hidden border text-left transition-all hover:-translate-y-1 active:translate-y-[4px]"
                    style={{ borderColor: '#E7D9B8', backgroundColor: '#FCF6E8', boxShadow: '0 8px 0 rgba(30,49,36,0.12), 0 26px 46px rgba(30,49,36,0.22), inset 0 1px 0 rgba(255,255,255,0.9)' }}
                  >
                    {(it.desktopPhotoUrl || it.photoUrl) ? (
                      <img src={(it.desktopPhotoUrl || it.photoUrl) as string} alt={it.nama} className="w-full h-36 object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-36 grid place-items-center bg-stone-100 text-stone-400 text-xs">No image</div>
                    )}
                    <div className="px-2 pt-1 pb-1.5">
                      <div className="text-[12px] font-extrabold leading-tight truncate" style={{ color: '#1A2B1F' }}>{it.nama}</div>
                      {it.deskripsi && <div className="line-clamp-2 leading-snug min-h-[24px]" style={{ fontSize: 10, color: '#6E6A5E' }}>{it.deskripsi}</div>}
                    </div>
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

      {/* kanan: foto diagonal */}
      <div className="w-[34%] h-full relative">
        {signature && (
          <div className="absolute z-10 text-right pointer-events-none" style={{ right: '7%', top: '8%' }}>
            <div className={`text-white ${scriptFont}`} style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.15, textShadow: '0 2px 14px rgba(0,0,0,0.55)' }}>
              {signature}
            </div>
            <div className="ml-auto mt-1 h-[2px] w-16" style={{ backgroundColor: '#E8B44A' }} />
          </div>
        )}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'polygon(14% 0, 100% 0, 100% 100%, 0% 100%)' }}>
          {coverPhoto ? (
            <img src={coverPhoto} alt={coverName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center bg-stone-200 text-stone-400 text-sm p-6 text-center">Foto menu tampil di sini</div>
          )}
        </div>
        <div className="absolute top-5 right-6 flex items-center gap-3 z-10">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Cari menu"
            className="w-10 h-10 grid place-items-center rounded-full bg-white/85 text-[#1E3124] shadow hover:bg-white transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
          {reservasiHref && (
            <button
              onClick={() => window.open(reservasiHref, '_blank', 'noopener')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-extrabold text-white shadow transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: '#C08A3E' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {ui.reservasi}
            </button>
          )}
        </div>
      </div>

      {searchOpen && <MenuSearchOverlay items={searchItems} onClose={() => setSearchOpen(false)} ui={ui} />}
      <DetailModal data={detail} onClose={() => setDetail(null)} />
    </div>
  )
}
