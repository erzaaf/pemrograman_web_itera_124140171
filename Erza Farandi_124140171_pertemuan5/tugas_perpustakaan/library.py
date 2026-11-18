"""Modul class Library untuk mengelola koleksi item perpustakaan."""

from library_item import LibraryItem


class Library:
    """Menyimpan dan mengelola koleksi item perpustakaan.

    Atribut:
        __nama (str)     : nama perpustakaan (private).
        __koleksi (list) : daftar seluruh item (private).
    """

    def __init__(self, nama):
        self.__nama = nama
        self.__koleksi = []

    @property
    def nama(self):
        """str: nama perpustakaan."""
        return self.__nama

    @property
    def jumlah_item(self):
        """int: banyaknya item di koleksi."""
        return len(self.__koleksi)

    @property
    def koleksi(self):
        """tuple: salinan koleksi agar tidak bisa diubah dari luar."""
        return tuple(self.__koleksi)

    def tambah_item(self, item):
        """Tambahkan satu item ke koleksi perpustakaan.

        Args:
            item (LibraryItem): buku atau majalah yang akan ditambahkan.

        Raises:
            TypeError: jika item bukan turunan LibraryItem.
            ValueError: jika id item sudah dipakai item lain.

        Returns:
            bool: True jika item berhasil ditambahkan.
        """
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus turunan LibraryItem")
        if self.cari_item(item.id_item) is not None:
            raise ValueError(f"Item dengan id '{item.id_item}' sudah ada")
        self.__koleksi.append(item)
        return True

    def tampilkan_katalog(self):
        """Cetak daftar item yang tersedia (tidak sedang dipinjam).

        Returns:
            int: jumlah item yang ditampilkan.
        """
        tersedia = [item for item in self.__koleksi
                    if not item.is_dipinjam]
        print(f"Katalog {self.__nama} - item tersedia:")
        print("-" * 74)
        if not tersedia:
            print("(tidak ada item yang tersedia)")
        for nomor, item in enumerate(tersedia, start=1):
            print(f"{nomor:>2}. {item.get_detail()}")
        print("-" * 74)
        return len(tersedia)

    def cari_item(self, kata_kunci):
        """Cari item berdasarkan id (persis) atau judul (sebagian).

        Args:
            kata_kunci (str): id atau potongan judul yang dicari.

        Returns:
            LibraryItem | None: item pertama yang cocok, atau None.
        """
        kunci = str(kata_kunci).strip().lower()
        for item in self.__koleksi:
            if item.id_item.lower() == kunci:
                return item
        for item in self.__koleksi:
            if kunci in item.judul.lower():
                return item
        return None

    def pinjam_item(self, id_item, member):
        """Pinjamkan satu item kepada anggota.

        Args:
            id_item (str): id item yang dipinjam.
            member (Member): anggota yang meminjam.

        Raises:
            ValueError: jika item tidak ada atau sedang dipinjam.

        Returns:
            LibraryItem: item yang berhasil dipinjam.
        """
        item = self.cari_item(id_item)
        if item is None:
            raise ValueError(f"Item '{id_item}' tidak ditemukan")
        if item.is_dipinjam:
            raise ValueError(f"Item '{id_item}' sedang dipinjam")
        item.is_dipinjam = True
        member.tambah_pinjaman(item)
        return item

    def kembalikan_item(self, id_item, member, hari_terlambat=0):
        """Terima pengembalian item dan hitung dendanya.

        Args:
            id_item (str): id item yang dikembalikan.
            member (Member): anggota yang mengembalikan.
            hari_terlambat (int): jumlah hari keterlambatan.

        Raises:
            ValueError: jika item tidak ditemukan atau tidak dipinjam.

        Returns:
            int: total denda dalam rupiah.
        """
        item = self.cari_item(id_item)
        if item is None:
            raise ValueError(f"Item '{id_item}' tidak ditemukan")
        if not item.is_dipinjam:
            raise ValueError(f"Item '{id_item}' tidak sedang dipinjam")
        item.is_dipinjam = False
        member.hapus_pinjaman(item)
        return item.hitung_denda(hari_terlambat)
