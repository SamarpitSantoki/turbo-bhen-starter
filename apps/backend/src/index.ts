import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import createApp from './helpers/common/create-app';
import configureOpenAPI from './helpers/common/openapi';
import { ERROR_CODES } from './helpers/error';
import { auth } from './lib/auth';

const PORT = process.env.PORT || '3000';

const app = createApp();

// Middleware
app.use('*', logger());
app.use(
  '*',
  cors({
    origin: 'http://localhost:3001', // replace with your origin
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })
);

// Middleware to get session and user
app.use('*', async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set('user', null);
    c.set('session', null);
    return next();
  }

  c.set('user', session.user);
  c.set('session', session.session);
  return next();
});

app.use(async (c, next) => {
  await next();

  if (c.error) {
    return c.json(
      {
        error: c.error.message,
      },
      ERROR_CODES.INTERNAL_SERVER_ERROR
    );
  }
});

// Mount BetterAuth handler for all auth routes
app.on(['POST', 'GET'], '/auth/*', (c) => {
  return auth.handler(c.req.raw);
});

configureOpenAPI(app);

export default {
  fetch: app.fetch,
  port: PORT,
};

export type AppType = typeof app;
