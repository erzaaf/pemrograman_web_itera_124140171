"""Modul anggota perpustakaan (class Member)."""


class Member:
    """Anggota perpustakaan yang dapat meminjam item.

    Atribut:
        __id_anggota (str): id unik anggota (private).
        __nama (str)      : nama lengkap anggota (private).
        __pinjaman (list) : daftar item yang sedang dipinjam (private).
    """

    def __init__(self, id_anggota, nama):
        self.__id_anggota = id_anggota
        self.__nama = nama
        self.__pinjaman = []

    @property
    def id_anggota(self):
        """str: id unik anggota."""
        return self.__id_anggota

    @property
    def nama(self):
        """str: nama lengkap anggota."""
        return self.__nama

    @property
    def daftar_pinjaman(self):
        """tuple: salinan daftar item yang sedang dipinjam.

        Dibuat tuple agar isinya tidak bisa diubah langsung dari luar,
        perubahan hanya lewat method tambah_pinjaman/hapus_pinjaman.
        """
        return tuple(self.__pinjaman)

    def tambah_pinjaman(self, item):
        """Catat satu item ke daftar pinjaman anggota.

        Args:
            item (LibraryItem): item yang baru dipinjam.
        """
        self.__pinjaman.append(item)

    def hapus_pinjaman(self, item):
        """Hapus satu item dari daftar pinjaman anggota.

        Args:
            item (LibraryItem): item yang dikembalikan.

        Returns:
            bool: True jika item ditemukan dan dihapus.
        """
        if item in self.__pinjaman:
            self.__pinjaman.remove(item)
            return True
        return False

    def __str__(self):
        return f"{self.__nama} ({self.__id_anggota})"
