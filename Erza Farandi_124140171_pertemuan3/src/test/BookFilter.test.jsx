import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, vi } from "vitest";
import BookFilter from "../components/BookFilter/BookFilter.jsx";

/**
 * Test 6: pencarian & filter sebagai controlled component
 */
it("menyampaiikan nilai pencarian & status ke handler parent", async () => {
  const user = userEvent.setup();
  const onSearch = vi.fn();
  const onFilter = vi.fn();
  render(
    <BookFilter
      filterStatus="semua"
      onFilterChange={onFilter}
      search=""
      onSearchChange={onSearch}
    />
  );
  await user.type(screen.getByLabelText(/cari buku/i), "h");
  expect(onSearch).toHaveBeenCalledWith("h");
  await user.selectOptions(screen.getByLabelText(/filter status/i), "baca");
  expect(onFilter).toHaveBeenCalledWith("baca");
});
