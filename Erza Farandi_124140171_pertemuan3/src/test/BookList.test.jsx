import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { it, expect, vi } from "vitest";
import BookList from "../components/BookList/BookList.jsx";

const books = [
  { id: "1", title: "Atomic Habits", author: "James Clear", status: "baca" },
  { id: "2", title: "Laskar Pelangi", author: "Andrea Hirata", status: "milik" },
];

const withRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

/**
 * Test 4: BookList me-render semua buku beserta statusnya
 */
it("me-render jumlah BookCard sesuai jumlah buku", () => {
  withRouter(<BookList books={books} onDelete={vi.fn()} />);
  expect(screen.getAllByTestId("book-card")).toHaveLength(2);
  expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
  expect(screen.getByText(/James Clear/)).toBeInTheDocument();
});

/**
 * Test 5: BookList tampilkan pesan kosong bila hasil filter kosong
 */
it("menampilkan pesan tidak ada buku saat daftar kosong", () => {
  withRouter(<BookList books={[]} onDelete={vi.fn()} />);
  expect(screen.getByText(/tidak ada buku yang cocok/i)).toBeInTheDocument();
  expect(screen.queryByTestId("book-card")).not.toBeInTheDocument();
});
