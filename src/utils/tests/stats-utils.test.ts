import { describe, it, expect } from "vitest";
import { calculateUserStats } from "../stats-utils";
import type { User } from "../../types/user.types";

describe("calculateUserStats", () => {
  const mockUsers = [
    {
      id: "1",
      status: "Active",
      accountBalance: "₦200,000.00",
      loanRepayment: "₦40,000.00",
    },
    {
      id: "2",
      status: "Inactive",
      accountBalance: "₦0.00",
      loanRepayment: "₦0.00",
    },
    {
      id: "3",
      status: "Active",
      accountBalance: "₦50,000.00",
      loanRepayment: "₦10,000.00",
    },
  ] as User[];

  it("should calculate total number of users correctly", () => {
    const stats = calculateUserStats(mockUsers);
    expect(stats.total).toBe(3);
  });

  it("should calculate active users correctly", () => {
    const stats = calculateUserStats(mockUsers);
    expect(stats.active).toBe(2);
  });

  it("should calculate users with loans (repayment > 0)", () => {
    const stats = calculateUserStats(mockUsers);
    expect(stats.withLoans).toBe(2);
  });

  it("should calculate users with savings (balance > 0)", () => {
    const stats = calculateUserStats(mockUsers);
    expect(stats.withSavings).toBe(2);
  });

  it("should handle empty user list", () => {
    const stats = calculateUserStats([]);
    expect(stats).toEqual({
      total: 0,
      active: 0,
      withLoans: 0,
      withSavings: 0,
    });
  });

  it("should return 0 for loans/savings if values are null or formatted incorrectly", () => {
    const badData = [{ id: "4", status: "Active" }] as User[];
    const stats = calculateUserStats(badData);
    expect(stats.withLoans).toBe(0);
    expect(stats.withSavings).toBe(0);
  });
});