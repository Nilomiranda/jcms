import { drizzle } from 'drizzle-orm/connect';

const { DATABASE_AUTH_TOKEN, DATABASE_URL } = process.env;

if (!DATABASE_URL || !DATABASE_AUTH_TOKEN) {
  throw new Error('DatabaseSetup:: Missing database credentials.')
}

export const db = await drizzle('libsql', {
  connection: {
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN
  }
});