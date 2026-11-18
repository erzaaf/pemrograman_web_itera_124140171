"""Latihan 04: encapsulation (enkapsulasi).

Data penting disembunyikan dengan awalan __ (private), lalu diakses
lewat property supaya bisa divalidasi sebelum diubah.
"""


class Rekening:
    """Rekening bank dengan saldo yang dilindungi."""

    def __init__(self, pemilik, saldo_awal=0):
        self.pemilik = pemilik
        self.__saldo = saldo_awal

    @property
    def saldo(self):
        """int: saldo rekening (hanya bisa dibaca dari luar)."""
        return self.__saldo

    def setor(self, jumlah):
        """Tambah saldo rekening.

        Args:
            jumlah (int): nominal yang disetor, harus lebih dari 0.

        Raises:
            ValueError: jika jumlah tidak positif.
        """
        if jumlah <= 0:
            raise ValueError("Jumlah setor harus lebih dari 0")
        self.__saldo += jumlah

    def tarik(self, jumlah):
        """Kurangi saldo rekening.

        Args:
            jumlah (int): nominal yang ditarik.

        Raises:
            ValueError: jika jumlah tidak positif atau saldo kurang.
        """
        if jumlah <= 0:
            raise ValueError("Jumlah tarik harus lebih dari 0")
        if jumlah > self.__saldo:
            raise ValueError("Saldo tidak cukup")
        self.__saldo -= jumlah


rekening = Rekening("Erza", 100_000)
print("Saldo awal          :", rekening.saldo)

rekening.setor(50_000)
print("Setelah setor 50000 :", rekening.saldo)

rekening.tarik(30_000)
print("Setelah tarik 30000 :", rekening.saldo)

print()
print("Atribut __saldo tidak bisa diakses langsung dari luar:")
try:
    print(rekening.__saldo)
except AttributeError as error:
    print("  AttributeError:", error)

print()
print("Validasi tetap berjalan lewat method:")
try:
    rekening.tarik(10_000_000)
except ValueError as error:
    print("  ValueError:", error)

print()
print("Nama atribut di dalam class (name mangling):")
print(" ", [nama for nama in vars(rekening)])
