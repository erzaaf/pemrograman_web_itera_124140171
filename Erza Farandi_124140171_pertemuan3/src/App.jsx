import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Stats from "./pages/Stats/Stats.jsx";
import Edit from "./pages/Edit/Edit.jsx";

/**
 * App — React Router multi-halaman:
 *   /         → Home (daftar, filter, cari, tambah)
 *   /stats    → Statistik koleksi
 *   /edit/:id → Form edit buku
 *   *         → redirect ke home
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
