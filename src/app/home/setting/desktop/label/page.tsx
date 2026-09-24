'use client'
import { DesktopSettingPage, Field } from '../_form'

const FIELDS: [string, string, string][] = [
  ['desktop.ui_view_menu', 'Tombol menu home', 'Lihat Makanan'],
  ['desktop.ui_video_btn', 'Tombol video home', 'Lihat Video'],
  ['desktop.ui_reservasi', 'Tombol reservasi', 'Reservasi'],
  ['desktop.ui_search_ph', 'Placeholder pencarian', 'Cari menu...'],
  ['desktop.ui_no_result', 'Teks hasil kosong', 'Tidak ada menu yang cocok.'],
  ['desktop.ui_prev', 'Tombol gallery mundur', 'Prev'],
  ['desktop.ui_next', 'Tombol gallery maju', 'Next'],
  ['desktop.ui_gallery_eyebrow', 'Eyebrow gallery (versi gelap)', 'GALLERY'],
  ['desktop.ui_visit_info', 'Judul panel info', 'Info Kunjungan'],
  ['desktop.ui_hours_prefix', 'Awalan jam buka', 'Jam buka:'],
]

const KEYS = FIELDS.map(([k]) => k)

export default function DesktopLabelSetting() {
  return (
    <DesktopSettingPage title="Desktop – Label UI" desc="Label tombol & teks kecil desktop (kosongkan = bawaan)" keys={KEYS}>
      {({ get, set }) => (<>
        {FIELDS.map(([k, label, ph]) => (
          <Field key={k} label={label} settingsKey={k} placeholder={ph} get={get} set={set} />
        ))}
      </>)}
    </DesktopSettingPage>
  )
}
