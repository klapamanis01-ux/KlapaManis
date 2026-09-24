'use client'
import { useEffect, useState } from 'react'

export default function UmumPage(){
  const [form,setForm]=useState<Record<string,string>>({})
  const [saved,setSaved]=useState(false)
  const [uploading,setUploading]=useState(false)

  async function load(){ const r=await fetch('/api/settings'); const j=await r.json(); setForm(j.settings||{}) }
  useEffect(()=>{load()},[])

  async function save(e:React.FormEvent){
    e.preventDefault()
    const payload:Record<string,string>={
      'site.title': form['site.title']||'',
      'site.description': form['site.description']||'',
      'site.favicon_url': form['site.favicon_url']||'',
      'promo_landing.whatsapp': form['promo_landing.whatsapp']||'',
      'promo_landing.instagram': form['promo_landing.instagram']||'',
      'promo_landing.tiktok': form['promo_landing.tiktok']||'',
      'contact_us.title': form['contact_us.title']||'',
      'contact_us.subtitle': form['contact_us.subtitle']||'',
      'contact_us.whatsapp_display': form['contact_us.whatsapp_display']||'',
      'contact_us.instagram_display': form['contact_us.instagram_display']||'',
      'contact_us.tiktok_display': form['contact_us.tiktok_display']||'',
      'contact_us.address': form['contact_us.address']||'',
      'contact_us.hours': form['contact_us.hours']||'',
      'contact_us.maps_url': form['contact_us.maps_url']||'',
    }
    const r=await fetch('/api/settings',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
    if(r.ok){ setSaved(true); setTimeout(()=>setSaved(false),2000) }
  }

  async function upload(file:File){
    setUploading(true)
    const fd=new FormData(); fd.append('file',file)
    const r=await fetch('/api/upload',{method:'POST',body:fd})
    const j=await r.json()
    if(j.url) setForm(f=>({...f,'site.favicon_url':j.url}))
    setUploading(false)
  }

  const get=(k:string)=>form[k]||''
  const set=(k:string,v:string)=>setForm(f=>({...f,[k]:v}))

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="font-semibold">Umum — Judul, Logo & Kontak</h1>
      <p className="text-xs text-slate-500">Identitas situs, kontak, dan lokasi. Setting tampilan desktop ada di grup Desktop.</p>
      <form onSubmit={save} className="space-y-3">
        <div className="bg-white border rounded-xl p-4 space-y-3">
          <label className="block text-xs font-medium">Judul Tab Browser (site.title)
            <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="Contoh: Menu Book Kompro" value={get('site.title')} onChange={e=>set('site.title',e.target.value)} />
          </label>
          <label className="block text-xs font-medium">Deskripsi (site.description)
            <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="Deskripsi singkat untuk SEO" value={get('site.description')} onChange={e=>set('site.description',e.target.value)} />
          </label>
          <label className="block text-xs font-medium">Favicon / Logo Tab (site.favicon_url)
            <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="https://... atau /uploads/xxx.png" value={get('site.favicon_url')} onChange={e=>set('site.favicon_url',e.target.value)} />
          </label>
          <div className="flex items-center gap-3">
            <label className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg cursor-pointer">
              {uploading?'Uploading...':'Upload Logo'}
              <input type="file" accept="image/*,.ico" className="hidden" onChange={e=>{if(e.target.files?.[0])upload(e.target.files[0])}} />
            </label>
            {get('site.favicon_url') && <img src={get('site.favicon_url')} alt="favicon preview" className="w-8 h-8 object-contain border rounded bg-white p-1" />}
            {get('site.favicon_url') && <button type="button" onClick={()=>set('site.favicon_url','')} className="text-xs text-red-600 underline">Hapus</button>}
          </div>
          <p className="text-[11px] text-slate-400">Rekomendasi: PNG/ICO kotak 512x512. Setelah upload, URL terisi otomatis.</p>
        </div>

        <div className="bg-white border rounded-xl p-4 space-y-3">
          <h2 className="text-sm font-semibold text-slate-700">Contact Us — Tampilan Halaman</h2>
          <label className="block text-xs font-medium">Judul Halaman (contact_us.title)
            <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="Hubungi Kami" value={get('contact_us.title')} onChange={e=>set('contact_us.title',e.target.value)} />
          </label>
          <label className="block text-xs font-medium">Deskripsi / Subjudul (contact_us.subtitle)
            <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="Kami siap melayani pertanyaan dan reservasi Anda" value={get('contact_us.subtitle')} onChange={e=>set('contact_us.subtitle',e.target.value)} />
          </label>
          <div className="border-t pt-3 space-y-3">
            <p className="text-xs font-semibold text-slate-600">Link + Teks Tampil (yang muncul di halaman, bukan URL mentah)</p>
            <label className="block text-xs font-medium">Nomor WhatsApp (contoh: 62812xxxx)
              <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="6281234567890" value={get('promo_landing.whatsapp')} onChange={e=>set('promo_landing.whatsapp',e.target.value)} />
            </label>
            <label className="block text-xs font-medium">Teks tampil WhatsApp (contact_us.whatsapp_display)
              <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="+62 857 2441 1160" value={get('contact_us.whatsapp_display')} onChange={e=>set('contact_us.whatsapp_display',e.target.value)} />
            </label>
            <label className="block text-xs font-medium">Link Instagram (contoh: https://instagram.com/klapamanis)
              <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="https://instagram.com/klapamanis" value={get('promo_landing.instagram')} onChange={e=>set('promo_landing.instagram',e.target.value)} />
            </label>
            <label className="block text-xs font-medium">Teks tampil Instagram (contact_us.instagram_display)
              <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="@klapamanis.cirebon" value={get('contact_us.instagram_display')} onChange={e=>set('contact_us.instagram_display',e.target.value)} />
            </label>
            <label className="block text-xs font-medium">Link TikTok (contoh: https://tiktok.com/@klapamanis)
              <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="https://tiktok.com/@klapamanis" value={get('contact_us.tiktok_display')} onChange={e=>set('contact_us.tiktok_display',e.target.value)} />
            </label>
            <label className="block text-xs font-medium">Teks tampil TikTok (contact_us.tiktok_display)
              <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="@klapamanis" value={get('contact_us.tiktok_display')} onChange={e=>set('contact_us.tiktok_display',e.target.value)} />
            </label>
            <p className="text-[11px] text-slate-400">Kosongkan teks tampil untuk pakai otomatis dari link (akan potong parameter ?utm...).</p>
          </div>
          <div className="border-t pt-3 space-y-3">
            <p className="text-xs font-semibold text-slate-600">Info Lokasi</p>
            <label className="block text-xs font-medium">Alamat (contact_us.address)
              <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="Jl. ... , Cirebon" value={get('contact_us.address')} onChange={e=>set('contact_us.address',e.target.value)} />
            </label>
            <label className="block text-xs font-medium">Jam buka (contact_us.hours)
              <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="Senin–Minggu 10.00–22.00" value={get('contact_us.hours')} onChange={e=>set('contact_us.hours',e.target.value)} />
            </label>
            <label className="block text-xs font-medium">Link embed peta / Google Maps (contact_us.maps_url, opsional)
              <input className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" placeholder="https://www.google.com/maps?q=...&output=embed" value={get('contact_us.maps_url')} onChange={e=>set('contact_us.maps_url',e.target.value)} />
            </label>
            <p className="text-[11px] text-slate-400">Kosongkan link peta untuk otomatis dari alamat.</p>
          </div>
        </div>
        <button className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 text-sm">Simpan {saved && '✓'}</button>
      </form>
      <a href="/home/setting" className="text-xs underline">← Kembali ke Setting</a>
    </div>
  )
}
