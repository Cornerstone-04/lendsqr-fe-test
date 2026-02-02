import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useFilters } from "../useFilters";
import type { User } from "@/types/user.types";

const mockUsers = [
  {
    id: "1",
    organization: "Lendsqr",
    username: "adedeji",
    email: "adedeji@lendsqr.com",
    phoneNumber: "08012345678",
    status: "Active",
    dateJoined: "May 15, 2020 10:00 AM",
  },
  {
    id: "2",
    organization: "Irorun",
    username: "labi",
    email: "labi@irorun.com",
    phoneNumber: "09087654321",
    status: "Inactive",
    dateJoined: "June 20, 2021 12:00 PM",
  },
] as User[];

describe("useFilters", () => {
  it("should return all users initially", () => {
    const { result } = renderHook(() => useFilters(mockUsers));
    expect(result.current.filteredUsers).toHaveLength(2);
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it("should filter users by organization", () => {
    const { result } = renderHook(() => useFilters(mockUsers));
    act(() => {
      result.current.applyFilters({ organization: "Lendsqr" });
    });
    expect(result.current.filteredUsers).toHaveLength(1);
    expect(result.current.filteredUsers[0].organization).toBe("Lendsqr");
    expect(result.current.hasActiveFilters).toBe(true);
  });

  it("should filter users by status", () => {
    const { result } = renderHook(() => useFilters(mockUsers));
    act(() => {
      result.current.applyFilters({ status: "Inactive" });
    });
    expect(result.current.filteredUsers).toHaveLength(1);
    expect(result.current.filteredUsers[0].status).toBe("Inactive");
  });

  it("should return no users if filter matches nothing", () => {
    const { result } = renderHook(() => useFilters(mockUsers));
    act(() => {
      result.current.applyFilters({ username: "nonexistent" });
    });
    expect(result.current.filteredUsers).toHaveLength(0);
  });

  it("should reset filters to initial state", () => {
    const { result } = renderHook(() => useFilters(mockUsers));
    act(() => {
      result.current.applyFilters({ organization: "Lendsqr" });
      result.current.resetFilters();
    });
    expect(result.current.filteredUsers).toHaveLength(2);
    expect(result.current.hasActiveFilters).toBe(false);
  });
});