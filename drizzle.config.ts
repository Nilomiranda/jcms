import {defineConfig} from "drizzle-kit";
import {loadEnvConfig} from "@next/env";

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const { DATABASE_AUTH_TOKEN, DATABASE_URL } = process.env;

if (!DATABASE_URL || !DATABASE_AUTH_TOKEN) {
  throw new Error('DrizzleConfig:: Missing database credentials.')
}

export default defineConfig({
  dialect: 'sqlite',
  driver: 'turso',
  schema: './src/config/database/schema.ts',
  dbCredentials: {
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN
  }
})