'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { SearchItem } from './OneScreenShell'
import type { UiLabels } from '@/lib/siteInfo'

// Overlay pencarian semua menu (dibuka dari ikon search topbar desktop).
export default function MenuSearchOverlay({ items, onClose, ui }: { items: SearchItem[]; onClose: () => void; ui: UiLabels }) {
  const router = useRouter()
  const [q, setQ] = useState('')

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onClose])

  const f = q.trim().toLowerCase()
  const filtered = (f ? items.filter((it) => `${it.nama} ${it.kategori}`.toLowerCase().includes(f)) : items).slice(0, 12)

  const go = (it: SearchItem) => {
    onClose()
    router.push(`/home/kategori/${it.kategori.toLowerCase()}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24" style={{ backgroundColor: 'rgba(13,20,16,0.85)' }}>
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl rounded-2xl p-5" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="flex items-center gap-3 border-b-2 pb-3" style={{ borderColor: '#E8E0C8' }}>
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20" fill="#9A8B7A">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={ui.searchPh}
            className="w-full bg-transparent text-[#1E3124] placeholder:text-[#9A8B7A] focus:outline-none"
          />
          <button onClick={onClose} className="text-[#9A8B7A] hover:text-[#1E3124] text-xl leading-none">×</button>
        </div>
        <div className="mt-3 max-h-[50vh] overflow-y-auto divide-y" style={{ borderColor: '#EEE8D8' }}>
          {filtered.length === 0 && <p className="py-4 text-center text-sm text-[#9A8B7A]">{ui.noResult}</p>}
          {filtered.map((it) => (
            <button key={it.id} onClick={() => go(it)} className="w-full flex items-center gap-3 py-2.5 text-left hover:bg-black/5 rounded-lg px-2">
              {(it.desktopPhotoUrl || it.photoUrl) ? (
                <img src={(it.desktopPhotoUrl || it.photoUrl) as string} alt={it.nama} className="w-10 h-10 rounded-lg object-cover shrink-0" loading="lazy" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-stone-200 grid place-items-center text-[9px] text-stone-400 shrink-0">No img</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-[#1E3124] truncate">{it.nama}</div>
                <div className="text-[11px] text-[#9A8B7A]">{it.kategori}</div>
              </div>
              {Number(it.harga) !== 0 && (
                <div className="text-xs font-extrabold text-[#1E3124]">Rp {Number(it.harga).toLocaleString('id-ID')}</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
