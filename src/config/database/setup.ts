import {drizzle} from "drizzle-orm/libsql";
import * as schema from './schema'
import {createClient} from "@libsql/client";

const { DATABASE_AUTH_TOKEN, DATABASE_URL } = process.env;

if (!DATABASE_URL || !DATABASE_AUTH_TOKEN) {
  throw new Error('DatabaseSetup:: Missing database credentials.')
}

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN
})

export const db = drizzle(client, { schema })