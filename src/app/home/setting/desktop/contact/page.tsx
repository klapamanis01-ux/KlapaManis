'use client'
import { DesktopSettingPage, Field, ImageField } from '../_form'

const KEYS = ['desktop.eyebrow_contact', 'desktop.title1_contact', 'desktop.title2_contact', 'desktop.bg_contact_left']

export default function DesktopContactSetting() {
  return (
    <DesktopSettingPage title="Desktop – Contact" desc="Judul halaman contact desktop (tombol & alamat ikut Setting → Umum)" keys={KEYS}>
      {({ get, set }) => (<>
        <Field label="Eyebrow" settingsKey="desktop.eyebrow_contact" placeholder="HUBUNGI KAMI" get={get} set={set} />
        <Field label="Judul baris 1 (gelap)" settingsKey="desktop.title1_contact" placeholder="Mari Terhubung" get={get} set={set} />
        <Field label="Judul baris 2 (emas)" settingsKey="desktop.title2_contact" placeholder="dengan Kami" get={get} set={set} />
        <ImageField settingsKey="desktop.bg_contact_left" label="Kiri — Background" hint="Warna, gradasi, atau upload gambar. Kosongkan = ikut default. Kanan = peta otomatis." get={get} set={set} />
      </>)}
    </DesktopSettingPage>
  )
}
