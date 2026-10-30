# Aplikasi Manajemen Buku — Book of Mediatok

Nama: Erza Farandi NIM: 124140171 Praktikum Pengembangan Aplikasi Web — Pertemuan 3 (React)

## Deskripsi aplikasi

Tugas praktikum Pertemuan 3: membuat aplikasi manajemen buku dengan React. Aplikasi ini bernama **Book of Mediatok**, dipakai untuk mencatat buku yang dimiliki, sedang dibaca, atau ingin dibeli. Dibuat pakai React (Vite), dengan React Router untuk halaman daftar, statistik, dan edit.

Fitur:
- Tambah, edit, dan hapus buku (judul, penulis, status)
- Filter buku berdasarkan status
- Cari buku berdasarkan judul atau nama penulis
- Validasi form, kolom kosong ditandai merah dengan pesan error
- Halaman statistik jumlah buku per status
- Data tersimpan di localStorage jadi tidak hilang saat refresh

## Cara menjalankan

1. Buka folder ini di VS Code
2. Buka terminal, lalu jalankan:

```
npm install
npm run dev
```

3. Buka http://localhost:5173 di browser

## Struktur folder

```
src/
├── components/   # Navbar, BookForm, BookFilter, BookList, BookCard
├── context/      # BookContext (Context API)
├── hooks/        # useLocalStorage, useBookStats
├── pages/        # Home, Stats, Edit
├── test/         # unit test (Vitest + React Testing Library)
├── App.jsx       # route halaman
└── main.jsx
screenshots/      # tangkapan layar
```

## Tampilan aplikasi

Halaman daftar buku (form tambah di atas, daftar di bawah):

![Halaman daftar buku](screenshots/home.png)

Validasi form saat kolom wajib kosong:

![Validasi form](screenshots/error-validasi.png)

Halaman statistik:

![Halaman statistik](screenshots/stats.png)

## Testing

Jalankan:

```
npm test
```

Hasil: 5 file test, 9 test lolos semua.

![Hasil npm test](screenshots/test.png)
