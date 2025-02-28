import { bigint, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { id, timestamps } from "../database/types";

const itemTypes = ["file", "folder"] as const;

export const itemTable = mysqlTable("item", {
  ...id,
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", itemTypes).notNull(),
  parentId: bigint("parent_id", { mode: "number" }),
  ownerId: bigint("owner_id", { mode: "number" }).notNull(),
  size: bigint("size", { mode: "number" }),
  mimeType: varchar("mime_type", { length: 255 }),
  ...timestamps,
});
