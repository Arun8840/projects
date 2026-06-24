import { config } from 'dotenv';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';

config({ path: new URL('../../../.env', import.meta.url).pathname });

const databaseUrl = process.env.DATABASE_URL ?? '';
const db = drizzle(databaseUrl);

export function createClient(url: string) {
  return drizzle(url);
}

export { db, eq };
