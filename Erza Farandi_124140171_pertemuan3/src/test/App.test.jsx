import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import App from "../App.jsx";
import { BookProvider } from "../context/BookContext.jsx";

// Bungkus App dengan router bawaan main.jsx (distan ulang untuk test)
const renderApp = () =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <BookProvider>
        <App />
      </BookProvider>
    </MemoryRouter>
  );

describe("Integrasi App (React Router)", () => {
  /**
   * Test: halaman Home me-render daftar buku + filter + judul
   */
  it("menampilkan daftar buku di halaman utama", () => {
    renderApp();
    expect(screen.getByRole("heading", { name: /daftar buku/i })).toBeInTheDocument();
    expect(screen.getAllByTestId("book-card").length).toBeGreaterThan(0);
    expect(screen.getByLabelText(/cari buku/i)).toBeInTheDocument();
  });

  /**
   * Test: navigasi ke /stats lewat navbar
   */
  it("berpindah ke halaman Statistik saat link diklik", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole("link", { name: /statistik/i }));
    expect(screen.getByRole("heading", { name: /statistik koleksi/i })).toBeInTheDocument();
    expect(screen.getByTestId("stat-total")).toBeInTheDocument();
  });
});
