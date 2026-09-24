-- Migrasi: foto khusus desktop per menu.
-- Jalankan SEKALI di database production (Neon SQL Editor) sebelum deploy kode ini.
-- Aman diulang (IF NOT EXISTS).
ALTER TABLE menu ADD COLUMN IF NOT EXISTS desktop_photo_url TEXT;
