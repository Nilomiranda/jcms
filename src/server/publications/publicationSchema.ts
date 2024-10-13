import {sqliteTable, text} from "drizzle-orm/sqlite-core";
import {columnsHelpers} from "@/server/helpers/columnsHelpers";
import {users} from "@/server/users/userSchema";

export enum PublicationStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED',
}

export const publications = sqliteTable('publications', {
  ...columnsHelpers,
  content: text('name').notNull(),
  status: text('status', { enum: [Object.values(PublicationStatus) as unknown as string] }).notNull().default(PublicationStatus.DRAFT),
  userId: text("userId", {
    length: 255
  })
    .notNull()
    .references(() => users.id),

})

export type PublicationInput = typeof publications.$inferInsert;
export type Publication = typeof publications.$inferSelect;