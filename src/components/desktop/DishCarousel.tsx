'use client'
import { useEffect, useState } from 'react'
import DetailModal from '../DetailModal'

export type Dish = {
  id: number
  nama: string
  deskripsi: string | null
  harga: number
  diskon: number | null
  photoUrl: string | null
  desktopPhotoUrl?: string | null
  photos: string[]
}

// Foto utama versi desktop (fallback foto mobile).
export function dishPhoto(d: Dish): string | null {
  return d.desktopPhotoUrl || d.photoUrl
}

function finalPrice(d: Dish): number | null {
  if (Number(d.harga) === 0) return null
  const disc = Number(d.diskon) || 0
  return disc > 0 ? Math.round(Number(d.harga) * (1 - disc / 100)) : Number(d.harga)
}

// Hero hidangan 1-layar: kiri harga+nama+deskripsi+kartu, kanan foto besar, dots+Next.
export default function DishCarousel({ items, eyebrow }: { items: Dish[]; eyebrow: string }) {
  const [idx, setIdx] = useState(0)
  const [detail, setDetail] = useState<{ title: string; image: string | null; images?: string[]; desc?: string | null; price?: string | null } | null>(null)

  useEffect(() => { setIdx(0) }, [eyebrow])
  useEffect(() => {
    if (items.length <= 1) return
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 6000)
    return () => clearInterval(t)
  }, [idx, items.length])

  if (items.length === 0) {
    return (
      <div className="h-full grid place-items-center text-white/50 text-sm px-8 text-center">
        Belum ada menu di sini — tambah di Setting → Menu
      </div>
    )
  }
  const cur = items[idx % items.length]
  const price = finalPrice(cur)
  // kartu bawah: item lain yang unik (maks 2), aman untuk list kecil
  const cards = items.filter((c) => c.id !== cur.id).filter((c, i, a) => a.findIndex((x) => x.id === c.id) === i).slice(0, 2)

  return (
    <>
      <div className="h-full flex">
        {/* kiri: teks */}
        <div className="w-[55%] h-full flex flex-col justify-center pl-24 pr-6 text-white">
          <div className="text-sm font-bold tracking-widest" style={{ color: '#E8B44A' }}>{eyebrow}</div>
          {price != null && <div className="mt-1 text-lg font-bold text-white/90" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}>Rp {price.toLocaleString('id-ID')}</div>}
          <h1 className="font-serif font-bold leading-[1.05] mt-1" style={{ fontSize: 'clamp(40px, 5.5vw, 76px)', textShadow: '0 2px 4px rgba(0,0,0,0.55)' }}>{cur.nama}</h1>
          {cur.deskripsi && <p className="mt-3 text-sm leading-relaxed text-white/60 max-w-md line-clamp-3" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>{cur.deskripsi}</p>}
          {Number(cur.diskon) > 0 && Number(cur.harga) !== 0 && (
            <div className="mt-2 text-xs text-white/50">
              <span className="line-through mr-2">Rp {Number(cur.harga).toLocaleString('id-ID')}</span>
              <span className="font-extrabold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#E8B44A', color: '#0D1410' }}>-{cur.diskon}%</span>
            </div>
          )}
          {/* kartu bawah */}
          {cards.length > 0 && (
            <div className="mt-6 flex gap-3">
              {cards.map((c) => {
                const cp = finalPrice(c)
                return (
                  <button
                    key={c.id}
                    onClick={() => setIdx(items.findIndex((x) => x.id === c.id))}
                    className="flex items-center gap-2 rounded-lg pl-1 pr-3 py-1.5 text-left transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: '#FAF7F2' }}
                  >
                    {c.photoUrl ? (
                      <img src={c.photoUrl} alt={c.nama} className="w-12 h-12 rounded-full object-cover shrink-0" loading="lazy" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-stone-200 grid place-items-center text-[8px] text-stone-400 shrink-0">No img</div>
                    )}
                    <span>
                      <span className="block text-[13px] font-extrabold text-[#1E3124] leading-tight max-w-[110px] truncate">{c.nama}</span>
                      {cp != null && <span className="block text-[11px] font-bold text-[#1E3124]/70">Rp {cp.toLocaleString('id-ID')}</span>}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
          {/* dots + next */}
          {items.length > 1 && (
            <div className="mt-6 flex items-center gap-3">
              <div className="flex gap-1.5">
                {items.slice(0, 8).map((it, i) => (
                  <button
                    key={it.id}
                    onClick={() => setIdx(items.findIndex((x) => x.id === it.id))}
                    aria-label={`Ke ${it.nama}`}
                    className="h-1.5 rounded-full transition-all"
                    style={i === idx % items.length || (items.length > 8 && false) ? { width: 20, backgroundColor: '#E8B44A' } : { width: 6, backgroundColor: 'rgba(255,255,255,0.3)' }}
                  />
                ))}
              </div>
              <button onClick={() => setIdx((idx + 1) % items.length)} className="flex items-center gap-1 text-sm font-bold text-white/80 hover:text-white">
                Next <span aria-hidden>→</span>
              </button>
            </div>
          )}
        </div>
        {/* kanan: foto besar */}
        <div className="w-[45%] h-full grid place-items-center">
          <button
            onClick={() => setDetail({
              title: cur.nama,
              image: cur.photoUrl,
              images: cur.photos,
              desc: cur.deskripsi,
              price: price != null ? `Rp ${price.toLocaleString('id-ID')}` : undefined,
            })}
            className="rounded-full overflow-hidden transition-transform hover:scale-[1.02]"
            style={{ width: 'min(30vw, 430px)', height: 'min(30vw, 430px)', border: '10px solid rgba(255,255,255,0.55)', boxShadow: '0 30px 80px rgba(0,0,0,0.35)' }}
            aria-label={`Perbesar ${cur.nama}`}
          >
            {cur.photoUrl ? (
              <img src={cur.photoUrl} alt={cur.nama} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full grid place-items-center bg-stone-200 text-stone-400 text-sm">No image</div>
            )}
          </button>
        </div>
      </div>
      <DetailModal data={detail} onClose={() => setDetail(null)} />
    </>
  )
}
