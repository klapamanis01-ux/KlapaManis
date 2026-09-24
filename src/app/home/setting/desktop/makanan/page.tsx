'use client'
import { DesktopSettingPage, Field, ImageField } from '../_form'

const KEYS = ['desktop.title1_makanan', 'desktop.title2_makanan', 'desktop.desc_makanan']

export default function DesktopMakananSetting() {
  return (
    <DesktopSettingPage title="Desktop – Makanan" desc="Judul & deskripsi halaman makanan desktop" keys={KEYS}>
      {({ get, set }) => (<>
        <Field label="Judul baris 1 (gelap)" settingsKey="desktop.title1_makanan" placeholder="Hidangan Nusantara" get={get} set={set} />
        <Field label="Judul baris 2 (emas)" settingsKey="desktop.title2_makanan" placeholder="untuk Setiap Momen" get={get} set={set} />
        <Field label="Deskripsi" settingsKey="desktop.desc_makanan" placeholder="Rasakan kelezatan hidangan Nusantara..." get={get} set={set} />
        <ImageField settingsKey="desktop.bg_makanan_left" label="Kiri — Background" hint="Warna, gradasi, atau upload gambar. Kosongkan = ikut default." get={get} set={set} textInput textPlaceholder="#0D1410 / linear-gradient(...) / URL" />
        <ImageField settingsKey="desktop.bg_makanan_right" label="Kanan — Foto (kosongkan = foto menu otomatis)" hint="Timpa foto panel kanan dengan gambar pilihan." get={get} set={set} textInput textPlaceholder="#0D1410 / linear-gradient(...) / URL" />
      </>)}
    </DesktopSettingPage>
  )
}
