'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MenuSearchOverlay from './MenuSearchOverlay'
import type { SearchItem } from './OneScreenShell'
import type { UiLabels } from '@/lib/siteInfo'

export type DesktopTab = 'home' | 'makanan' | 'minuman' | 'paket' | 'gallery' | 'contact'

export const TABS: { value: DesktopTab; label: string; href: string }[] = [
  { value: 'home', label: 'Home', href: '/home' },
  { value: 'makanan', label: 'Makanan', href: '/home/kategori/makanan' },
  { value: 'minuman', label: 'Minuman', href: '/home/kategori/minuman' },
  { value: 'paket', label: 'Paket', href: '/home/kategori/paket' },
  { value: 'gallery', label: 'Gallery', href: '/home/gallery' },
  { value: 'contact', label: 'Contact', href: '/home/contact' },
]

export default function DesktopTopBar({ title, active, searchItems, ui }: { title: string; active: DesktopTab; searchItems: SearchItem[]; ui: UiLabels }) {
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  return (
    <>
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between pl-20 pr-8 py-5">
        <div className="flex items-center gap-10">
          <button onClick={() => router.push('/home')} className="font-serif text-xl font-bold" style={{ color: '#E8B44A' }}>
            {title || 'Klapa Manis'}
          </button>
          <nav className="flex items-center gap-7">
            {TABS.map((t) => (
              <button
                key={t.value}
                onClick={() => router.push(t.href)}
                className="text-sm font-bold tracking-wide transition-colors"
                style={active === t.value
                  ? { color: '#FFFFFF', borderBottom: '2px solid #FFFFFF', paddingBottom: 2 }
                  : { color: '#E8B44A' }}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
        <button
          onClick={() => setSearchOpen(true)}
          aria-label="Cari menu"
          className="w-10 h-10 grid place-items-center rounded-full text-[#0D1410] hover:bg-black/5 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </button>
      </header>
      {searchOpen && <MenuSearchOverlay items={searchItems} onClose={() => setSearchOpen(false)} ui={ui} />}
    </>
  )
}
