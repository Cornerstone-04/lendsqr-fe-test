import { describe, it, expect, beforeEach, vi } from "vitest";
import { 
  saveUsers, 
  getAllUsers, 
  getUserById, 
  updateUserStatus 
} from "../users.service";
import { db } from "../index";
import { type User } from "../users.schema";

// Mock the database module
vi.mock("../index", () => ({
  db: {
    users: {
      bulkPut: vi.fn(),
      toArray: vi.fn(),
      get: vi.fn(),
      put: vi.fn(),
      clear: vi.fn(),
    },
  },
}));

describe("users.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should save multiple users", async () => {
    const mockUsers = [{ id: "1", username: "user1" }] as User[];
    await saveUsers(mockUsers);
    expect(db.users.bulkPut).toHaveBeenCalledWith(mockUsers);
  });

  it("should retrieve all users", async () => {
    const mockUsers = [{ id: "1" }] as User[];
    vi.mocked(db.users.toArray).mockResolvedValue(mockUsers);
    
    const result = await getAllUsers();
    expect(result).toEqual(mockUsers);
  });

  it("should get a user by id", async () => {
    const mockUser = { id: "123" } as User;
    vi.mocked(db.users.get).mockResolvedValue(mockUser);

    const result = await getUserById("123");
    expect(result).toEqual(mockUser);
  });

  it("should update user status", async () => {
    const mockUser = { id: "1", status: "Pending" } as User;
    vi.mocked(db.users.get).mockResolvedValue(mockUser);

    const result = await updateUserStatus("1", "Active");
    expect(db.users.put).toHaveBeenCalled();
    expect(result.status).toBe("Active");
  });

  it("should throw error if user not found", async () => {
    vi.mocked(db.users.get).mockResolvedValue(undefined);
    await expect(updateUserStatus("999", "Active")).rejects.toThrow();
  });
});