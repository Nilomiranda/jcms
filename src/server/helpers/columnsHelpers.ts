import { text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const columnsHelpers = {
  id: text("id")
    .$defaultFn(() => createId())
    .notNull()
    .primaryKey(),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
};
