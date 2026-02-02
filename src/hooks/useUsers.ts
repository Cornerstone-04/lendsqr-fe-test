import { useState, useEffect } from "react";
import { fetchUsers } from "@/api/users.api";
import { getAllUsers, saveUsers, clearUsers } from "@/db/users.service";
import { type User } from "@/types/user.types";

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  clearCache: () => Promise<void>;
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // First, try to get users from IndexedDB
      const cachedUsers = await getAllUsers();

      if (cachedUsers.length > 0) {
        setUsers(cachedUsers);
        setLoading(false);
        return;
      }

      // If no cached users, fetch from API
      const apiUsers = await fetchUsers();

      // Save to IndexedDB for future use
      await saveUsers(apiUsers);

      setUsers(apiUsers);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch users"));
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);

      // Clear cache and fetch fresh data
      await clearUsers();
      const apiUsers = await fetchUsers();
      await saveUsers(apiUsers);

      setUsers(apiUsers);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to refetch users"),
      );
      console.error("Error refetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearCache = async () => {
    try {
      await clearUsers();
      setUsers([]);
    } catch (err) {
      console.error("Error clearing cache:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refetch,
    clearCache,
  };
};
