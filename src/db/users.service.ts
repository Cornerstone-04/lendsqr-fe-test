import { db } from "./index";
import { type User } from "./users.schema";

export const saveUsers = async (users: User[]) => {
  await db.users.bulkPut(users);
};

export const getAllUsers = async () => {
  return db.users.toArray();
};

export const getUserById = async (id: string) => {
  return db.users.get(id);
};

export const updateUserStatus = async (
  userId: string,
  status: User["status"],
) => {
  const user = await db.users.get(userId);
  if (user) {
    const updatedUser = { ...user, status };
    await db.users.put(updatedUser);
    return updatedUser;
  }
  throw new Error(`User with id ${userId} not found`);
};

export const clearUsers = async () => {
  await db.users.clear();
};
