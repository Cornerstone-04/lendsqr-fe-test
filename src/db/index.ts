import Dexie, { type Table } from "dexie";
import { type User } from "./users.schema";

export class AppDatabase extends Dexie {
  users!: Table<User, string>;

  constructor() {
    super("lendsqr-db");

    this.version(1).stores({
      users: "id, username, email, status, organization, dateJoined",
    });
  }
}

export const db = new AppDatabase();
