import {sqliteTable, text} from "drizzle-orm/sqlite-core";
import {createId} from "@paralleldrive/cuid2";

export const users = sqliteTable('users', {
  id: text().$defaultFn(() => createId()),
  name: text().notNull(),
  email: text().notNull(),
  profilePictureUrl: text(),
})

export type User = typeof users;