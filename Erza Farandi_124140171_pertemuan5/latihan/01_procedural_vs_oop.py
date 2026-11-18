"""Latihan 01: gaya prosedural vs gaya OOP.

Kasus yang sama (menghitung nilai akhir mahasiswa) ditulis dua cara:
- prosedural: data berupa dictionary lepas + fungsi terpisah
- OOP       : data dan perilakunya dibungkus dalam satu class
"""

# ---------- Gaya prosedural ----------
data_mahasiswa = {"nama": "Erza", "uts": 85, "uas": 90, "tugas": 88}


def hitung_nilai(uts, uas, tugas):
    """Hitung nilai akhir dengan bobot 30% UTS, 40% UAS, 30% tugas."""
    return 0.3 * uts + 0.4 * uas + 0.3 * tugas


print("Prosedural:")
print(f"  Nama        : {data_mahasiswa['nama']}")
nilai = hitung_nilai(
    data_mahasiswa["uts"], data_mahasiswa["uas"], data_mahasiswa["tugas"])
print(f"  Nilai akhir : {nilai:.2f}")


# ---------- Gaya OOP ----------
class Mahasiswa:
    """Mahasiswa dengan data dan cara menghitung nilainya sendiri."""

    def __init__(self, nama, uts, uas, tugas):
        self.nama = nama
        self.uts = uts
        self.uas = uas
        self.tugas = tugas

    def nilai_akhir(self):
        """Hitung nilai akhir mahasiswa ini."""
        return 0.3 * self.uts + 0.4 * self.uas + 0.3 * self.tugas


mahasiswa = Mahasiswa("Erza", 85, 90, 88)

print()
print("OOP:")
print(f"  Nama        : {mahasiswa.nama}")
print(f"  Nilai akhir : {mahasiswa.nilai_akhir():.2f}")

print()
print("Perbedaan: pada OOP data dan fungsi penyimpan informasinya")
print("menyatu dalam satu objek, jadi tidak perlu mengoper banyak")
print("parameter ke fungsi lain.")
