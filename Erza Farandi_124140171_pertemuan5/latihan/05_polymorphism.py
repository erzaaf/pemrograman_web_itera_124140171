"""Latihan 05: polymorphism (polimorfisme).

Objek dari class berbeda bisa dipanggil dengan cara yang sama
(nama method sama), tetapi hasilnya menyesuaikan class masing-masing.
"""


class Kucing:
    """Hewan yang bersuara meong."""

    def suara(self):
        """Suara kucing."""
        return "Meong"


class Anjing:
    """Hewan yang bersuara guk guk."""

    def suara(self):
        """Suara anjing."""
        return "Guk guk"


class Bebek:
    """Hewan yang bersuara kwek."""

    def suara(self):
        """Suara bebek."""
        return "Kwek kwek"


hewan = [Kucing(), Anjing(), Bebek()]

print("Satu perulangan, method sama, hasil berbeda:")
for binatang in hewan:
    print(f"  {type(binatang).__name__:<8} -> {binatang.suara()}")

print()
print("Polymorphism juga berlaku untuk fungsi yang menerima objek:")
print("  len('teks')  ->", len("teks"))
print("  len([1, 2])  ->", len([1, 2]))
print("  len({'a': 1}) ->", len({"a": 1}))
print("  (method len() bekerja untuk banyak tipe data)")
