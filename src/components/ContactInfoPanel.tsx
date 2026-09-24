import type { UiLabels } from '@/lib/siteInfo'

// Khusus desktop: panel info (alamat, jam buka, peta) di halaman contact.
export default function ContactInfoPanel({ address, hours, mapsUrl, ui }: { address: string; hours: string; mapsUrl: string; ui: UiLabels }) {
  const src = mapsUrl || (address ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed` : '')
  return (
    <div data-device="desktop" className="rounded-2xl border-2 border-[#E8E0C8] bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.10)] space-y-4">
      <h3 className="font-serif text-xl font-bold text-[#1E3124]">{ui.visitInfo}</h3>
      {address && (
        <div className="flex gap-3">
          <span className="text-lg">📍</span>
          <p className="text-sm text-[#1E3124]/80">{address}</p>
        </div>
      )}
      {hours && (
        <div className="flex gap-3">
          <span className="text-lg">🕒</span>
          <p className="text-sm text-[#1E3124]/80">{ui.hoursPrefix} {hours}</p>
        </div>
      )}
      {src ? (
        <iframe
          title="Peta lokasi"
          src={src}
          className="w-full h-64 rounded-xl border border-[#EEE8D8]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <p className="text-xs text-[#9A8B7A]">Alamat & peta bisa diisi di Setting → Umum (contact_us.address / contact_us.maps_url).</p>
      )}
    </div>
  )
}
