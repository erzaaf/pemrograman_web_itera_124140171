"""Latihan 03: inheritance (pewarisan).

Subclass mewarisi atribut dan method dari parent class, lalu bisa
menambah atau mengganti (override) perilakunya sendiri.
"""


class Hewan:
    """Parent class untuk semua hewan."""

    def __init__(self, nama):
        self.nama = nama

    def suara(self):
        """Suara hewan secara umum."""
        return "..."

    def perkenalan(self):
        """Perkenalan memakai method suara() milik objek ini."""
        return f"Halo, aku {self.nama}, suaraku '{self.suara()}'"


class Kucing(Hewan):
    """Subclass kucing: mewarisi Hewan dan mengganti suara()."""

    def suara(self):
        return "Meong"


class Anjing(Hewan):
    """Subclass anjing: mewarisi Hewan dan mengganti suara()."""

    def suara(self):
        return "Guk guk"


kucing = Kucing("Kitty")
anjing = Anjing("Doggy")

print("Subclass mewarisi method parent:")
print("  kucing.nama           ->", kucing.nama)
print("  kucing.perkenalan()   ->", kucing.perkenalan())
print("  anjing.perkenalan()   ->", anjing.perkenalan())

print()
print("Method suara() di-override oleh masing-masing subclass:")
print("  Kucing.suara()        ->", kucing.suara())
print("  Anjing.suara()        ->", anjing.suara())

print()
print("Hubungan class:")
print("  isinstance(kucing, Kucing) ->", isinstance(kucing, Kucing))
print("  isinstance(kucing, Hewan)  ->", isinstance(kucing, Hewan))
print("  issubclass(Kucing, Hewan)  ->", issubclass(Kucing, Hewan))
