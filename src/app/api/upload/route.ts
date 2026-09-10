export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/requireAuth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  const auth = await requireAuth()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'file wajib' }, { status: 400 })
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const ext = path.extname(file.name) || '.jpg'
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
  const mime = file.type || 'image/jpeg'

  // Try public/uploads (local dev)
  try {
    const dir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(dir, { recursive: true })
    await writeFile(path.join(dir, name), buffer)
    return NextResponse.json({ url: `/uploads/${name}` })
  } catch {}

  // Cloudinary (production)
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET
  if (cloudName && uploadPreset) {
    try {
      const formData = new FormData()
      formData.append('file', new Blob([buffer], { type: mime }), file.name)
      formData.append('upload_preset', uploadPreset)
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error(`Cloudinary ${res.status}`)
      const data = await res.json()
      return NextResponse.json({ url: data.secure_url })
    } catch (e: any) {
      return NextResponse.json({ error: `Cloudinary gagal: ${e.message}` }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Tidak ada storage yang tersedia' }, { status: 500 })
}
