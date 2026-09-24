// Footer khusus versi desktop: info lengkap perusahaan.
export type FooterInfo = {
  siteTitle: string
  description: string
  address: string
  hours: string
  whatsapp: string
  whatsappDisplay: string
  instagram: string
  instagramDisplay: string
  tiktok: string
  tiktokDisplay: string
}

export default function DesktopFooter({ info }: { info: FooterInfo }) {
  const year = new Date().getFullYear()
  const waHref = info.whatsapp ? `https://wa.me/${info.whatsapp.replace(/[^0-9]/g, '')}` : ''
  return (
    <footer data-device="desktop" className="mt-10 bg-[#1E3124] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="font-serif text-xl font-bold">{info.siteTitle || 'Klapa Manis'}</div>
          {info.description && <p className="mt-2 text-sm text-white/70 italic">{info.description}</p>}
        </div>
        <div>
          <div className="text-sm font-bold uppercase tracking-wider text-white/60">Kontak</div>
          <ul className="mt-3 space-y-2 text-sm">
            {waHref && (
              <li><a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp: {info.whatsappDisplay || info.whatsapp}</a></li>
            )}
            {info.instagram && (
              <li><a href={info.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram: {info.instagramDisplay || 'Instagram'}</a></li>
            )}
            {info.tiktok && (
              <li><a href={info.tiktok} target="_blank" rel="noopener noreferrer" className="hover:underline">TikTok: {info.tiktokDisplay || 'TikTok'}</a></li>
            )}
            {!waHref && !info.instagram && !info.tiktok && <li className="text-white/50">Belum diatur</li>}
          </ul>
        </div>
        <div>
          <div className="text-sm font-bold uppercase tracking-wider text-white/60">Info</div>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            {info.address && <li>{info.address}</li>}
            {info.hours && <li>Jam buka: {info.hours}</li>}
            {!info.address && !info.hours && <li className="text-white/50">Alamat & jam buka bisa diisi di Setting → Umum</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-white/50">© {year} {info.siteTitle || 'Klapa Manis'}. All rights reserved.</div>
      </div>
    </footer>
  )
}
