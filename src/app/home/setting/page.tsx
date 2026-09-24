'use client'
import Link from 'next/link'

const konten = [
  { href: '/home/setting/umum', title: 'Umum', desc: 'Judul, logo, kontak & lokasi' },
  { href: '/home/setting/menu', title: 'Menu', desc: 'Kelola menu + harga tetap + foto' },
  { href: '/home/setting/gallery', title: 'Gallery', desc: 'Slider foto + arah (acak/atas/bawah/kiri/kanan)' },
  { href: '/home/setting/banner', title: 'Banner', desc: 'Slide header landing' },
  { href: '/home/setting/promo', title: 'Promo', desc: 'Kampanye diskon' },
  { href: '/home/setting/tampilan', title: 'Tampilan', desc: 'Hero & warna (mobile)' },
]

const desktop = [
  { href: '/home/setting/desktop/home', title: 'Desktop – Home', desc: 'Sambutan halaman depan' },
  { href: '/home/setting/desktop/makanan', title: 'Desktop – Makanan', desc: 'Judul & deskripsi' },
  { href: '/home/setting/desktop/minuman', title: 'Desktop – Minuman', desc: 'Judul & deskripsi' },
  { href: '/home/setting/desktop/paket', title: 'Desktop – Paket', desc: 'Judul & deskripsi' },
  { href: '/home/setting/desktop/gallery', title: 'Desktop – Gallery', desc: 'Judul & deskripsi' },
  { href: '/home/setting/desktop/contact', title: 'Desktop – Contact', desc: 'Judul halaman' },
  { href: '/home/setting/desktop/background', title: 'Desktop – Background', desc: 'Warna, gradasi & gambar' },
  { href: '/home/setting/desktop/label', title: 'Desktop – Label UI', desc: 'Teks tombol & label' },
]

function Group({ title, items }: { title: string; items: { href: string; title: string; desc: string }[] }) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-bold text-slate-600">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map(c => (
          <Link key={c.href} href={c.href} className="bg-white border rounded-xl p-4 hover:border-teal-600 block">
            <div className="font-medium">{c.title}</div>
            <div className="text-xs text-slate-500">{c.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function SettingIndex() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Setting Promo & Media</h1>
          <p className="text-xs text-slate-500">Kelola dari /home/setting (login required)</p>
        </div>
        <Link href="/home" className="text-xs underline">← Lihat Landing</Link>
      </div>
      <Group title="Konten" items={konten} />
      <Group title="Desktop" items={desktop} />
      <form action="/api/auth/logout" method="post">
        <button className="text-xs text-red-600 underline">Logout</button>
      </form>
    </div>
  )
}
