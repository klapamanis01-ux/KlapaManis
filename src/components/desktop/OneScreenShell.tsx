import DesktopTopBar, { type DesktopTab } from './DesktopTopBar'
import SocialRail from './SocialRail'
import { bgCss, type UiLabels } from '@/lib/siteInfo'

export type SearchItem = { id: number; nama: string; harga: number; diskon: number | null; kategori: string; photoUrl: string | null; desktopPhotoUrl?: string | null }
export type RailContact = { href: string; label: string; kind: 'wa' | 'ig' | 'tt' }

// Kerangka 1-layar desktop: panel kiri gelap + panel kanan krem, topbar & rel sosmed melayang.
// leftBg/rightBg menerima warna solid atau gradasi CSS dari setting.
export default function OneScreenShell({ title, active, searchItems, contacts, leftBg, rightBg, ui, children }: {
  title: string
  active: DesktopTab
  searchItems: SearchItem[]
  contacts: RailContact[]
  leftBg: string
  rightBg: string
  ui: UiLabels
  children: React.ReactNode
}) {
  return (
    <div data-device="desktop" className="h-[100dvh] w-full overflow-hidden relative flex" style={{ background: bgCss(leftBg, '#0D1410') }}>
      {/* panel kiri gelap */}
      <div className="w-[55%] h-full" style={{ background: bgCss(leftBg, '#0D1410') }} />
      {/* panel kanan krem */}
      <div className="w-[45%] h-full" style={{ background: bgCss(rightBg, '#FAF7F2') }} />
      {/* topbar melayang */}
      <DesktopTopBar title={title} active={active} searchItems={searchItems} ui={ui} />
      {/* rel sosmed */}
      <SocialRail contacts={contacts} />
      {/* isi per halaman */}
      <div className="absolute inset-0 pt-[76px]">
        {children}
      </div>
    </div>
  )
}
