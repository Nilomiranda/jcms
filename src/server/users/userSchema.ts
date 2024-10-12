import {sqliteTable, text} from "drizzle-orm/sqlite-core";
import {createId} from "@paralleldrive/cuid2";

export const users = sqliteTable('users', {
  id: text('id').$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  profilePictureUrl: text('profilePictureUrl'),
})

export type UserInput = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;