import { getPromosWithItems } from '@/lib/promoRepo'

// Khusus desktop: section promo unggulan di home (data promo aktif + item menunya).
export default async function FeaturedPromo() {
  const promos = await getPromosWithItems().catch(() => [])
  if (promos.length === 0) return null
  return (
    <section data-device="desktop" className="max-w-6xl mx-auto px-6 pt-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-serif text-3xl font-semibold text-[#1E3124]">Promo Unggulan</h2>
          <p className="text-sm text-[#1E3124]/60 italic mt-1">Penawaran spesial yang sedang berjalan</p>
        </div>
      </div>
      <div className="mt-4 space-y-6">
        {promos.map((p) => (
          <div key={p.id} className="rounded-2xl border-2 border-[#E8E0C8] bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.10)]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold uppercase tracking-wider bg-[#1E3124] text-white rounded-full px-3 py-1">
                {p.tipeDiskon === 'persen' ? `Diskon ${Number(p.nilaiDiskon) || 0}%` : `Hemat Rp ${Number(p.nilaiDiskon || 0).toLocaleString('id-ID')}`}
              </span>
              <span className="font-serif text-xl font-bold text-[#1E3124]">{p.nama}</span>
            </div>
            {p.deskripsi && <p className="mt-1 text-sm text-[#6b5d4d]">{p.deskripsi}</p>}
            <div className="mt-3 grid grid-cols-2 xl:grid-cols-4 gap-3">
              {p.items.slice(0, 4).map((m: any) => (
                <div key={m.id} className="flex items-center gap-3 rounded-xl bg-[#FAF7F2] border border-[#EEE8D8] p-2">
                  {m.photoUrl ? (
                    <img src={m.photoUrl} alt={m.nama} className="w-14 h-14 rounded-lg object-cover shrink-0" loading="lazy" />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-stone-200 grid place-items-center text-[10px] text-stone-400 shrink-0">No img</div>
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[#1E3124] truncate">{m.nama}</div>
                    {m.promoHarga != null && Number(m.harga) !== 0 ? (
                      <div className="text-xs">
                        <span className="text-[#9A8B7A] line-through mr-1">Rp {Number(m.harga).toLocaleString('id-ID')}</span>
                        <span className="font-extrabold text-[#1E3124]">Rp {Number(m.promoHarga).toLocaleString('id-ID')}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
