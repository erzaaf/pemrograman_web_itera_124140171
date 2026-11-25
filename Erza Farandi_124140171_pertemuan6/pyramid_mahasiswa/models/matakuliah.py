"""Model data matakuliah."""

from sqlalchemy import Column, Integer, Text

from pyramid_mahasiswa.models.meta import Base


class Matakuliah(Base):
    """Tabel matakuliah pada database.

    Atribut:
        id (int): primary key autoincrement.
        kode_mk (str): kode matakuliah, unik (contoh: IF2110).
        nama_mk (str): nama matakuliah (contoh: Pemrograman Web).
        sks (int): jumlah SKS, harus lebih dari 0.
        semester (int): semester penawaran, harus lebih dari 0.
    """

    __tablename__ = "matakuliah"

    id = Column(Integer, primary_key=True, autoincrement=True)
    kode_mk = Column(Text, nullable=False, unique=True)
    nama_mk = Column(Text, nullable=False)
    sks = Column(Integer, nullable=False)
    semester = Column(Integer, nullable=False)

    def to_dict(self):
        """Serialisasi objek menjadi dictionary siap JSON.

        Returns:
            dict: seluruh atribut matakuliah.
        """
        return {
            "id": self.id,
            "kode_mk": self.kode_mk,
            "nama_mk": self.nama_mk,
            "sks": self.sks,
            "semester": self.semester,
        }

    def __repr__(self):
        return f"<Matakuliah {self.kode_mk} - {self.nama_mk}>"
