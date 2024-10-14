import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { columnsHelpers } from "@/server/helpers/columnsHelpers";
import { users } from "@/server/users/userSchema";

export const apiKeys = sqliteTable("apiKeys", {
  value: text("value").notNull(),
  name: text("name").notNull(),
  userId: text("userId", {
    length: 255,
  })
    .notNull()
    .unique()
    .references(() => users.id),
  ...columnsHelpers,
});

export type ApiKeyInput = typeof apiKeys.$inferInsert;
export type ApiKey = typeof apiKeys.$inferSelect;
