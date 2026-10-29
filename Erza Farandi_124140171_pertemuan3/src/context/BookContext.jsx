import { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage.js";

/**
 * BookContext — Context API untuk state global daftar buku.
 * Data dipersist lewat hook useLocalStorage (localStorage).
 */
const BookContext = createContext(null);

const STORAGE_KEY = "bookmania_books_v2";

// Kumpulan buku contoh untuk kunjungan pertama (bisa dihapus pengguna)
const SEED = [
  { id: "seed-1", title: "Lord of the Mysteries", author: "Cuttlefish That Loves Diving", status: "milik" },
  { id: "seed-2", title: "Shadow Slave", author: "Guiltythree", status: "baca" },
  { id: "seed-3", title: "Omniscient Reader's Viewpoint", author: "Sing Shong", status: "baca" },
  { id: "seed-4", title: "Regressor's Tale of Cultivation", author: "Tremendous", status: "beli" },
];

export function BookProvider({ children }) {
  // useState + useEffect (di dalam useLocalStorage) mengurus state & persistensi
  const [books, setBooks] = useLocalStorage(STORAGE_KEY, SEED);

  const value = useMemo(
    () => ({
      books,
      // Tambah buku baru — id unik berbasis waktu + angka acak
      addBook: (book) =>
        setBooks((prev) => [
          ...prev,
          { ...book, id: `bk-${Date.now()}-${Math.floor(Math.random() * 1000)}` },
        ]),
      // Edit buku berdasarkan id — tetap immutable
      updateBook: (id, updated) =>
        setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updated } : b))),
      // Hapus buku berdasarkan id
      deleteBook: (id) => setBooks((prev) => prev.filter((b) => b.id !== id)),
    }),
    [books, setBooks]
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook akses konteks untuk komponen manapun
export function useBooks() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBooks harus dipakai di dalam <BookProvider>");
  return ctx;
}
