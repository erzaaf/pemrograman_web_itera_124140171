# ErzaBoard — Personal Dashboard Mahasiswa

**Nama:** Erza Farandi | **NIM:** 124140171 | **Praktikum PAW — Pertemuan 2**

Aplikasi personal dashboard untuk kebutuhan spesifik mahasiswa ITERA: mengatur **tugas & deadline**, **jadwal kuliah mingguan**, dan **catatan cepat**, dilengkapi widget **jam real-time**, **cuaca ITERA**, dan **kutipan motivasi harian**.

## Cara Menjalankan

1. Buka folder ini di File Explorer / VS Code.
2. Klik dua kali `index.html` (atau jalankan via Live Server / `npx serve .`).
3. Tidak perlu build, tidak perlu API key — langsung jalan di browser.

## Fungsi & Fitur

| Modul | Fungsi |
|---|---|
| 👋 Header + Jam | Sapaan otomatis (pagi/siang/sore/malam), jam live tiap detik, tanggal Indonesia, dark/light mode tersimpan |
| 💬 Kutipan Harian | Fetch acak dari `dummyjson.com/quotes/random`, tombol Acak, fallback offline |
| 🌤️ Cuaca ITERA | Fetch real-time dari Open-Meteo (`latitude=-5.36, longitude=105.31`), suhu + kode cuaca + angin, tombol Refresh |
| ✅ Tugas | Tambah, edit, hapus, centang selesai, badge H-/terlambat, prioritas, cari, filter (semua/belum/selesai/terlambat), urut (deadline/prioritas/terbaru), statistik + progress bar |
| 📅 Jadwal Kuliah | Tambah, edit, hapus (hari, matkul, jam, ruangan, dosen), dikelompokkan per hari, badge "HARI INI", counter kelas hari ini |
| 📝 Catatan Cepat | Tambah, edit, hapus, pin 📌 ke atas, timestamp otomatis |
| 💾 Penyimpanan | Semua data (tugas, jadwal, catatan, tema) tersimpan di `localStorage`, tetap ada setelah refresh; tombol Reset semua data |

## Screenshot

> Ganti file ini dengan screenshot asli setelah aplikasi dibuka di browser.

![Screenshot ErzaBoard](screenshot.png)
*Jika `screenshot.png` belum ada: buka `index.html`, tekan `Win+Shift+S`, simpan sebagai `screenshot.png` di folder ini.*

## Daftar Fitur ES6+ (file `app.js`)

| Fitur | Lokasi | Keterangan |
|---|---|---|
| `let` & `const` tepat | `app.js:9-17` (`const STORAGE_KEYS/DAY_ORDER/PRIORITY_WEIGHT`), `app.js:280` (`let list`), `app.js:179` (`const [q,a]`), seluruh fungsi pakai `const` untuk nilai tetap & `let` untuk yang di-reassign | Referensi array state tidak diubah, isinya diganti immutable |
| Arrow functions (≥3, aktual 20+) | `app.js:19` (`$`), `app.js:20-21` (`esc`), `app.js:22` (`uid`), `app.js:137-152` (event listener), `app.js:220,251,270-271,280-281` (map/filter) | Dipakai untuk helper, callback event, dan operasi array |
| Template literals | `app.js:195-201` (render cuaca), `app.js:300-317` (render tugas), `app.js:360-377` (render jadwal), `app.js:411-423` (render catatan) | Semua rendering dinamis daftar memakai backtick + `${}` |
| Async/Await + Promises | `app.js` (`loadExternalData` + `Promise.allSettled`, `fetchQuote`, `fetchWeather`) | 2 API publik: DummyJSON, Open-Meteo |
| Classes | `app.js:45-66` (`class TaskItem` + getter `remaining/isOverdue/badge` + method `toggle`), `app.js:68-74` (`ScheduleItem`), `app.js:76-80` (`NoteItem`), `app.js:84-532` (`class DashboardApp`) | Sesuai panduan arsitektur |
| Destructuring | `app.js:170` (`{quote, author}`), `app.js:193` (`{current_weather: w}`), `app.js:220` (`{title, completed}` di param arrow), `app.js:281` (`{title, course}`), `app.js:411` (`{id,title,body,pinned,createdAt}`), `app.js:430` (`{action,id}`) | Destructuring objek, array, parameter fungsi, dan rename |
| Spread operator (immutable) | `app.js:228` (`[...tasks, ...samples]`), `app.js:252` (`{...t, ...}`), `app.js:256` (`[...tasks, item]`), `app.js:291,352,410` (`[...list].sort`), `app.js:333,336,389,392,432,481` | Update state selalu menghasilkan array/objek baru |
| `localStorage` | `app.js:104-113` (`load`/`save` + `JSON.parse/stringify`), `app.js:159,229,518,524-527` (flag seed, tema, reset) | Keys: `erzaboard_tasks_v1`, `erzaboard_schedules_v1`, `erzaboard_notes_v1`, `erzaboard_theme_v1` |

## API Publik yang Dipakai

1. **Cuaca Real-time (Open-Meteo)** — `https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true` → widget cuaca ITERA (`fetchWeather`, `app.js:187`).
2. **Kutipan Harian (DummyJSON)** — `https://dummyjson.com/quotes/random` → kutipan motivasi header (`fetchQuote`).

## Struktur File

```
Erza Farandi_124140171_pertemuan2/
├── index.html   # struktur UI (hero, tugas, jadwal, catatan)
├── style.css    # tema terang/gelap, kartu, grid responsif
├── app.js       # seluruh logika (OOP + async + storage)
└── README.md    # dokumentasi ini
```

## Kerapian Kode

- Satu tanggung jawab per method (`handleTaskSubmit`, `renderTasks`, `fetchWeather`, …).
- Escape HTML (`esc()`) untuk semua input pengguna agar aman dari XSS.
- Penamaan Indonesia + Inggris konsisten, komentar pembatas per modul.
