import { useState, useEffect } from "react";
import {
  getAllUsers,
  getUserById,
  saveUsers,
  updateUserStatus as updateUserStatusInDB,
} from "../db/users.service";
import { type User } from "../types/user.types";

interface UseIndexedUsersReturn {
  users: User[];
  loading: boolean;
  error: Error | null;
  getUser: (id: string) => Promise<User | undefined>;
  updateUser: (user: User) => Promise<void>;
  updateUserStatus: (userId: string, status: User["status"]) => Promise<void>;
}

export const useIndexedUsers = (): UseIndexedUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const dbUsers = await getAllUsers();
      setUsers(dbUsers);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to load users from IndexedDB"),
      );
      console.error("Error loading users from IndexedDB:", err);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (id: string): Promise<User | undefined> => {
    try {
      return await getUserById(id);
    } catch (err) {
      console.error("Error getting user by ID:", err);
      return undefined;
    }
  };

  const updateUser = async (user: User) => {
    try {
      await saveUsers([user]);
      // Reload users to reflect changes
      await loadUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      throw err;
    }
  };

  const updateUserStatus = async (userId: string, status: User["status"]) => {
    try {
      const updatedUser = await updateUserStatusInDB(userId, status);
      // Update local state
      setUsers((prev) => prev.map((u) => (u.id === userId ? updatedUser : u)));
    } catch (err) {
      console.error("Error updating user status:", err);
      throw err;
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
    getUser,
    updateUser,
    updateUserStatus,
  };
};
