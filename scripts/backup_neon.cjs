// Backup otomatis database Neon (KlapaManis) ke PC ini.
// Output: backups/klapamanis_YYYYMMDD_HHMMSS.json (data semua tabel + sequences).
// URL koneksi dibaca dari %USERPROFILE%\.klapamanis\neon_url.txt (di luar repo).
// Dijalankan via Windows Task Scheduler. Tidak tergantung versi PostgreSQL server.
const fs = require('fs');
const path = require('path');
const os = require('os');
const postgres = require('postgres');

const URL_FILE = path.join(os.homedir(), '.klapamanis', 'neon_url.txt');
const BACKUP_DIR = path.join(__dirname, '..', 'backups');
const LOG_FILE = path.join(BACKUP_DIR, 'backup.log');
const KEEP = 8;

function log(msg) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${msg}\n`);
}

const ident = (n) => `"${String(n).replace(/"/g, '""')}"`;

async function main() {
  const url = fs.readFileSync(URL_FILE, 'utf8').trim();
  if (!url) throw new Error('URL koneksi kosong: ' + URL_FILE);
  const sql = postgres(url, { max: 1, prepare: false });
  try {
    const data = { meta: { at: new Date().toISOString(), source: 'neon' }, tables: {}, sequences: {} };
    const tables = await sql`SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY 1`;
    for (const { tablename } of tables) {
      data.tables[tablename] = await sql.unsafe(`SELECT * FROM ${ident(tablename)}`);
    }
    const seqs = await sql`SELECT sequencename FROM pg_sequences WHERE schemaname = 'public' ORDER BY 1`;
    for (const { sequencename } of seqs) {
      const [s] = await sql.unsafe(`SELECT last_value, is_called FROM ${ident(sequencename)}`);
      data.sequences[sequencename] = s;
    }
    const ts = new Date().toISOString().replace(/[-:]/g, '').replace('T', '_').slice(0, 15);
    const out = path.join(BACKUP_DIR, `klapamanis_${ts}.json`);
    fs.writeFileSync(out, JSON.stringify(data));
    const files = fs.readdirSync(BACKUP_DIR).filter((f) => /^klapamanis_.*\.json$/.test(f)).sort();
    while (files.length > KEEP) fs.unlinkSync(path.join(BACKUP_DIR, files.shift()));
    const rows = Object.values(data.tables).reduce((a, r) => a + r.length, 0);
    log(`OK: ${path.basename(out)} (${Object.keys(data.tables).length} tabel, ${rows} baris)`);
    console.log('OK: ' + out);
  } finally {
    await sql.end();
  }
}

main().catch((e) => { log('ERROR: ' + (e && e.message)); console.error('ERROR: ' + (e && e.message)); process.exit(1); });
