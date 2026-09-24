'use client'
import { DesktopSettingPage, Field, ImageField } from '../_form'

const KEYS = ['desktop.eyebrow_gallery', 'desktop.title1_gallery', 'desktop.title2_gallery', 'desktop.desc_gallery', 'desktop.bg_gallery_left', 'desktop.bg_gallery_right']

export default function DesktopGallerySetting() {
  return (
    <DesktopSettingPage title="Desktop – Gallery" desc="Judul & deskripsi halaman gallery desktop" keys={KEYS}>
      {({ get, set }) => (<>
        <Field label="Eyebrow" settingsKey="desktop.eyebrow_gallery" placeholder="GALERI KAMI" get={get} set={set} />
        <Field label="Judul baris 1 (gelap)" settingsKey="desktop.title1_gallery" placeholder="Momen Istimewa" get={get} set={set} />
        <Field label="Judul baris 2 (emas)" settingsKey="desktop.title2_gallery" placeholder="di Klapa Manis" get={get} set={set} />
        <Field label="Deskripsi" settingsKey="desktop.desc_gallery" placeholder="Suasana dan momen terbaik..." get={get} set={set} />
        <ImageField settingsKey="desktop.bg_gallery_left" label="Kiri — Background" hint="Warna, gradasi, atau upload gambar. Kosongkan = ikut default." get={get} set={set} />
        <ImageField settingsKey="desktop.bg_gallery_right" label="Kanan — Foto (kosongkan = foto gallery otomatis)" hint="Timpa foto panel kanan dengan gambar pilihan." get={get} set={set} />
      </>)}
    </DesktopSettingPage>
  )
}
