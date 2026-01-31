import type { User } from "../types/user.types";

const parseCurrency = (value: string) =>
  parseFloat(value.replace(/[^0-9.-]+/g, "")) || 0;

export const calculateUserStats = (users: User[]) => {
  return {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    withLoans: users.filter(
      (u) => u.loanRepayment && parseCurrency(u.loanRepayment) > 0,
    ).length,
    withSavings: users.filter(
      (u) => u.accountBalance && parseCurrency(u.accountBalance) > 0,
    ).length,
  };
};
