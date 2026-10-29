import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Stats from "../pages/Stats/Stats.jsx";
import { BookProvider } from "../context/BookContext.jsx";

/**
 * Test: halaman Stats menghitung jumlah per status dari data seed konteks
 * (seed = 1 milik, 2 baca, 1 beli)
 */
describe("Halaman Stats", () => {
  it("menampilkan statistik sesuai status buku", () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <BookProvider>
          <Stats />
        </BookProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("stat-total")).toHaveTextContent("4");
    expect(screen.getByTestId("stat-owned")).toHaveTextContent("1");
    expect(screen.getByTestId("stat-reading")).toHaveTextContent("2");
    expect(screen.getByTestId("stat-wishlist")).toHaveTextContent("1");
  });
});
