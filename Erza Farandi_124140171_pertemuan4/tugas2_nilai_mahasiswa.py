"""Program Pengelolaan Data Nilai Mahasiswa.

Tugas Praktikum PAW Pertemuan 4 - Soal 2.

Alur kerja:
1. Menyiapkan list berisi 5 dictionary data mahasiswa.
2. Menghitung nilai akhir: (30% * UTS) + (40% * UAS) + (30% * Tugas).
3. Menentukan grade A/B/C/D/E dari nilai akhir.
4. Menampilkan tabel lengkap (Nama, NIM, Nilai Akhir, Grade) dengan f-string.
5. Mencari dan menampilkan mahasiswa dengan nilai akhir tertinggi dan terendah.
"""

DATA_MAHASISWA = [
    {
        "nama": "Andi Pratama",
        "nim": "124140001",
        "nilai_uts": 85,
        "nilai_uas": 90,
        "nilai_tugas": 88,
    },
    {
        "nama": "Bunga Lestari",
        "nim": "124140002",
        "nilai_uts": 75,
        "nilai_uas": 70,
        "nilai_tugas": 80,
    },
    {
        "nama": "Citra Ayu",
        "nim": "124140003",
        "nilai_uts": 65,
        "nilai_uas": 60,
        "nilai_tugas": 70,
    },
    {
        "nama": "Dedi Kurniawan",
        "nim": "124140004",
        "nilai_uts": 55,
        "nilai_uas": 50,
        "nilai_tugas": 60,
    },
    {
        "nama": "Eka Saputra",
        "nim": "124140005",
        "nilai_uts": 40,
        "nilai_uas": 35,
        "nilai_tugas": 45,
    },
]


def hitung_nilai_akhir(mahasiswa):
    """Hitung nilai akhir dari UTS, UAS, dan tugas seorang mahasiswa.

    Args:
        mahasiswa (dict): Dictionary dengan kunci nilai_uts, nilai_uas,
            dan nilai_tugas.

    Returns:
        float: Nilai akhir gabungan (30% UTS + 40% UAS + 30% tugas).
    """
    return (0.30 * mahasiswa["nilai_uts"]
            + 0.40 * mahasiswa["nilai_uas"]
            + 0.30 * mahasiswa["nilai_tugas"])


def tentukan_grade(nilai_akhir):
    """Tentukan grade huruf berdasarkan nilai akhir.

    Args:
        nilai_akhir (float): Nilai akhir mahasiswa.

    Returns:
        str: Grade "A", "B", "C", "D", atau "E".
    """
    if nilai_akhir >= 80:
        grade = "A"
    elif nilai_akhir >= 70:
        grade = "B"
    elif nilai_akhir >= 60:
        grade = "C"
    elif nilai_akhir >= 50:
        grade = "D"
    else:
        grade = "E"
    return grade


def tampilkan_tabel(data):
    """Tampilkan tabel nilai seluruh mahasiswa secara rapi.

    Args:
        data (list): List berisi dictionary data mahasiswa. Setiap dictionary
            akan diberi kunci tambahan "nilai_akhir" dan "grade".
    """
    for mahasiswa in data:
        mahasiswa["nilai_akhir"] = hitung_nilai_akhir(mahasiswa)
        mahasiswa["grade"] = tentukan_grade(mahasiswa["nilai_akhir"])

    print("=" * 55)
    print(f"{'Nama':<16}{'NIM':<12}{'Nilai Akhir':<14}{'Grade':<7}")
    print("-" * 55)
    for mahasiswa in data:
        print(f"{mahasiswa['nama']:<16}{mahasiswa['nim']:<12}"
              f"{mahasiswa['nilai_akhir']:<14.2f}{mahasiswa['grade']:<7}")
    print("=" * 55)


def cari_ekstrem(data):
    """Cari dan tampilkan mahasiswa dengan nilai akhir tertinggi & terendah.

    Args:
        data (list): List berisi dictionary mahasiswa yang sudah memiliki
            kunci "nilai_akhir".
    """
    terbaik = data[0]
    terburuk = data[0]
    for mahasiswa in data:
        if mahasiswa["nilai_akhir"] > terbaik["nilai_akhir"]:
            terbaik = mahasiswa
        if mahasiswa["nilai_akhir"] < terburuk["nilai_akhir"]:
            terburuk = mahasiswa

    print()
    print("Nilai Tertinggi:")
    print(f"  {terbaik['nama']} ({terbaik['nim']}) "
          f"-> {terbaik['nilai_akhir']:.2f} (Grade {terbaik['grade']})")
    print("Nilai Terendah:")
    print(f"  {terburuk['nama']} ({terburuk['nim']}) "
          f"-> {terburuk['nilai_akhir']:.2f} (Grade {terburuk['grade']})")


def main():
    """Jalankan seluruh alur pengelolaan data nilai mahasiswa."""
    tampilkan_tabel(DATA_MAHASISWA)
    cari_ekstrem(DATA_MAHASISWA)


if __name__ == "__main__":
    main()
