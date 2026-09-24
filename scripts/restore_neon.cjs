// Restore DARURAT dari file backup JSON (dibuat oleh backup_neon.cjs).
// Pemakaian (manual saja, JANGAN via scheduler):
//   node scripts/restore_neon.cjs backups/klapamanis_YYYYMMDD_HHMMSS.json --target=local --yes
//   node scripts/restore_neon.cjs backups/klapamanis_YYYYMMDD_HHMMSS.json --target=neon --yes
// --target=local : database lokal  (postgres/postgres@localhost:5432/promo_v2)
// --target=neon  : database Neon production (dari neon_url.txt) — HATI-HATI, menimpa data live!
const fs = require('fs');
const path = require('path');
const os = require('os');
const postgres = require('postgres');

const LOCAL_URL = 'postgresql://postgres:postgres@localhost:5432/promo_v2';
const URL_FILE = path.join(os.homedir(), '.klapamanis', 'neon_url.txt');

const ident = (n) => `"${String(n).replace(/"/g, '""')}"`;

async function main() {
  const [, , file, ...flags] = process.argv;
  const target = (flags.find((f) => f.startsWith('--target=')) || '').split('=')[1];
  const yes = flags.includes('--yes');
  if (!file || !['local', 'neon'].includes(target) || !yes) {
    console.log('Pemakaian: node restore_neon.cjs <backup.json> --target=local|neon --yes');
    process.exit(2);
  }
  const url = target === 'local' ? LOCAL_URL : fs.readFileSync(URL_FILE, 'utf8').trim();
  console.log('Target: ' + target + ' (host ' + new URL(url.replace('postgresql://', 'http://')).hostname + ')');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const sql = postgres(url, { max: 1, prepare: false });
  try {
    const tables = Object.keys(data.tables);
    await sql.unsafe(`TRUNCATE ${tables.map(ident).join(', ')} CASCADE`);
    let pending = new Set(tables);
    let progress = true;
    while (pending.size && progress) {
      progress = false;
      for (const t of [...pending]) {
        const rows = data.tables[t];
        if (!rows.length) { pending.delete(t); progress = true; continue; }
        const cols = Object.keys(rows[0]);
        try {
          await sql.unsafe(
            `INSERT INTO ${ident(t)} (${cols.map(ident).join(', ')}) VALUES ` +
            rows.map((_, i) => `(${cols.map((_, j) => `$${i * cols.length + j + 1}`).join(', ')})`).join(', '),
            rows.flatMap((r) => cols.map((c) => {
              const v = r[c];
              return v instanceof Date ? v.toISOString() : (typeof v === 'object' && v !== null ? JSON.stringify(v) : v);
            }))
          );
          pending.delete(t);
          progress = true;
        } catch (e) {
          if (!(e && /foreign key|violates|23503/.test(String((e && e.message) || e) + ' ' + (e && e.code)))) throw e;
        }
      }
    }
    if (pending.size) throw new Error('Gagal insert (kemungkinan FK): ' + [...pending].join(', '));
    for (const [seq, s] of Object.entries(data.sequences || {})) {
      await sql.unsafe(`SELECT setval(${`'${String(seq).replace(/'/g, "''")}'`}, ${Number(s.last_value)}, ${s.is_called})`);
    }
    // verifikasi jumlah baris
    for (const t of tables) {
      const [{ c }] = await sql.unsafe(`SELECT COUNT(*)::int AS c FROM ${ident(t)}`);
      const want = data.tables[t].length;
      console.log(`  ${t}: backup=${want} restored=${c} ${Number(c) === want ? 'OK' : 'BEDA!'}`);
      if (Number(c) !== want) throw new Error('Jumlah baris beda di ' + t);
    }
    console.log('RESTORE SELESAI OK');
  } finally {
    await sql.end();
  }
}

main().catch((e) => { console.error('RESTORE GAGAL: ' + (e && e.message)); process.exit(1); });
