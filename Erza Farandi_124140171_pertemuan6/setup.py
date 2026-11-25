"""Konfigurasi paket aplikasi Pyramid Manajemen Matakuliah."""

from setuptools import find_packages, setup

setup(
    name="pyramid_mahasiswa",
    version="1.0",
    description="RESTful API manajemen mahasiswa dan matakuliah (Pyramid)",
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        "pyramid>=2.0",
        "SQLAlchemy>=2.0",
        "alembic>=1.13",
        "waitress",
        "psycopg[binary]>=3.1",
    ],
    entry_points={
        "paste.app_factory": [
            "main = pyramid_mahasiswa:main",
        ],
        "console_scripts": [
            "initialize_db = pyramid_mahasiswa.scripts.initialize_db:main",
        ],
    },
)
