import {text} from "drizzle-orm/sqlite-core";
import {sql} from "drizzle-orm";

export const columnsHelpers = {
  createdAt: text('createdAt').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('createdAt').default(sql`CURRENT_TIMESTAMP`),
}