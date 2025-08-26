import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  basePath: '/auth',
  fetchOptions: {
    credentials: 'include',
  },
});

export type AuthClient = typeof authClient;
