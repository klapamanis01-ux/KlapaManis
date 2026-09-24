'use client'
import { useState } from 'react'
import { DesktopSettingPage, Field } from '../_form'

const KEYS = ['desktop.bg_left', 'desktop.bg_right', 'desktop.bg_light']

const PRESETS = [
  { n: 'Klapa (default)', l: '', r: '', light: '' },
  { n: 'Hitam + Putih', l: '#111111', r: '#FFFFFF', light: '#FFFFFF' },
  { n: 'Senja', l: 'linear-gradient(160deg, #0D1410 0%, #3A2A18 100%)', r: 'linear-gradient(160deg, #FAF7F2 0%, #EBD3A8 100%)', light: 'linear-gradient(160deg, #FAF7F2 0%, #EBD3A8 100%)' },
  { n: 'Hutan', l: 'linear-gradient(160deg, #070C0A 0%, #1E3124 100%)', r: 'linear-gradient(160deg, #FFFFFF 0%, #DDE8D5 100%)', light: 'linear-gradient(160deg, #FFFFFF 0%, #DDE8D5 100%)' },
]

export default function DesktopBackgroundSetting() {
  const [uploading, setUploading] = useState(false)
  async function upload(file: File, key: string, set: (k: string, v: string) => void) {
    setUploading(true)
    const fd = new FormData(); fd.append('file', file)
    const r = await fetch('/api/upload', { method: 'POST', body: fd })
    const j = await r.json().catch(() => ({}))
    if (j.url) set(key, j.url)
    setUploading(false)
  }
  return (
    <DesktopSettingPage title="Desktop – Background" desc="Warna solid, gradasi, atau gambar untuk background desktop" keys={KEYS}>
      {({ get, set }) => (<>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.n}
              type="button"
              onClick={() => { set('desktop.bg_left', p.l); set('desktop.bg_right', p.r); set('desktop.bg_light', p.light) }}
              className="text-xs border rounded-lg px-3 py-1.5 bg-slate-50 hover:bg-slate-100"
            >
              {p.n}
            </button>
          ))}
        </div>
        <Field label="Kiri / gelap" settingsKey="desktop.bg_left" placeholder="#0D1410" mono get={get} set={set} />
        <Field label="Kanan / terang (kosong = ikut warna bg landing)" settingsKey="desktop.bg_right" placeholder="#FAF7F2" mono get={get} set={set} />
        <Field label="Panel terang home & kategori" settingsKey="desktop.bg_light" placeholder="#FAF6EE" mono get={get} set={set} />
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-500">Upload gambar background:</span>
          {['desktop.bg_left', 'desktop.bg_right', 'desktop.bg_light'].map((k) => (
            <label key={k} className="text-[11px] bg-slate-900 text-white px-2.5 py-1 rounded-lg cursor-pointer">
              {uploading ? 'Uploading...' : k.replace('desktop.bg_', '')}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) upload(e.target.files[0], k, set) }} />
            </label>
          ))}
        </div>
        {(get('desktop.bg_left')?.startsWith('http') || get('desktop.bg_left')?.startsWith('/')) && (
          <img src={get('desktop.bg_left')} className="h-16 w-28 object-cover rounded-lg border" alt="bg kiri" />
        )}
        <p className="text-[11px] text-slate-400">Isi warna solid (#0D1410), gradasi (linear-gradient(...)), atau URL gambar (ketik / upload). Kosongkan untuk default.</p>
      </>)}
    </DesktopSettingPage>
  )
}
