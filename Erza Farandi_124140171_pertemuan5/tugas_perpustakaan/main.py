from library import Library
from library_item import Book, Magazine
from member import Member


def rupiah(nominal):
    """Format angka menjadi teks rupiah (contoh: 5000 -> Rp 5.000).

    Args:
        nominal (int): jumlah uang dalam rupiah.

    Returns:
        str: nominal yang sudah diformat.
    """
    return f"Rp {nominal:,}".replace(",", ".")


def judul(teks):
    """Cetak judul bagian program agar mudah dibaca.

    Args:
        teks (str): judul bagian.
    """
    print()
    print(teks)
    print("-" * 60)


def main():
    """Jalankan seluruh demonstrasi sistem perpustakaan."""
    print("SISTEM MANAJEMEN PERPUSTAKAAN SEDERHANA")
    print("=" * 60)

    perpustakaan = Library("Perpustakaan Kampus")

    judul("[1] Menambahkan item ke perpustakaan")
    daftar_baru = [
        Book("B001", "Lord of the Mysteries", 2018, "Cuttlefish"),
        Book("B002", "Clean Code", 2008, "Robert C. Martin"),
        Book("B003", "Bumi Manusia", 1980, "Pramoedya"),
        Magazine("M001", "Bobo Edisi 12", 2023, "Edisi 12", "Gramedia"),
        Magazine("M002", "Tempo Edisi 45", 2024, "Edisi 45", "Tempo"),
    ]
    for item in daftar_baru:
        perpustakaan.tambah_item(item)
        print(f"  + {item}")
    print(f"  Total item perpustakaan: {perpustakaan.jumlah_item}")

    try:
        perpustakaan.tambah_item(
            Book("B002", "Clean Code (dobel)", 2008, "Robert C. Martin"))
    except ValueError as error:
        print(f"  ! Gagal menambah item: {error}")

    judul("[2] Katalog item yang tersedia")
    perpustakaan.tampilkan_katalog()

    judul("[3] Mencari item berdasarkan judul atau id")
    for kunci in ("bumi", "M001"):
        hasil = perpustakaan.cari_item(kunci)
        detail = hasil.get_detail() if hasil else "tidak ada"
        print(f"  Cari '{kunci}' -> {detail}")
    hasil = perpustakaan.cari_item("ensiklopedia")
    print("  Cari 'ensiklopedia' -> tidak ditemukan"
          if hasil is None else f"  Cari 'ensiklopedia' -> {hasil}")

    judul("[4] Peminjaman dan pengembalian oleh anggota")
    anggota = Member("A01", "Erza Farandi")
    item = perpustakaan.pinjam_item("B001", anggota)
    print(f"  {anggota.nama} meminjam {item.judul} (id {item.id_item})")
    print(f"  Status is_dipinjam B001: {item.is_dipinjam}")
    print(f"  Jumlah pinjaman aktif : {len(anggota.daftar_pinjaman)} item")
    tersedia = sum(1 for i in perpustakaan.koleksi if not i.is_dipinjam)
    print(f"  Item tersedia sekarang: {tersedia} (sebelumnya 5)")

    denda = perpustakaan.kembalikan_item("B001", anggota, hari_terlambat=5)
    print("  B001 dikembalikan (terlambat 5 hari), "
          f"denda: {rupiah(denda)}")
    print(f"  Status is_dipinjam B001: {item.is_dipinjam}")

    judul("[5] Polymorphism: detail & denda tiap jenis item")
    for item in (perpustakaan.cari_item("B002"),
                 perpustakaan.cari_item("M001")):
        print(f"  {item.get_detail()}")
        print(f"    -> denda 3 hari terlambat: "
              f"{rupiah(item.hitung_denda(3))}")
    print("  (method sama, hasil mengikuti jenis item)")


if __name__ == "__main__":
    main()
