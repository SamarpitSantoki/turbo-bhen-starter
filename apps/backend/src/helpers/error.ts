import type { StatusCode } from 'hono/utils/http-status';

export const ERROR_CODES: Record<string, StatusCode> = {
  INVALID_TOKEN: 401,
  INVALID_CREDENTIALS: 401,
  INVALID_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  INVALID_TOKEN: 'Invalid token',
  INVALID_CREDENTIALS: 'Invalid credentials',
  INVALID_REQUEST: 'Invalid request',
  INTERNAL_SERVER_ERROR: 'Internal server error',
};
