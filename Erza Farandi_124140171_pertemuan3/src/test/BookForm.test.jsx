import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, vi } from "vitest";
import BookForm from "../components/BookForm/BookForm.jsx";

/**
 * Test 1-3: error handling & submit BookForm
 */

// Test 1: tombol submit dengan kolom kosong munculkan pesan error
it("menampilkan pesan error saat judul & penulis kosong", async () => {
  const user = userEvent.setup();
  render(<BookForm onSubmit={vi.fn()} />);
  await user.click(screen.getByRole("button", { name: /tambah buku/i }));
  expect(screen.getAllByRole("alert")).toHaveLength(2);
  expect(screen.getByText(/judul wajib diisi/i)).toBeInTheDocument();
  expect(screen.getByText(/penulis wajib diisi/i)).toBeInTheDocument();
});

// Test 2: input kosong mendapat feedback visual (class invalid)
it("memberi kelas invalid pada input kosong (feedback visual)", async () => {
  const user = userEvent.setup();
  render(<BookForm onSubmit={vi.fn()} />);
  await user.click(screen.getByRole("button", { name: /tambah buku/i }));
  expect(screen.getByLabelText(/judul/i)).toHaveClass("invalid");
  expect(screen.getByLabelText(/penulis/i)).toHaveClass("invalid");
});

// Test 3: form valid memanggil onSubmit dengan data benar (kolom juga di-trim)
it("memanggil onSubmit dengan data yang di-trim saat form valid", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<BookForm onSubmit={onSubmit} />);
  await user.type(screen.getByLabelText(/judul/i), "  Clean Code  ");
  await user.type(screen.getByLabelText(/penulis/i), "Robert Martin");
  await user.selectOptions(screen.getByLabelText(/status/i), "beli");
  await user.click(screen.getByRole("button", { name: /tambah buku/i }));
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    title: "Clean Code",
    author: "Robert Martin",
    status: "beli",
  });
});
