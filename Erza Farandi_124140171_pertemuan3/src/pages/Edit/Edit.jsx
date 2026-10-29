import { useNavigate, useParams } from "react-router-dom";
import BookForm from "../../components/BookForm/BookForm.jsx";
import { useBooks } from "../../context/BookContext.jsx";
import "./Edit.css";

/**
 * Halaman Edit — /edit/:id
 * Mengambil buku dari konteks berdasarkan URL param, lalu memanggil updateBook.
 */
export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { books, updateBook } = useBooks();
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="empty-box" style={{ marginTop: 20 }}>
        <p>Buku tidak ditemukan.</p>
        <button type="button" className="btn" onClick={() => navigate("/")}>
          ← Kembali ke Daftar
        </button>
      </div>
    );
  }

  const handleSubmit = (data) => {
    updateBook(book.id, data);
    navigate("/"); // kembali ke daftar setelah berhasil simpan
  };

  return (
    <div className="edit-page">
      <h2>Edit Buku</h2>
      <p className="muted" style={{ marginBottom: 12 }}>
        Perbarui data buku lalu klik Simpan.
      </p>
      <BookForm initialBook={book} submitLabel="💾 Simpan Perubahan" onSubmit={handleSubmit} />
    </div>
  );
}
