'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Home desktop: kata sambutan + foto suasana (bukan menu).
export default function WelcomeHero({ eyebrow, title, subtitle, images }: {
  eyebrow: string
  title: string
  subtitle: string
  images: string[]
}) {
  const router = useRouter()
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 6000)
    return () => clearInterval(t)
  }, [idx, images.length])

  return (
    <div className="h-full flex">
      {/* kiri: kata-kata */}
      <div className="w-[55%] h-full flex flex-col justify-center pl-24 pr-10 text-white">
        {eyebrow && (
          <div className="text-sm font-bold tracking-[0.25em]" style={{ color: '#E8B44A' }}>{eyebrow}</div>
        )}
        <h1 className="font-serif font-bold leading-[1.08] mt-3" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
          {title || 'Selamat Datang di Klapa Manis'}
        </h1>
        {subtitle && (
          <p className="mt-4 text-[15px] leading-relaxed text-white/65 max-w-md">{subtitle}</p>
        )}
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => router.push('/home/kategori/makanan')}
            className="px-7 py-3 rounded-full text-sm font-extrabold transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: '#E8B44A', color: '#0D1410' }}
          >
            Lihat Menu
          </button>
          <button
            onClick={() => router.push('/home/gallery')}
            className="px-7 py-3 rounded-full text-sm font-extrabold border-2 border-white/40 text-white hover:bg-white/10 transition-colors"
          >
            Galeri Foto
          </button>
        </div>
      </div>
      {/* kanan: foto suasana */}
      <div className="w-[45%] h-full p-10 grid place-items-center">
        {images.length > 0 ? (
          <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-[2rem] overflow-hidden" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.35)' }}>
            {images.map((src, i) => (
              <img
                key={src + i}
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                style={{ opacity: i === idx % images.length ? 1 : 0 }}
                loading={i === 0 ? undefined : 'lazy'}
              />
            ))}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.slice(0, 8).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Foto ${i + 1}`}
                    className="h-1.5 rounded-full transition-all"
                    style={i === idx % images.length ? { width: 20, backgroundColor: '#FFFFFF' } : { width: 6, backgroundColor: 'rgba(255,255,255,0.5)' }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-[440px] aspect-[4/5] rounded-[2rem] grid place-items-center bg-black/10 text-sm text-[#9A8B7A] text-center p-6">
            Tambah foto suasana di Setting → Gallery
          </div>
        )}
      </div>
    </div>
  )
}
