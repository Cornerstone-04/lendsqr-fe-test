import { useState, useMemo } from "react";
import { type User, type UserFilters } from "../types/user.types";

interface UseFiltersReturn {
  filteredUsers: User[];
  filters: UserFilters;
  applyFilters: (newFilters: UserFilters) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

const initialFilters: UserFilters = {
  organization: "",
  username: "",
  email: "",
  date: "",
  phoneNumber: "",
  status: "",
};

export const useFilters = (users: User[]): UseFiltersReturn => {
  const [filters, setFilters] = useState<UserFilters>(initialFilters);

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (filters.organization) {
      result = result.filter((user) =>
        user.organization
          .toLowerCase()
          .includes(filters.organization!.toLowerCase()),
      );
    }

    if (filters.username) {
      result = result.filter((user) =>
        user.username.toLowerCase().includes(filters.username!.toLowerCase()),
      );
    }

    if (filters.email) {
      result = result.filter((user) =>
        user.email.toLowerCase().includes(filters.email!.toLowerCase()),
      );
    }

    if (filters.phoneNumber) {
      result = result.filter((user) =>
        user.phoneNumber.includes(filters.phoneNumber!),
      );
    }

    if (filters.status) {
      result = result.filter((user) => user.status === filters.status);
    }

    if (filters.date) {
      result = result.filter((user) => {
        // Assuming dateJoined is in format like "May 15, 2020 10:00 AM"
        // We'll do a simple includes check
        return user.dateJoined.includes(filters.date!);
      });
    }

    return result;
  }, [users, filters]);

  const applyFilters = (newFilters: UserFilters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(
      (value) => value !== "" && value !== undefined,
    );
  }, [filters]);

  return {
    filteredUsers,
    filters,
    applyFilters,
    resetFilters,
    hasActiveFilters,
  };
};
