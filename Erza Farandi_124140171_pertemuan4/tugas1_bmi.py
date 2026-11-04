"""Program Penghitung BMI (Body Mass Index) Sederhana.

Tugas Praktikum PAW Pertemuan 4 - Soal 1.

Alur kerja:
1. Menerima berat badan (kg) dan tinggi badan (m) dari pengguna
   lewat fungsi input().
2. Menghitung BMI dengan rumus BMI = berat / (tinggi * tinggi).
3. Menentukan kategori berat badan memakai if-elif-else:
   - BMI < 18.5              -> Berat badan kurang
   - 18.5 <= BMI < 25        -> Berat badan normal
   - 25   <= BMI < 30        -> Berat badan berlebih
   - BMI >= 30               -> Obesitas
4. Menampilkan nilai BMI (2 angka desimal, f-string) dan kategorinya.
"""


def main():
    """Jalankan seluruh alur program penghitung BMI."""
    berat = float(input("Masukkan berat badan (kg) : "))
    tinggi = float(input("Masukkan tinggi badan (m): "))

    bmi = berat / (tinggi * tinggi)

    if bmi < 18.5:
        kategori = "Berat badan kurang"
    elif bmi < 25:
        kategori = "Berat badan normal"
    elif bmi < 30:
        kategori = "Berat badan berlebih"
    else:
        kategori = "Obesitas"

    print()
    print(f"BMI Anda     : {bmi:.2f}")
    print(f"Kategori     : {kategori}")


if __name__ == "__main__":
    main()
