import {sqliteTable, text} from "drizzle-orm/sqlite-core";
import {createId} from "@paralleldrive/cuid2";
import {columnsHelpers} from "@/server/helpers/columnsHelpers";
import {users} from "@/server/users/userSchema";

export const apiKeys = sqliteTable('apiKeys', {
  id: text('id').$defaultFn(() => createId()),
  value: text('value').notNull(),
  name: text('name').notNull(),
  userId: text("userId", {
    length: 255
  })
    .notNull()
    .references(() => users.id),
  ...columnsHelpers,
})

export type ApiKeyInput = typeof apiKeys.$inferInsert;
export type ApiKey = typeof apiKeys.$inferSelect;