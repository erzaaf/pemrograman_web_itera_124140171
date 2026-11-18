"""Modul item perpustakaan: abstract class LibraryItem + subclass.

Berisi:
- LibraryItem : abstract class dasar semua item perpustakaan.
- Book         : subclass untuk buku.
- Magazine     : subclass untuk majalah.
"""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Abstract class dasar untuk semua item di perpustakaan.

    Atribut:
        _id_item (str)     : id unik item (protected).
        _judul (str)       : judul item (protected).
        _tahun_terbit (int): tahun terbit item (protected).
        __dipinjam (bool)  : status peminjaman (private, diakses
                             lewat property is_dipinjam).
    """

    def __init__(self, id_item, judul, tahun_terbit):
        self._id_item = id_item
        self._judul = judul
        self._tahun_terbit = tahun_terbit
        self.__dipinjam = False

    @property
    def id_item(self):
        """str: id unik item."""
        return self._id_item

    @property
    def judul(self):
        """str: judul item."""
        return self._judul

    @property
    def tahun_terbit(self):
        """int: tahun terbit item."""
        return self._tahun_terbit

    @property
    def is_dipinjam(self):
        """bool: True jika item sedang dipinjam anggota."""
        return self.__dipinjam

    @is_dipinjam.setter
    def is_dipinjam(self, status):
        """Ubah status peminjaman item.

        Args:
            status (bool): True untuk menandai dipinjam.
        """
        self.__dipinjam = bool(status)

    @abstractmethod
    def get_detail(self):
        """Kembalikan detail item dalam satu baris teks.

        Returns:
            str: detail item, termasuk status ketersediaan.
        """

    @abstractmethod
    def hitung_denda(self, hari_terlambat):
        """Hitung denda keterlambatan pengembalian.

        Args:
            hari_terlambat (int): jumlah hari keterlambatan.

        Returns:
            int: nominal denda dalam rupiah.
        """

    def __str__(self):
        status = "Dipinjam" if self.__dipinjam else "Tersedia"
        return f"[{self._id_item}] {self._judul} ({status})"


class Book(LibraryItem):
    """Buku perpustakaan. Denda keterlambatan Rp 1.000 per hari."""

    DENDA_PER_HARI = 1000

    def __init__(self, id_item, judul, tahun_terbit, penulis):
        super().__init__(id_item, judul, tahun_terbit)
        self._penulis = penulis

    @property
    def penulis(self):
        """str: nama penulis buku."""
        return self._penulis

    def get_detail(self):
        """Kembalikan detail buku (implementation dari abstract method).

        Returns:
            str: id, judul, penulis, tahun, dan status buku.
        """
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return (f"Buku    | {self.id_item} | {self.judul} | "
                f"{self._penulis} | {self.tahun_terbit} | {status}")

    def hitung_denda(self, hari_terlambat):
        """Hitung denda buku: Rp 1.000 x jumlah hari terlambat.

        Args:
            hari_terlambat (int): jumlah hari keterlambatan.

        Returns:
            int: total denda dalam rupiah.
        """
        return hari_terlambat * self.DENDA_PER_HARI


class Magazine(LibraryItem):
    """Majalah perpustakaan. Denda keterlambatan Rp 500 per hari."""

    DENDA_PER_HARI = 500

    def __init__(self, id_item, judul, tahun_terbit, edisi, penerbit):
        super().__init__(id_item, judul, tahun_terbit)
        self._edisi = edisi
        self._penerbit = penerbit

    @property
    def edisi(self):
        """str: nomor edisi majalah."""
        return self._edisi

    @property
    def penerbit(self):
        """str: nama penerbit majalah."""
        return self._penerbit

    def get_detail(self):
        """Kembalikan detail majalah (implementation dari abstract method).

        Returns:
            str: id, judul, edisi, penerbit, tahun, dan status majalah.
        """
        status = "Dipinjam" if self.is_dipinjam else "Tersedia"
        return (f"Majalah | {self.id_item} | {self.judul} | "
                f"{self._edisi} | {self._penerbit} | "
                f"{self.tahun_terbit} | {status}")

    def hitung_denda(self, hari_terlambat):
        """Hitung denda majalah: Rp 500 x jumlah hari terlambat.

        Args:
            hari_terlambat (int): jumlah hari keterlambatan.

        Returns:
            int: total denda dalam rupiah.
        """
        return hari_terlambat * self.DENDA_PER_HARI
