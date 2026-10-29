import PropTypes from "prop-types";
import BookCard from "../BookCard/BookCard.jsx";
import "./BookList.css";

/**
 * Komponen reusable #5 — BookList
 * Me-render daftar BookCard dari hasil filter/pencarian,
 * atau kotak "kosong" bila tidak ada yang cocok.
 */
export default function BookList({ books, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="empty-box">
        <p>Tidak ada buku yang cocok.</p>
        <p className="muted">Coba ubah kata pencarian / filter, atau tambah buku baru.</p>
      </div>
    );
  }
  return (
    <div className="book-list" data-testid="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onDelete={onDelete} />
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(["milik", "baca", "beli"]).isRequired,
      year: PropTypes.number,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
