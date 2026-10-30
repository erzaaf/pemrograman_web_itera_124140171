import { useState } from "react";
import PropTypes from "prop-types";
import "./BookForm.css";

/**
 * Komponen reusable #3 — BookForm
 * Form tambah/edit buku dengan error handling:
 * kolom wajib divalidasi dan input kosong mendapat feedback visual (border merah).
 * Dipakai ulang di halaman Home (tambah) dan Edit (ubah).
 */
const STATUSES = [
  { value: "milik", label: "Dimiliki" },
  { value: "baca", label: "Sedang dibaca" },
  { value: "beli", label: "Ingin dibeli" },
];

const EMPTY = { title: "", author: "", status: "milik" };

export default function BookForm({ initialBook, submitLabel = "Tambah Buku", onSubmit }) {
  // useState: nilai form + error validasi per kolom
  const [form, setForm] = useState(initialBook ?? EMPTY);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // hapus pesan error di kolom yang mulai diisi ulang
    setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Judul wajib diisi!";
    if (!form.author.trim()) next.author = "Penulis wajib diisi!";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return; // berhenti — feedback visual sudah muncul di input
    }
    onSubmit({
      title: form.title.trim(),
      author: form.author.trim(),
      status: form.status,
    });
    if (form.title !== initialBook?.title) setForm(EMPTY); // reset setelah tambah
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <div className="row">
        <div className="col">
          <label htmlFor="bf-title">Judul</label>
          <input
            id="bf-title"
            name="title"
            type="text"
            placeholder="Contoh: Majalah Bobo"
            value={form.title}
            onChange={handleChange}
            className={errors.title ? "invalid" : ""}
          />
          {errors.title && <p className="error-text" role="alert">{errors.title}</p>}
        </div>
        <div className="col">
          <label htmlFor="bf-author">Penulis</label>
          <input
            id="bf-author"
            name="author"
            type="text"
            placeholder="Contoh: Hanung Akbar"
            value={form.author}
            onChange={handleChange}
            className={errors.author ? "invalid" : ""}
          />
          {errors.author && <p className="error-text" role="alert">{errors.author}</p>}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="bf-status">Status</label>
          <select id="bf-status" name="status" value={form.status} onChange={handleChange}>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">{submitLabel}</button>
    </form>
  );
}

BookForm.propTypes = {
  initialBook: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(["milik", "baca", "beli"]),
  }),
  submitLabel: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
