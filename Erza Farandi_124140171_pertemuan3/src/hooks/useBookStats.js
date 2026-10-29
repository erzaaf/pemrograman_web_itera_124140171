import { useMemo } from "react";

/**
 * Hook #2 — useBookStats
 * Menghitung statistik koleksi buku dengan useMemo (hanya dihitung
 * ulang saat daftar buku berubah).
 * @param {Array<{status: string}>} books
 */
export default function useBookStats(books) {
  return useMemo(() => {
    const owned = books.filter((b) => b.status === "milik").length;
    const reading = books.filter((b) => b.status === "baca").length;
    const wishlist = books.filter((b) => b.status === "beli").length;
    const total = books.length;
    return {
      total,
      owned,
      reading,
      wishlist,
      // persentase buku yang sudah dimiliki/dibaca dari total koleksi
      ownedPercent: total ? Math.round((owned / total) * 100) : 0,
      readingPercent: total ? Math.round((reading / total) * 100) : 0,
      wishlistPercent: total ? Math.round((wishlist / total) * 100) : 0,
    };
  }, [books]);
}
