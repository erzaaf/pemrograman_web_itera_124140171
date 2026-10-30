# Book of Mediatok — Aplikasi Manajemen Buku Pribadi

**Tugas Praktikum Pengembangan Aplikasi Web (PAW) — Pertemuan 3**

| | |
|---|---|
| Nama | Erza Farandi |
| NIM | 124140171 |
| Mata kuliah | Praktikum Pengembangan Aplikasi Web |
| Pertemuan | 3 (React.js) |
| Repo | [github.com/erzaaf/pemrograman_web_itera_124140171](https://github.com/erzaaf/pemrograman_web_itera_124140171) |

Aplikasi React (Vite) untuk mencatat koleksi buku pribadi dalam tiga status: **dimiliki**, **sedang dibaca**, dan **ingin dibeli** — lengkap dengan filter, pencarian, statistik, dan penyimpanan persisten di browser.

## 1. Fitur Aplikasi

| Fitur | Keterangan |
|---|---|
| Tambah buku | Form **Tambah Buku** selalu tampil di bagian atas halaman `/` (tanpa tombol toggle) |
| Daftar buku | Menampilkan seluruh koleksi: judul, penulis, dan status |
| Edit buku | Halaman `/edit/:id` dengan form yang sudah terisi data buku terpilih |
| Hapus buku | Tombol hapus per buku langsung memperbarui daftar & statistik |
| Pencarian | Cari berdasarkan judul atau penulis (case-insensitive) |
| Filter status | Semua status / dimiliki / sedang dibaca / ingin dibeli |
| Statistik | Jumlah buku per status + progress bar persentase di halaman `/stats` |
| Penyimpanan | Semua data disimpan otomatis di `localStorage` (key `bookmania_books_v2`) |
| Validasi form | Judul & penulis wajib diisi; kolom yang salah diberi border merah + pesan `role="alert"` |
| Navigasi | React Router multi-halaman + navbar *sticky* yang tetap terlihat saat halaman di-scroll |
| Responsif | Grid form & daftar menyesuaikan layar kecil |

Kunjungan pertama diisi 4 buku contoh (Lord of the Mysteries, Shadow Slave, Omniscient Reader's Viewpoint, Regressor's Tale of Cultivation) yang bebas dihapus/diubah.

## 2. Teknologi yang Digunakan

- **React 18** — functional components + hooks (tanpa class component)
- **Vite 5** — dev server & build
- **React Router DOM 6** — routing multi-halaman (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `useNavigate`, `useParams`, `Navigate`)
- **Context API** — state global koleksi buku
- **prop-types** — validasi props komponen
- **Vitest + React Testing Library + jsdom** — unit test
- **oxlint** — linter

## 3. Instalasi & Cara Menjalankan

```bash
# masuk folder project
cd "Erza Farandi_124140171_pertemuan3"

# pasang dependensi
npm install

# jalankan server development → http://localhost:5173
npm run dev

# jalankan seluruh unit test
npm test

# lint kode
npm run lint

# build production
npm run build
```

## 4. Screenshot Antarmuka

Tangkapan layar aplikasi berjalan tersimpan di folder `screenshots/`:

| File | Isi |
|---|---|
| `screenshots/home.png` | Halaman daftar buku: form tambah di atas + daftar, filter, pencarian |
| `screenshots/error-validasi.png` | Feedback error saat kolom wajib kosong |
| `screenshots/stats.png` | Halaman statistik |
| `screenshots/navbar-sticky.png` | Navbar tetap terlihat saat halaman di-scroll |
| `screenshots/test.png` | **Laporan testing**: hasil `npm test` di terminal |

### Halaman Daftar Buku (form tambah + daftar)

![Home](screenshots/home.png)

### Error Validasi Form

![Error validasi](screenshots/error-validasi.png)

### Halaman Statistik

![Stats](screenshots/stats.png)

### Navbar Saat Scroll

![Navbar sticky](screenshots/navbar-sticky.png)

### Laporan Testing (`npm test`)

![Test](screenshots/test.png)

## 5. Struktur Project

```
Erza Farandi_124140171_pertemuan3/
├── public/
│   └── favicon.svg                    # aset statis
├── screenshots/                       # tangkapan layar laporan
├── src/
│   ├── components/                    # komponen reusable
│   │   ├── BookForm/     # form tambah/edit + validasi wajib isi
│   │   ├── BookList/     # menampung hasil filter / keadaan kosong
│   │   ├── BookCard/     # kartu 1 buku + aksi edit/hapus
│   │   ├── BookFilter/   # pencarian + filter status (controlled component)
│   │   └── Navbar/       # navigasi React Router (sticky)
│   ├── pages/
│   │   ├── Home/         # halaman daftar buku
│   │   ├── Stats/        # halaman statistik
│   │   └── Edit/         # halaman edit /edit/:id
│   ├── hooks/
│   │   ├── useLocalStorage.js   # custom hook #1: state persisten
│   │   └── useBookStats.js      # custom hook #2: hitung statistik (useMemo)
│   ├── context/
│   │   └── BookContext.jsx      # Context API: state global + CRUD buku
│   ├── test/                    # 9 unit test (5 file)
│   ├── main.jsx                 # entry point + BrowserRouter + BookProvider
│   ├── App.jsx                  # React Router multi-halaman
│   └── index.css                # style global (flat & solid)
├── .gitignore
├── .oxlintrc.json               # konfigurasi linter (oxlint)
├── index.html
├── package.json / package-lock.json
├── vite.config.js               # konfigurasi Vite + Vitest
└── README.md
```

## 6. Pemenuhan Ketentuan Tugas

| Ketentuan | Implementasi | Lokasi |
|---|---|---|
| Functional components + Hooks | 100% functional component, tidak ada class component | seluruh `src/` |
| `useState` | Nilai form & error validasi; filter status & kata kunci pencarian | `BookForm.jsx`, `Home.jsx`, `useLocalStorage.js` |
| `useEffect` | Menulis state ke `localStorage` setiap berubah | `hooks/useLocalStorage.js` |
| Context API | `BookProvider` membungkus aplikasi; komponen mengakses `books`, `addBook`, `updateBook`, `deleteBook` lewat `useBooks()` | `context/BookContext.jsx`, `main.jsx` |
| Custom hook #1 | `useLocalStorage` — state persisten (serialisasi JSON + try/catch) | `hooks/useLocalStorage.js` |
| Custom hook #2 | `useBookStats` — statistik jumlah & persentase per status (`useMemo`) | `hooks/useBookStats.js` |
| React Router | 3 halaman + fallback: `/`, `/stats`, `/edit/:id`, `*` → `/` | `App.jsx`, `main.jsx` |
| Komponen reusable (≥3) | 5 komponen: `BookForm` (dipakai Home & Edit), `BookList`, `BookCard`, `BookFilter`, `Navbar` | `src/components/` |
| PropTypes | Semua komponen punya `propTypes` (termasuk `children` di `BookProvider`) | seluruh komponen |
| Error handling form | `validate()`: judul & penulis wajib diisi; kelas `.invalid` + teks `role="alert"`; error hilang saat diperbaiki | `BookForm.jsx` |
| Penyimpanan | `localStorage` key `bookmania_books_v2` | `hooks/useLocalStorage.js` |
| Unit test | 9 test di 5 file, semuanya lolos | `src/test/` |
| Laporan testing | Screenshot terminal hasil `npm test` | `screenshots/test.png` |
| Dokumentasi | README ini + komentar JSDoc/inline di kode | `README.md`, `src/` |

## 7. Testing & Laporan

9 unit test dalam 5 file (`src/test/`), dijalankan dengan **Vitest + React Testing Library + jsdom**:

| File | Test |
|---|---|
| `BookForm.test.jsx` | (1) tampil 2 pesan error saat submit kosong; (2) input kosong berkelas `.invalid`; (3) submit valid memanggil `onSubmit` dengan data ter-trim |
| `BookList.test.jsx` | (4) jumlah kartu = jumlah buku + isi ter-render; (5) pesan kosong saat daftar kosong |
| `BookFilter.test.jsx` | (6) pencarian/filter meneruskan nilai ke handler parent |
| `Stats.test.jsx` | (7) angka statistik cocok dengan status buku |
| `App.test.jsx` | (8) halaman utama me-render daftar + filter; (9) navigasi ke `/stats` via Navbar |

Hasil eksekusi `npm test`:

```
 ✓ src/test/BookList.test.jsx    (2 tests)    72ms
 ✓ src/test/Stats.test.jsx       (1 test)     76ms
 ✓ src/test/BookFilter.test.jsx  (1 test)    266ms
 ✓ src/test/App.test.jsx         (2 tests)   274ms
 ✓ src/test/BookForm.test.jsx    (3 tests)   972ms

 Test Files  5 passed (5)
      Tests  9 passed (9)
   Start at  20:04:46
   Duration  4.10s (transform 378ms, setup 1.57s, collect 2.48s, tests 1.66s)
```

Laporan testing berupa screenshot terminal ada di [`screenshots/test.png`](screenshots/test.png) (bagian 4).

## 8. Kerapian Kode

- Satu komponen satu tanggung jawab; style tiap komponen dipisah di file CSS-nya sendiri.
- Komentar JSDoc/inline pada bagian penting: kontrak tiap custom hook, alur validasi form, alasan `useMemo` pada hasil filter, dan daftar route di `App.jsx`.
- Linter `oxlint` dijalankan lewat `npm run lint` — 0 error.
- `node_modules/` dan `dist/` tidak di-commit (lihat `.gitignore`).
