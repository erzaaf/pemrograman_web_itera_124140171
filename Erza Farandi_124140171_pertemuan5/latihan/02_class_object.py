"""Latihan 02: class dan objek (instance).

Class adalah cetak biru (blueprint), objek adalah wujud nyatanya.
Setiap objek punya atribut sendiri dan bisa memanggil method class.
"""


class Buku:
    """Buku sederhana dengan atribut dan satu method."""

    def __init__(self, judul, penulis, tahun):
        """Simpan data buku saat objek dibuat.

        Args:
            judul (str): judul buku.
            penulis (str): nama penulis.
            tahun (int): tahun terbit.
        """
        self.judul = judul
        self.penulis = penulis
        self.tahun = tahun

    def info(self):
        """Kembalikan keterangan singkat buku."""
        return f"{self.judul} - {self.penulis} ({self.tahun})"


buku1 = Buku("Bumi Manusia", "Pramoedya", 1980)
buku2 = Buku("Clean Code", "Robert C. Martin", 2008)

print("Dua objek dari class yang sama:")
print("  buku1 ->", buku1.info())
print("  buku2 ->", buku2.info())

print()
print("Setiap objek menyimpan atributnya sendiri:")
print("  buku1.judul ->", buku1.judul)
print("  buku2.judul ->", buku2.judul)
print("  buku1 adalah buku2? ->", buku1 is buku2)
print("  type(buku1) ->", type(buku1).__name__)

print()
print("Atribut bisa diubah setelah objek dibuat:")
buku1.tahun = 1981
print("  buku1.tahun setelah diubah ->", buku1.tahun)
