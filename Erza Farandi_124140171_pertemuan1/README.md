# Mini POS — Kasir & Keranjang Belanja Sederhana (Prak 1)

## Identitas
- **Nama Lengkap:** Erza Farandi
- **NIM:** 124140171
- **Kelas Praktikum:** RB

## Deskripsi Aplikasi
Aplikasi web kasir sederhana untuk kasir kantin / toko kampus. Studi kasus ini menyatukan tiga kompetensi dasar praktikum:
1. Validasi input form barang,
2. Perhitungan kalkulator otomatis (subtotal, total, diskon, kembalian),
3. Manajemen keranjang belanja berbasis `localStorage`.

Tujuan: kasir dapat menginput barang dengan validasi ketat, melihat total + diskon otomatis, menghitung kembalian, dan data keranjang tidak hilang saat refresh.

## Panduan Menjalankan
1. Buka folder `C:\coding\prak_paw\prak1` di VS Code.
2. Install extension **Live Server** (jika belum ada).
3. Klik kanan `index.html` → **Open with Live Server**.
4. Atau cara manual: double-klik `index.html` untuk dibuka di browser (Chrome/Edge).
5. Tidak perlu backend / database, cukup browser modern dengan JavaScript + localStorage aktif.

## Daftar Fitur
- [x] Validasi Nama Barang (wajib, min 3 karakter) + pesan merah di bawah input
- [x] Validasi Harga Satuan (angka, ≥ Rp 500) + cegah masuk keranjang jika invalid
- [x] Validasi Qty (bulat, ≥ 1) + form auto-reset jika sukses
- [x] Subtotal otomatis per baris (Harga × Qty)
- [x] Total belanja otomatis (sum semua subtotal)
- [x] Diskon 10% otomatis jika total ≥ Rp 50.000
- [x] Kode promo `HEMAT10` untuk diskon 10%
- [x] Tampil nominal diskon + total akhir
- [x] Input Uang Bayar + kembalian otomatis + warning jika kurang
- [x] Tabel keranjang (No, Nama, Harga, Qty, Subtotal, Aksi)
- [x] Hapus item per baris + hitung ulang otomatis
- [x] Simpan ke localStorage (`JSON.stringify`) + load (`JSON.parse`)
- [x] Tombol Transaksi Baru / Reset (kosongkan cart + localStorage)
- [x] Format Rupiah `Rp 1.000` + layout responsif

## Tangkapan Layar (Screenshot)
Simpan screenshot di folder `screenshots/` dengan nama berikut, lalu tampilkan di sini:

1. `screenshots/01-form-utama.png` — tampilan form input utama + tabel kosong
2. `screenshots/02-validasi-error.png` — tampilan saat validasi error merah muncul
3. `screenshots/03-hasil-kalkulator.png` — tampilan hasil diskon, total akhir, kembalian + tabel terisi

> Jika folder `screenshots/` belum ada, buat dan isi 3 file di atas sebelum pengumpulan.

Contoh markdown setelah file ada:
```md
![Form Utama](screenshots/01-form-utama.png)
![Validasi Error](screenshots/02-validasi-error.png)
![Hasil Kalkulator](screenshots/03-hasil-kalkulator.png)
```

## Penjelasan Teknis Singkat
- **Validasi:** `validateBarang(nama, harga, qty)` di `script.js` cek `nama.trim().length >= 3`, `harga >= 500`, `Number.isInteger(qty) && qty >= 1`. Jika gagal, isi `<small class="error">` + class `invalid`, lalu `return` tanpa push ke cart.
- **Kalkulator:** `calcTotals()` = `total` via `reduce(harga*qty)`, `diskon = 10%` jika `total >= 50000` atau promo `HEMAT10` valid, `totalAkhir = total - diskon`. `calcKembalian()` = `bayar - totalAkhir`, tampilkan warning jika negatif.
- **LocalStorage:** `saveCart()` → `localStorage.setItem(KEY, JSON.stringify(cart))`, `loadCart()` → `JSON.parse(localStorage.getItem(KEY))`. Dipanggil setiap tambah/hapus/reset + saat init `renderCart()`.

## Struktur Folder
```
prak1/
├── index.html
├── style.css
├── script.js
├── README.md
├── modul/
└── screenshots/ (tambahkan sebelum kumpul)
```
