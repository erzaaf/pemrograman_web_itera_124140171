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
        "nama": "Erza Farandi",
        "nim": "124140171",
        "nilai_uts": 90,
        "nilai_uas": 88,
        "nilai_tugas": 85,
    },
    {
        "nama": "M. Irfan Ramadhan",
        "nim": "124140159",
        "nilai_uts": 78,
        "nilai_uas": 74,
        "nilai_tugas": 80,
    },
    {
        "nama": "Jeremi Pison Efrat",
        "nim": "124140195",
        "nilai_uts": 85,
        "nilai_uas": 91,
        "nilai_tugas": 78,
    },
    {
        "nama": "Hanung Akbar Pramusintho",
        "nim": "124140207",
        "nilai_uts": 65,
        "nilai_uas": 70,
        "nilai_tugas": 72,
    },
    {
        "nama": "M. Arfa Raditya",
        "nim": "124140016",
        "nilai_uts": 72,
        "nilai_uas": 68,
        "nilai_tugas": 75,
    },
    {
        "nama": "Dimas Alhamdy",
        "nim": "124140165",
        "nilai_uts": 58,
        "nilai_uas": 62,
        "nilai_tugas": 55,
    },
    {
        "nama": "Rajendra Rifandhy",
        "nim": "124140099",
        "nilai_uts": 45,
        "nilai_uas": 40,
        "nilai_tugas": 50,
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

    print("=" * 62)
    print(f"{'Nama':<26}{'NIM':<12}{'Nilai Akhir':<14}{'Grade':<7}")
    print("-" * 62)
    for mahasiswa in data:
        print(f"{mahasiswa['nama']:<26}{mahasiswa['nim']:<12}"
              f"{mahasiswa['nilai_akhir']:<14.2f}{mahasiswa['grade']:<7}")
    print("=" * 62)


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
