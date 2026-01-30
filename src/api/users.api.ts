import { type User } from "../db/users.schema";
import { apiClient } from "./axios";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get<User[]>("");
    console.log(`Fetched ${response.data.length} users from API`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users from API:", error);
    throw new Error("Failed to fetch users from API");
  }
};