"""Isi data awal (seeding) untuk database aplikasi.

Skrip ini juga menerapkan seluruh migrasi Alembic lebih dulu, jadi cukup
satu perintah:

    python -m pyramid_mahasiswa.scripts.initialize_db development.ini

atau lewat entry point setelah ``pip install -e .``:

    initialize_db development.ini
"""

import logging
import os
import sys
from pathlib import Path

from alembic import command
from alembic.config import Config as AlembicConfig
from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config, pool
from sqlalchemy.orm import sessionmaker

from pyramid_mahasiswa.models.mahasiswa import Mahasiswa
from pyramid_mahasiswa.models.matakuliah import Matakuliah

DATA_MAHASISWA = [
    {"nim": "124140171", "nama": "Erza Farandi",
     "jurusan": "Teknik Informatika", "angkatan": 2024},
    {"nim": "124140159", "nama": "M. Irfan Ramadhan",
     "jurusan": "Teknik Informatika", "angkatan": 2024},
    {"nim": "124140195", "nama": "Jeremi Pison Efrat",
     "jurusan": "Teknik Informatika", "angkatan": 2024},
]

DATA_MATAKULIAH = [
    {"kode_mk": "IF2110", "nama_mk": "Pemrograman Web",
     "sks": 3, "semester": 3},
    {"kode_mk": "IF3140", "nama_mk": "Basis Data",
     "sks": 3, "semester": 4},
    {"kode_mk": "IF2230", "nama_mk": "Jaringan Komputer",
     "sks": 3, "semester": 4},
    {"kode_mk": "IF4020", "nama_mk": "Kecerdasan Buatan",
     "sks": 4, "semester": 6},
]


def jalankan_migrasi(config_uri):
    """Terapkan seluruh migrasi Alembic ke database.

    Lokasi folder migrasi ditentukan langsung dari kode, sehingga tidak
    memerlukan berkas alembic.ini maupun pyproject.toml.

    Args:
        config_uri (str): berkas .ini yang dipakai (mis. development.ini).
    """
    folder_alembic = Path(__file__).resolve().parents[1] / "alembic"
    os.environ["PYRAMID_CONFIG"] = config_uri

    alembic_cfg = AlembicConfig()
    alembic_cfg.set_main_option("script_location", str(folder_alembic))

    logging.basicConfig(
        level=logging.INFO,
        format="%(levelname)-5.5s [%(name)s] %(message)s",
    )

    print("Menerapkan migrasi Alembic...", flush=True)
    command.upgrade(alembic_cfg, "head")
    print()


def main(argv=sys.argv):
    """Baca konfigurasi, terapkan migrasi, lalu isi data awal.

    Args:
        argv (list): argumen baris perintah; elemen kedua adalah berkas
            .ini (contoh: development.ini).

    Returns:
        None
    """
    if len(argv) < 2:
        print("Penggunaan: initialize_db development.ini")
        sys.exit(1)

    config_uri = argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)

    jalankan_migrasi(config_uri)

    engine = engine_from_config(
        settings, "sqlalchemy.", poolclass=pool.NullPool)
    session = sessionmaker(bind=engine)()

    print("Mengisi data awal ke database...", flush=True)

    jumlah_baru = 0

    for data in DATA_MATAKULIAH:
        sudah_ada = (session.query(Matakuliah)
                     .filter(Matakuliah.kode_mk == data["kode_mk"])
                     .first())
        if sudah_ada is not None:
            print(f"  = {data['kode_mk']} sudah ada, dilewati")
            continue
        session.add(Matakuliah(**data))
        print(f"  + {data['kode_mk']} - {data['nama_mk']} "
              f"({data['sks']} SKS, semester {data['semester']})")
        jumlah_baru += 1

    for data in DATA_MAHASISWA:
        sudah_ada = (session.query(Mahasiswa)
                     .filter(Mahasiswa.nim == data["nim"])
                     .first())
        if sudah_ada is not None:
            print(f"  = {data['nim']} sudah ada, dilewati")
            continue
        session.add(Mahasiswa(**data))
        print(f"  + {data['nim']} - {data['nama']}")
        jumlah_baru += 1

    session.commit()
    total_mk = session.query(Matakuliah).count()
    total_mhs = session.query(Mahasiswa).count()
    session.close()

    print()
    print(f"Seeding selesai: {jumlah_baru} data baru ditambahkan.")
    print(f"Total di database: {total_mk} matakuliah, "
          f"{total_mhs} mahasiswa.")


if __name__ == "__main__":
    main()
