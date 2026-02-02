import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterDropdown } from "./filter-dropdown";

describe("FilterDropdown Component", () => {
  const mockProps = {
    onFilter: vi.fn(),
    onReset: vi.fn(),
    onClose: vi.fn(),
    organizations: ["Lendsqr", "Irorun"],
  };

  it("renders all filter fields", () => {
    render(<FilterDropdown {...mockProps} />);

    expect(screen.getByLabelText(/organization/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  it("updates field values on change", () => {
    render(<FilterDropdown {...mockProps} />);

    const usernameInput = screen.getByLabelText(
      /username/i,
    ) as HTMLInputElement;
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    expect(usernameInput.value).toBe("testuser");
  });

  it("calls onFilter with current values when form is submitted", () => {
    render(<FilterDropdown {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "adedeji" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /filter/i }));

    expect(mockProps.onFilter).toHaveBeenCalledWith(
      expect.objectContaining({ username: "adedeji" }),
    );
  });

  it("calls onReset and clears fields when reset button is clicked", () => {
    render(<FilterDropdown {...mockProps} />);

    const usernameInput = screen.getByLabelText(
      /username/i,
    ) as HTMLInputElement;
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    fireEvent.click(screen.getByRole("button", { name: /reset/i }));

    expect(usernameInput.value).toBe("");
    expect(mockProps.onReset).toHaveBeenCalled();
  });

  it("calls onClose when clicking the overlay", () => {
    const { container } = render(<FilterDropdown {...mockProps} />);
    const overlay = container.querySelector(".filter-dropdown__overlay");

    if (overlay) fireEvent.click(overlay);
    expect(mockProps.onClose).toHaveBeenCalled();
  });
});
