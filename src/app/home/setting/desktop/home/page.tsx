'use client'
import { DesktopSettingPage, Field, ImageField } from '../_form'

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

export default function DesktopHomeSetting() {
  return (
    <DesktopSettingPage title="Desktop – Home" desc="Konten sambutan + foto halaman depan desktop" keys={KEYS}>
      {({ get, set }) => (<>
        <Field label="Sub-judul brand" settingsKey="desktop.home_brand_sub" placeholder="RUMAH MAKAN" get={get} set={set} />
        <Field label="Tagline emas" settingsKey="desktop.home_tagline" placeholder="Rasa Nusantara, Hangatnya Kebersamaan." get={get} set={set} />
        <Field label="Teks samping avatar" settingsKey="desktop.home_note" placeholder="Pilihan keluarga untuk setiap momen spesial" get={get} set={set} />
        <Field label="Tulisan tangan" settingsKey="desktop.home_signature" placeholder="Lebih dari Sekadar Makan" get={get} set={set} />
        <Field label="URL video (kosongkan = tombol disembunyikan)" settingsKey="desktop.home_video_url" placeholder="https://...mp4" get={get} set={set} />
        <ImageField settingsKey="desktop.home_image" label="Kanan — Foto makanan" hint="Foto makanan di panel diagonal kanan. Kosongkan = pakai foto gallery/hero." get={get} set={set} textInput textPlaceholder="#0D1410 / linear-gradient(...) / URL" />
        <ImageField settingsKey="desktop.logo_url" label="Logo header (kosongkan = ikut favicon)" hint="Logo bulat di kiri tulisan Klapa Manis, semua halaman desktop." get={get} set={set} textInput textPlaceholder="#0D1410 / linear-gradient(...) / URL" />
        <ImageField settingsKey="desktop.bg_home_left" label="Kiri — Background (warna/gradasi/gambar)" hint="Background panel kiri home. Isi warna (#FAF6EE), gradasi, atau upload gambar. Kosongkan = ikut default." get={get} set={set} textInput textPlaceholder="#0D1410 / linear-gradient(...) / URL" />
      </>)}
    </DesktopSettingPage>
  )
}
