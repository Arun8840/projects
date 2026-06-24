import { createClient } from '@repo/db';
import { account, session, user, verification } from '@repo/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

const databaseUrl = process.env.DATABASE_URL ?? '';
const db = createClient(databaseUrl);

export const authServer = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
});
