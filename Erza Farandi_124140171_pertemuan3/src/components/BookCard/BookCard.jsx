import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./BookCard.css";

/** Label tiap status buku (warna sama, hanya teks berbeda) */
const STATUS_LABEL = {
  milik: { text: "Dimiliki", cls: "pill" },
  baca: { text: "Sedang dibaca", cls: "pill" },
  beli: { text: "Ingin dibeli", cls: "pill" },
};

/**
 * Komponen reusable #4 — BookCard
 * Menampilkan satu buku: info + aksi edit (Link ke /edit/:id) & hapus (prop onDelete).
 */
export default function BookCard({ book, onDelete }) {
  const status = STATUS_LABEL[book.status] ?? STATUS_LABEL.milik;
  return (
    <div className="book-card" data-testid="book-card">
      <div className="info">
        <p className="title">{book.title}</p>
        <p className="muted">{book.author}</p>
        <span className={`status-pill ${status.cls}`}>{status.text}</span>
      </div>
      <div className="actions">
        <Link to={`/edit/${book.id}`} className="btn" title="Edit buku">
          ✎ Edit
        </Link>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(book.id)}>
          Hapus
        </button>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["milik", "baca", "beli"]).isRequired,
    year: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
