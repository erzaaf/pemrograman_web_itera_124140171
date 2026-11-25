"""Model data mahasiswa."""

from sqlalchemy import Column, Integer, Text

from pyramid_mahasiswa.models.meta import Base


class Mahasiswa(Base):
    """Tabel mahasiswa pada database.

    Atribut:
        id (int): primary key autoincrement.
        nim (str): nomor induk mahasiswa, unik.
        nama (str): nama lengkap mahasiswa.
        jurusan (str): jurusan mahasiswa.
        angkatan (int): tahun angkatan.
    """

    __tablename__ = "mahasiswa"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nim = Column(Text, nullable=False, unique=True)
    nama = Column(Text, nullable=False)
    jurusan = Column(Text, nullable=False)
    angkatan = Column(Integer, nullable=False)

    def to_dict(self):
        """Serialisasi objek menjadi dictionary siap JSON.

        Returns:
            dict: seluruh atribut mahasiswa.
        """
        return {
            "id": self.id,
            "nim": self.nim,
            "nama": self.nama,
            "jurusan": self.jurusan,
            "angkatan": self.angkatan,
        }

    def __repr__(self):
        return f"<Mahasiswa {self.nim} - {self.nama}>"
