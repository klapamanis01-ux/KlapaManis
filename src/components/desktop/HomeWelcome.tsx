'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TABS } from './DesktopTopBar'
import MenuSearchOverlay from './MenuSearchOverlay'
import type { SearchItem } from './OneScreenShell'
import type { UiLabels, DesktopFonts } from '@/lib/siteInfo'

// Home desktop ala referensi: krem editorial + foto diagonal, Reservasi, video, signature.
export default function HomeWelcome({ title, brandSub, tagline, description, location, signature, note, avatars, photo, videoUrl, reservasiHref, searchItems, scriptFont, bg, ui, fonts }: {
  title: string
  brandSub: string
  tagline: string
  description: string
  location: string
  signature: string
  note: string
  avatars: string[]
  photo: string
  videoUrl: string
  reservasiHref: string
  searchItems: SearchItem[]
  scriptFont: string
  bg: string
  ui: UiLabels
  fonts: DesktopFonts
}) {
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [playVideo, setPlayVideo] = useState(false)

  return (
    <div data-device="desktop" className={`h-[100dvh] w-full overflow-hidden relative flex ${fonts.sans}`} style={{ background: bg }}>
      {/* kiri: konten */}
      <div className="w-[55%] h-full flex flex-col pl-10 pr-4 pt-5 pb-6">
        <header className="flex items-center gap-8">
          <div className="leading-none">
            <div className={`${fonts.serif} text-[22px] font-bold text-[#1E3124]`}>{title || 'Klapa Manis'}</div>
            {brandSub && <div className="text-[10px] font-bold tracking-[0.3em] mt-1" style={{ color: '#B98A2F' }}>{brandSub}</div>}
          </div>
          <nav className="flex items-center gap-5">
            {TABS.map((t) => (
              <button
                key={t.value}
                onClick={() => router.push(t.href)}
                className="text-[13px] font-bold transition-colors"
                style={t.value === 'home'
                  ? { color: '#1E3124', borderBottom: '2px solid #B98A2F', paddingBottom: 2 }
                  : { color: '#1E3124' }}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </header>

        <div className="flex-1 min-h-0 flex flex-col justify-center">
          <div className="text-[13px] font-bold tracking-[0.3em]" style={{ color: '#B98A2F' }}>{brandSub || 'RUMAH MAKAN'}</div>
          <h1 className={`${fonts.serif} font-bold text-[#1E3124] leading-[1.02] mt-2`} style={{ fontSize: 'clamp(48px, 6vw, 88px)', textShadow: '0 1px 2px rgba(30,49,36,0.14)' }}>
            {title || 'Klapa Manis'}
          </h1>
          {tagline && (
            <div className={`${fonts.serif} font-bold leading-[1.15] mt-1`} style={{ color: '#8A5A2B', fontSize: 'clamp(26px, 3vw, 44px)', textShadow: '0 1px 2px rgba(138,90,43,0.18)' }}>
              {tagline}
            </div>
          )}
          {description && (
            <p className="mt-4 text-[14px] leading-relaxed text-[#1E3124]/70 max-w-md">{description}</p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => router.push('/home/kategori/makanan')}
              className="px-6 py-3 rounded-xl text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: '#C08A3E' }}
            >
              🍴&nbsp;&nbsp;{ui.viewMenu}&nbsp;&nbsp;→
            </button>
            {videoUrl && (
              <button
                onClick={() => setPlayVideo(true)}
                className="px-6 py-3 rounded-xl text-sm font-extrabold border text-[#1E3124] hover:bg-black/5 transition-colors"
                style={{ borderColor: '#D8C9A8' }}
              >
                <span className="inline-grid place-items-center w-5 h-5 rounded-full text-white text-[10px] mr-2" style={{ backgroundColor: '#C08A3E' }}>▶</span>
                {ui.videoBtn}
              </button>
            )}
          </div>
          {(avatars.length > 0 || note) && (
            <div className="mt-6 flex items-center gap-3">
              {avatars.length > 0 && (
                <div className="flex -space-x-3">
                  {avatars.slice(0, 5).map((a, i) => (
                    <img key={i} src={a} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow" loading="lazy" />
                  ))}
                </div>
              )}
              {note && <p className="text-[13px] font-semibold text-[#1E3124]/80 max-w-[220px] leading-snug">{note}</p>}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {location && (
            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1E3124]/70">
              <span style={{ color: '#C08A3E' }}>📍</span> {location}
            </span>
          )}
          {signature && (
            <span className="text-[26px] leading-none" style={{ color: '#B98A2F' }}>
              <span className={scriptFont}>{signature}</span>
            </span>
          )}
        </div>
      </div>

      {/* kanan: foto diagonal */}
      <div className="w-[45%] h-full relative">
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'polygon(14% 0, 100% 0, 100% 100%, 0% 100%)' }}>
          {photo ? (
            <img src={photo} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center bg-stone-200 text-stone-400 text-sm p-6 text-center">
              Tambah foto suasana di Setting → Gallery
            </div>
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
      {playVideo && videoUrl && (
        <div className="fixed inset-0 z-50 grid place-items-center p-6" style={{ backgroundColor: 'rgba(13,20,16,0.9)' }}>
          <div className="absolute inset-0" onClick={() => setPlayVideo(false)} />
          <div className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden bg-black">
            <video src={videoUrl} controls autoPlay className="w-full max-h-[80vh]" />
            <button onClick={() => setPlayVideo(false)} className="absolute top-3 right-3 bg-black/50 text-white rounded-full w-8 h-8 grid place-items-center text-lg leading-none">×</button>
          </div>
        </div>
      )}
    </div>
  )
}
