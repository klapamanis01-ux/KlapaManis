'use client'
import { useState } from 'react'
import { DesktopSettingPage, Field } from '../_form'

const KEYS = [
  'desktop.home_brand_sub',
  'desktop.home_tagline',
  'desktop.home_note',
  'desktop.home_signature',
  'desktop.home_video_url',
  'desktop.home_image',
  'desktop.bg_home_left',
  'desktop.logo_url',
]

function ImageSetting({ settingsKey, label, hint, get, set }: {
  settingsKey: string
  label: string
  hint: string
  get: (k: string) => string
  set: (k: string, v: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  async function upload(file: File) {
    setUploading(true)
    const fd = new FormData(); fd.append('file', file)
    const r = await fetch('/api/upload', { method: 'POST', body: fd })
    const j = await r.json().catch(() => ({}))
    if (j.url) set(settingsKey, j.url)
    setUploading(false)
  }
  return (
    <div className="space-y-2">
      <span className="block text-xs font-medium">{label} ({settingsKey})</span>
      <div className="flex items-center gap-3">
        <label className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg cursor-pointer">
          {uploading ? 'Uploading...' : 'Upload Foto'}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) upload(e.target.files[0]) }} />
        </label>
        {get(settingsKey) && (
          <>
            <img src={get(settingsKey)} className="h-16 w-16 object-cover rounded-lg border" alt={label} />
            <button type="button" onClick={() => set(settingsKey, '')} className="text-xs text-red-600 underline">Hapus</button>
          </>
        )}
      </div>
      <p className="text-[11px] text-slate-400">{hint}</p>
    </div>
  )
}

export default function DesktopHomeSetting() {
  return (
    <DesktopSettingPage title="Desktop – Home" desc="Konten sambutan + foto halaman depan desktop" keys={KEYS}>
      {({ get, set }) => (<>
        <Field label="Sub-judul brand" settingsKey="desktop.home_brand_sub" placeholder="RUMAH MAKAN" get={get} set={set} />
        <Field label="Tagline emas" settingsKey="desktop.home_tagline" placeholder="Rasa Nusantara, Hangatnya Kebersamaan." get={get} set={set} />
        <Field label="Teks samping avatar" settingsKey="desktop.home_note" placeholder="Pilihan keluarga untuk setiap momen spesial" get={get} set={set} />
        <Field label="Tulisan tangan" settingsKey="desktop.home_signature" placeholder="Lebih dari Sekadar Makan" get={get} set={set} />
        <Field label="URL video (kosongkan = tombol disembunyikan)" settingsKey="desktop.home_video_url" placeholder="https://...mp4" get={get} set={set} />
        <ImageSetting settingsKey="desktop.home_image" label="Kanan — Foto makanan" hint="Foto makanan di panel diagonal kanan. Kosongkan = pakai foto gallery/hero." get={get} set={set} />
        <ImageSetting settingsKey="desktop.logo_url" label="Logo header (kosongkan = ikut favicon)" hint="Logo bulat di kiri tulisan Klapa Manis, semua halaman desktop." get={get} set={set} />
        <ImageSetting settingsKey="desktop.bg_home_left" label="Kiri — Background (warna/gradasi/gambar)" hint="Background panel kiri home. Isi warna (#FAF6EE), gradasi, atau upload gambar. Kosongkan = ikut default." get={get} set={set} />
      </>)}
    </DesktopSettingPage>
  )
}
