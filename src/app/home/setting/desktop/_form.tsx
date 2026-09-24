'use client'
import { useEffect, useState } from 'react'

// Form bersama untuk sub-halaman Setting → Desktop-*.
// Tiap halaman hanya simpan key miliknya (API upsert per key, partial ok).
export function useSettingsMap() {
  const [form, setForm] = useState<Record<string, string>>({})
  useEffect(() => {
    fetch('/api/settings').then((r) => r.json()).then((j) => setForm(j.settings || {})).catch(() => {})
  }, [])
  const get = (k: string) => form[k] || ''
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))
  return { get, set }
}

export function Field({ label, settingsKey, placeholder, mono, get, set }: {
  label: string
  settingsKey: string
  placeholder?: string
  mono?: boolean
  get: (k: string) => string
  set: (k: string, v: string) => void
}) {
  return (
    <label className="block text-xs font-medium">{label} ({settingsKey})
      <input
        className={`mt-1 w-full border rounded-lg px-3 py-2 text-sm bg-white${mono ? ' font-mono' : ''}`}
        placeholder={placeholder}
        value={get(settingsKey)}
        onChange={(e) => set(settingsKey, e.target.value)}
      />
    </label>
  )
}

export function ImageField({ settingsKey, label, hint, get, set }: {
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

export function DesktopSettingPage({ title, desc, keys, children }: {
  title: string
  desc: string
  keys: string[]
  children: (api: { get: (k: string) => string; set: (k: string, v: string) => void }) => React.ReactNode
}) {
  const { get, set } = useSettingsMap()
  const [saved, setSaved] = useState(false)
  async function save(e: React.FormEvent) {
    e.preventDefault()
    const payload: Record<string, string> = {}
    for (const k of keys) payload[k] = get(k)
    const r = await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (r.ok) { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  }
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <div>
        <h1 className="font-semibold">{title}</h1>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
      <form onSubmit={save} className="space-y-3">
        <div className="bg-white border rounded-xl p-4 space-y-3">
          {children({ get, set })}
        </div>
        <button className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 text-sm">Simpan {saved && '✓'}</button>
      </form>
      <a href="/home/setting" className="text-xs underline">← Kembali ke Setting</a>
    </div>
  )
}
