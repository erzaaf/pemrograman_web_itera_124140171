"""Program utama pengujian modul math_operations.

Tugas Praktikum PAW Pertemuan 4 - Soal 3B.

Menerapkan 2 cara impor:
1. import math_operations                          (mengakses via nama modul)
2. from math_operations import PI, ...             (mengimpor langsung nama)
"""


def main():
    """Panggil seluruh fungsi modul dan tampilkan hasilnya dengan rapi."""
    # Cara impor 1: seluruh modul diakses lewat nama math_operations
    import math_operations as mo

    # Cara impor 2: fungsi/konstanta diimpor langsung ke namespace lokal
    from math_operations import PI, celsius_ke_fahrenheit, celsius_ke_kelvin

    print("=" * 46)
    print("PENGUJIAN MODUL math_operations")
    print("=" * 46)

    print("[1] Persegi (sisi = 5)")
    print(f"    Luas     : {mo.luas_persegi(5)}")
    print(f"    Keliling : {mo.keliling_persegi(5)}")

    print("[2] Persegi panjang (panjang = 8, lebar = 3.5)")
    print(f"    Luas     : {mo.luas_persegi_panjang(8, 3.5)}")
    print(f"    Keliling : {mo.keliling_persegi_panjang(8, 3.5)}")

    print("[3] Lingkaran (jari-jari = 7, PI = %.5f)" % PI)
    print(f"    Luas     : {mo.luas_lingkaran(7):.2f}")
    print(f"    Keliling : {mo.keliling_lingkaran(7):.2f}")

    print("[4] Konversi suhu (25 C dan 100 C)")
    for suhu in (25, 100):
        fahrenheit = celsius_ke_fahrenheit(suhu)
        kelvin = celsius_ke_kelvin(suhu)
        print(f"    {suhu:>3} C = {fahrenheit:.1f} F = {kelvin:.2f} K")

    print("=" * 46)


if __name__ == "__main__":
    main()
