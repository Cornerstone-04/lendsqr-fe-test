import { type User } from "../db/users.schema";
import { apiClient } from "./axios";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>("/");
  return response.data;
};
