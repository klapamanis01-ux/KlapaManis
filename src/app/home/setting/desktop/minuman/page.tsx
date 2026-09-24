'use client'
import { DesktopSettingPage, Field, ImageField } from '../_form'

const KEYS = ['desktop.title1_minuman', 'desktop.title2_minuman', 'desktop.desc_minuman']

export default function DesktopMinumanSetting() {
  return (
    <DesktopSettingPage title="Desktop – Minuman" desc="Judul & deskripsi halaman minuman desktop" keys={KEYS}>
      {({ get, set }) => (<>
        <Field label="Judul baris 1 (gelap)" settingsKey="desktop.title1_minuman" placeholder="Minuman" get={get} set={set} />
        <Field label="Judul baris 2 (emas)" settingsKey="desktop.title2_minuman" placeholder="Segar Setiap Saat" get={get} set={set} />
        <Field label="Deskripsi" settingsKey="desktop.desc_minuman" placeholder="Segarkan harimu dengan pilihan minuman..." get={get} set={set} />
        <ImageField settingsKey="desktop.bg_minuman_left" label="Kiri — Background" hint="Warna, gradasi, atau upload gambar. Kosongkan = ikut default." get={get} set={set} />
        <ImageField settingsKey="desktop.bg_minuman_right" label="Kanan — Foto (kosongkan = foto menu otomatis)" hint="Timpa foto panel kanan dengan gambar pilihan." get={get} set={set} />
      </>)}
    </DesktopSettingPage>
  )
}
