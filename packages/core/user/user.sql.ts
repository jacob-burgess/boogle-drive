import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { id, timestamps } from "../database/types";

export const userTable = mysqlTable("user", {
  ...id,
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  ...timestamps,
});
