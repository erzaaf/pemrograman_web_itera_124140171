"""Latihan 06: abstract class.

Abstract class tidak bisa dibuat objeknya langsung. Subclass wajib
mengimplementasikan semua method yang ditandai @abstractmethod.
"""

from abc import ABC, abstractmethod


class Bentuk(ABC):
    """Abstract class dasar semua bentuk geometri."""

    def __init__(self, nama):
        self.nama = nama

    @abstractmethod
    def luas(self):
        """Hitung luas bentuk (wajib diimplementasikan subclass)."""

    @abstractmethod
    def keliling(self):
        """Hitung keliling bentuk (wajib diimplementasikan subclass)."""

    def info(self):
        """Keterangan singkat bentuk."""
        luas = self.luas()
        keliling = self.keliling()
        return f"{self.nama}: luas {luas:.2f}, keliling {keliling:.2f}"


class Persegi(Bentuk):
    """Persegi dengan sisi sama panjang."""

    def __init__(self, sisi):
        super().__init__("Persegi")
        self.sisi = sisi

    def luas(self):
        return self.sisi * self.sisi

    def keliling(self):
        return 4 * self.sisi


class Lingkaran(Bentuk):
    """Lingkaran dengan jari-jari tertentu."""

    PI = 3.14159

    def __init__(self, jari_jari):
        super().__init__("Lingkaran")
        self.jari_jari = jari_jari

    def luas(self):
        return self.PI * self.jari_jari ** 2

    def keliling(self):
        return 2 * self.PI * self.jari_jari


print("Abstract class tidak bisa dibuat objeknya:")
try:
    Bentuk("Bentuk aneh")
except TypeError as error:
    print("  TypeError:", error)

print()
print("Subclass wajib mengimplementasikan method abstract:")
for bentuk in (Persegi(4), Lingkaran(7)):
    print(" ", bentuk.info())
