import {sqliteTable, text} from "drizzle-orm/sqlite-core";
import {columnsHelpers} from "@/server/helpers/columnsHelpers";

export const users = sqliteTable('users', {
  ...columnsHelpers,
  name: text('name').notNull(),
  email: text('email').notNull(),
  profilePictureUrl: text('profilePictureUrl'),
})

export type UserInput = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;