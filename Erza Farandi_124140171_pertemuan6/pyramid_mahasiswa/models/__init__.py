"""Registrasi seluruh model agar terdeteksi Alembic dan aplikasi."""

from pyramid_mahasiswa.models.mahasiswa import Mahasiswa
from pyramid_mahasiswa.models.matakuliah import Matakuliah
from pyramid_mahasiswa.models.meta import Base

__all__ = ["Base", "Mahasiswa", "Matakuliah"]
