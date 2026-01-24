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

export const clearUsers = async () => {
  await db.users.clear();
};
