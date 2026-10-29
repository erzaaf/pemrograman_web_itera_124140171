import { NavLink } from "react-router-dom";
import "./Navbar.css";

/**
 * Komponen reusable — Navbar
 * Navigasi React Router antara halaman Daftar (/) dan Statistik (/stats).
 */
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <h1>Book of Mediatok</h1>
        </div>
        <div className="links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Daftar Buku
          </NavLink>
          <NavLink to="/stats" className={({ isActive }) => (isActive ? "active" : "")}>
            Statistik
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
