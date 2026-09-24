'use client'
import { useEffect, useState } from 'react'
import DetailModal from '../DetailModal'

export type GalleryDish = { id: number; imageUrl: string; title: string | null; deskripsi: string | null }

import type { UiLabels } from '@/lib/siteInfo'

// Showcase gallery 1-layar: kiri judul+keterangan+dots/Next, kanan foto besar (klik = lightbox).
export default function GalleryShowcase({ items, ui }: { items: GalleryDish[]; ui: UiLabels }) {
  const [idx, setIdx] = useState(0)
  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    if (items.length <= 1) return
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 6000)
    return () => clearInterval(t)
  }, [idx, items.length])

  if (items.length === 0) {
    return (
      <div className="h-full grid place-items-center text-white/50 text-sm px-8 text-center">
        Belum ada foto gallery — tambah di Setting → Gallery
      </div>
    )
  }
  const cur = items[idx % items.length]

  return (
    <>
      <div className="h-full flex">
        <div className="w-[55%] h-full flex flex-col justify-center pl-24 pr-6 text-white">
          <div className="text-sm font-bold tracking-widest" style={{ color: '#E8B44A' }}>{ui.galleryEyebrow}</div>
          <h1 className="font-serif font-bold leading-[1.05] mt-1" style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', textShadow: '0 2px 4px rgba(0,0,0,0.55)' }}>
            {cur.title || 'Momen Klapa Manis'}
          </h1>
          {cur.deskripsi && <p className="mt-3 text-sm leading-relaxed text-white/60 max-w-md line-clamp-3" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>{cur.deskripsi}</p>}
          <div className="mt-4 text-xs text-white/40">{(idx % items.length) + 1} / {items.length}</div>
          {items.length > 1 && (
            <div className="mt-4 flex items-center gap-3">
              <button onClick={() => setIdx((idx - 1 + items.length) % items.length)} className="flex items-center gap-1 text-sm font-bold text-white/80 hover:text-white">
                <span aria-hidden>←</span> {ui.prev}
              </button>
              <div className="flex gap-1.5">
                {items.slice(0, 8).map((it, i) => (
                  <button
                    key={it.id}
                    onClick={() => setIdx(items.findIndex((x) => x.id === it.id))}
                    aria-label={`Foto ${i + 1}`}
                    className="h-1.5 rounded-full transition-all"
                    style={i === idx % items.length ? { width: 20, backgroundColor: '#E8B44A' } : { width: 6, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  />
                ))}
              </div>
              <button onClick={() => setIdx((idx + 1) % items.length)} className="flex items-center gap-1 text-sm font-bold text-white/80 hover:text-white">
                {ui.next} <span aria-hidden>→</span>
              </button>
            </div>
          )}
        </div>
        <div className="w-[45%] h-full p-8 grid place-items-center">
          <button
            onClick={() => setZoom(true)}
            className="rounded-2xl overflow-hidden transition-transform hover:scale-[1.01]"
            style={{ width: '100%', height: '100%', maxHeight: '100%', boxShadow: '0 30px 80px rgba(0,0,0,0.35)' }}
            aria-label="Perbesar foto"
          >
            <img src={cur.imageUrl} alt={cur.title || ''} className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
      {zoom && (
        <DetailModal
          data={{ title: cur.title || '', image: cur.imageUrl, desc: cur.deskripsi }}
          onClose={() => setZoom(false)}
          imageOnly
        />
      )}
    </>
  )
}
