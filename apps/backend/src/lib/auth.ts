import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { bearer, jwt, openAPI } from 'better-auth/plugins';
import { prisma } from '../db/client';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

const TOKEN_EXPIRE_IN_DAYS = 7; // 7 days

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  session: {
    expiresIn: TOKEN_EXPIRE_IN_DAYS * 24 * 60 * 60, // 7 days
    updateAge: TOKEN_EXPIRE_IN_DAYS * 24 * 60 * 60, // 24 hours
  },
  plugins: [
    openAPI({
      path: '/docs',
    }),
    jwt(),
    bearer(),
  ],
  trustedOrigins: [
    '*',
    'http://192.168.245.234:3000',
    'http://192.168.245.234:3001',
    'http://192.168.245.234:3004/',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3004',
    'localhost',
    'com.samarpit.braintick.dev',
    'com.samarpit.braintick',
    'https://braintick.coolify.samarpit.dev',
  ],
  basePath: '/auth',
  baseURL: BASE_URL,
  logger: {
    level: 'debug',
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
