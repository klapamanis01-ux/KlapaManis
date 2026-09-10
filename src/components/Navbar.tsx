'use client'
import { useRouter } from 'next/navigation'

const ITEMS: [string, string][] = [
  ['Makanan', 'Makanan'],
  ['Minuman', 'Minuman'],
  ['Paket', 'Paket'],
  ['Gallery', 'Gallery'],
]

export default function Navbar({ active, bgColor }: { active: string, bgColor: string }) {
  const router = useRouter()

  return (
    <nav className="hidden md:flex items-center justify-between w-full max-w-6xl mx-auto px-6 py-3" style={{ backgroundColor: bgColor }}>
      <div className="flex items-center gap-2">
        <span className="font-serif text-lg font-bold text-[#1E3124]">Klapa Manis</span>
      </div>
      <div className="flex items-center gap-1">
        {ITEMS.map(([value, label]) => {
          const isActive = active.toLowerCase() === value.toLowerCase()
          return (
            <button
              key={value}
              onClick={() => {
                if (value === 'Gallery') router.push('/home/gallery')
                else router.push(`/home/kategori/${value.toLowerCase()}`)
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-[#1E3124] text-white shadow-[0_4px_12px_rgba(30,49,36,0.3)]'
                  : 'text-[#1E3124] hover:bg-[#1E3124]/10'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
