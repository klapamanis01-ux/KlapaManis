@echo off
REM KlapaManis - backup otomatis database Neon ke folder backups\
REM Dijalankan via Windows Task Scheduler (default: tiap Minggu 02:00).
REM Isi backup: file JSON per tanggal (data semua tabel + sequences).
set "NODE_EXE=C:\Program Files\nodejs\node.exe"
set "SCRIPT=D:\Company Profile\Menu Book Kompro\scripts\backup_neon.cjs"
"%NODE_EXE%" "%SCRIPT%"
exit /b %errorlevel%
