'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TABS, type DesktopTab } from './DesktopTopBar'
import MenuSearchOverlay from './MenuSearchOverlay'
import type { SearchItem } from './OneScreenShell'
import type { UiLabels, DesktopFonts } from '@/lib/siteInfo'

// Tombol search + reservasi + overlay (tanpa positioning, dibungkus pemanggil).
export function SearchReservasiButtons({ searchItems, reservasiHref, ui }: {
  searchItems: SearchItem[]
  reservasiHref: string
  ui: UiLabels
}) {
  const [searchOpen, setSearchOpen] = useState(false)
  return (
    <>
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
      {searchOpen && <MenuSearchOverlay items={searchItems} onClose={() => setSearchOpen(false)} ui={ui} />}
    </>
  )
}

// Header terang bersama: logo+sub, nav tengah, aksi kanan opsional.
export default function LightHeader({ brandTitle, brandSub, active, searchItems, reservasiHref, ui, fonts, logoUrl, actions = true }: {
  brandTitle: string
  brandSub: string
  active: DesktopTab
  searchItems: SearchItem[]
  reservasiHref: string
  ui: UiLabels
  fonts: DesktopFonts
  logoUrl: string
  actions?: boolean
}) {
  const router = useRouter()
  return (
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
      {actions && (
        <span className="flex items-center gap-3">
          <SearchReservasiButtons searchItems={searchItems} reservasiHref={reservasiHref} ui={ui} />
        </span>
      )}
    </header>
  )
}
