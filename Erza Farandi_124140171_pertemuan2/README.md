# Personal Dashboard Mahasiswa

Nama: Erza Farandi NIM: 124140171 Praktikum Pengembangan Aplikasi Web — Pertemuan 2

## Deskripsi aplikasi

Personal Dashboard mahasiswa dalam satu halaman: mengatur tugas & deadline, jadwal kuliah, dan catatan cepat, plus widget jam, kutipan harian, dan cuaca. Dibuat pakai HTML, CSS, dan JavaScript (tanpa framework), data tersimpan di localStorage jadi tidak hilang saat refresh.

Fitur:
- Tugas & deadline: tambah, edit, hapus, centang selesai, prioritas, badge H-1/TERLAMBAT, pencarian, filter, dan pengurutan
- Jadwal kuliah: tambah, edit, hapus, dikelompokkan per hari, penanda "Hari Ini"
- Catatan cepat: tambah, edit, hapus, dan sematkan (pin) catatan
- Kartu statistik: total tugas, selesai, mendesak, kelas hari ini, plus progress bar
- Widget jam real-time, kutipan harian (DummyJSON), dan cuaca (Open-Meteo)
- Mode gelap/terang dan tombol reset data, semuanya tersimpan di localStorage

## Fitur ES6+ yang dipakai

- `let` dan `const`
- Arrow function
- Template literal untuk render daftar
- Class: `TaskItem`, `ScheduleItem`, `NoteItem`, `DashboardApp`
- Destructuring objek/array
- Spread operator untuk update state
- `async/await` + `Promise.allSettled` saat ambil data API
- `localStorage` dengan `JSON.stringify`/`JSON.parse`

## Cara menjalankan

1. Buka folder ini di VS Code
2. Jalankan lewat Live Server, atau buka `index.html` langsung di browser (tidak perlu install dan tidak perlu API key)

## Struktur folder

```
index.html   # struktur halaman
style.css    # tampilan (tema terang/gelap)
app.js       # seluruh logika aplikasi
screenshot.png
```

## Tampilan aplikasi

![Personal Dashboard](screenshot.png)
