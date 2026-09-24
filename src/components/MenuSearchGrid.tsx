'use client'
import { useState } from 'react'
import KategoriClient, { type MenuItem } from './KategoriClient'
import type { CardStyle } from '@/lib/cardStyle'

// Khusus desktop: kotak pencarian + grid menu (reuse kartu & modal mobile).
export default function MenuSearchGrid({ items, style }: { items: MenuItem[]; style: CardStyle }) {
  const [q, setQ] = useState('')
  const f = q.trim().toLowerCase()
  const filtered = f
    ? items.filter((it) => `${it.nama} ${it.deskripsi || ''}`.toLowerCase().includes(f))
    : items
  return (
    <div data-device="desktop">
      <div className="relative mb-4">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A8B7A]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari menu... (cth: ayam, kopi, paket)"
          className="w-full rounded-xl border-2 border-[#E8E0C8] bg-white pl-10 pr-4 py-2.5 text-sm text-[#1E3124] placeholder:text-[#9A8B7A] focus:outline-none focus:border-[#1E3124]/40"
        />
      </div>
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#EEE8D8] bg-white p-6 text-center text-[#9A8B7A] text-sm">
          Tidak ada menu yang cocok dengan &ldquo;{q}&rdquo;
        </div>
      ) : (
        <>
          {f && <p className="mb-3 text-xs text-[#9A8B7A]">{filtered.length} hasil untuk &ldquo;{q}&rdquo;</p>}
          <KategoriClient
            items={filtered}
            grid
            cardBg={style.cardBg}
            cardShadow={style.cardShadow}
            titleShadow={style.titleShadow}
            descShadow={style.descShadow}
            isWhiteCard={style.isWhiteCard}
            namaColor={style.namaColor}
            descColor={style.descColor}
            cardShow={style.cardShow}
          />
        </>
      )}
    </div>
  )
}
