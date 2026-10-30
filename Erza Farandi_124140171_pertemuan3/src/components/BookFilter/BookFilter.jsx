import PropTypes from "prop-types";
import "./BookFilter.css";

/**
 * Komponen reusable #2 — BookFilter
 * Filter berdasarkan status + pencarian berdasarkan judul/penulis.
 * Full controlled component: nilai & perubahan berasal/ke parent.
 */
const STATUS_OPTIONS = [
  { value: "semua", label: "Semua status" },
  { value: "milik", label: "Dimiliki" },
  { value: "baca", label: "Sedang dibaca" },
  { value: "beli", label: "Ingin dibeli" },
];

export default function BookFilter({ filterStatus, onFilterChange, search, onSearchChange }) {
  return (
    <div className="book-filter">
      <div className="field">
        <label htmlFor="search-input">Cari buku</label>
        <input
          id="search-input"
          type="text"
          placeholder="Judul atau penulis… (contoh: shadow slave)"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="status-filter">Filter status</label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  filterStatus: PropTypes.oneOf(["semua", "milik", "baca", "beli"]).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};
