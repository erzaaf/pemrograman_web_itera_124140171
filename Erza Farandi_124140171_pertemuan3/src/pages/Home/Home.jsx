import { useState, useMemo } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import BookFilter from "../../components/BookFilter/BookFilter.jsx";
import BookForm from "../../components/BookForm/BookForm.jsx";
import BookList from "../../components/BookList/BookList.jsx";
import { useBooks } from "../../context/BookContext.jsx";
import "./Home.css";

/**
 * Halaman Home — daftar buku + filter + pencarian + form tambah.
 * useState untuk state filter, search, dan visibilitas form;
 * useMemo untuk turunan daftar buku hasil filter (efisien).
 */
export default function Home() {
  const { books, addBook, deleteBook } = useBooks();
  const [filterStatus, setFilterStatus] = useState("semua");
  const [search, setSearch] = useState("");

  // Turunan state: hasil filter + pencarian dihitung dengan useMemo
  const filteredBooks = useMemo(() => {
    const keyword = search.toLowerCase().trim();
    return books
      .filter((b) => filterStatus === "semua" || b.status === filterStatus)
      .filter(
        (b) =>
          b.title.toLowerCase().includes(keyword) ||
          b.author.toLowerCase().includes(keyword)
      );
  }, [books, filterStatus, search]);

  return (
    <>
      <Navbar />
      <main>
        {/* Form tambah buku selalu tampil di atas daftar */}
        <section className="card">
          <h2>Tambah Buku</h2>
          <BookForm onSubmit={addBook} />
        </section>

        <section className="card">
          <div className="home-head">
            <div>
              <h2>Daftar Buku</h2>
              <p className="muted">{filteredBooks.length} buku ditampilkan</p>
            </div>
          </div>

          <BookFilter
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            search={search}
            onSearchChange={setSearch}
          />

          <BookList books={filteredBooks} onDelete={deleteBook} />
        </section>
      </main>
    </>
  );
}
