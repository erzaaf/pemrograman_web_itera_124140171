"""Latihan 01: semuanya objek di Python.

Di Python, semua nilai (angka, teks, list, fungsi, bahkan class)
adalah objek. Setiap objek punya tipe dan atribut/method sendiri.
"""

angka = 10
teks = "perpustakaan"
data = [1, 2, 3]


def halo():
    """Fungsi sederhana untuk dibuktikan sebagai objek."""
    return "Halo dari fungsi"


print("Tipe setiap nilai:")
for nilai in (angka, teks, data, halo):
    label = repr(nilai)
    if len(label) > 34:
        label = label[:31] + "..."
    print(f"  {label:<36} -> {type(nilai).__name__}")

print()
print("Objek punya method sendiri:")
print("  teks.upper()      ->", teks.upper())
print("  teks.title()      ->", teks.title())
print("  data.count(2)     ->", data.count(2))

print()
print("Fungsi juga objek, bisa disimpan di variabel:")
sapaan = halo
print("  sapaan()          ->", sapaan())
print("  type(sapaan)      ->", type(sapaan).__name__)

print()
print("Contoh atribut milik objek angka:")
print("  angka.numerator   ->", angka.numerator)
print("  angka.denominator ->", angka.denominator)
