'use client'
import { DesktopSettingPage, Field, ImageField } from '../_form'

const KEYS = ['desktop.title1_paket', 'desktop.title2_paket', 'desktop.desc_paket']

export default function DesktopPaketSetting() {
  return (
    <DesktopSettingPage title="Desktop – Paket" desc="Judul & deskripsi halaman paket desktop" keys={KEYS}>
      {({ get, set }) => (<>
        <Field label="Judul baris 1 (gelap)" settingsKey="desktop.title1_paket" placeholder="Paket Hemat" get={get} set={set} />
        <Field label="Judul baris 2 (emas)" settingsKey="desktop.title2_paket" placeholder="untuk Kebersamaan" get={get} set={set} />
        <Field label="Deskripsi" settingsKey="desktop.desc_paket" placeholder="Pilihan hemat untuk keluarga..." get={get} set={set} />
        <ImageField settingsKey="desktop.bg_paket_left" label="Kiri — Background" hint="Warna, gradasi, atau upload gambar. Kosongkan = ikut default." get={get} set={set} textInput textPlaceholder="#0D1410 / linear-gradient(...) / URL" />
        <ImageField settingsKey="desktop.bg_paket_right" label="Kanan — Foto (kosongkan = foto menu otomatis)" hint="Timpa foto panel kanan dengan gambar pilihan." get={get} set={set} textInput textPlaceholder="#0D1410 / linear-gradient(...) / URL" />
      </>)}
    </DesktopSettingPage>
  )
}
