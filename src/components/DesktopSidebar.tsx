'use client'
import { useRouter } from 'next/navigation'

const ITEMS: { value: string; label: string; icon: string }[] = [
  { value: 'makanan', label: 'Makanan', icon: '/icons/Makanan.png' },
  { value: 'minuman', label: 'Minuman', icon: '/icons/Minuman.png' },
  { value: 'paket', label: 'Paket', icon: '/icons/Paket.png' },
  { value: 'gallery', label: 'Gallery', icon: '/icons/Gallery.svg' },
  { value: 'contact us', label: 'Contact Us', icon: '/icons/ContactUs.svg' },
]

export default function DesktopSidebar({ active }: { active: string }) {
  const router = useRouter()
  const go = (v: string) => {
    if (v === 'gallery') router.push('/home/gallery')
    else if (v === 'contact us') router.push('/home/contact')
    else router.push(`/home/kategori/${v}`)
  }
  return (
    <aside data-device="desktop" className="w-60 shrink-0">
      <div className="sticky top-6 rounded-2xl border-2 border-[#E8E0C8] bg-white p-3 space-y-1 shadow-[0_10px_28px_rgba(0,0,0,0.12)]">
        <div className="px-3 pt-2 pb-3 text-xs font-bold uppercase tracking-wider text-[#9A8B7A]">Jelajahi</div>
        {ITEMS.map((it) => {
          const isActive = active.toLowerCase() === it.value.toLowerCase()
          return (
            <button
              key={it.value}
              onClick={() => go(it.value)}
              className={[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all',
                isActive ? 'bg-[#1E3124] text-white shadow-[0_4px_12px_rgba(30,49,36,0.3)]' : 'text-[#1E3124] hover:bg-[#1E3124]/10',
              ].join(' ')}
            >
              <img
                src={it.icon}
                alt={it.label}
                className={['w-5 h-5 object-contain shrink-0', isActive && it.icon.endsWith('.png') ? 'brightness-0 invert' : ''].join(' ')}
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
              <span>{it.label}</span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
