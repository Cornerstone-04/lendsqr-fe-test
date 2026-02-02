import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import * as router from "react-router";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { UsersTable } from "./users-table";
import type { User } from "@/types/user.types";

const mockUsers: User[] = [
  {
    id: "1",
    organization: "Lendsqr",
    username: "cornerstone",
    fullName: "Cornerstone Ephraim",
    email: "c@test.com",
    phoneNumber: "08012345678",
    dateJoined: "May 15, 2020",
    status: "Active",
  },
] as User[];

describe("UsersTable Component", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(router, "useNavigate").mockImplementation(() => mockNavigate);
  });

  it("renders table headers and user data", () => {
    render(
      <MemoryRouter>
        <UsersTable users={mockUsers} />
      </MemoryRouter>,
    );

    expect(screen.getByText("ORGANIZATION")).toBeInTheDocument();
    expect(screen.getByText("cornerstone")).toBeInTheDocument();
  });

  it("navigates to user details on click", () => {
    render(
      <MemoryRouter>
        <UsersTable users={mockUsers} />
      </MemoryRouter>,
    );

    const actionButton = screen.getByTestId(
      `actions-button-${mockUsers[0].id}`,
    );
    fireEvent.click(actionButton);

    const viewDetails = screen.getByText(/View Details/i);
    fireEvent.click(viewDetails);

    expect(mockNavigate).toHaveBeenCalledWith(`/users/${mockUsers[0].id}`);
  });

  it("shows empty state when no users are provided", () => {
    render(
      <MemoryRouter>
        <UsersTable users={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/No users found/i)).toBeInTheDocument();
  });

  it("changes items per page when select value changes", () => {
    render(
      <MemoryRouter>
        <UsersTable users={mockUsers} />
      </MemoryRouter>,
    );

    const select = screen.getByTestId("items-per-page") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "20" } });

    expect(select.value).toBe("20");
  });
});
