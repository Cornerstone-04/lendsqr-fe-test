import { describe, it, expect, beforeEach, vi } from "vitest";
import { isAuthenticated, loginUser, logoutUser } from "../auth";

describe("auth utils", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should return false when no auth token exists", () => {
    expect(isAuthenticated()).toBe(false);
  });

  it("should return true when isAuthenticated is set to 'true'", () => {
    localStorage.setItem("isAuthenticated", "true");
    expect(isAuthenticated()).toBe(true);
  });

  it("should store user data and set auth flag on login", () => {
    const user = { email: "test@lendsqr.com", name: "test" };
    loginUser(user);

    expect(localStorage.getItem("isAuthenticated")).toBe("true");
    expect(localStorage.getItem("user")).toBe(JSON.stringify(user));
  });

  it("should remove all auth data on logout", () => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify({ name: "test" }));

    logoutUser();

    expect(localStorage.getItem("isAuthenticated")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });
});