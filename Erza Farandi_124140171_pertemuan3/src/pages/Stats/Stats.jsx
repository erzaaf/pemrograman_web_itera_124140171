import Navbar from "../../components/Navbar/Navbar.jsx";
import useBookStats from "../../hooks/useBookStats.js";
import { useBooks } from "../../context/BookContext.jsx";
import "./Stats.css";

/**
 * Halaman Stats — memakai custom hook useBookStats.
 * Menampilkan jumlah tiap status + progress bar ringkas.
 */
const LABEL = {
  owned: "Dimiliki",
  reading: "Sedang dibaca",
  wishlist: "Ingin dibeli",
};

export default function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  return (
    <>
      <Navbar />
      <main>
        <section className="card">
          <h2>Statistik Koleksi</h2>
          <p className="muted" style={{ marginBottom: 14 }}>
            Ringkasan status seluruh buku yang tersimpan di localStorage.
          </p>

          <div className="stat-grid">
            <div className="stat">
              <strong data-testid="stat-total">{stats.total}</strong>
              <span>Total Buku</span>
            </div>
            <div className="stat">
              <strong data-testid="stat-owned">{stats.owned}</strong>
              <span>Dimiliki</span>
            </div>
            <div className="stat">
              <strong data-testid="stat-reading">{stats.reading}</strong>
              <span>Sedang dibaca</span>
            </div>
            <div className="stat">
              <strong data-testid="stat-wishlist">{stats.wishlist}</strong>
              <span>Ingin dibeli</span>
            </div>
          </div>

          {(["owned", "reading", "wishlist"]).map((key) => (
            <div key={key} className="bar-row">
              <span className="bar-label">{LABEL[key]}</span>
              <div className="bar">
                <div className={`bar-fill ${key}`} style={{ width: `${stats[`${key}Percent`]}%` }} />
              </div>
              <span className="bar-pct">{stats[`${key}Percent`]}%</span>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
